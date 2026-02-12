package fr.unica.miage.donati.pizzapp.ui.components

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.History
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.LocalPizza
import androidx.compose.material.icons.filled.ShoppingCart
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.text.style.TextOverflow


@Composable
@OptIn(ExperimentalMaterial3Api::class)
fun AppTopBar(
    title: String,
    canGoBack: Boolean,
    onBack: () -> Unit
) {
    TopAppBar(
        title = { Text(title, maxLines = 1, overflow = TextOverflow.Ellipsis) },
        navigationIcon = {
            if (canGoBack) {
                IconButton(onClick = onBack) {
                    Icon(Icons.Filled.Home, contentDescription = "Back")
                }
            }
        }
    )
}

@Composable
fun AppBottomBar(
    current: String,
    onNavigateWelcome: () -> Unit,
    onNavigateMenu: () -> Unit,
    onNavigateCart: () -> Unit,
    onNavigateHistory: () -> Unit
) {
    NavigationBar {
        NavigationBarItem(
            selected = current == "welcome",
            onClick = onNavigateWelcome,
            icon = { Icon(Icons.Filled.Home, null) },
            label = { Text("Accueil") }
        )
        NavigationBarItem(
            selected = current == "menu",
            onClick = onNavigateMenu,
            icon = { Icon(Icons.Filled.LocalPizza, null) },
            label = { Text("Menu") }
        )
        NavigationBarItem(
            selected = current == "cart",
            onClick = onNavigateCart,
            icon = { Icon(Icons.Filled.ShoppingCart, null) },
            label = { Text("Caddy") }
        )
        NavigationBarItem(
            selected = current == "history",
            onClick = onNavigateHistory,
            icon = { Icon(Icons.Filled.History, null) },
            label = { Text("Historique") }
        )
    }
}
