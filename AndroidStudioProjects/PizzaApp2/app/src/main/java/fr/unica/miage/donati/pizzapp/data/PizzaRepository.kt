package fr.unica.miage.donati.pizzapp.data

import fr.unica.miage.donati.pizzapp.R
import fr.unica.miage.donati.pizzapp.model.Pizza

class PizzaRepository {
    fun loadPizzas(): List<Pizza> = listOf(
        Pizza(0, "Margherita", 8.0,  R.drawable.pizza1, listOf("Tomate", "Mozzarella", "Basilic")),
        Pizza(1, "Capricciosa", 10.0, R.drawable.pizza2, listOf("Tomate", "Mozzarella", "Jambon", "Champignons")),
        Pizza(2, "Diavola", 9.0,      R.drawable.pizza3, listOf("Tomate", "Mozzarella", "Spianata", "Piment")),
        Pizza(3, "Quattro Stagioni", 11.0, R.drawable.pizza4, listOf("Artichaut", "Jambon", "Olives", "Champignons")),
        Pizza(4, "Quattro Formaggi", 12.0, R.drawable.pizza5, listOf("Mozzarella", "Gorgonzola", "Parmesan", "Chèvre"))
    )

    fun getPizzaById(id: Int): Pizza? = loadPizzas().firstOrNull { it.id == id }
}
