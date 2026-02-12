package fr.unica.miage.donati.pizzapp.screens

import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import fr.unica.miage.donati.pizzapp.model.Pizza
import fr.unica.miage.donati.pizzapp.ui.components.PizzaCard

@Composable
fun MenuScreen(
    pizzas: List<Pizza>,
    modifier: Modifier = Modifier,
    onClickPizza: (Pizza) -> Unit
) {
    LazyColumn(modifier = modifier) {
        items(pizzas) { pizza ->
            PizzaCard(pizza = pizza, onClickPizza = { onClickPizza(pizza) })
        }
    }
}
