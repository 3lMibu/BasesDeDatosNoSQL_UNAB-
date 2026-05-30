// =============================================================================
//  BASE DE DATOS DE CLIENTES — MongoDB
//  Tarea: Arreglos en MongoDB
//  Apertura: 25/05/2026  |  Cierre: 30/05/2026
// =============================================================================
//  Ejecutar con:  mongosh clientes_db clientes_mongodb.js
//                 o pegar en MongoDB Compass > Shell
// =============================================================================

// ── 0. SELECCIONAR / CREAR LA BASE DE DATOS ──────────────────────────────────
use("clientes_db");

// ── 1. LIMPIAR COLECCIÓN PREVIA (para ejecuciones repetidas) ─────────────────
db.clientes.drop();
print("✔ Colección anterior eliminada (si existía).");

// =============================================================================
//  DATOS DE REFERENCIA PARA LA GENERACIÓN ALEATORIA
// =============================================================================

const NOMBRES = [
  "Carlos","María","José","Ana","Luis","Laura","Jorge","Sofía","Roberto","Elena",
  "Pedro","Carmen","Miguel","Isabel","Francisco","Lucía","Antonio","Paula",
  "Manuel","Marta","David","Nuria","Javier","Cristina","Alejandro","Andrea",
  "Fernando","Patricia","Sergio","Sandra","Ricardo","Raquel","Rodrigo","Valeria",
  "Eduardo","Mónica","Álvaro","Daniela","Gonzalo","Claudia","Héctor","Jimena",
  "Ernesto","Beatriz","Arturo","Verónica","Ramón","Silvia","Ignacio","Gabriela"
];

const APELLIDOS = [
  "García","Rodríguez","López","Martínez","González","Pérez","Sánchez","Ramírez",
  "Torres","Flores","Herrera","Díaz","Moreno","Muñoz","Castro","Ortega","Ramos",
  "Jiménez","Vargas","Guerrero","Medina","Guzmán","Mendoza","Rojas","Aguilar",
  "Cruz","Castillo","Reyes","Morales","Ruiz","Vásquez","Ríos","Salinas","Navarro",
  "Cárdenas","Serrano","Delgado","Contreras","Mendez","Ávila","Cabrera","Iglesias",
  "Pascual","Romero","Rubio","Suárez","Molina","Blanco","Peña","Cano"
];

const DOMINIOS = [
  "gmail.com","hotmail.com","yahoo.com","outlook.com","icloud.com",
  "proton.me","live.com","me.com","aol.com","mail.com"
];

const CIUDADES = [
  {ciudad:"Ciudad de México",estado:"CDMX",cp:"06600"},
  {ciudad:"Guadalajara",estado:"Jalisco",cp:"44100"},
  {ciudad:"Monterrey",estado:"Nuevo León",cp:"64000"},
  {ciudad:"Puebla",estado:"Puebla",cp:"72000"},
  {ciudad:"Tijuana",estado:"Baja California",cp:"22000"},
  {ciudad:"León",estado:"Guanajuato",cp:"37000"},
  {ciudad:"Juárez",estado:"Chihuahua",cp:"32000"},
  {ciudad:"Zapopan",estado:"Jalisco",cp:"45100"},
  {ciudad:"Mérida",estado:"Yucatán",cp:"97000"},
  {ciudad:"San Luis Potosí",estado:"SLP",cp:"78000"},
  {ciudad:"Querétaro",estado:"Querétaro",cp:"76000"},
  {ciudad:"Hermosillo",estado:"Sonora",cp:"83000"},
  {ciudad:"Cancún",estado:"Quintana Roo",cp:"77500"},
  {ciudad:"Aguascalientes",estado:"Aguascalientes",cp:"20000"},
  {ciudad:"Morelia",estado:"Michoacán",cp:"58000"},
  {ciudad:"Veracruz",estado:"Veracruz",cp:"91700"},
  {ciudad:"Culiacán",estado:"Sinaloa",cp:"80000"},
  {ciudad:"Chihuahua",estado:"Chihuahua",cp:"31000"},
  {ciudad:"Saltillo",estado:"Coahuila",cp:"25000"},
  {ciudad:"Toluca",estado:"Estado de México",cp:"50000"}
];

