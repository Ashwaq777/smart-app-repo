package fr.unica.miage.donati.pizzapp.screens

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.dp
import fr.unica.miage.donati.pizzapp.model.Pizza

@Composable
fun PizzaDetailScreen(
    pizza: Pizza,
    onAddToCart: (Pizza, Int) -> Unit
) {
    var extraCheese by remember { mutableFloatStateOf(0f) }

    Column(
        modifier = Modifier.fillMaxSize().padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Image(
            painter = painterResource(pizza.imageRes),
            contentDescription = pizza.name,
            modifier = Modifier.size(220.dp)
        )

        Spacer(Modifier.height(12.dp))
        Text(pizza.name, style = MaterialTheme.typography.headlineSmall)
        Text("Prix : ${pizza.price}€", style = MaterialTheme.typography.titleMedium)

        Spacer(Modifier.height(16.dp))
        Text("Ingrédients", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(6.dp))
        pizza.ingredients.forEach { Text("• $it") }

        Spacer(Modifier.height(20.dp))
        Text("Extra Cheese : ${extraCheese.toInt()}", style = MaterialTheme.typography.titleMedium)
        Slider(
            value = extraCheese,
            onValueChange = { extraCheese = it },
            valueRange = 0f..100f
        )

        Spacer(Modifier.height(18.dp))
        Button(
            onClick = { onAddToCart(pizza, extraCheese.toInt()) },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Ajouter au caddy")
        }
    }
}
