package fr.unica.miage.donati.pizzapp.screens

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import fr.unica.miage.donati.pizzapp.data.db.OrderEntity
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun HistoryScreen(orders: List<OrderEntity>) {
    Column(Modifier.fillMaxSize().padding(16.dp)) {
        Text("Historique", style = MaterialTheme.typography.headlineSmall)
        Spacer(Modifier.height(10.dp))

        if (orders.isEmpty()) {
            Text("Aucune commande enregistrée.")
        } else {
            LazyColumn {
                items(orders) { o ->
                    val date = SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault())
                        .format(Date(o.createdAt))
                    Card(Modifier.fillMaxWidth().padding(vertical = 6.dp)) {
                        Column(Modifier.padding(12.dp)) {
                            Text("Commande #${o.id} - $date", style = MaterialTheme.typography.titleMedium)
                            Text("Total: ${"%.2f".format(o.total)}€")
                            Spacer(Modifier.height(6.dp))
                            Text("Détails (JSON):")
                            Text(o.itemsJson, style = MaterialTheme.typography.bodySmall)
                        }
                    }
                }
            }
        }
    }
}