const CALLES = [
  "Av. Insurgentes","Blvd. Manuel Ávila Camacho","Calle Hidalgo",
  "Av. Revolución","Calle Juárez","Av. Reforma","Calle Morelos",
  "Blvd. López Mateos","Av. Universidad","Calzada Tlalpan",
  "Calle Zaragoza","Av. Constitución","Blvd. Miguel de Cervantes",
  "Calle 5 de Mayo","Av. Lázaro Cárdenas","Calle Allende","Av. Patria",
  "Calle Rayón","Blvd. Agua Caliente","Av. Chapultepec"
];

const TIPOS_DIR = ["Casa","Departamento","Oficina","Bodega","Sucursal"];

const CATEGORIAS_PROD = [
  "Electrónica","Ropa","Calzado","Hogar","Jardín","Deportes","Libros",
  "Juguetes","Belleza","Salud","Alimentos","Mascotas","Automotriz",
  "Herramientas","Música","Cine","Videojuegos","Oficina","Viajes","Joyería"
];

const PRODUCTOS = [
  {nombre:"Smartphone Samsung Galaxy A54",   categoria:"Electrónica", precio:7499},
  {nombre:"Laptop HP Pavilion 15",            categoria:"Electrónica", precio:14999},
  {nombre:"Audífonos Sony WH-1000XM5",        categoria:"Electrónica", precio:6999},
  {nombre:"Smart TV LG 55\" 4K",              categoria:"Electrónica", precio:11499},
  {nombre:"Tablet Apple iPad 10a gen",        categoria:"Electrónica", precio:9999},
  {nombre:"Cafetera Nespresso Vertuo",        categoria:"Hogar",       precio:3299},
  {nombre:"Licuadora Vitamix A2300",          categoria:"Hogar",       precio:5499},
  {nombre:"Robot aspirador iRobot Roomba",    categoria:"Hogar",       precio:8999},
  {nombre:"Tenis Nike Air Max 270",           categoria:"Calzado",     precio:2799},
  {nombre:"Tenis Adidas Ultraboost 22",       categoria:"Calzado",     precio:3199},
  {nombre:"Sudadera Under Armour Tech",       categoria:"Ropa",        precio:899},
  {nombre:"Chamarra Columbia Watertight",     categoria:"Ropa",        precio:2499},
  {nombre:"Bicicleta Trek FX 3 Disc",         categoria:"Deportes",    precio:18999},
  {nombre:"Pelota Wilson NBA Official",       categoria:"Deportes",    precio:699},
  {nombre:"Mancuernas Bowflex SelectTech",    categoria:"Deportes",    precio:9499},
  {nombre:"Libro 'Hábitos Atómicos'",         categoria:"Libros",      precio:299},
  {nombre:"Libro 'El Método Lean Startup'",   categoria:"Libros",      precio:349},
  {nombre:"LEGO Technic Bugatti Chiron",      categoria:"Juguetes",    precio:4999},
  {nombre:"Perfume Chanel N°5",               categoria:"Belleza",     precio:2999},
  {nombre:"Crema Neutrogena Hydro Boost",     categoria:"Belleza",     precio:349},
  {nombre:"Suplemento Whey Protein Gold Std", categoria:"Salud",       precio:999},
  {nombre:"Multivitamínico Centrum Silver",   categoria:"Salud",       precio:399},
  {nombre:"Comida Royal Canin Maxi Adult",    categoria:"Mascotas",    precio:799},
  {nombre:"Aceite Motor Castrol 5W-30",       categoria:"Automotriz",  precio:449},
  {nombre:"Taladro DeWalt 20V MAX",           categoria:"Herramientas",precio:3499},
  {nombre:"Guitarra Fender Stratocaster",     categoria:"Música",      precio:12999},
  {nombre:"Teclado MIDI Arturia MiniLab",     categoria:"Música",      precio:2299},
  {nombre:"Control Xbox Series X",            categoria:"Videojuegos", precio:1199},
  {nombre:"Juego The Legend of Zelda: TOTK",  categoria:"Videojuegos", precio:1299},
  {nombre:"Silla Ergonómica Herman Miller",   categoria:"Oficina",     precio:19999},
  {nombre:"Monitor Dell UltraSharp 27\"",     categoria:"Electrónica", precio:8499},
  {nombre:"Mouse Logitech MX Master 3",       categoria:"Electrónica", precio:1799},
  {nombre:"Teclado Mecánico Keychron K2",     categoria:"Electrónica", precio:2299},
  {nombre:"Cámara Canon EOS R50",             categoria:"Electrónica", precio:16999},
  {nombre:"Proyector BenQ TH685P",            categoria:"Electrónica", precio:11999},
  {nombre:"Bocina JBL Charge 5",              categoria:"Electrónica", precio:2999},
  {nombre:"Impresora HP LaserJet Pro",        categoria:"Oficina",     precio:5499},
  {nombre:"Mochila Samsonite Guardit 2.0",    categoria:"Viajes",      precio:1899},
  {nombre:"Reloj Casio G-Shock GA-2100",      categoria:"Joyería",     precio:1999},
  {nombre:"AirPods Pro 2da generación",       categoria:"Electrónica", precio:5999}
];

