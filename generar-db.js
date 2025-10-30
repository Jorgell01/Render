/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 📚 GENERADOR DE BASE DE DATOS GRANDE - VERSIÓN SUPER COMENTADA PARA ALUMNOS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 🎯 ¿QUÉ HACE ESTE ARCHIVO?
 * --------------------------
 * Este programa crea un archivo llamado "db-grande.json" que contiene:
 * - Lista de proveedores (empresas que venden productos)
 * - Lista de categorías (tipos de productos: frutas, carnes, etc.)
 * - Lista de productos (miles de productos con precio, stock, etc.)
 * 
 * 💡 ¿PARA QUÉ SIRVE?
 * -------------------
 * Imagina que necesitas una base de datos con 100,000 productos para probar tu web.
 * En vez de escribirlos uno por uno (¡tardarías años!), este programa los crea
 * automáticamente en segundos.
 * 
 * 🚀 ¿CÓMO SE USA?
 * ----------------
 * Opción 1 (Si tienes Node.js instalado):
 *   Escribe en la terminal: node generar-db.js
 * 
 * Opción 2 (Sin instalar nada):
 *   Render.com lo ejecutará automáticamente cuando despliegues
 * 
 * 🎨 ¿CÓMO PERSONALIZAR LA CANTIDAD DE DATOS?
 * -------------------------------------------
 * Busca más abajo las líneas que dicen:
 *   const NUM_PRODUCTOS = 200;
 * 
 * Cambia el número 200 por el que quieras:
 *   - 1000 = Base de datos pequeña
 *   - 50000 = Base de datos mediana
 *   - 200000 = Base de datos grande
 */

// ═══════════════════════════════════════════════════════════════════════════
// 📦 IMPORTAR HERRAMIENTAS QUE NECESITAMOS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * La palabra "import" significa "traer".
 * Aquí le decimos a JavaScript: "Trae la herramienta llamada 'fs'"
 * 
 * ¿Qué es "fs"?
 * - Es una herramienta de Node.js para trabajar con archivos
 * - fs significa "File System" (Sistema de Archivos)
 * - Nos permite crear, leer, modificar y guardar archivos
 * 
 * Ejemplo de lo que podemos hacer con fs:
 * - fs.writeFileSync() → Guardar un archivo
 * - fs.readFileSync() → Leer un archivo
 * - fs.statSync() → Ver información del archivo (tamaño, fecha, etc.)
 */
import fs from "fs";

// ═══════════════════════════════════════════════════════════════════════════
// ⚙️ CONFIGURACIÓN - AQUÍ DECIDES CUÁNTOS DATOS GENERAR
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🔢 NÚMEROS DE CONFIGURACIÓN
 * 
 * "const" significa "constante" → un valor que NO va a cambiar durante el programa
 * 
 * Piensa en estas variables como "configuraciones de un videojuego":
 * - Antes de empezar, decides: ¿cuántos enemigos? ¿cuántos niveles?
 * - Aquí decides: ¿cuántos proveedores? ¿cuántos productos?
 */

const NUM_PROVEEDORES = 100;   // Vamos a crear 100 proveedores
const NUM_CATEGORIAS = 50;      // Vamos a crear 50 categorías
const NUM_PRODUCTOS = 200;      // Vamos a crear 200 productos

/**
 * ⚠️ IMPORTANTE - CAMBIA ESTE NÚMERO PARA MÁS O MENOS PRODUCTOS
 * 
 * Si quieres cambiar la cantidad de productos, SOLO cambia el número de arriba.
 * 
 * Ejemplos:
 *   const NUM_PRODUCTOS = 1000;      → 1,000 productos (archivo pequeño ~300 KB)
 *   const NUM_PRODUCTOS = 10000;     → 10,000 productos (archivo mediano ~3 MB)
 *   const NUM_PRODUCTOS = 100000;    → 100,000 productos (archivo grande ~30 MB)
 *   const NUM_PRODUCTOS = 200000;    → 200,000 productos (archivo muy grande ~60 MB)
 * 
 * 💡 Cuantos más productos, más grande el archivo, pero también más tarda en generarse.
 */

