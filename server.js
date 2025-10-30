/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🌐 SERVIDOR API REST CON JSON-SERVER - VERSIÓN SUPER COMENTADA PARA ALUMNOS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * 🎯 ¿QUÉ HACE ESTE ARCHIVO?
 * --------------------------
 * Este archivo crea un servidor web que funciona como una API REST.
 * 
 * 🤔 ¿Qué es una API REST?
 * - API = Application Programming Interface (Interfaz de Programación)
 * - REST = Forma estándar de comunicarse con servidores usando HTTP
 * - En resumen: Un servidor que responde a peticiones web con datos en JSON
 * 
 * 📦 ¿Qué hace nuestro servidor?
 * 1. Lee los datos de db-grande.json (o los descarga de internet)
 * 2. Crea una API REST automática con esos datos
 * 3. Responde a peticiones como:
 *    - GET /productos → Devuelve lista de productos
 *    - GET /productos/1 → Devuelve el producto con ID 1
 *    - POST /productos → Crea un nuevo producto
 *    - PUT /productos/1 → Actualiza el producto 1
 *    - DELETE /productos/1 → Elimina el producto 1
 * 
 * 🚀 ¿CÓMO SE USA?
 * ----------------
 * Opción 1 (Local, si tienes Node.js):
 *   npm start
 *   Abre: http://localhost:3000/productos
 * 
 * Opción 2 (En Render.com):
 *   Se ejecuta automáticamente al hacer deploy
 *   Abre: https://tu-app.onrender.com/productos
 * 
 * 🎓 CONCEPTOS QUE VAMOS A APRENDER:
 * ----------------------------------
 * - Módulos (import/export)
 * - Funciones asíncronas (async/await)
 * - Promesas (Promise)
 * - Objetos y destructuring
 * - Manejo de errores (try/catch)
 * - Variables de entorno (process.env)
 */

// ═══════════════════════════════════════════════════════════════════════════
// 📦 IMPORTAR HERRAMIENTAS (LIBRERÍAS) QUE NECESITAMOS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🔧 ¿QUÉ ES UN "IMPORT"?
 * 
 * "import" es como ir a una tienda de herramientas y comprar lo que necesitas.
 * 
 * Ejemplo del mundo real:
 * - Si quieres hacer un mueble, necesitas: martillo, clavos, sierra
 * - En programación, si quieres hacer un servidor, necesitas: json-server, axios, fs
 * 
 * Sintaxis:
 *   import nombreHerramienta from "nombre-paquete";
 * 
 * ¿De dónde vienen estas herramientas?
 * - Del archivo package.json (sección "dependencies")
 * - Se descargan con "npm install"
 */

/**
 * 📚 JSON-SERVER
 * 
 * ¿Qué es?
 * - Una librería que convierte un archivo JSON en una API REST completa
 * - Es como magia: le das un JSON y te devuelve un servidor funcionando
 * 
 * ¿Para qué lo usamos?
 * - Crear el servidor web
 * - Gestionar las rutas (endpoints)
 * - Hacer que funcionen las peticiones GET, POST, PUT, DELETE
 * 
 * Documentación: https://github.com/typicode/json-server
 */
import jsonServer from "json-server";

/**
 * 🌐 AXIOS
 * 
 * ¿Qué es?
 * - Una librería para hacer peticiones HTTP (descargar cosas de internet)
 * 
 * ¿Para qué lo usamos?
 * - Descargar el archivo JSON desde una URL externa (si existe DATA_URL)
 * 
 * Ejemplo:
 *   axios.get("https://ejemplo.com/datos.json")
 *   → Descarga el archivo datos.json de esa URL
 * 
 * Documentación: https://axios-http.com/
 */
import axios from "axios";

/**
 * 📁 FS (FILE SYSTEM)
 * 
 * ¿Qué es?
 * - Herramienta de Node.js para trabajar con archivos y carpetas
 * - "fs" significa "File System" (Sistema de Archivos)
 * 
 * ¿Para qué lo usamos?
 * - Leer el archivo db-grande.json del disco duro
 * 
 * fs/promises vs fs:
 * - fs/promises → Versión moderna con async/await
 * - fs → Versión antigua (síncrona)
 * 
 * Ejemplo:
 *   fs.readFile("archivo.json") → Lee el contenido de archivo.json
 */
import fs from "fs/promises";

/**
 * 🗂️ PATH
 * 
 * ¿Qué es?
 * - Herramienta para trabajar con rutas de archivos
 * 
 * ¿Para qué lo usamos?
 * - Construir rutas de archivos de forma segura
 * - Funciona en Windows, Mac y Linux
 * 
 * Ejemplo:
 *   Windows: C:\Users\Jorge\archivo.json
 *   Mac/Linux: /home/jorge/archivo.json
 *   path.join() → Crea la ruta correcta según el sistema operativo
 */