const METODOS_PAGO = [
  {tipo:"Tarjeta de Crédito", banco:"BBVA",       red:"Visa"},
  {tipo:"Tarjeta de Crédito", banco:"Santander",  red:"Mastercard"},
  {tipo:"Tarjeta de Crédito", banco:"Banamex",    red:"Visa"},
  {tipo:"Tarjeta de Crédito", banco:"HSBC",       red:"Mastercard"},
  {tipo:"Tarjeta de Débito",  banco:"Banorte",    red:"Visa"},
  {tipo:"Tarjeta de Débito",  banco:"Scotiabank", red:"Visa"},
  {tipo:"Tarjeta de Débito",  banco:"Inbursa",    red:"Mastercard"},
  {tipo:"PayPal",             banco:"N/A",        red:"PayPal"},
  {tipo:"Mercado Pago",       banco:"N/A",        red:"MercadoPago"},
  {tipo:"Transferencia SPEI", banco:"Varios",     red:"SPEI"},
  {tipo:"OXXO Pay",           banco:"N/A",        red:"OXXO"},
  {tipo:"Tarjeta de Crédito", banco:"Citibanamex",red:"American Express"},
  {tipo:"Criptomoneda",       banco:"N/A",        red:"Bitcoin"},
  {tipo:"Criptomoneda",       banco:"N/A",        red:"Ethereum"}
];

const PAGINAS_WEB = [
  "/home","/catalogo","/producto/detalle","/carrito","/checkout",
  "/mi-cuenta","/pedidos","/favoritos","/buscar","/categorias",
  "/ofertas","/nuevos-productos","/mas-vendidos","/reseñas",
  "/contacto","/soporte","/seguimiento-pedido","/cupones",
  "/metodos-pago","/direcciones","/wishlist","/comparar",
  "/blog","/politica-devolucion","/garantias","/marcas"
];

const DISPOSITIVOS = ["Mobile","Desktop","Tablet"];
const NAVEGADORES  = ["Chrome","Firefox","Safari","Edge","Opera"];
const SISTEMAS_OP  = ["Android","iOS","Windows","macOS","Linux"];

const ESTADOS_COMPRA = ["Entregado","Enviado","Procesando","Cancelado","Reembolsado"];
const METODOS_ENVIO  = ["Express 24h","Estándar 3-5 días","Pickup en tienda","Same Day"];

