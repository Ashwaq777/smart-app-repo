package fr.unica.miage.donati.pizzapp.data.db

import androidx.room.TypeConverter
import fr.unica.miage.donati.pizzapp.model.CartItem
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

class Converters {

    private val json = Json { ignoreUnknownKeys = true }

    @TypeConverter
    fun fromCartItemList(value: List<CartItem>): String =
        json.encodeToString(value)

    @TypeConverter
    fun toCartItemList(value: String): List<CartItem> =
        json.decodeFromString(value)
}
