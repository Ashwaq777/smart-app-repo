package fr.unica.miage.donati.pizzapp.model

data class Order(
    val items: List<CartItem>,
    val total: Double
)