// =============================================================================
//  FUNCIONES AUXILIARES
// =============================================================================

/** Entero aleatorio en [min, max] */
function rInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Elemento aleatorio de un arreglo */
function rElem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Fecha aleatoria entre dos fechas */
function rFecha(inicio, fin) {
  return new Date(inicio.getTime() + Math.random() * (fin.getTime() - inicio.getTime()));
}

/** Subconjunto aleatorio de tamaño n (sin repetición) */
function rSample(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, arr.length));
}

/** Número de teléfono mexicano simulado */
function rTelefono() {
  const ladas = ["55","33","81","222","664","477","656","33","999","444"];
  return `(${rElem(ladas)}) ${rInt(1000,9999)}-${rInt(1000,9999)}`;
}

/** Últimos 4 dígitos de tarjeta */
function rUltimos4() {
  return String(rInt(1000, 9999));
}

// =============================================================================
//  GENERADORES DE SUBARREGLOS
// =============================================================================

function generarDirecciones(n) {
  const dirs = [];
  const ubicaciones = rSample(CIUDADES, n);
  for (let i = 0; i < n; i++) {
    const ub = ubicaciones[i] || rElem(CIUDADES);
    dirs.push({
      tipo:        rElem(TIPOS_DIR),
      calle:       `${rElem(CALLES)} #${rInt(1, 999)}`,
      colonia:     `Col. ${rElem(APELLIDOS)} ${rInt(1,3)}a Sección`,
      ciudad:      ub.ciudad,
      estado:      ub.estado,
      codigo_postal: ub.cp,
      pais:        "México",
      referencia:  `Entre calle ${rElem(APELLIDOS)} y ${rElem(APELLIDOS)}`,
      predeterminada: i === 0
    });
  }
  return dirs;
}

function generarFavoritos(n) {
  return rSample(PRODUCTOS, n).map(p => ({
    producto_id:  `PROD-${rInt(10000, 99999)}`,
    nombre:       p.nombre,
    categoria:    p.categoria,
    precio_ref:   p.precio,
    fecha_agregado: rFecha(new Date("2024-01-01"), new Date("2026-05-25"))
  }));
}

function generarMetodosPago(n) {
  return rSample(METODOS_PAGO, n).map((m, idx) => ({
    metodo_id:     `PAY-${rInt(100000, 999999)}`,
    tipo:          m.tipo,
    banco:         m.banco,
    red:           m.red,
    ultimos_4:     m.tipo.includes("Tarjeta") ? rUltimos4() : "N/A",
    titular:       null,             // se asignará al insertar
    vencimiento:   m.tipo.includes("Tarjeta") ? `${rInt(1,12).toString().padStart(2,"0")}/${rInt(27,31)}` : "N/A",
    predeterminado: idx === 0,
    activo:        Math.random() > 0.1
  }));
}

function generarCompras(n, nombre) {
  const compras = [];
  for (let i = 0; i < n; i++) {
    const numProductos = rInt(1, 5);
    const items = rSample(PRODUCTOS, numProductos).map(p => ({
      producto_id: `PROD-${rInt(10000,99999)}`,
      nombre:      p.nombre,
      cantidad:    rInt(1, 3),
      precio_unit: p.precio,
      subtotal:    p.precio * rInt(1, 3)
    }));
    const total = items.reduce((acc, it) => acc + it.subtotal, 0);
    compras.push({
      pedido_id:      `ORD-${rInt(1000000,9999999)}`,
      fecha:          rFecha(new Date("2023-01-01"), new Date("2026-05-25")),
      estado:         rElem(ESTADOS_COMPRA),
      metodo_envio:   rElem(METODOS_ENVIO),
      items:          items,
      subtotal:       total,
      descuento:      Math.random() > 0.7 ? rInt(50, 500) : 0,
      impuestos:      Math.round(total * 0.16),
      total:          Math.round(total * 1.16),
      direccion_envio: `Dirección guardada #${rInt(1,3)}`
    });
  }
  return compras;
}