import path from "path";

/**
 * 🔗 FILE URL TO PATH
 * 
 * ¿Qué es?
 * - Convierte URLs de archivos a rutas del sistema
 * 
 * ¿Para qué lo usamos?
 * - En módulos ES6, no existe la variable __dirname
 * - Necesitamos crearla manualmente usando esta herramienta
 * 
 * __dirname = Ruta de la carpeta donde está este archivo
 */
import { fileURLToPath } from "url";

// ═══════════════════════════════════════════════════════════════════════════
// ⚙️ CONFIGURACIÓN INICIAL DEL SERVIDOR
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🌍 VARIABLES DE ENTORNO
 * 
 * ¿Qué es process.env?
 * - Es un objeto que contiene variables de configuración del sistema
 * - Las variables de entorno son como "ajustes globales" del programa
 * 
 * ¿Por qué usar variables de entorno?
 * - Para configurar cosas sin modificar el código
 * - Para tener diferentes configuraciones según el entorno (desarrollo, producción)
 * 
 * Ejemplos de variables de entorno:
 *   process.env.PORT → Puerto donde corre el servidor (lo asigna Render)
 *   process.env.DATA_URL → URL externa con datos JSON (opcional)
 *   process.env.NODE_ENV → Entorno: "development" o "production"
 * 
 * ¿Cómo se definen?
 * - En Render.com: Dashboard → Environment → Add Variable
 * - En local: Crear archivo .env con: DATA_URL=https://...
 */
const DATA_URL = process.env.DATA_URL;

/**
 * 💡 EXPLICACIÓN DE DATA_URL:
 * 
 * Si DATA_URL existe (tiene un valor):
 *   → El servidor descargará los datos desde esa URL
 *   → Útil si el archivo JSON está en GitHub Gist, Dropbox, etc.
 * 
 * Si DATA_URL NO existe (undefined):
 *   → El servidor leerá db-grande.json del disco local
 * 
 * Ejemplo de uso:
 *   DATA_URL = "https://gist.githubusercontent.com/.../datos.json"
 */

/**
 * 📂 OBTENER __DIRNAME (RUTA DE LA CARPETA ACTUAL)
 * 
 * 🤔 ¿Qué es __dirname?
 * - Es la ruta completa de la carpeta donde está este archivo
 * 
 * Ejemplo:
 *   Si server.js está en: C:\Users\Jorge\proyecto\server.js
 *   __dirname sería:      C:\Users\Jorge\proyecto\
 * 
 * ❓ ¿Por qué necesitamos hacer esto?
 * - En módulos ES6 (type: "module"), __dirname no existe automáticamente
 * - Tenemos que crearlo manualmente
 * 
 * 🔧 ¿Cómo lo hacemos?
 * 1. import.meta.url → URL del archivo actual
 *    Ejemplo: "file:///C:/Users/Jorge/proyecto/server.js"
 * 
 * 2. fileURLToPath() → Convertir URL a ruta del sistema
 *    Ejemplo: "C:\Users\Jorge\proyecto\server.js"
 * 
 * 3. path.dirname() → Extraer solo la carpeta (sin el nombre del archivo)
 *    Ejemplo: "C:\Users\Jorge\proyecto\"
 */
const __filename = fileURLToPath(import.meta.url);  // Ruta completa del archivo
const __dirname = path.dirname(__filename);          // Ruta de la carpeta

// ═══════════════════════════════════════════════════════════════════════════
// 🏗️ CREAR EL SERVIDOR
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🌐 CREAR SERVIDOR EXPRESS
 * 
 * ¿Qué hace jsonServer.create()?
 * - Crea un servidor web básico usando Express.js
 * - Express es un framework para crear servidores web en Node.js
 * 
 * Piensa en esto como:
 * - Construir el "edificio" del servidor
 * - Todavía está vacío, pero ya tiene la estructura básica
 * 
 * La variable "server" representa nuestro servidor web
 */
const server = jsonServer.create();

/**
 * 🛠️ MIDDLEWARES POR DEFECTO
 * 
 * ¿Qué es un middleware?
 * - Es como un "filtro" o "paso intermedio" que procesa las peticiones
 * - Las peticiones pasan por los middlewares antes de llegar a su destino
 * 
 * Analogía del mundo real:
 * - Imagina un aeropuerto:
 *   1. Check-in (middleware)
 *   2. Control de seguridad (middleware)
 *   3. Embarque (destino final)
 * 
 * ¿Qué hace jsonServer.defaults()?
 * - Activa 3 middlewares útiles:
 *   1. CORS → Permite peticiones desde otros dominios
 *   2. Logger → Muestra en consola las peticiones que llegan
 *   3. Static → Sirve archivos estáticos (HTML, CSS, imágenes)
 * 
 * Ejemplo de lo que hace el logger:
 *   GET /productos 200 25ms
 *   POST /productos 201 10ms
 */
