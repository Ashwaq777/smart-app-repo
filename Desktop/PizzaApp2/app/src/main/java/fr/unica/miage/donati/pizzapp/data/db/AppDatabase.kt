package fr.unica.miage.donati.pizzapp.data.db

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters   // ✅ ajout

@Database(
    entities = [OrderEntity::class],
    version = 1,
    exportSchema = false
)
@TypeConverters(Converters::class)   // ✅ ajout
abstract class AppDatabase : RoomDatabase() {
    abstract fun orderDao(): OrderDao

    companion object {
        @Volatile private var INSTANCE: AppDatabase? = null

        fun get(context: Context): AppDatabase =
            INSTANCE ?: synchronized(this) {
                INSTANCE ?: Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "pizzapp.db"
                ).build().also { INSTANCE = it }
            }
    }
}
