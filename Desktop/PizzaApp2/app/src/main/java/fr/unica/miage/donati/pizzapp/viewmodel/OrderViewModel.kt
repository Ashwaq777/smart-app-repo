package fr.unica.miage.donati.pizzapp.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import fr.unica.miage.donati.pizzapp.data.db.AppDatabase
import fr.unica.miage.donati.pizzapp.data.db.OrderEntity
import fr.unica.miage.donati.pizzapp.model.CartItem
import fr.unica.miage.donati.pizzapp.model.Pizza
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

class OrderViewModel(app: Application) : AndroidViewModel(app) {

    private val dao = AppDatabase.get(app).orderDao()

    private val _cart = MutableStateFlow<List<CartItem>>(emptyList())
    val cart: StateFlow<List<CartItem>> = _cart.asStateFlow()

    val total: StateFlow<Double> = cart
        .map { items -> items.sumOf { it.lineTotal() } }
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), 0.0)

    val history = dao.observeAll()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    fun addToCart(pizza: Pizza, extraCheese: Int) {
        val current = _cart.value.toMutableList()
        val idx = current.indexOfFirst { it.pizza.id == pizza.id && it.extraCheese == extraCheese }
        if (idx >= 0) {
            val item = current[idx]
            current[idx] = item.copy(quantity = item.quantity + 1)
        } else {
            current.add(CartItem(pizza, extraCheese, 1))
        }
        _cart.value = current
    }

    fun increase(item: CartItem) {
        _cart.value = _cart.value.map {
            if (it == item) it.copy(quantity = it.quantity + 1) else it
        }
    }

    fun decrease(item: CartItem) {
        _cart.value = _cart.value
            .map {
                if (it == item) it.copy(quantity = it.quantity - 1) else it
            }
            .filter { it.quantity > 0 }
    }

    fun clearCart() { _cart.value = emptyList() }

    fun checkoutAndSave() {
        val items = _cart.value
        if (items.isEmpty()) return

        viewModelScope.launch {
            val json = Json.encodeToString(items.map {
                mapOf(
                    "pizzaId" to it.pizza.id,
                    "name" to it.pizza.name,
                    "price" to it.pizza.price,
                    "extraCheese" to it.extraCheese,
                    "quantity" to it.quantity
                )
            })

            dao.insert(
                OrderEntity(
                    createdAt = System.currentTimeMillis(),
                    itemsJson = json,
                    total = items.sumOf { it.lineTotal() }
                )
            )
            clearCart()
        }
    }
}
