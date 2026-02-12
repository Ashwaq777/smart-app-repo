package fr.unica.miage.donati.pizzapp.model

import kotlinx.serialization.Serializable

@Serializable
data class CartItem(
    val pizza: Pizza,
    val extraCheese: Int,  // 0..100
    val quantity: Int
) {
    fun lineTotal(): Double = quantity * pizza.price
}