const middlewares = jsonServer.defaults();

/**
 * 🔌 USAR LOS MIDDLEWARES
 * 
 * server.use() → Decirle al servidor que use estos middlewares
 * 
 * Es como decir: "Todas las peticiones deben pasar por aquí primero"
 */
server.use(middlewares);

/**
 * 📦 BODY PARSER
 * 
 * ¿Qué hace jsonServer.bodyParser?
 * - Convierte el cuerpo de las peticiones POST/PUT en objetos JavaScript
 * 
 * Ejemplo:
 *   Cliente envía: '{"nombre": "Producto nuevo", "precio": 19.99}'
 *   Body parser convierte a: { nombre: "Producto nuevo", precio: 19.99 }
 * 
 * Sin body parser:
 *   → Recibiríamos solo texto y tendríamos que parsearlo manualmente
 * 
 * Con body parser:
 *   → Recibimos directamente un objeto JavaScript listo para usar
 */
server.use(jsonServer.bodyParser);

// ═══════════════════════════════════════════════════════════════════════════
// 🔀 RUTAS PERSONALIZADAS (REWRITE RULES)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🛣️ REESCRITURA DE RUTAS
 * 
 * ¿Qué hace jsonServer.rewriter()?
 * - Permite crear "alias" o "atajos" para las rutas
 * - Hace las URLs más amigables y fáciles de recordar
 * 
 * 🤔 ¿Por qué hacer esto?
 * - URL original: /productos
 * - URL con alias: /api/productos (más profesional)
 * 
 * Analogía:
 * - Es como poner un cartel que dice: "La biblioteca está por aquí →"
 * - El visitante sigue el cartel y llega al lugar correcto
 */
server.use(jsonServer.rewriter({
  
  /**
   * 🔀 REGLA 1: PREFIX /api
   * 
   * Patrón: "/api/*"
   * Destino: "/$1"
   * 
   * ¿Qué significa esto?
   * - * → Cualquier cosa
   * - $1 → Reemplazar con lo que capturamos en *
   * 
   * Ejemplos de transformación:
   *   Cliente pide: /api/productos
   *   Servidor entiende: /productos
   * 
   *   Cliente pide: /api/categorias
   *   Servidor entiende: /categorias
   * 
   *   Cliente pide: /api/productos/1
   *   Servidor entiende: /productos/1
   * 
   * 💡 Así podemos usar /api/ en todas las peticiones sin modificar json-server
   */
  "/api/*": "/$1",
  
  /**
   * 🔀 REGLA 2: CATEGORÍA DE UN PRODUCTO
   * 
   * Patrón: "/productos/:id/categoria"
   * Destino: "/categorias?id=:id"
   * 
   * ¿Qué hace?
   * - Transforma una URL "anidada" en una búsqueda por ID
   * 
   * Ejemplo:
   *   Cliente pide: /productos/5/categoria
   *   Servidor busca: /categorias?id=5
   * 
   * 🤔 ¿Por qué?
   * - Es más intuitivo pedir "la categoría del producto 5"
   * - En vez de buscar manualmente en /categorias
   * 
   * Nota: :id es un "parámetro" que se reemplaza con el número real
   */
  "/productos/:id/categoria": "/categorias?id=:id",
  
  /**
   * 🔀 REGLA 3: PROVEEDOR DE UN PRODUCTO
   * 
   * Igual que la regla anterior, pero para proveedores
   * 
   * Ejemplo:
   *   Cliente pide: /productos/10/proveedor
   *   Servidor busca: /proveedores?id=10
   */
  "/productos/:id/proveedor": "/proveedores?id=:id"
}));

// ═══════════════════════════════════════════════════════════════════════════
// 🔧 NORMALIZACIÓN DE DATOS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 📊 FUNCIÓN DE NORMALIZACIÓN
 * 
 * ¿Qué es "normalizar"?
 * - Es limpiar y organizar los datos para que sean más eficientes
 * - Eliminar información duplicada o innecesaria
 * 
 * 🤔 ¿POR QUÉ NECESITAMOS NORMALIZAR?
 * 
 * Problema: JSON con objetos embebidos
 * ❌ MAL (archivo muy pesado):
 *   {
 *     "id": 1,
 *     "nombre": "Tomate",
 *     "categoria": {
 *       "id": 1,
 *       "nombre": "Frutas",
 *       "descripcion": "Frutas frescas..."
 *     }
 *   }
 * 
 * Si tenemos 200,000 productos, estamos repitiendo la info de categoría 200,000 veces!
 * 
 * Solución: Usar solo el ID de la categoría
 * ✅ BIEN (archivo ligero):
 *   {
 *     "id": 1,
 *     "nombre": "Tomate",
 *     "categoriaId": 1
 *   }
 * 
 * Luego, json-server puede "expandir" la relación cuando lo necesitemos:
 *   GET /productos?_expand=categoria
 * 
 * @param {Object} db - Base de datos con proveedores, categorias y productos
 * @returns {Object} - Base de datos normalizada (sin objetos embebidos)
 */
