package fr.unica.miage.donati.pizzapp.nav

import kotlinx.serialization.Serializable

@Serializable object WelcomeRoute
@Serializable object MenuRoute
@Serializable data class PizzaRoute(val pizzaId: Int)
@Serializable object CartRoute
@Serializable object HistoryRoute