// ═══════════════════════════════════════════════════════════════════════════
// 📝 DATOS DE EJEMPLO - PALABRAS QUE USAREMOS PARA CREAR PRODUCTOS REALISTAS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🌍 Array (lista) de países
 * 
 * ¿Qué es un Array?
 * - Es como una lista de cosas
 * - Se escribe entre corchetes [ ]
 * - Cada elemento va separado por comas
 * - Los textos van entre comillas ""
 * 
 * Ejemplo visual:
 *   PAISES[0] = "España"     → Primer elemento (empieza en 0)
 *   PAISES[1] = "México"     → Segundo elemento
 *   PAISES[7] = "Francia"    → Octavo elemento
 * 
 * ¿Para qué lo usamos?
 * - Cuando creemos proveedores, cada uno será de un país diferente
 * - Hacemos (i % 8) para elegir un país de la lista
 *   Si i=0 → país 0 (España), si i=8 → país 0 (España), si i=9 → país 1 (México)
 */
const PAISES = [
  "España",      // Posición 0
  "México",      // Posición 1
  "Chile",       // Posición 2
  "Argentina",   // Posición 3
  "Colombia",    // Posición 4
  "Perú",        // Posición 5
  "Portugal",    // Posición 6
  "Francia"      // Posición 7
];

/**
 * 🏷️ Array de marcas
 * 
 * Igual que antes, es una lista de nombres de marcas.
 * Cada producto tendrá una de estas marcas asignada.
 */
const MARCAS = [
  "Premium",      // Posición 0
  "Selecta",      // Posición 1
  "Natural",      // Posición 2
  "Gourmet",      // Posición 3
  "Artesana",     // Posición 4
  "Tradicional",  // Posición 5
  "Ecológica",    // Posición 6
  "Bio"           // Posición 7
];

// ═══════════════════════════════════════════════════════════════════════════
// 📊 MOSTRAR INFORMACIÓN EN PANTALLA (CONSOLA)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * console.log() → Mostrar texto en la pantalla (consola)
 * 
 * Es como hacer un "alert()" en el navegador, pero para programas de Node.js
 * 
 * Ejemplos de lo que hace:
 *   console.log("Hola") → Muestra: Hola
 *   console.log(`Hola ${nombre}`) → Muestra: Hola Juan (si nombre = "Juan")
 * 
 * 💡 Fíjate en las comillas:
 *   "" → Texto normal
 *   `` → Comillas especiales que permiten meter variables con ${}
 */

console.log("🔧 Generando base de datos...\n");
console.log(`📊 Configuración:`);
console.log(`   - Proveedores: ${NUM_PROVEEDORES}`);   // Muestra: - Proveedores: 100
console.log(`   - Categorías: ${NUM_CATEGORIAS}`);      // Muestra: - Categorías: 50
console.log(`   - Productos: ${NUM_PRODUCTOS}`);        // Muestra: - Productos: 200
console.log(`\n⏳ Esto puede tardar unos segundos...\n`);

/**
 * 🤔 ¿Qué es ${NUM_PROVEEDORES}?
 * 
 * Es una "interpolación de variables" (meter variables dentro de texto)
 * 
 * Ejemplo paso a paso:
 *   NUM_PROVEEDORES = 100
 *   `Proveedores: ${NUM_PROVEEDORES}` → "Proveedores: 100"
 * 
 * Es como hacer: "Proveedores: " + NUM_PROVEEDORES
 * Pero más fácil de leer y escribir.
 */

