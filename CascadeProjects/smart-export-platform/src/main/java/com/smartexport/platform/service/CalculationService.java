package com.smartexport.platform.service;

import com.smartexport.platform.dto.*;
import com.smartexport.platform.entity.Port;
import com.smartexport.platform.entity.SivPrice;
import com.smartexport.platform.entity.TarifDouanier;
import com.smartexport.platform.repository.PortRepository;
import com.smartexport.platform.repository.SivPriceRepository;
import com.smartexport.platform.repository.TarifDouanierRepository;
import com.smartexport.platform.util.HsCodeUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CalculationService {
    
    private final TarifDouanierRepository tarifRepository;
    private final SivPriceRepository sivPriceRepository;
    private final ExchangeRateService exchangeRateService;
    private final PortRepository portRepository;
    
    @Transactional(readOnly = true)
    public LandedCostResultDto calculateLandedCost(LandedCostCalculationDto request) {
        String normalizedCodeHs = HsCodeUtil.normalize(request.getCodeHs());
        TarifDouanier tarif = tarifRepository.findByCodeHsAndPaysDestination(
            normalizedCodeHs, 
            request.getPaysDestination()
        ).orElseThrow(() -> new RuntimeException(
            "Aucun tarif trouvé pour le code HS: " + request.getCodeHs() + 
            " et le pays: " + request.getPaysDestination()
        ));
        
        BigDecimal valeurCaf = request.getValeurFob()
            .add(request.getCoutTransport())
            .add(request.getAssurance());
        
        BigDecimal montantDouane = valeurCaf
            .multiply(tarif.getTauxDouane())
            .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        
        BigDecimal baseCalculTva = valeurCaf.add(montantDouane);
        BigDecimal montantTva = baseCalculTva
            .multiply(tarif.getTauxTva())
            .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        
        BigDecimal montantTaxeParafiscale = valeurCaf
            .multiply(tarif.getTaxeParafiscale())
            .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        
        Port port = null;
        BigDecimal fraisPortuaires = BigDecimal.ZERO;
        String nomPort = null;
        
        if (request.getPortId() != null) {
            port = portRepository.findById(request.getPortId()).orElse(null);
            if (port != null) {
                fraisPortuaires = port.getFraisPortuaires() != null ? port.getFraisPortuaires() : BigDecimal.ZERO;
                nomPort = port.getNomPort();
            }
        }
        
        BigDecimal coutTotal = valeurCaf
            .add(montantDouane)
            .add(montantTva)
            .add(montantTaxeParafiscale)
            .add(fraisPortuaires);
        
        BigDecimal coutEstime = request.getValeurFob()
            .multiply(BigDecimal.valueOf(1.15));
        
        BigDecimal varianceCout = coutTotal.subtract(coutEstime);
        
        String variancePercentage = coutEstime.compareTo(BigDecimal.ZERO) > 0
            ? varianceCout.multiply(BigDecimal.valueOf(100))
                .divide(coutEstime, 2, RoundingMode.HALF_UP) + "%"
            : "N/A";
        
        String currency = request.getCurrency() != null ? request.getCurrency() : "EUR";
        BigDecimal coutTotalEur = null;
        BigDecimal coutTotalUsd = null;
        
        if (!"EUR".equals(currency)) {
            try {
                coutTotalEur = exchangeRateService.convert(coutTotal, currency, "EUR").getConvertedAmount();
            } catch (Exception e) {
                coutTotalEur = null;
            }
        }
        
        if (!"USD".equals(currency)) {
            try {
                coutTotalUsd = exchangeRateService.convert(coutTotal, currency, "USD").getConvertedAmount();
            } catch (Exception e) {
                coutTotalUsd = null;
            }
        }
        
        return LandedCostResultDto.builder()
            .codeHs(tarif.getCodeHs())
            .nomProduit(tarif.getNomProduit())
            .paysDestination(tarif.getPaysDestination())
            .valeurFob(request.getValeurFob())
            .coutTransport(request.getCoutTransport())
            .assurance(request.getAssurance())
            .valeurCaf(valeurCaf)
            .tauxDouane(tarif.getTauxDouane())
            .montantDouane(montantDouane)
            .tauxTva(tarif.getTauxTva())
            .montantTva(montantTva)
            .taxeParafiscale(tarif.getTaxeParafiscale())
            .montantTaxeParafiscale(montantTaxeParafiscale)
            .nomPort(nomPort)
            .fraisPortuaires(fraisPortuaires)
            .coutTotal(coutTotal)
            .coutEstime(coutEstime)
            .varianceCout(varianceCout)
            .variancePercentage(variancePercentage)
            .currency(currency)
            .coutTotalEur(coutTotalEur)
            .coutTotalUsd(coutTotalUsd)
            .disclaimer("Estimation non contractuelle. Les taux peuvent varier.")
            .exchangeRateSource("ExchangeRate-API")
            .calculationDate(LocalDateTime.now())
            .build();
    }
    
    public AlerteSeuilDto verifierSeuilEps(String codeHs, BigDecimal valeurSaisie) {
        String normalizedCodeHs = HsCodeUtil.normalize(codeHs);
        
        TarifDouanier tarif = tarifRepository.findByCodeHsAndPaysDestination(normalizedCodeHs, "France")
            .orElse(null);
        
        if (tarif == null) {
            return AlerteSeuilDto.builder()
                .codeHs(codeHs)
                .valeurSaisie(valeurSaisie)
                .alerteActive(false)
                .message("Aucune donnée de référence disponible")
                .build();
        }
        
        SivPrice sivPrice = sivPriceRepository.findByCodeHsAndRegion(normalizedCodeHs, "EU")
            .orElse(null);
        
        BigDecimal prixSivMin;
        BigDecimal prixSivMax;
        
        if (sivPrice != null) {
            prixSivMin = sivPrice.getMinEntryPrice();
            prixSivMax = sivPrice.getMinEntryPrice().multiply(BigDecimal.valueOf(5));
        } else {
            prixSivMin = BigDecimal.valueOf(100);
            prixSivMax = BigDecimal.valueOf(500);
        }
        
        boolean alerteActive = valeurSaisie.compareTo(prixSivMin) < 0;
        String typeAlerte = alerteActive ? "DUMPING_SUSPECT" : "NORMAL";
        String message = alerteActive 
            ? "⚠️ ALERTE: Prix inférieur au seuil SIV. Risque de taxe compensatoire."
            : "✓ Prix conforme aux prix d'entrée du marché européen";
        
        BigDecimal tauxCompensatoire = alerteActive 
            ? BigDecimal.valueOf(15.00)
            : BigDecimal.ZERO;
        
        return AlerteSeuilDto.builder()
            .codeHs(codeHs)
            .nomProduit(tarif.getNomProduit())
            .valeurSaisie(valeurSaisie)
            .prixEntreeSivMin(prixSivMin)
            .prixEntreeSivMax(prixSivMax)
            .alerteActive(alerteActive)
            .typeAlerte(typeAlerte)
            .message(message)
            .tauxCompensatoire(tauxCompensatoire)
            .build();
    }
    
    public RisqueChangeDto calculerRisqueChange(
            String deviseSource, 
            String deviseCible, 
            BigDecimal tauxActuel, 
            BigDecimal montantInitial) {
        
        BigDecimal variationUnPourcent = tauxActuel
            .multiply(BigDecimal.valueOf(0.01));
        
        BigDecimal sensibilite = montantInitial
            .multiply(variationUnPourcent)
            .divide(tauxActuel, 2, RoundingMode.HALF_UP);
        
        BigDecimal impactMarge = sensibilite
            .multiply(BigDecimal.valueOf(100))
            .divide(montantInitial, 2, RoundingMode.HALF_UP);
        
        String indicateur;
        String recommandation;
        
        if (impactMarge.abs().compareTo(BigDecimal.valueOf(2)) > 0) {
            indicateur = "ÉLEVÉ";
            recommandation = "Envisager une couverture de change (forward/option)";
        } else if (impactMarge.abs().compareTo(BigDecimal.valueOf(1)) > 0) {
            indicateur = "MODÉRÉ";
            recommandation = "Surveiller l'évolution du taux de change";
        } else {
            indicateur = "FAIBLE";
            recommandation = "Risque acceptable, pas d'action immédiate requise";
        }
        
        return RisqueChangeDto.builder()
            .deviseSource(deviseSource)
            .deviseCible(deviseCible)
            .tauxActuel(tauxActuel)
            .montantInitial(montantInitial)
            .sensibilite1Pourcent(sensibilite)
            .impactMarge1Pourcent(impactMarge)
            .indicateurRisque(indicateur)
            .recommandation(recommandation)
            .sourceData("ExchangeRate-API (estimation)")
            .build();
    }
}