function normalizeDB(db) {
  
  /**
   * 🎁 DESTRUCTURING (DESESTRUCTURACIÓN)
   * 
   * ¿Qué hace esto?
   *   const { proveedores = [], categorias = [], productos = [] } = db;
   * 
   * Es una forma corta de extraer propiedades de un objeto.
   * 
   * Forma larga (sin destructuring):
   *   const proveedores = db.proveedores || [];
   *   const categorias = db.categorias || [];
   *   const productos = db.productos || [];
   * 
   * Forma corta (con destructuring):
   *   const { proveedores = [], categorias = [], productos = [] } = db;
   * 
   * El = [] significa: "Si no existe, usar array vacío"
   * 
   * Ejemplo paso a paso:
   *   Si db = { proveedores: [1,2,3], categorias: [4,5] }
   *   Entonces:
   *     proveedores = [1,2,3]
   *     categorias = [4,5]
   *     productos = [] (porque no existe en db, usa el valor por defecto)
   */
  const { proveedores = [], categorias = [], productos = [] } = db;
  
  /**
   * 🧹 LIMPIAR PRODUCTOS (ELIMINAR OBJETOS EMBEBIDOS)
   * 
   * ¿Qué hace .map()?
   * - Recorre cada elemento del array
   * - Aplica una transformación a cada elemento
   * - Devuelve un nuevo array con los elementos transformados
   * 
   * Analogía:
   * - Tienes una lista de manzanas sucias
   * - .map() es como lavarlas una por una
   * - Obtienes una nueva lista con manzanas limpias
   * 
   * Sintaxis:
   *   array.map(elemento => transformación)
   * 
   * Ejemplo simple:
   *   [1, 2, 3].map(x => x * 2) → [2, 4, 6]
   */
  const productosNormalizados = productos.map(p => {
    
    /**
     * 🎁 DESTRUCTURING AVANZADO
     * 
     * ¿Qué hace esto?
     *   const { categoria, proveedor, ...rest } = p;
     * 
     * Explicación:
     * 1. Extraer "categoria" del producto (para descartarlo)
     * 2. Extraer "proveedor" del producto (para descartarlo)
     * 3. ...rest = TODO LO DEMÁS (spread operator)
     * 
     * Ejemplo con un producto:
     *   p = {
     *     id: 1,
     *     nombre: "Tomate",
     *     precio: 2.5,
     *     categoriaId: 1,
     *     categoria: { id: 1, nombre: "Frutas" },  ← Lo eliminamos
     *     proveedorId: 2,
     *     proveedor: { id: 2, nombre: "Prov2" }    ← Lo eliminamos
     *   }
     * 
     * Después del destructuring:
     *   categoria = { id: 1, nombre: "Frutas" }     ← NO lo usamos
     *   proveedor = { id: 2, nombre: "Prov2" }      ← NO lo usamos
     *   rest = {
     *     id: 1,
     *     nombre: "Tomate",
     *     precio: 2.5,
     *     categoriaId: 1,
     *     proveedorId: 2
     *   }  ← ESTO SÍ lo devolvemos
     * 
     * 💡 El operador ... (spread) significa "todo lo demás"
     */
    const {
      categoria,   // Extraemos para descartar
      proveedor,   // Extraemos para descartar
      ...rest      // TODO LO DEMÁS lo guardamos aquí
    } = p;
    
    /**
     * Devolvemos solo "rest" (el producto sin objetos embebidos)
     */
    return rest;
  });
  
  /**
   * 📦 DEVOLVER BASE DE DATOS NORMALIZADA
   * 
   * Estructura final:
   *   {
   *     proveedores: [array original sin cambios],
   *     categorias: [array original sin cambios],
   *     productos: [array limpio, sin objetos embebidos]
   *   }
   */
  return {
    proveedores,
    categorias,
    productos: productosNormalizados
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// 📥 CARGA DE DATOS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 📂 FUNCIÓN PARA CARGAR DATOS LOCALES
 * 
 * ¿Qué hace esta función?
 * - Lee el archivo db-grande.json del disco duro
 * - Lo convierte de texto JSON a objeto JavaScript
 * - Lo devuelve para que podamos usarlo
 * 
 * 🔄 ASYNC/AWAIT (FUNCIONES ASÍNCRONAS)
 * 
 * ¿Por qué "async"?
 * - Leer archivos es una operación "lenta" (puede tardar)
 * - No queremos que el programa se "congele" esperando
 * - "async" permite que el programa haga otras cosas mientras espera
 * 
 * ¿Qué es "await"?
 * - Significa "espera a que esto termine"
 * - Solo se puede usar dentro de funciones "async"
 * 
 * Analogía:
 * - Pides comida a domicilio (async)
 * - Mientras esperas, ves la tele (el programa sigue funcionando)
 * - Cuando llega la comida (await), la comes
 * 
 * @returns {Promise<Object>} - Promesa que devuelve los datos del JSON
 */
async function loadLocal() {
  
  /**
   * 🗺️ CONSTRUIR RUTA DEL ARCHIVO
   * 
   * ¿Qué hace path.join()?
   * - Une partes de una ruta de forma segura
   * - Funciona en Windows, Mac y Linux
   * 
   * Ejemplo:
   *   __dirname = "C:\Users\Jorge\proyecto"
   *   path.join(__dirname, "db-grande.json")
   *   Resultado: "C:\Users\Jorge\proyecto\db-grande.json"
   * 
   * 💡 path.join() añade las barras / o \ automáticamente según el sistema operativo
   */
  const filePath = path.join(__dirname, "db-grande.json");
  
  /**
   * 📋 MOSTRAR RUTA EN CONSOLA
   * 
   * Para que el usuario sepa qué archivo estamos intentando cargar
   */
  console.log("📂 Intentando cargar archivo local:", filePath);
  
  /**
   * 📖 LEER ARCHIVO
   * 
   * ¿Qué hace fs.readFile()?
   * - Lee el contenido de un archivo
   * - Devuelve una Promesa (por eso usamos await)
   * 
   * Parámetros:
   * 1. filePath → Ruta del archivo a leer
   * 2. "utf8" → Codificación del texto (estándar para JSON)
   * 
   * await → Esperar a que termine de leer el archivo
   * 
   * Ejemplo:
   *   contenido = '{"productos": [{"id": 1}]}'
   */
  const contenido = await fs.readFile(filePath, "utf8");
  
  /**
   * 🔄 CONVERTIR JSON (TEXTO) A OBJETO JAVASCRIPT
   * 
   * ¿Qué hace JSON.parse()?
   * - Convierte texto JSON en objeto JavaScript
   * 
   * Ejemplo:
   *   Entrada (texto): '{"nombre": "Juan", "edad": 25}'
   *   Salida (objeto): { nombre: "Juan", edad: 25 }
   * 
   * Ahora podemos acceder a: objeto.nombre, objeto.edad, etc.
   */
  return JSON.parse(contenido);
}

/**
 * 🌐 FUNCIÓN PARA CARGAR DATOS (LOCAL O REMOTO)
 * 
 * ¿Qué hace esta función?
 * - Decide de dónde cargar los datos:
 *   1. Si existe DATA_URL → Descargar de internet
 *   2. Si no existe DATA_URL → Leer de disco local
 * 
 * 🎯 PRIORIDAD:
 * 1️⃣ URL externa (si DATA_URL está definida)
 * 2️⃣ Archivo local (si DATA_URL NO está definida)
 * 
 * @returns {Promise<Object>} - Promesa que devuelve los datos
 */
async function loadDB() {
  
  /**
   * 🔍 COMPROBAR SI EXISTE DATA_URL
   * 
   * if (DATA_URL) pregunta: "¿DATA_URL tiene un valor?"
   * 
   * Valores que cuentan como "verdadero":
   *   DATA_URL = "https://ejemplo.com/datos.json" → true
   *   DATA_URL = "cualquier texto" → true
   * 
   * Valores que cuentan como "falso":
   *   DATA_URL = undefined → false
   *   DATA_URL = null → false
   *   DATA_URL = "" → false
   */
  if (DATA_URL) {
    
    /**
     * 🌍 DESCARGAR DATOS DE INTERNET
     */
    console.log("🌐 Cargando datos desde URL externa:", DATA_URL);
    console.log("⏳ Esto puede tardar unos segundos para archivos grandes...");
    
    /**
     * 📥 HACER PETICIÓN HTTP
     * 
     * ¿Qué hace axios.get()?
     * - Hace una petición GET a la URL especificada
     * - Descarga el contenido de esa URL
     * - Devuelve una Promesa (por eso usamos await)
     * 
     * Parámetros:
     * 1. DATA_URL → La URL de donde descargar
     * 2. { timeout: 120000 } → Configuración extra
     * 
     * ¿Qué es timeout?
     * - Tiempo máximo de espera antes de cancelar
     * - 120000 ms = 120 segundos = 2 minutos
     * - Si tarda más de 2 minutos, da error
     * 
     * ¿Qué devuelve?
     * - Un objeto con información de la respuesta:
     *   {
     *     data: { ... },      ← Los datos que descargamos (JSON)
     *     status: 200,        ← Código HTTP (200 = OK)
     *     headers: { ... }    ← Cabeceras de la respuesta
     *   }
     * 
     * Destructuring: const { data } = ...
     * - Solo extraemos la propiedad "data" (los datos)
     * - Ignoramos status, headers, etc.
     */
    const { data } = await axios.get(DATA_URL, { 
      timeout: 120000
    });
    
    console.log("✅ Datos descargados correctamente");
    
    /**
     * Devolver los datos descargados
     */
    return data;
  }
  
  /**
   * 💾 CARGAR DESDE ARCHIVO LOCAL
   * 
   * Si llegamos aquí, es porque DATA_URL NO existe
   * Entonces cargamos desde db-grande.json local
   */
  console.log("💾 Cargando datos desde archivo local db-grande.json");
  
  /**
   * Llamar a la función loadLocal() que definimos antes
   * await → Esperar a que termine de leer el archivo
   */
  return await loadLocal();
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚀 ARRANQUE DEL SERVIDOR (FUNCIÓN PRINCIPAL)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🎯 FUNCIÓN PRINCIPAL DEL PROGRAMA
 * 
 * ¿Qué hace esta función?
 * - Es el "cerebro" del servidor
 * - Coordina todo el proceso de inicio
 * 
 * 📋 FLUJO DE EJECUCIÓN:
 * 1. Cargar datos (de URL o archivo local)
 * 2. Normalizar datos (limpiar objetos embebidos)
 * 3. Crear router de json-server
 * 4. Iniciar el servidor en un puerto
 * 5. Mostrar información en consola
 * 
 * ❓ ¿Por qué async?
 * - Porque usa await para cargar datos
 * - Las operaciones de red y archivos son asíncronas
 */
async function boot() {
  
  /**
   * 🛡️ TRY-CATCH (MANEJO DE ERRORES)
   * 
   * ¿Qué es try-catch?
   * - Es como poner una "red de seguridad" al código
   * - Si algo falla, no se cierra el programa abruptamente
   * 
   * Analogía:
   * - try = "Intenta hacer esto"
   * - catch = "Si falla, haz esto otro"
   * 
   * Estructura:
   *   try {
   *     // Código que puede fallar
   *   } catch (error) {
   *     // Código que se ejecuta si falla
   *   }
   * 
   * Ejemplo del mundo real:
   *   try {
   *     Abrir la puerta con llave
   *   } catch (error) {
   *     Llamar al cerrajero
   *   }
   */
  try {
    
    // ═══════════════════════════════════════════════════════════════════════
    // 1️⃣ CARGAR DATOS
    // ═══════════════════════════════════════════════════════════════════════
    
    console.log("\n🚀 Iniciando servidor JSON-Server...\n");
    
    /**
     * 📥 LLAMAR A loadDB()
     * 
     * - Carga los datos (de URL o archivo local)
     * - await espera a que termine
     * - Guarda el resultado en "datosOriginales"
     * 
     * datosOriginales contendrá:
     *   {
     *     proveedores: [...],
     *     categorias: [...],
     *     productos: [...]
     *   }
     */
    const datosOriginales = await loadDB();
    
    // ═══════════════════════════════════════════════════════════════════════
    // 2️⃣ NORMALIZAR DATOS
    // ═══════════════════════════════════════════════════════════════════════
    
    console.log("🔧 Normalizando base de datos...");
    
    /**
     * 🧹 LIMPIAR DATOS
     * 
     * - Llama a la función normalizeDB() que definimos antes
     * - Elimina objetos embebidos de los productos
     * - Guarda el resultado en "dbNormalizada"
     */
    const dbNormalizada = normalizeDB(datosOriginales);
    
    /**
     * 📊 MOSTRAR ESTADÍSTICAS
     * 
     * ¿Qué hace .length?
     * - Devuelve la cantidad de elementos en un array
     * 
     * Ejemplo:
     *   [1, 2, 3].length → 3
     *   ["a", "b"].length → 2
     * 
     * ¿Qué hace el operador ||?
     * - Es el operador "O" lógico
     * - Si lo de la izquierda es "falso", usa lo de la derecha
     * 
     * Ejemplo:
     *   dbNormalizada.proveedores?.length || 0
     * 
     * Si proveedores existe → usar su .length
     * Si proveedores NO existe → usar 0
     * 
     * ¿Qué hace el ?. (optional chaining)?
     * - Es como preguntar "¿existe esto?"
     * - Si existe → continuar
     * - Si NO existe → devolver undefined
     * 
     * Ejemplo sin ?.:
     *   dbNormalizada.proveedores.length → ERROR si proveedores no existe
     * 
     * Ejemplo con ?.:
     *   dbNormalizada.proveedores?.length → undefined si proveedores no existe
     */
    console.log("📊 Estadísticas de la base de datos:");
    console.log(`   - Proveedores: ${dbNormalizada.proveedores?.length || 0}`);
    console.log(`   - Categorías: ${dbNormalizada.categorias?.length || 0}`);
    console.log(`   - Productos: ${dbNormalizada.productos?.length || 0}`);
    
    // ═══════════════════════════════════════════════════════════════════════
    // 3️⃣ CREAR ROUTER DE JSON-SERVER
    // ═══════════════════════════════════════════════════════════════════════
    
    /**
     * 🛣️ CREAR RUTAS AUTOMÁTICAS
     * 
     * ¿Qué hace jsonServer.router()?
     * - Crea todas las rutas (endpoints) automáticamente
     * - Detecta las relaciones entre tablas (categoriaId, proveedorId)
     * - Habilita operaciones CRUD (Create, Read, Update, Delete)
     * 
     * Rutas que crea automáticamente:
     *   GET    /proveedores          → Listar todos
     *   GET    /proveedores/1        → Obtener uno
     *   POST   /proveedores          → Crear uno nuevo
     *   PUT    /proveedores/1        → Actualizar completo
     *   PATCH  /proveedores/1        → Actualizar parcial
     *   DELETE /proveedores/1        → Eliminar
     * 
     * Y lo mismo para categorias y productos!
     * 
     * 🔗 Relaciones automáticas:
     *   GET /productos?_expand=categoria    → Expandir categoría
     *   GET /productos?_expand=proveedor    → Expandir proveedor
     *   GET /categorias/1?_embed=productos  → Productos de esa categoría
     * 
     * 💡 json-server detecta automáticamente que:
     *   - productos tiene categoriaId → Relación con categorias
     *   - productos tiene proveedorId → Relación con proveedores
     */
    const router = jsonServer.router(dbNormalizada);
    
    /**
     * 🔌 CONECTAR ROUTER AL SERVIDOR
     * 
     * server.use(router) → Decirle al servidor que use estas rutas
     */
    server.use(router);
    
    // ═══════════════════════════════════════════════════════════════════════
    // 4️⃣ INICIAR SERVIDOR
    // ═══════════════════════════════════════════════════════════════════════
    
    /**
     * 🔌 OBTENER PUERTO
     * 
     * ¿Qué es un puerto?
     * - Es como una "puerta" por donde entran las peticiones
     * - Los servidores web usan puertos para escuchar peticiones
     * 
     * Puertos comunes:
     *   80 → HTTP (navegadores web)
     *   443 → HTTPS (navegadores seguros)
     *   3000 → Desarrollo local
     * 
     * ¿Por qué process.env.PORT?
     * - En Render.com, el puerto lo asigna automáticamente el sistema
     * - No podemos elegirlo nosotros
     * - Render nos dice: "Usa el puerto que está en process.env.PORT"
     * 
     * ¿Qué hace || 3000?
     * - Es el operador "O"
     * - Si process.env.PORT existe → usar ese puerto
     * - Si process.env.PORT NO existe → usar 3000 (para desarrollo local)
     * 
     * Ejemplo:
     *   En Render: process.env.PORT = 10000 → puerto = 10000
     *   En local: process.env.PORT = undefined → puerto = 3000
     */
    const port = process.env.PORT || 3000;
    
    /**
     * 🚀 ESCUCHAR PETICIONES
     * 
     * ¿Qué hace server.listen()?
     * - Inicia el servidor
     * - Empieza a "escuchar" peticiones en el puerto especificado
     * - Es como "abrir la tienda" para que entren clientes
     * 
     * Parámetros:
     * 1. port → Puerto donde escuchar (ej: 3000)
     * 2. () => { ... } → Función callback que se ejecuta cuando el servidor está listo
     * 
     * Analogía:
     * - Abres una tienda (server.listen)
     * - La tienda está en la calle "Puerto 3000"
     * - Cuando todo está listo, cuelgas el cartel "Abierto" (callback)
     */
    server.listen(port, () => {
      
      /**
       * 📋 ESTE CÓDIGO SE EJECUTA CUANDO EL SERVIDOR ESTÁ LISTO
       * 
       * Mostramos información útil en la consola
       */
      
      console.log("\n✅ Servidor JSON-Server corriendo exitosamente!");
      console.log(`🌍 URL: http://localhost:${port}`);
      console.log("\n📚 ENDPOINTS DISPONIBLES:");
      console.log(`   GET    ${port}/proveedores`);
      console.log(`   GET    ${port}/categorias`);
      console.log(`   GET    ${port}/productos`);
      console.log(`   GET    ${port}/productos?_expand=categoria`);
      console.log(`   GET    ${port}/productos?_expand=proveedor`);
      console.log(`   GET    ${port}/categorias/1/productos`);
      console.log(`   POST   ${port}/productos`);
      console.log(`   PUT    ${port}/productos/1`);
      console.log(`   DELETE ${port}/productos/1`);
      console.log("\n💡 Consulta la documentación en: https://github.com/typicode/json-server\n");
    });
    
  } catch (error) {
    
    /**
     * ❌ ESTE CÓDIGO SE EJECUTA SI HAY UN ERROR
     * 
     * "error" es un objeto que contiene información del error:
     * - error.message → Descripción del error
     * - error.stack → Traza del error (para debugging)
     */
    
    console.error("\n❌ ERROR AL INICIAR EL SERVIDOR:");
    console.error(error.message);
    console.error("\n🔍 Posibles causas:");
    console.error("   - El archivo db-grande.json no existe");
    console.error("   - El archivo no es un JSON válido");
    console.error("   - La URL externa no es accesible");
    console.error("   - Problemas de red o timeout");
    
    /**
     * 🛑 CERRAR EL PROGRAMA
     * 
     * process.exit(1) → Terminar el programa con código de error
     * 
     * Códigos de salida:
     *   0 → Todo fue bien (éxito)
     *   1 → Hubo un error (fracaso)
     * 
     * En sistemas Unix/Linux, otros programas pueden leer este código
     * para saber si todo salió bien o hubo un problema.
     */
    process.exit(1);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎬 INICIAR TODO EL PROGRAMA
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🚀 EJECUTAR LA FUNCIÓN boot()
 * 
 * boot() → Llamar a la función principal
 * .catch() → Capturar errores que no hayan sido atrapados por try-catch
 * 
 * ¿Por qué dos niveles de manejo de errores?
 * 1. try-catch → Errores esperados (archivo no existe, red caída, etc.)
 * 2. .catch() → Errores inesperados (bugs en el código, errores de sintaxis, etc.)
 * 
 * Es como tener:
 * - Airbag (try-catch) → Para choques esperados
 * - Cinturón de seguridad (.catch) → Para cualquier imprevisto
 */
boot().catch(err => {
  console.error("\n💥 Error crítico no manejado:", err);
  process.exit(1);
});

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🎓 RESUMEN PARA ALUMNOS
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ¿QUÉ HEMOS APRENDIDO?
 * 
 * 1. 📦 MÓDULOS (import/export)
 *    - import → Traer herramientas de otros archivos
 *    - export → Compartir código con otros archivos
 * 
 * 2. ⚡ ASYNC/AWAIT (Asincronía)
 *    - async → Función que puede esperar
 *    - await → Esperar a que algo termine
 *    - Usado para operaciones lentas (archivos, red)
 * 
 * 3. 🎁 DESTRUCTURING (Desestructuración)
 *    - const { a, b } = objeto → Extraer propiedades
 *    - const { a, ...rest } = objeto → Extraer y guardar el resto
 * 
 * 4. 🛡️ TRY-CATCH (Manejo de errores)
 *    - try → Intentar código que puede fallar
 *    - catch → Hacer algo si falla
 * 
 * 5. 🔗 PROMESAS (Promises)
 *    - Son como "vales" que prometen un resultado futuro
 *    - Usadas para operaciones asíncronas
 * 
 * 6. 🌐 VARIABLES DE ENTORNO
 *    - process.env → Configuración del sistema
 *    - Útil para diferentes entornos (desarrollo, producción)
 * 
 * 7. 🛣️ MIDDLEWARES
 *    - Funciones que procesan peticiones antes de llegar al destino
 *    - Como filtros o "puntos de control"
 * 
 * 8. 🔌 SERVIDORES WEB
 *    - server.listen() → Iniciar servidor
 *    - Escucha peticiones en un puerto
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * ❓ PREGUNTAS FRECUENTES
 * 
 * P: ¿Por qué usar async/await en vez de callbacks?
 * R: Es más fácil de leer y entender. Evita el "callback hell".
 * 
 * P: ¿Qué pasa si no uso try-catch?
 * R: El programa se cierra abruptamente si hay un error.
 * 
 * P: ¿Por qué normalizar los datos?
 * R: Para que el archivo JSON sea más pequeño y eficiente.
 * 
 * P: ¿Qué es json-server?
 * R: Una librería que convierte JSON en API REST automáticamente.
 * 
 * P: ¿Por qué usar variables de entorno?
 * R: Para cambiar configuraciones sin modificar el código.
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */
