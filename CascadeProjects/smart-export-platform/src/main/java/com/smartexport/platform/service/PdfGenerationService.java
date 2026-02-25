package com.smartexport.platform.service;

import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.smartexport.platform.dto.LandedCostResultDto;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

@Service
public class PdfGenerationService {
    
    private static final DeviceRgb HEADER_COLOR = new DeviceRgb(41, 128, 185);
    private static final DeviceRgb LIGHT_GRAY = new DeviceRgb(240, 240, 240);
    
    public byte[] generateLandedCostPdf(LandedCostResultDto result) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        
        try {
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc);
            
            addHeader(document);
            addProductInfo(document, result);
            addCostBreakdown(document, result);
            addCurrencyConversions(document, result);
            addFooter(document, result);
            
            document.close();
            
            return baos.toByteArray();
            
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la génération du PDF: " + e.getMessage(), e);
        }
    }
    
    private void addHeader(Document document) {
        Paragraph title = new Paragraph("Smart Export Global")
            .setFontSize(24)
            .setBold()
            .setFontColor(HEADER_COLOR)
            .setTextAlignment(TextAlignment.CENTER)
            .setMarginBottom(5);
        
        Paragraph subtitle = new Paragraph("Calcul des Coûts d'Importation (Landed Cost)")
            .setFontSize(14)
            .setTextAlignment(TextAlignment.CENTER)
            .setMarginBottom(20);
        
        document.add(title);
        document.add(subtitle);
    }
    
    private void addProductInfo(Document document, LandedCostResultDto result) {
        Paragraph sectionTitle = new Paragraph("Informations Produit")
            .setFontSize(14)
            .setBold()
            .setMarginBottom(10);
        document.add(sectionTitle);
        
        Table table = new Table(UnitValue.createPercentArray(new float[]{1, 2}))
            .setWidth(UnitValue.createPercentValue(100))
            .setMarginBottom(20);
        
        addInfoRow(table, "Code HS", result.getCodeHs());
        addInfoRow(table, "Produit", result.getNomProduit());
        addInfoRow(table, "Pays de destination", result.getPaysDestination());
        if (result.getNomPort() != null) {
            addInfoRow(table, "Port", result.getNomPort());
        }
        addInfoRow(table, "Devise", result.getCurrency() != null ? result.getCurrency() : "EUR");
        
        document.add(table);
    }
    
    private void addCostBreakdown(Document document, LandedCostResultDto result) {
        Paragraph sectionTitle = new Paragraph("Détail des Coûts")
            .setFontSize(14)
            .setBold()
            .setMarginBottom(10);
        document.add(sectionTitle);
        
        Table table = new Table(UnitValue.createPercentArray(new float[]{3, 2}))
            .setWidth(UnitValue.createPercentValue(100))
            .setMarginBottom(20);
        
        table.addHeaderCell(createHeaderCell("Description"));
        table.addHeaderCell(createHeaderCell("Montant"));
        
        String currency = result.getCurrency() != null ? result.getCurrency() : "EUR";
        
        addCostRow(table, "Valeur FOB", result.getValeurFob(), currency);
        addCostRow(table, "Coût Transport", result.getCoutTransport(), currency);
        addCostRow(table, "Assurance", result.getAssurance(), currency);
        addCostRow(table, "Valeur CAF (CIF)", result.getValeurCaf(), currency, true);
        
        addCostRow(table, "Droits de Douane (" + result.getTauxDouane() + "%)", 
                   result.getMontantDouane(), currency);
        addCostRow(table, "TVA (" + result.getTauxTva() + "%)", 
                   result.getMontantTva(), currency);
        
        if (result.getTaxeParafiscale() != null && 
            result.getTaxeParafiscale().compareTo(BigDecimal.ZERO) > 0) {
            addCostRow(table, "Taxe Parafiscale (" + result.getTaxeParafiscale() + "%)", 
                       result.getMontantTaxeParafiscale(), currency);
        }
        
        if (result.getFraisPortuaires() != null && 
            result.getFraisPortuaires().compareTo(BigDecimal.ZERO) > 0) {
            addCostRow(table, "Frais Portuaires", result.getFraisPortuaires(), currency);
        }
        
        addCostRow(table, "COÛT TOTAL (Landed Cost)", result.getCoutTotal(), currency, true);
        
        document.add(table);
    }
    
    private void addCurrencyConversions(Document document, LandedCostResultDto result) {
        if (result.getCoutTotalEur() != null || result.getCoutTotalUsd() != null) {
            Paragraph sectionTitle = new Paragraph("Conversions de Devises")
                .setFontSize(14)
                .setBold()
                .setMarginBottom(10);
            document.add(sectionTitle);
            
            Table table = new Table(UnitValue.createPercentArray(new float[]{1, 1}))
                .setWidth(UnitValue.createPercentValue(100))
                .setMarginBottom(20);
            
            if (result.getCoutTotalEur() != null) {
                addInfoRow(table, "Coût Total (EUR)", 
                          String.format("%.2f EUR", result.getCoutTotalEur()));
            }
            
            if (result.getCoutTotalUsd() != null) {
                addInfoRow(table, "Coût Total (USD)", 
                          String.format("%.2f USD", result.getCoutTotalUsd()));
            }
            
            document.add(table);
        }
    }
    
    private void addFooter(Document document, LandedCostResultDto result) {
        Paragraph disclaimer = new Paragraph("Disclaimer")
            .setFontSize(12)
            .setBold()
            .setMarginTop(10)
            .setMarginBottom(5);
        document.add(disclaimer);
        
        Paragraph disclaimerText = new Paragraph(result.getDisclaimer())
            .setFontSize(9)
            .setItalic()
            .setMarginBottom(10);
        document.add(disclaimerText);
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        String formattedDate = result.getCalculationDate().format(formatter);
        
        Paragraph footer = new Paragraph(
            "Date de génération: " + formattedDate + "\n" +
            "Source des taux de change: " + result.getExchangeRateSource()
        )
            .setFontSize(8)
            .setTextAlignment(TextAlignment.CENTER)
            .setFontColor(ColorConstants.GRAY);
        
        document.add(footer);
    }
    
    private void addInfoRow(Table table, String label, String value) {
        table.addCell(new Cell().add(new Paragraph(label).setBold())
            .setBackgroundColor(LIGHT_GRAY));
        table.addCell(new Cell().add(new Paragraph(value != null ? value : "N/A")));
    }
    
    private void addCostRow(Table table, String description, BigDecimal amount, 
                           String currency) {
        addCostRow(table, description, amount, currency, false);
    }
    
    private void addCostRow(Table table, String description, BigDecimal amount, 
                           String currency, boolean bold) {
        Paragraph descPara = new Paragraph(description);
        Paragraph amountPara = new Paragraph(
            String.format("%.2f %s", amount, currency)
        ).setTextAlignment(TextAlignment.RIGHT);
        
        if (bold) {
            descPara.setBold();
            amountPara.setBold();
        }
        
        table.addCell(new Cell().add(descPara));
        table.addCell(new Cell().add(amountPara));
    }
    
    private Cell createHeaderCell(String text) {
        return new Cell()
            .add(new Paragraph(text).setBold().setFontColor(ColorConstants.WHITE))
            .setBackgroundColor(HEADER_COLOR)
            .setTextAlignment(TextAlignment.CENTER);
    }
}