// ═══════════════════════════════════════════════════════════════════════════
// 📦 CREAR ARRAYS VACÍOS - LAS "CAJAS" DONDE GUARDAREMOS LOS DATOS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🎁 Arrays vacíos
 * 
 * Aquí creamos 3 "cajas vacías" donde iremos guardando:
 * - proveedores → Lista de todos los proveedores
 * - categorias → Lista de todas las categorías
 * - productos → Lista de todos los productos
 * 
 * Ejemplo visual:
 *   const proveedores = [];  → Caja vacía
 *   proveedores.push({...})  → Meter algo en la caja
 *   proveedores[0]           → Sacar el primer elemento de la caja
 */

const proveedores = [];  // Array vacío: []
const categorias = [];   // Array vacío: []
const productos = [];    // Array vacío: []

// ═══════════════════════════════════════════════════════════════════════════
// 👥 GENERAR PROVEEDORES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🔁 BUCLE FOR - REPETIR UNA ACCIÓN MUCHAS VECES
 * 
 * ¿Qué hace este bucle?
 * - Repetir el código 100 veces (de 1 hasta NUM_PROVEEDORES)
 * 
 * Desglose de: for (let i = 1; i <= NUM_PROVEEDORES; i++)
 * 
 * 1️⃣ let i = 1
 *    - Crear una variable llamada "i" que empieza en 1
 *    - "i" es como un contador
 * 
 * 2️⃣ i <= NUM_PROVEEDORES
 *    - Condición: "mientras i sea menor o igual que 100"
 *    - Si i = 101, el bucle se detiene
 * 
 * 3️⃣ i++
 *    - Después de cada repetición, sumar 1 a "i"
 *    - i++ es lo mismo que i = i + 1
 * 
 * EJEMPLO DE CÓMO FUNCIONA:
 *   Primera vuelta: i = 1  (hace el código, luego i++)
 *   Segunda vuelta: i = 2  (hace el código, luego i++)
 *   ...
 *   Vuelta 100: i = 100    (hace el código, luego i++)
 *   Vuelta 101: i = 101    (NO cumple i <= 100, así que PARA)
 */
for (let i = 1; i <= NUM_PROVEEDORES; i++) {
  
  /**
   * 📝 CREAR UN PROVEEDOR
   * 
   * proveedores.push({...}) significa:
   * - "push" = meter algo al final del array
   * - {...} = crear un objeto con propiedades
   * 
   * Un objeto es como una ficha con datos:
   *   {
   *     id: 1,
   *     nombre: "Proveedor 1",
   *     pais: "España"
   *   }
   * 
   * Es como una tabla de Excel, pero en código:
   *   | id | nombre        | pais   |
   *   |----|---------------|--------|
   *   | 1  | Proveedor 1   | España |
   */
  proveedores.push({
    
    // ID del proveedor (1, 2, 3, ..., 100)
    id: i,
    
    /**
     * 🔤 CREAR NOMBRE DEL PROVEEDOR
     * 
     * ¿Qué hace esto?
     *   `Proveedor ${i} - Distribuciones`
     * 
     * Si i = 1:  "Proveedor 1 - Distribuciones"
     * Si i = 2:  "Proveedor 2 - Distribuciones"
     * Si i = 50: "Proveedor 50 - Distribuciones"
     * 
     * ${i} → Inserta el valor de "i" dentro del texto
     */
    nombre: `Proveedor ${i} - Distribuciones`,
    
    /**
     * 🌍 ASIGNAR UN PAÍS
     * 
     * ¿Qué hace esto?
     *   PAISES[i % PAISES.length]
     * 
     * Desglose:
     * 1. PAISES.length = 8 (hay 8 países en la lista)
     * 2. i % 8 = resto de dividir i entre 8
     * 
     * Ejemplos:
     *   i = 1  → 1 % 8 = 1 → PAISES[1] = "México"
     *   i = 8  → 8 % 8 = 0 → PAISES[0] = "España"
     *   i = 9  → 9 % 8 = 1 → PAISES[1] = "México"
     *   i = 16 → 16 % 8 = 0 → PAISES[0] = "España"
     * 
     * 💡 Así nos aseguramos de que el número nunca supere 7
     *    (porque PAISES solo tiene 8 elementos, del 0 al 7)
     */
    pais: PAISES[i % PAISES.length],
    
    /**
     * 📧 CREAR EMAIL DE CONTACTO
     * 
     * Si i = 1:  "contacto1@proveedor1.com"
     * Si i = 50: "contacto50@proveedor50.com"
     */
    contacto: `contacto${i}@proveedor${i}.com`,
    
    /**
     * 📱 CREAR TELÉFONO
     * 
     * ¿Qué hace esto?
     *   `+34 ${900 + i} ${String(i).padStart(6, '0')}`
     * 
     * Desglose:
     * 1. +34 → Prefijo de España
     * 2. 900 + i → Número que va aumentando (901, 902, 903...)
     * 3. String(i).padStart(6, '0') → Convertir "i" en texto y rellenar con ceros
     * 
     * Ejemplos:
     *   i = 1:   String(1).padStart(6, '0') = "000001"
     *            Resultado: "+34 901 000001"
     *   
     *   i = 123: String(123).padStart(6, '0') = "000123"
     *            Resultado: "+34 1023 000123"
     * 
     * 💡 padStart(6, '0') significa:
     *    "Quiero un texto de 6 caracteres, si falta, rellena con 0 por la izquierda"
     */
    telefono: `+34 ${900 + i} ${String(i).padStart(6, '0')}`,
    
    /**
     * ✅ CAMPO ACTIVO
     * 
     * true = El proveedor está activo
     * false = El proveedor está inactivo
     * 
     * Aquí todos están activos (true)
     */
    activo: true
  });
}

