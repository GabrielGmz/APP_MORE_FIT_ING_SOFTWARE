// src/services/sqliteService.js
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite'

const sqlite = new SQLiteConnection(CapacitorSQLite)

export async function initDb() {
  const db = await sqlite.createConnection('mydb', false, 'no-encryption', 1)
  await db.open()

  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      email TEXT
    )
  `)

  return db
}

export async function insertarUsuario(nombre, email) {
  const db = await initDb()
  await db.run('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email])
  await db.close()
}