function generarNavegacion(n) {
  const historial = [];
  for (let i = 0; i < n; i++) {
    historial.push({
      sesion_id:   `SES-${rInt(100000000, 999999999)}`,
      url:         rElem(PAGINAS_WEB),
      dispositivo: rElem(DISPOSITIVOS),
      navegador:   rElem(NAVEGADORES),
      so:          rElem(SISTEMAS_OP),
      duracion_seg: rInt(5, 600),
      fecha:       rFecha(new Date("2025-01-01"), new Date("2026-05-25")),
      accion:      rElem(["vista","click","búsqueda","compra","logout","login"])
    });
  }
  return historial;
}

// =============================================================================
//  GENERACIÓN E INSERCIÓN DE DOCUMENTOS (lotes de 500 para eficiencia)
// =============================================================================

const TOTAL_CLIENTES  = 5000;
const TAMANIO_LOTE    = 500;
const FECHA_INICIO    = new Date();

print(`\n⏳ Generando ${TOTAL_CLIENTES} clientes en lotes de ${TAMANIO_LOTE}...\n`);

let insertados = 0;

for (let lote = 0; lote < TOTAL_CLIENTES / TAMANIO_LOTE; lote++) {

  const documentos = [];

  for (let i = 0; i < TAMANIO_LOTE; i++) {

    const numCliente   = lote * TAMANIO_LOTE + i + 1;
    const nombre       = rElem(NOMBRES);
    const apellido1    = rElem(APELLIDOS);
    const apellido2    = rElem(APELLIDOS);
    const nombreComp   = `${nombre} ${apellido1} ${apellido2}`;
    const emailLocal   = `${nombre.toLowerCase()}.${apellido1.toLowerCase()}${numCliente}`;
    const metodosPago  = generarMetodosPago(rInt(5, 7));

    // asignar titular a tarjetas
    metodosPago.forEach(m => {
      if (m.tipo.includes("Tarjeta")) m.titular = nombreComp;
    });

    const doc = {
      cliente_id:       `CLI-${String(numCliente).padStart(6,"0")}`,
      nombre:           nombreComp,
      email:            `${emailLocal}@${rElem(DOMINIOS)}`,
      telefono:         rTelefono(),
      fecha_registro:   rFecha(new Date("2020-01-01"), new Date("2026-05-25")),
      activo:           Math.random() > 0.05,
      nivel:            rElem(["Bronce","Plata","Oro","Platino","Diamante"]),
      puntos_lealtad:   rInt(0, 50000),
      // ── ARREGLOS PRINCIPALES ──────────────────────────────────────────────
      direcciones:      generarDirecciones(rInt(3, 6)),
      favoritos:        generarFavoritos(rInt(10, 15)),
      metodos_pago:     metodosPago,
      compras:          generarCompras(rInt(20, 30), nombreComp),
      historial_nav:    generarNavegacion(rInt(30, 50))
    };

    documentos.push(doc);
  }

  const resultado = db.clientes.insertMany(documentos);
  insertados += Object.keys(resultado.insertedIds).length;
  print(`  ✔ Lote ${lote + 1}/${TOTAL_CLIENTES / TAMANIO_LOTE}  |  Acumulado: ${insertados} clientes`);
}

const segundos = ((new Date() - FECHA_INICIO) / 1000).toFixed(2);
print(`\n✅ Inserción completa: ${insertados} clientes en ${segundos}s\n`);

// =============================================================================
//  ÍNDICES  (mejoran el rendimiento de las consultas siguientes)
// =============================================================================

print("⚙  Creando índices...");
db.clientes.createIndex({ "cliente_id": 1 }, { unique: true });
db.clientes.createIndex({ "email": 1 },      { unique: true });
db.clientes.createIndex({ "favoritos.nombre": 1 });
db.clientes.createIndex({ "compras.total": 1 });
db.clientes.createIndex({ "compras.estado": 1 });
db.clientes.createIndex({ "nivel": 1 });
db.clientes.createIndex({ "activo": 1 });
print("✅ Índices creados.\n");

// =============================================================================
//  ███████╗  CONSULTAS REQUERIDAS  ███████╗
// =============================================================================

print("═".repeat(70));
print("  C O N S U L T A S   R E Q U E R I D A S");
print("═".repeat(70));

// ─────────────────────────────────────────────────────────────────────────────
// CONSULTA 1: Clientes que tengan un producto favorito específico
// ─────────────────────────────────────────────────────────────────────────────
print("\n📋 CONSULTA 1 — Clientes con 'Laptop HP Pavilion 15' en favoritos");
print("─".repeat(60));

const q1 = db.clientes.find(
  { "favoritos.nombre": "Laptop HP Pavilion 15" },
  { nombre: 1, email: 1, "favoritos.$": 1, _id: 0 }
).limit(5);

q1.forEach(c => {
  print(`  Cliente: ${c.nombre}  |  Email: ${c.email}`);
  print(`  Favorito encontrado: ${c.favoritos[0].nombre}  ($${c.favoritos[0].precio_ref})`);
});

const totalQ1 = db.clientes.countDocuments({ "favoritos.nombre": "Laptop HP Pavilion 15" });
print(`\n  Total de clientes con ese favorito: ${totalQ1}`);

// ─────────────────────────────────────────────────────────────────────────────
// CONSULTA 2: Clientes con compras mayores a $300
// ─────────────────────────────────────────────────────────────────────────────
print("\n📋 CONSULTA 2 — Clientes con al menos una compra mayor a $300");
print("─".repeat(60));

const q2 = db.clientes.find(
  { "compras.total": { $gt: 300 } },
  { nombre: 1, email: 1, _id: 0 }
).limit(5);

q2.forEach(c => print(`  ${c.nombre}  |  ${c.email}`));

const totalQ2 = db.clientes.countDocuments({ "compras.total": { $gt: 300 } });
print(`\n  Total de clientes con compras > $300: ${totalQ2}`);

// Mostrar detalle de las compras mayores a $300 de un cliente específico
print("\n  Detalle de compras > $300 del primer cliente encontrado:");
const q2_detalle = db.clientes.aggregate([
  { $match: { "compras.total": { $gt: 300 } } },
  { $limit: 1 },
  { $project: {
      nombre: 1,
      compras_grandes: {
        $filter: {
          input: "$compras",
          as:    "c",
          cond:  { $gt: ["$$c.total", 300] }
        }
      }
  }},
  { $project: {
      nombre: 1,
      "compras_grandes.pedido_id": 1,
      "compras_grandes.total": 1,
      "compras_grandes.estado": 1
  }}
]);
q2_detalle.forEach(r => {
  print(`  Cliente: ${r.nombre}`);
  r.compras_grandes.slice(0,5).forEach(c =>
    print(`    Pedido: ${c.pedido_id}  Total: $${c.total}  Estado: ${c.estado}`)
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// CONSULTA 3: Contar clientes con más de 10 compras
// ─────────────────────────────────────────────────────────────────────────────
print("\n📋 CONSULTA 3 — Clientes con más de 10 compras");
print("─".repeat(60));

const q3 = db.clientes.aggregate([
  {
    $project: {
      nombre: 1,
      total_compras: { $size: "$compras" }
    }
  },
  { $match: { total_compras: { $gt: 10 } } },
  { $count: "clientes_con_mas_de_10_compras" }
]);

q3.forEach(r => print(`  Resultado: ${JSON.stringify(r)}`));

// También con expresión directa
const totalQ3 = db.clientes.aggregate([
  { $match: { $expr: { $gt: [{ $size: "$compras" }, 10] } } },
  { $count: "total" }
]).toArray();
print(`  Verificación directa: ${JSON.stringify(totalQ3[0])}`);

// ─────────────────────────────────────────────────────────────────────────────
// CONSULTA 4: $push — Agregar un nuevo producto favorito
// ─────────────────────────────────────────────────────────────────────────────
print("\n📋 CONSULTA 4 — $push: Agregar nuevo favorito al primer cliente");
print("─".repeat(60));

const primerCliente = db.clientes.findOne({}, { cliente_id: 1, nombre: 1 });
print(`  Cliente objetivo: ${primerCliente.nombre} (${primerCliente.cliente_id})`);

const nuevoFavorito = {
  producto_id:    "PROD-99999",
  nombre:         "Monitor Dell UltraSharp 27\"",
  categoria:      "Electrónica",
  precio_ref:     8499,
  fecha_agregado: new Date()
};

const r4 = db.clientes.updateOne(
  { cliente_id: primerCliente.cliente_id },
  { $push: { favoritos: nuevoFavorito } }
);

print(`  Resultado $push: matchedCount=${r4.matchedCount}, modifiedCount=${r4.modifiedCount}`);

// Verificar
const verQ4 = db.clientes.findOne(
  { cliente_id: primerCliente.cliente_id },
  { "favoritos": { $slice: -1 }, nombre: 1 }
);
print(`  Favorito agregado: ${verQ4.favoritos[0].nombre} — $${verQ4.favoritos[0].precio_ref}`);

// ─────────────────────────────────────────────────────────────────────────────
// CONSULTA 5: $pull — Eliminar un producto favorito
// ─────────────────────────────────────────────────────────────────────────────
print("\n📋 CONSULTA 5 — $pull: Eliminar favorito del mismo cliente");
print("─".repeat(60));

// Primero ver cuántos favoritos tiene antes
const antesQ5 = db.clientes.findOne(
  { cliente_id: primerCliente.cliente_id },
  { favoritos: 1, nombre: 1 }
);
print(`  Favoritos ANTES del $pull: ${antesQ5.favoritos.length}`);

const r5 = db.clientes.updateOne(
  { cliente_id: primerCliente.cliente_id },
  { $pull: { favoritos: { nombre: "Monitor Dell UltraSharp 27\"" } } }
);

print(`  Resultado $pull: matchedCount=${r5.matchedCount}, modifiedCount=${r5.modifiedCount}`);

const despuesQ5 = db.clientes.findOne(
  { cliente_id: primerCliente.cliente_id },
  { favoritos: 1 }
);
print(`  Favoritos DESPUÉS del $pull: ${despuesQ5.favoritos.length}`);

// ─────────────────────────────────────────────────────────────────────────────
// CONSULTA 6: $addToSet — Evitar duplicados
// ─────────────────────────────────────────────────────────────────────────────
print("\n📋 CONSULTA 6 — $addToSet: Agregar sin duplicar");
print("─".repeat(60));

const favoritoTest = {
  producto_id:    "PROD-88888",
  nombre:         "Bocina JBL Charge 5",
  categoria:      "Electrónica",
  precio_ref:     2999,
  fecha_agregado: new Date()
};

// Primera inserción (debe modificar)
const r6a = db.clientes.updateOne(
  { cliente_id: primerCliente.cliente_id },
  { $addToSet: { favoritos: favoritoTest } }
);
print(`  1ª llamada $addToSet: modifiedCount=${r6a.modifiedCount} (esperado: 1)`);

// Segunda inserción idéntica (NO debe modificar — evita duplicado)
const r6b = db.clientes.updateOne(
  { cliente_id: primerCliente.cliente_id },
  { $addToSet: { favoritos: favoritoTest } }
);
print(`  2ª llamada $addToSet (mismo objeto): modifiedCount=${r6b.modifiedCount} (esperado: 0 — duplicado evitado)`);

// ─────────────────────────────────────────────────────────────────────────────
// CONSULTAS ADICIONALES — Valor analítico
// ─────────────────────────────────────────────────────────────────────────────
print("\n📋 CONSULTA 7 — Distribución de clientes por nivel de membresía");
print("─".repeat(60));
db.clientes.aggregate([
  { $group: { _id: "$nivel", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]).forEach(r => print(`  ${r._id.padEnd(10)}: ${r.total} clientes`));

print("\n📋 CONSULTA 8 — Top 5 productos más guardados como favoritos");
print("─".repeat(60));
db.clientes.aggregate([
  { $unwind: "$favoritos" },
  { $group: { _id: "$favoritos.nombre", veces: { $sum: 1 } } },
  { $sort: { veces: -1 } },
  { $limit: 5 }
]).forEach(r => print(`  ${String(r.veces).padStart(5)} veces  |  ${r._id}`));

print("\n📋 CONSULTA 9 — Promedio de compras por cliente y ticket promedio");
print("─".repeat(60));
db.clientes.aggregate([
  {
    $project: {
      num_compras: { $size: "$compras" },
      ticket_prom: { $avg: "$compras.total" }
    }
  },
  {
    $group: {
      _id: null,
      prom_compras_por_cliente: { $avg: "$num_compras" },
      ticket_promedio_global:   { $avg: "$ticket_prom" }
    }
  }
]).forEach(r => {
  print(`  Promedio de compras por cliente: ${r.prom_compras_por_cliente.toFixed(2)}`);
  print(`  Ticket promedio global:          $${r.ticket_promedio_global.toFixed(2)}`);
});

print("\n📋 CONSULTA 10 — Clientes activos con nivel Oro o Platino y >25 compras");
print("─".repeat(60));
const q10 = db.clientes.aggregate([
  {
    $match: {
      activo: true,
      nivel:  { $in: ["Oro","Platino","Diamante"] }
    }
  },
  {
    $project: {
      nombre: 1,
      nivel: 1,
      num_compras: { $size: "$compras" }
    }
  },
  { $match: { num_compras: { $gt: 25 } } },
  { $sort:  { num_compras: -1 } },
  { $limit: 5 }
]);
q10.forEach(r =>
  print(`  ${r.nombre.padEnd(35)} | Nivel: ${r.nivel.padEnd(8)} | Compras: ${r.num_compras}`)
);

// ─────────────────────────────────────────────────────────────────────────────
// ESTADÍSTICAS FINALES
// ─────────────────────────────────────────────────────────────────────────────
print("\n" + "═".repeat(70));
print("  E S T A D Í S T I C A S   F I N A L E S");
print("═".repeat(70));

const stats = db.clientes.aggregate([
  {
    $group: {
      _id: null,
      total_clientes:    { $sum: 1 },
      total_compras:     { $sum: { $size: "$compras" } },
      total_favoritos:   { $sum: { $size: "$favoritos" } },
      total_direcciones: { $sum: { $size: "$direcciones" } },
      total_nav:         { $sum: { $size: "$historial_nav" } },
      clientes_activos:  { $sum: { $cond: ["$activo", 1, 0] } }
    }
  }
]).toArray()[0];

print(`  Total clientes insertados : ${stats.total_clientes}`);
print(`  Clientes activos          : ${stats.clientes_activos}`);
print(`  Total de compras          : ${stats.total_compras}`);
print(`  Total de favoritos        : ${stats.total_favoritos}`);
print(`  Total de direcciones      : ${stats.total_direcciones}`);
print(`  Total registros navegación: ${stats.total_nav}`);
print(`  Tiempo total de ejecución : ${((new Date() - FECHA_INICIO)/1000).toFixed(2)}s`);
print("═".repeat(70));
print("\n✅ Script ejecutado correctamente. Base de datos lista para análisis.\n");