// Mostrar en pantalla cuántos proveedores hemos creado
console.log(`✅ Generados ${NUM_PROVEEDORES} proveedores`);

// ═══════════════════════════════════════════════════════════════════════════
// 📂 GENERAR CATEGORÍAS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🔁 BUCLE PARA CATEGORÍAS
 * 
 * Igual que antes, pero ahora creamos 50 categorías
 */
for (let i = 1; i <= NUM_CATEGORIAS; i++) {
  
  /**
   * Crear una categoría y meterla en el array "categorias"
   */
  categorias.push({
    
    // ID de la categoría (1, 2, 3, ..., 50)
    id: i,
    
    // Nombre: "Categoría 1", "Categoría 2", etc.
    nombre: `Categoría ${i}`,
    
    /**
     * 📝 DESCRIPCIÓN
     * 
     * Un texto largo describiendo la categoría.
     * Usamos ${i} para meter el número de categoría en el texto.
     */
    descripcion: `Descripción detallada de la categoría ${i}. Esta categoría agrupa productos relacionados.`
  });
}

// Mostrar en pantalla cuántas categorías hemos creado
console.log(`✅ Generadas ${NUM_CATEGORIAS} categorías`);

// ═══════════════════════════════════════════════════════════════════════════
// 🛒 GENERAR PRODUCTOS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🔁 BUCLE PARA PRODUCTOS
 * 
 * Este es el bucle más importante porque crea MUCHOS productos.
 * Si NUM_PRODUCTOS = 200,000, este bucle se repetirá 200,000 veces.
 */
