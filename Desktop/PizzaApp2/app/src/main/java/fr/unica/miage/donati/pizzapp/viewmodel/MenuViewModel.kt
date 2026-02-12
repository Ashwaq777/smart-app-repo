package fr.unica.miage.donati.pizzapp.viewmodel

import androidx.lifecycle.ViewModel
import fr.unica.miage.donati.pizzapp.data.PizzaRepository
import fr.unica.miage.donati.pizzapp.model.Pizza
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class MenuViewModel(
    private val repo: PizzaRepository = PizzaRepository()
) : ViewModel() {

    private val _pizzas = MutableStateFlow(repo.loadPizzas())
    val pizzas: StateFlow<List<Pizza>> = _pizzas

    fun getPizzaById(id: Int): Pizza? = repo.getPizzaById(id)
}
