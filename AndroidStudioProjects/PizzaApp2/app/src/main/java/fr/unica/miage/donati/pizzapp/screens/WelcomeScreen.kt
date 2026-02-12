package fr.unica.miage.donati.pizzapp.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun WelcomeScreen(
    onGoMenu: () -> Unit,
    onGoCart: () -> Unit,
    onGoHistory: () -> Unit
) {
    Column(
        modifier = Modifier.fillMaxSize().padding(20.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("PizzApp", style = MaterialTheme.typography.headlineLarge)
        Spacer(Modifier.height(10.dp))
        Text("Bienvenue 👋", style = MaterialTheme.typography.titleMedium)
        Spacer(Modifier.height(24.dp))

        Button(onClick = onGoMenu, modifier = Modifier.fillMaxWidth()) {
            Text("Voir le menu")
        }
        Spacer(Modifier.height(10.dp))
        Button(onClick = onGoCart, modifier = Modifier.fillMaxWidth()) {
            Text("Voir la commande")
        }
        Spacer(Modifier.height(10.dp))
        OutlinedButton(onClick = onGoHistory, modifier = Modifier.fillMaxWidth()) {
            Text("Historique commandes")
        }
    }
}
