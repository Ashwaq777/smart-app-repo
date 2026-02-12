package fr.unica.miage.donati.pizzapp.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import fr.unica.miage.donati.pizzapp.model.CartItem

@Composable
fun CartScreen(
    items: List<CartItem>,
    total: Double,
    onPlus: (CartItem) -> Unit,
    onMinus: (CartItem) -> Unit,
    onCheckout: () -> Unit
) {
    Box(Modifier.fillMaxSize()) {
        Column(Modifier.fillMaxSize().padding(16.dp)) {
            Text("Votre commande", style = MaterialTheme.typography.headlineSmall)
            Spacer(Modifier.height(10.dp))

            if (items.isEmpty()) {
                Text("Le caddy est vide.")
            } else {
                LazyColumn(Modifier.weight(1f)) {
                    items(items) { item ->
                        Card(Modifier.fillMaxWidth().padding(vertical = 6.dp)) {
                            Row(
                                Modifier.fillMaxWidth().padding(12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                Column(Modifier.weight(1f)) {
                                    Text(item.pizza.name, style = MaterialTheme.typography.titleMedium)
                                    Text("Extra cheese: ${item.extraCheese}")
                                    Text("Prix: ${item.pizza.price}€")
                                }
                                Row(verticalAlignment = Alignment.CenterVertically) {
                                    OutlinedButton(onClick = { onMinus(item) }) { Text("-") }
                                    Spacer(Modifier.width(8.dp))
                                    Text("${item.quantity}", style = MaterialTheme.typography.titleMedium)
                                    Spacer(Modifier.width(8.dp))
                                    OutlinedButton(onClick = { onPlus(item) }) { Text("+") }
                                }
                            }
                        }
                    }
                }

                Spacer(Modifier.height(12.dp))
                Text("Total : ${"%.2f".format(total)}€", style = MaterialTheme.typography.headlineSmall)
            }
        }

        FloatingActionButton(
            onClick = onCheckout,
            modifier = Modifier.align(Alignment.BottomEnd).padding(16.dp),
            containerColor = MaterialTheme.colorScheme.primary
        ) {
            Icon(Icons.Filled.Check, contentDescription = "Payer / Valider")
        }
    }
}
