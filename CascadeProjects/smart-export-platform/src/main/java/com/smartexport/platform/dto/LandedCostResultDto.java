package com.smartexport.platform.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LandedCostResultDto {
    
    private String codeHs;
    private String nomProduit;
    private String paysDestination;
    
    private BigDecimal valeurFob;
    private BigDecimal coutTransport;
    private BigDecimal assurance;
    private BigDecimal valeurCaf;
    
    private BigDecimal tauxDouane;
    private BigDecimal montantDouane;
    
    private BigDecimal tauxTva;
    private BigDecimal montantTva;
    
    private BigDecimal taxeParafiscale;
    private BigDecimal montantTaxeParafiscale;
    
    private String nomPort;
    private BigDecimal fraisPortuaires;
    
    private BigDecimal coutTotal;
    
    private BigDecimal coutEstime;
    private BigDecimal varianceCout;
    private String variancePercentage;
    
    private String currency;
    private BigDecimal coutTotalEur;
    private BigDecimal coutTotalUsd;
    
    private String disclaimer;
    private String exchangeRateSource;
    private LocalDateTime calculationDate;
}