for (let i = 1; i <= NUM_PRODUCTOS; i++) {
  
  /**
   * 🔗 CALCULAR IDs DE RELACIÓN
   * 
   * Cada producto pertenece a:
   * - Una categoría (categoriaId)
   * - Un proveedor (proveedorId)
   * 
   * ¿Cómo los asignamos?
   * Usamos el operador % (módulo) para repartirlos de forma equitativa.
   */
  
  /**
   * 📂 ASIGNAR CATEGORÍA
   * 
   * ¿Qué hace (i % NUM_CATEGORIAS) + 1?
   * 
   * Si NUM_CATEGORIAS = 50:
   *   i = 1  → (1 % 50) + 1 = 1 + 1 = 2    → Categoría 2
   *   i = 2  → (2 % 50) + 1 = 2 + 1 = 3    → Categoría 3
   *   i = 50 → (50 % 50) + 1 = 0 + 1 = 1   → Categoría 1
   *   i = 51 → (51 % 50) + 1 = 1 + 1 = 2   → Categoría 2
   * 
   * 💡 Así distribuimos los productos entre las 50 categorías de forma circular
   */
  const categoriaId = (i % NUM_CATEGORIAS) + 1;
  
  /**
   * 🏢 ASIGNAR PROVEEDOR
   * 
   * Igual que con categorías, pero con proveedores.
   * Repartimos los productos entre los 100 proveedores.
   */
  const proveedorId = (i % NUM_PROVEEDORES) + 1;
  
  /**
   * 📦 CREAR PRODUCTO
   * 
   * Ahora sí, creamos el producto con todos sus datos
   */
  productos.push({
    
    // ID único del producto (1, 2, 3, ..., 200,000)
    id: i,
    
    // Nombre: "Producto 1", "Producto 2", etc.
    nombre: `Producto ${i}`,
    
    /**
     * 📝 DESCRIPCIÓN LARGA
     * 
     * Un texto descriptivo para cada producto.
     * En una tienda real, aquí iría información detallada del producto.
     */
    descripcion: `Descripción detallada del producto ${i}. Este producto es de alta calidad y está disponible en nuestra tienda. Ideal para uso diario y cuenta con garantía de satisfacción.`,
    
    /**
     * 🏷️ MARCA DEL PRODUCTO
     * 
     * Igual que con países, usamos % para elegir una marca de la lista.
     * 
     * Si i = 0 → MARCAS[0] = "Premium"
     * Si i = 8 → MARCAS[0] = "Premium" (vuelve al principio)
     */
    marca: MARCAS[i % MARCAS.length],
    
    /**
     * 💰 PRECIO ALEATORIO
     * 
     * ¿Qué hace esto?
     *   +(Math.random() * 100).toFixed(2)
     * 
     * Desglose paso a paso:
     * 1. Math.random() → Genera un número aleatorio entre 0 y 1
     *    Ejemplo: 0.7234892
     * 
     * 2. Math.random() * 100 → Multiplicamos por 100
     *    Ejemplo: 0.7234892 * 100 = 72.34892
     * 
     * 3. .toFixed(2) → Redondear a 2 decimales (como euros)
     *    Ejemplo: 72.34892 → "72.35"
     * 
     * 4. + delante → Convertir el texto "72.35" a número 72.35
     * 
     * Resultado: Precios aleatorios como 23.45, 89.12, 5.67, etc.
     */
    precio: +(Math.random() * 100).toFixed(2),
    
    /**
     * 📦 STOCK ALEATORIO
     * 
     * ¿Qué hace Math.floor(Math.random() * 5000)?
     * 
     * 1. Math.random() → Número entre 0 y 1 (ejemplo: 0.456)
     * 2. * 5000 → Multiplicar (ejemplo: 0.456 * 5000 = 2280)
     * 3. Math.floor() → Redondear hacia abajo (ejemplo: 2280)
     * 
     * Resultado: Stock aleatorio entre 0 y 4999
     */
    stock: Math.floor(Math.random() * 5000),
    
    /**
     * ⚠️ STOCK MÍNIMO
     * 
     * Igual que antes, pero con números más pequeños (0 a 99)
     * Es el "aviso de poco stock"
     */
    stockMinimo: Math.floor(Math.random() * 100),
    
    /**
     * 🔗 RELACIONES CON OTRAS TABLAS
     * 
     * Estos IDs conectan el producto con:
     * - Una categoría específica
     * - Un proveedor específico
     * 
     * Es como decir:
     * "Este producto pertenece a la categoría X y lo vende el proveedor Y"
     */
    categoriaId: categoriaId,
    proveedorId: proveedorId,
    
    /**
     * 🔢 CÓDIGO DE BARRAS
     * 
     * ¿Qué hace `84100${String(i).padStart(8, '0')}`?
     * 
     * 1. 84100 → Prefijo fijo (como los códigos EAN reales)
     * 2. String(i) → Convertir i a texto
     * 3. .padStart(8, '0') → Rellenar con ceros hasta tener 8 caracteres
     * 
     * Ejemplos:
     *   i = 1:     "8410000000001"
     *   i = 123:   "8410000000123"
     *   i = 50000: "8410000050000"
     */
    codigoBarras: `84100${String(i).padStart(8, '0')}`,
    
    /**
     * ✅ PRODUCTO ACTIVO O NO
     * 
     * ¿Qué hace Math.random() > 0.1?
     * 
     * 1. Math.random() → Número aleatorio entre 0 y 1
     * 2. > 0.1 → Comparar: ¿es mayor que 0.1?
     * 3. Si SÍ → true (activo)
     * 4. Si NO → false (inactivo)
     * 
     * Como Math.random() casi siempre es > 0.1 (90% de probabilidad),
     * el 90% de productos estarán activos.
     * 
     * Ejemplo:
     *   Math.random() = 0.8 → 0.8 > 0.1 → true (activo)
     *   Math.random() = 0.05 → 0.05 > 0.1 → false (inactivo)
     */
    activo: Math.random() > 0.1
    
    /**
     * 📝 NOTA IMPORTANTE:
     * 
     * NO guardamos los objetos completos de categoria y proveedor aquí.
     * Solo guardamos sus IDs (categoriaId, proveedorId).
     * 
     * ¿Por qué?
     * - Si guardamos el objeto completo, el archivo JSON sería gigante
     * - json-server puede relacionarlos después usando _expand
     * 
     * Ejemplo de lo que NO hacemos:
     *   categoria: { id: 1, nombre: "Frutas", descripcion: "..." }  ❌
     * 
     * Lo que SÍ hacemos:
     *   categoriaId: 1  ✅
     * 
     * Luego, en la API, si queremos la categoría completa, hacemos:
     *   GET /productos?_expand=categoria
     * 
     * Y json-server automáticamente busca la categoría 1 y la añade al producto.
     */
  });
  
  /**
   * 📊 MOSTRAR PROGRESO
   * 
   * ¿Qué hace if (i % 10000 === 0)?
   * 
   * 1. i % 10000 → Resto de dividir i entre 10000
   * 2. === 0 → ¿El resto es 0?
   * 3. Si SÍ → Mostrar mensaje
   * 
   * Esto significa: "Cada 10,000 productos, mostrar un mensaje"
   * 
   * Ejemplos:
   *   i = 10000 → 10000 % 10000 = 0 → Mostrar "Generados 10,000 productos..."
   *   i = 20000 → 20000 % 10000 = 0 → Mostrar "Generados 20,000 productos..."
   *   i = 15000 → 15000 % 10000 = 5000 → NO mostrar nada
   * 
   * 💡 Es como un "checkpoint" para saber que el programa no se ha colgado
   */
  if (i % 10000 === 0) {
    /**
     * .toLocaleString() → Formato con separadores de miles
     * 
     * Ejemplos:
     *   10000 → "10,000"
     *   100000 → "100,000"
     *   1000000 → "1,000,000"
     */
    console.log(`   ⏳ Generados ${i.toLocaleString()} productos...`);
  }
}

// Mostrar cuántos productos hemos creado en total
console.log(`✅ Generados ${NUM_PRODUCTOS.toLocaleString()} productos`);

// ═══════════════════════════════════════════════════════════════════════════
// 💾 GUARDAR TODO EN UN ARCHIVO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 📦 CREAR OBJETO FINAL
 * 
 * Montamos un objeto que contiene las 3 listas:
 * 
 * const db = {
 *   proveedores: [100 proveedores],
 *   categorias: [50 categorías],
 *   productos: [200 productos]
 * }
 * 
 * Este formato es el que necesita json-server para funcionar.
 */
const db = { 
  proveedores,   // Array con 100 proveedores
  categorias,    // Array con 50 categorías
  productos      // Array con 200 productos (o los que hayas configurado)
};

console.log("\n💾 Guardando archivo db-grande.json...");

/**
 * 💾 GUARDAR ARCHIVO
 * 
 * ¿Qué hace fs.writeFileSync()?
 * 
 * Desglose:
 *   fs.writeFileSync("db-grande.json", JSON.stringify(db, null, 2))
 * 
 * 1. "db-grande.json" → Nombre del archivo que vamos a crear
 * 2. JSON.stringify(db, null, 2) → Convertir el objeto "db" a texto JSON
 * 
 * ¿Qué hace JSON.stringify()?
 * - Convierte un objeto JavaScript en texto JSON
 * - El "null" es para opciones especiales (no las usamos)
 * - El "2" es para indentar con 2 espacios (hacer el JSON más legible)
 * 
 * Ejemplo de JSON.stringify():
 *   Objeto: { id: 1, nombre: "Juan" }
 *   JSON:   '{\n  "id": 1,\n  "nombre": "Juan"\n}'
 * 
 * 💡 Si no usáramos el "2", todo estaría en una línea y sería ilegible
 */
fs.writeFileSync("db-grande.json", JSON.stringify(db, null, 2));

// ═══════════════════════════════════════════════════════════════════════════
// 📊 MOSTRAR ESTADÍSTICAS FINALES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 📏 OBTENER INFORMACIÓN DEL ARCHIVO
 * 
 * fs.statSync() → Obtener estadísticas del archivo
 * 
 * Devuelve un objeto con información como:
 * - size: Tamaño en bytes
 * - birthtime: Fecha de creación
 * - mtime: Fecha de última modificación
 */
const stats = fs.statSync("db-grande.json");

/**
 * 🔢 CALCULAR TAMAÑO EN MB
 * 
 * ¿Qué hace (stats.size / (1024 * 1024)).toFixed(2)?
 * 
 * Desglose:
 * 1. stats.size → Tamaño en bytes (ejemplo: 62914560 bytes)
 * 2. 1024 → Bytes en un KB (kilobyte)
 * 3. 1024 * 1024 → Bytes en un MB (megabyte) = 1,048,576
 * 4. stats.size / (1024 * 1024) → Convertir bytes a MB
 *    Ejemplo: 62914560 / 1048576 = 60.00
 * 5. .toFixed(2) → Redondear a 2 decimales
 *    Ejemplo: 60.00 → "60.00"
 * 
 * Conversiones:
 *   1 KB = 1,024 bytes
 *   1 MB = 1,024 KB = 1,048,576 bytes
 *   1 GB = 1,024 MB
 */
const tamanoMB = (stats.size / (1024 * 1024)).toFixed(2);

/**
 * 📋 MOSTRAR RESUMEN FINAL
 * 
 * Mostramos toda la información del archivo generado
 */
console.log("\n✅ ¡Archivo generado exitosamente!");
console.log(`\n📊 ESTADÍSTICAS:`);
console.log(`   📁 Archivo: db-grande.json`);
console.log(`   📏 Tamaño: ${tamanoMB} MB`);
console.log(`   📦 Proveedores: ${NUM_PROVEEDORES.toLocaleString()}`);
console.log(`   📦 Categorías: ${NUM_CATEGORIAS.toLocaleString()}`);
console.log(`   📦 Productos: ${NUM_PRODUCTOS.toLocaleString()}`);
console.log(`\n💡 TIP: Puedes ajustar NUM_PRODUCTOS en el script para cambiar el tamaño`);
console.log(`\n🚀 Ejecuta "npm start" para iniciar el servidor con estos datos\n`);

