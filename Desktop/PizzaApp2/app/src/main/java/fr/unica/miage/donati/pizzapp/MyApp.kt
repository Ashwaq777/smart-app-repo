package fr.unica.miage.donati.pizzapp

import android.app.Application
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.*
import androidx.compose.ui.platform.LocalContext
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.*
import androidx.navigation.toRoute
import fr.unica.miage.donati.pizzapp.nav.*
import fr.unica.miage.donati.pizzapp.screens.*
import fr.unica.miage.donati.pizzapp.ui.components.*
import fr.unica.miage.donati.pizzapp.viewmodel.MenuViewModel
import fr.unica.miage.donati.pizzapp.viewmodel.OrderViewModel

@Composable
fun MyApp() {
    val navController = rememberNavController()

    val menuVM: MenuViewModel = viewModel()
    val app = (LocalContext.current.applicationContext as Application)
    val orderVM: OrderViewModel = viewModel(
        factory = ViewModelProvider.AndroidViewModelFactory.getInstance(app)
    )

    val pizzas by menuVM.pizzas.collectAsState()
    val cart by orderVM.cart.collectAsState()
    val total by orderVM.total.collectAsState()
    val history by orderVM.history.collectAsState()

    // petit helper pour l’état sélectionné de la bottom bar
    val backStack by navController.currentBackStackEntryAsState()
    val route = backStack?.destination?.route ?: ""
    val current =
        when {
            route.contains("Welcome") -> "welcome"
            route.contains("Menu") -> "menu"
            route.contains("Cart") -> "cart"
            route.contains("History") -> "history"
            route.contains("PizzaRoute") -> "menu"
            else -> "welcome"
        }

    val title =
        when (current) {
            "welcome" -> "PizzApp"
            "menu" -> "Menu"
            "cart" -> "Caddy"
            "history" -> "Historique"
            else -> "PizzApp"
        }

    Scaffold(
        topBar = {
            AppTopBar(
                title = title,
                canGoBack = navController.previousBackStackEntry != null,
                onBack = { navController.popBackStack() }
            )
        },
        bottomBar = {
            AppBottomBar(
                current = current,
                onNavigateWelcome = { navController.navigate(WelcomeRoute) { launchSingleTop = true } },
                onNavigateMenu = { navController.navigate(MenuRoute) { launchSingleTop = true } },
                onNavigateCart = { navController.navigate(CartRoute) { launchSingleTop = true } },
                onNavigateHistory = { navController.navigate(HistoryRoute) { launchSingleTop = true } }
            )
        }
    ) { padding ->
        NavHost(
            navController = navController,
            startDestination = WelcomeRoute
        ) {
            composable<WelcomeRoute> {
                WelcomeScreen(
                    onGoMenu = { navController.navigate(MenuRoute) },
                    onGoCart = { navController.navigate(CartRoute) },
                    onGoHistory = { navController.navigate(HistoryRoute) }
                )
            }

            composable<MenuRoute> {
                MenuScreen(
                    pizzas = pizzas,
                    modifier = androidx.compose.ui.Modifier.padding(padding),
                    onClickPizza = { pizza ->
                        navController.navigate(PizzaRoute(pizza.id))
                    }
                )
            }

            composable<PizzaRoute> { entry ->
                val args = entry.toRoute<PizzaRoute>()
                val pizza = menuVM.getPizzaById(args.pizzaId)
                if (pizza != null) {
                    PizzaDetailScreen(
                        pizza = pizza,
                        onAddToCart = { p, extra ->
                            orderVM.addToCart(p, extra)
                            navController.navigate(CartRoute)
                        }
                    )
                }
            }

            composable<CartRoute> {
                CartScreen(
                    items = cart,
                    total = total,
                    onPlus = { orderVM.increase(it) },
                    onMinus = { orderVM.decrease(it) },
                    onCheckout = { orderVM.checkoutAndSave() }
                )
            }

            composable<HistoryRoute> {
                HistoryScreen(orders = history)
            }
        }
    }
}
