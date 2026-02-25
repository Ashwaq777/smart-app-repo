-- Add more fruits and vegetables products
-- This migration adds comprehensive list of international fruits and vegetables

-- LÉGUMES (Vegetables)

-- Oignons
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0703.10', 'Oignons', 'Légumes', 'France', 9.60, 20.00),
    ('0703.10', 'Oignons', 'Légumes', 'Maroc', 2.40, 20.00),
    ('0703.10', 'Oignons', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Courgettes
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0709.90', 'Courgettes', 'Légumes', 'France', 11.20, 20.00),
    ('0709.90', 'Courgettes', 'Légumes', 'Maroc', 2.80, 20.00),
    ('0709.90', 'Courgettes', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Poivrons
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0709.60', 'Poivrons', 'Légumes', 'France', 10.40, 20.00),
    ('0709.60', 'Poivrons', 'Légumes', 'Maroc', 2.60, 20.00),
    ('0709.60', 'Poivrons', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Aubergines
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0709.30', 'Aubergines', 'Légumes', 'France', 10.40, 20.00),
    ('0709.30', 'Aubergines', 'Légumes', 'Maroc', 2.60, 20.00),
    ('0709.30', 'Aubergines', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Concombres
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0707.00', 'Concombres', 'Légumes', 'France', 12.80, 20.00),
    ('0707.00', 'Concombres', 'Légumes', 'Maroc', 3.20, 20.00),
    ('0707.00', 'Concombres', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Brocoli
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0704.90', 'Brocoli', 'Légumes', 'France', 10.40, 20.00),
    ('0704.90', 'Brocoli', 'Légumes', 'Maroc', 2.60, 20.00),
    ('0704.90', 'Brocoli', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Choux
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0704.10', 'Choux', 'Légumes', 'France', 10.40, 20.00),
    ('0704.10', 'Choux', 'Légumes', 'Maroc', 2.60, 20.00),
    ('0704.10', 'Choux', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Laitue
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0705.11', 'Laitue', 'Légumes', 'France', 10.40, 20.00),
    ('0705.11', 'Laitue', 'Légumes', 'Maroc', 2.60, 20.00),
    ('0705.11', 'Laitue', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Épinards
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0709.70', 'Épinards', 'Légumes', 'France', 10.40, 20.00),
    ('0709.70', 'Épinards', 'Légumes', 'Maroc', 2.60, 20.00),
    ('0709.70', 'Épinards', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Haricots verts
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0708.20', 'Haricots verts', 'Légumes', 'France', 11.20, 20.00),
    ('0708.20', 'Haricots verts', 'Légumes', 'Maroc', 2.80, 20.00),
    ('0708.20', 'Haricots verts', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Petits pois
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0708.10', 'Petits pois', 'Légumes', 'France', 11.20, 20.00),
    ('0708.10', 'Petits pois', 'Légumes', 'Maroc', 2.80, 20.00),
    ('0708.10', 'Petits pois', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Maïs
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0709.99', 'Maïs', 'Légumes', 'France', 9.40, 20.00),
    ('0709.99', 'Maïs', 'Légumes', 'Maroc', 2.35, 20.00),
    ('0709.99', 'Maïs', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Artichauts
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0709.10', 'Artichauts', 'Légumes', 'France', 10.40, 20.00),
    ('0709.10', 'Artichauts', 'Légumes', 'Maroc', 2.60, 20.00),
    ('0709.10', 'Artichauts', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Céleri
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0709.40', 'Céleri', 'Légumes', 'France', 10.40, 20.00),
    ('0709.40', 'Céleri', 'Légumes', 'Maroc', 2.60, 20.00),
    ('0709.40', 'Céleri', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Betteraves
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0706.90', 'Betteraves', 'Légumes', 'France', 13.60, 20.00),
    ('0706.90', 'Betteraves', 'Légumes', 'Maroc', 3.40, 20.00),
    ('0706.90', 'Betteraves', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Ail
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0703.20', 'Ail', 'Légumes', 'France', 9.60, 20.00),
    ('0703.20', 'Ail', 'Légumes', 'Maroc', 2.40, 20.00),
    ('0703.20', 'Ail', 'Légumes', 'États-Unis', 0.00, 0.00);

-- Gingembre
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0910.11', 'Gingembre', 'Légumes', 'France', 0.00, 20.00),
    ('0910.11', 'Gingembre', 'Légumes', 'Maroc', 0.00, 20.00),
    ('0910.11', 'Gingembre', 'Légumes', 'États-Unis', 0.00, 0.00);

-- FRUITS

-- Pommes
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0808.10', 'Pommes', 'Fruits', 'France', 10.40, 20.00),
    ('0808.10', 'Pommes', 'Fruits', 'Maroc', 2.60, 20.00),
    ('0808.10', 'Pommes', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Mandarines
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0805.20', 'Mandarines', 'Fruits', 'France', 12.80, 20.00),
    ('0805.20', 'Mandarines', 'Fruits', 'Maroc', 3.20, 20.00),
    ('0805.20', 'Mandarines', 'Fruits', 'États-Unis', 1.90, 0.00);

-- Citrons
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0805.50', 'Citrons', 'Fruits', 'France', 12.80, 20.00),
    ('0805.50', 'Citrons', 'Fruits', 'Maroc', 3.20, 20.00),
    ('0805.50', 'Citrons', 'Fruits', 'États-Unis', 1.90, 0.00);

-- Mangues
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0804.50', 'Mangues', 'Fruits', 'France', 4.00, 20.00),
    ('0804.50', 'Mangues', 'Fruits', 'Maroc', 1.00, 20.00),
    ('0804.50', 'Mangues', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Ananas
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0804.30', 'Ananas', 'Fruits', 'France', 4.00, 20.00),
    ('0804.30', 'Ananas', 'Fruits', 'Maroc', 1.00, 20.00),
    ('0804.30', 'Ananas', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Fraises
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0810.10', 'Fraises', 'Fruits', 'France', 11.20, 20.00),
    ('0810.10', 'Fraises', 'Fruits', 'Maroc', 2.80, 20.00),
    ('0810.10', 'Fraises', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Framboises
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0810.20', 'Framboises', 'Fruits', 'France', 11.20, 20.00),
    ('0810.20', 'Framboises', 'Fruits', 'Maroc', 2.80, 20.00),
    ('0810.20', 'Framboises', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Myrtilles
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0810.40', 'Myrtilles', 'Fruits', 'France', 11.20, 20.00),
    ('0810.40', 'Myrtilles', 'Fruits', 'Maroc', 2.80, 20.00),
    ('0810.40', 'Myrtilles', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Raisins
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0806.10', 'Raisins', 'Fruits', 'France', 10.40, 20.00),
    ('0806.10', 'Raisins', 'Fruits', 'Maroc', 2.60, 20.00),
    ('0806.10', 'Raisins', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Pastèques
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0807.11', 'Pastèques', 'Fruits', 'France', 8.80, 20.00),
    ('0807.11', 'Pastèques', 'Fruits', 'Maroc', 2.20, 20.00),
    ('0807.11', 'Pastèques', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Melons
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0807.19', 'Melons', 'Fruits', 'France', 8.80, 20.00),
    ('0807.19', 'Melons', 'Fruits', 'Maroc', 2.20, 20.00),
    ('0807.19', 'Melons', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Pêches
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0809.30', 'Pêches', 'Fruits', 'France', 12.00, 20.00),
    ('0809.30', 'Pêches', 'Fruits', 'Maroc', 3.00, 20.00),
    ('0809.30', 'Pêches', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Abricots
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0809.10', 'Abricots', 'Fruits', 'France', 12.00, 20.00),
    ('0809.10', 'Abricots', 'Fruits', 'Maroc', 3.00, 20.00),
    ('0809.10', 'Abricots', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Kiwis
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0810.50', 'Kiwis', 'Fruits', 'France', 8.80, 20.00),
    ('0810.50', 'Kiwis', 'Fruits', 'Maroc', 2.20, 20.00),
    ('0810.50', 'Kiwis', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Avocats
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0804.40', 'Avocats', 'Fruits', 'France', 4.00, 20.00),
    ('0804.40', 'Avocats', 'Fruits', 'Maroc', 1.00, 20.00),
    ('0804.40', 'Avocats', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Grenades
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0810.90', 'Grenades', 'Fruits', 'France', 11.20, 20.00),
    ('0810.90', 'Grenades', 'Fruits', 'Maroc', 2.80, 20.00),
    ('0810.90', 'Grenades', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Figues
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0804.20', 'Figues', 'Fruits', 'France', 4.00, 20.00),
    ('0804.20', 'Figues', 'Fruits', 'Maroc', 1.00, 20.00),
    ('0804.20', 'Figues', 'Fruits', 'États-Unis', 0.00, 0.00);

-- Papayes
INSERT INTO tarifs_douaniers (code_hs, nom_produit, categorie, pays_destination, taux_douane, taux_tva) VALUES 
    ('0807.20', 'Papayes', 'Fruits', 'France', 0.00, 20.00),
    ('0807.20', 'Papayes', 'Fruits', 'Maroc', 0.00, 20.00),
    ('0807.20', 'Papayes', 'Fruits', 'États-Unis', 0.00, 0.00);
