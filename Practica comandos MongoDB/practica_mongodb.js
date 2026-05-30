// ============================================================
// PRÁCTICA: MongoDB con la base de datos
// Módulo III - Bases de Datos No Relacionales
// Universidad Dr. Andrés Bello (UNAB)
// Grupo G1:
//   - Alejandro de Jesús Linares Marroquín
//   - Nathalie Jeannette Sibrian Pérez
//   - Miguel Daniel Reyes Martínez
//   - Vladimir Natanael Villalobos Vega
// Fecha: 16 de mayo de 2026
// ============================================================


// ============================================================
// PASO 1: Creación de la base de datos y colección
// ============================================================

use usuarioUNAB

db.clientes.insertMany([
  { nombre: "Ana",    ciudad: "Lima",   edad: 28, correo: "ana@gmail.com" },
  { nombre: "Carlos", ciudad: "Bogotá", edad: 34, correo: "carlos@yahoo.com" },
  { nombre: "María",  ciudad: "Lima",   edad: 22, correo: "maria@hotmail.com" },
  { nombre: "José",   ciudad: "Quito",  edad: 40, correo: "jose@gmail.com" },
  { nombre: "Lucía",  ciudad: "Bogotá", edad: 19, correo: "lucia@outlook.com" },
  { nombre: "Pedro",  ciudad: "Lima",   edad: 35, correo: "pedro@gmail.com" }
])


// ============================================================
// PASO 2: Consultas básicas y filtros
// ============================================================

// 2.1 Listar todos los documentos
db.clientes.find()

// 2.2 Clientes de Lima
db.clientes.find({ ciudad: "Lima" })

// 2.3 Clientes mayores de 30 años
db.clientes.find({ edad: { $gt: 30 } })

// 2.4 Clientes con edad menor o igual a 22
db.clientes.find({ edad: { $lte: 22 } })

// 2.5 Clientes cuya ciudad NO sea Bogotá
db.clientes.find({ ciudad: { $ne: "Bogotá" } })

// 2.6 Clientes de Lima con edad mayor a 25
db.clientes.find({ ciudad: "Lima", edad: { $gt: 25 } })


// ============================================================
// PARTE 3: Operadores lógicos
// ============================================================

// 3.1 Clientes que están en Lima o Bogotá
db.clientes.find({ ciudad: { $in: ["Lima", "Bogotá"] } })

// 3.2 Clientes que NO estén en Lima ni en Quito
db.clientes.find({ ciudad: { $nin: ["Lima", "Quito"] } })

// 3.3 Clientes menores de 20 años O de la ciudad Quito
db.clientes.find({ $or: [ { edad: { $lt: 20 } }, { ciudad: "Quito" } ] })


// ============================================================
// PARTE 4: Proyección de campos
// ============================================================

// 4.1 Mostrar solo nombre y ciudad (sin _id)
db.clientes.find({}, { nombre: 1, ciudad: 1, _id: 0 })

// 4.2 Mostrar todos los campos excepto correo
db.clientes.find({}, { correo: 0 })


// ============================================================
// PARTE 5: Ordenamiento y límites
// ============================================================

// 5.1 Ordenar por edad ascendente
db.clientes.find().sort({ edad: 1 })

// 5.2 Ordenar por edad descendente
db.clientes.find().sort({ edad: -1 })

// 5.3 Limitar a los primeros 3 documentos
db.clientes.find().limit(3)

// 5.4 Saltar los primeros 2 documentos
db.clientes.find().skip(2)


// ============================================================
// PARTE 6: Índices
// ============================================================

// 6.1 Índice simple sobre ciudad
db.clientes.createIndex({ ciudad: 1 })

// 6.2 Índice compuesto sobre ciudad (asc) y edad (desc)
db.clientes.createIndex({ ciudad: 1, edad: -1 })

// 6.3 Índice único sobre correo
db.clientes.createIndex({ correo: 1 }, { unique: true })


// ============================================================
// PARTE 7: Análisis de rendimiento con .explain()
// ============================================================

// 7.1 ANTES de crear el índice (COLLSCAN - escaneo completo)
db.clientes.find({ nombre: "Pedro" }).explain("executionStats")

// 7.2 Crear índice sobre nombre
db.clientes.createIndex({ nombre: 1 })

// 7.3 DESPUÉS de crear el índice (IXSCAN - escaneo por índice)
db.clientes.find({ nombre: "Pedro" }).explain("executionStats")


// ============================================================
// PARTE 8: Eliminación de índices
// ============================================================

// 8.1 Listar todos los índices
db.clientes.getIndexes()

// 8.2 Eliminar el índice nombre_1
db.clientes.dropIndex("nombre_1")


// ============================================================
// PARTE 9: Validación de integridad (índice único)
// ============================================================

// 9.1 Intentar insertar un correo duplicado (debe fallar con E11000)
db.clientes.insertOne({
  nombre: "Otro",
  ciudad: "Cali",
  edad: 30,
  correo: "pedro@gmail.com"   // correo ya existente => error de clave duplicada
})

// ============================================================
// FIN DE LA PRÁCTICA
// ============================================================
