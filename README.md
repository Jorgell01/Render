# 🚀 JSON Server en Render.com - Guía Educativa

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

> **Proyecto educativo** para aprender a desplegar APIs REST simuladas usando json-server en Render.com
> 
> ⚠️ **No necesitas instalar nada en tu ordenador** - Todo se hace desde el navegador

---

## 📚 Índice

- [¿Qué es este proyecto?](#-qué-es-este-proyecto)
- [¿Qué necesito?](#-qué-necesito)
- [Opción 1: Fork y Deploy (SIN instalar nada)](#-opción-1-fork-y-deploy-sin-instalar-nada)
- [Opción 2: Crear desde cero (Avanzado)](#-opción-2-crear-desde-cero-avanzado)
- [Configuración en Render.com](#-configuración-en-rendercom)
- [Usar tu API](#-usar-tu-api)
- [Endpoints disponibles](#-endpoints-disponibles)
- [Ejemplos con el navegador](#-ejemplos-con-el-navegador)
- [Personalizar los datos](#-personalizar-los-datos)
- [Solución de problemas](#-solución-de-problemas)

---

## 🎯 ¿Qué es este proyecto?

Este proyecto es una **API REST completa** que funciona en la nube de forma **GRATUITA**. 

### ¿Para qué sirve?

- 📖 **Aprender** a consumir APIs REST sin montar un servidor
- 🧪 **Practicar** peticiones HTTP (GET, POST, PUT, DELETE)
- 🌐 **Tener tu propia API** en internet sin pagar nada
- 💻 **Hacer proyectos web** que necesiten datos reales

### ¿Qué hace este proyecto?

Simula la base de datos de una tienda con:
- 👥 **Proveedores** (empresas que suministran productos)
- 📦 **Categorías** (frutas, carnes, lácteos, etc.)
- 🛒 **Productos** (miles de productos con precios, stock, etc.)

---

## ✅ ¿Qué necesito?

**Solo necesitas 3 cosas (todo desde el navegador):**

1. 📧 Una cuenta de **GitHub** (gratis) → [Crear cuenta](https://github.com/signup)
2. ☁️ Una cuenta de **Render.com** (gratis) → [Crear cuenta](https://render.com/register)
3. 🌐 Un navegador web (Chrome, Firefox, Edge, Safari)

**NO necesitas:**
- ❌ Instalar Node.js
- ❌ Instalar npm
- ❌ Terminal o línea de comandos
- ❌ Permisos de administrador
- ❌ VS Code u otro editor

---

## 🎮 Opción 1: Fork y Deploy (SIN instalar nada)

### Paso 1: Hacer Fork del repositorio

1. Ve a este repositorio en GitHub: `https://github.com/TU_USUARIO/TU_REPO`
2. Click en el botón **"Fork"** (arriba a la derecha)
3. Espera unos segundos... ¡Ahora tienes tu propia copia!

![Fork button](https://docs.github.com/assets/cb-28613/mw-1440/images/help/repository/fork-button.webp)

### Paso 2: Conectar con Render.com

1. Ve a [Render.com](https://render.com) e inicia sesión
2. Click en **"New +"** → **"Web Service"**
3. Click en **"Connect GitHub"** (si es tu primera vez)
4. Busca tu repositorio forkeado (ej: `tu-usuario/render`)
5. Click en **"Connect"**

### Paso 3: Configurar el servicio

Rellena el formulario con estos datos:

```yaml
Name: mi-api-productos
Region: Frankfurt (Europe)
Branch: main
Runtime: Node
Build Command: npm install && node generar-db.js
Start Command: npm start
Instance Type: Free
```

**Importante:** El comando `node generar-db.js` creará automáticamente 200 productos (puedes cambiar las constantes del archivo en la clase `generar-db.js`).

### Paso 4: Desplegar

1. Click en **"Create Web Service"**
2. Espera 3-5 minutos (verás los logs en tiempo real)
3. Cuando veas **"Your service is live"** → ¡Ya está funcionando!

### Paso 5: Obtener tu URL

Render te dará una URL como:
```
https://mi-api-productos.onrender.com
```

**¡Felicidades! Ya tienes tu API funcionando en internet** 🎉

---

## 🔧 Opción 2: Crear desde cero (Avanzado)

Si prefieres crear el repositorio desde cero:

### Paso 1: Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com/new)
2. Nombre del repositorio: `mi-api-rest`
3. Público ✅
4. Añadir README (opcional)
5. Click en **"Create repository"**

### Paso 2: Subir archivos

1. En tu repositorio, click en **"Add file"** → **"Create new file"**
2. Copia y pega cada archivo de este repositorio:
   - `server.js`
   - `generar-db.js`
   - `db.json`
   - `package.json`
   - `.gitignore`

Para cada archivo:
- Pega el nombre del archivo (ej: `server.js`)
- Pega el contenido completo
- Click en **"Commit new file"**

### Paso 3: Desplegar en Render

Sigue los pasos del [Paso 2 de la Opción 1](#paso-2-conectar-con-rendercom)

---

## ⚙️ Configuración en Render.com

### Configuración básica (archivos pequeños)

Si usas `db.json` (50 productos):

```yaml
Build Command: npm install
Start Command: npm start
```

### Configuración para archivos grandes

Si quieres 200 o más productos:

```yaml
Build Command: npm install && node generar-db.js
Start Command: npm start
```

### Ajustar cantidad de productos

1. En GitHub, abre el archivo `generar-db.js`
2. Click en el lápiz ✏️ para editar
3. Busca esta línea:
   ```javascript
   const NUM_PRODUCTOS = 200; // ← Cambia este número
   ```
4. Cambia a la cantidad que quieras:
   - `1000` → Base de datos pequeña (~500 KB)
   - `10000` → Base de datos mediana (~3 MB)
   - `50000` → Base de datos grande (~15 MB)
   - `200000` → Base de datos muy grande (~60 MB)
5. Click en **"Commit changes"**
6. En Render, click en **"Manual Deploy"** → **"Deploy latest commit"**

---

## 🌐 Usar tu API

Una vez desplegada, puedes usar tu API desde:

### 1. Navegador web

Abre estas URLs en tu navegador:

```
https://tu-api.onrender.com/productos
https://tu-api.onrender.com/categorias
https://tu-api.onrender.com/proveedores
```

### 2. JavaScript (en tu web)

```javascript
// Obtener productos
fetch('https://tu-api.onrender.com/productos')
  .then(response => response.json())
  .then(data => console.log(data));
```

### 3. Extensiones de navegador

- **Chrome**: [JSON Viewer](https://chrome.google.com/webstore/detail/json-viewer)
- **Firefox**: Viene con visor JSON integrado

### 4. Herramientas online (sin instalar)

- [Hoppscotch](https://hoppscotch.io/) - Cliente API en el navegador
- [ReqBin](https://reqbin.com/) - Probador de APIs online

---

## 📡 Endpoints disponibles

Reemplaza `tu-api.onrender.com` por tu URL real.

### Ver todos los datos

```
GET https://tu-api.onrender.com/productos
GET https://tu-api.onrender.com/categorias
GET https://tu-api.onrender.com/proveedores
```

### Ver un elemento específico

```
GET https://tu-api.onrender.com/productos/1
GET https://tu-api.onrender.com/categorias/1
GET https://tu-api.onrender.com/proveedores/1
```

### Buscar y filtrar

```
GET /productos?precio_gte=10              # Precio mayor o igual a 10
GET /productos?precio_lte=50              # Precio menor o igual a 50
GET /productos?nombre_like=tomate         # Buscar "tomate"
GET /productos?categoriaId=1              # Productos de categoría 1
GET /productos?_sort=precio&_order=desc   # Ordenar por precio
```

### Paginación

```
GET /productos?_page=1&_limit=10          # Primera página, 10 productos
GET /productos?_page=2&_limit=20          # Segunda página, 20 productos
```

### Relaciones

```
GET /productos?_expand=categoria          # Productos con su categoría
GET /productos?_expand=proveedor          # Productos con su proveedor
GET /categorias/1?_embed=productos        # Categoría con sus productos
```

---

## 🖥️ Ejemplos con el navegador

### Ejemplo 1: Ver todos los productos

1. Abre tu navegador
2. Ve a: `https://tu-api.onrender.com/productos`
3. Verás algo como:

```json
[
  {
    "id": 1,
    "nombre": "Producto 1",
    "precio": 23.45,
    "stock": 150,
    "categoriaId": 1,
    "proveedorId": 1
  },
  ...
]
```

### Ejemplo 2: Buscar productos baratos

URL: `https://tu-api.onrender.com/productos?precio_lte=10`

### Ejemplo 3: Ver una categoría con sus productos

URL: `https://tu-api.onrender.com/categorias/1?_embed=productos`

### Ejemplo 4: Crear una página web simple

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi Tienda</title>
</head>
<body>
    <h1>Productos</h1>
    <div id="productos"></div>

    <script>
        // Cambia por tu URL
        fetch('https://tu-api.onrender.com/productos?_limit=10')
            .then(res => res.json())
            .then(productos => {
                const div = document.getElementById('productos');
                productos.forEach(p => {
                    div.innerHTML += `
                        <div>
                            <h3>${p.nombre}</h3>
                            <p>Precio: ${p.precio}€</p>
                            <p>Stock: ${p.stock}</p>
                        </div>
                    `;
                });
            });
    </script>
</body>
</html>
```

Guarda esto como `index.html` y ábrelo en tu navegador.

---

## 🎨 Personalizar los datos

### Cambiar la cantidad de productos

1. Ve a tu repositorio en GitHub
2. Abre `generar-db.js`
3. Click en ✏️ para editar
4. Cambia `NUM_PRODUCTOS = 200000` por el número que quieras
5. Commit changes
6. En Render → Manual Deploy

### Usar datos desde una URL externa

Si tienes tus propios datos en JSON:

1. Sube tu archivo a GitHub Gist, Dropbox o similar
2. Obtén el link directo (raw)
3. En Render → Environment → Add Environment Variable:
   ```
   DATA_URL = https://tu-url-con-datos.json
   ```
4. Redeploy

### Editar los datos existentes

1. En GitHub, abre `db.json`
2. Click en ✏️ para editar
3. Modifica el JSON (cuidado con la sintaxis)
4. Commit changes
5. Render se redespliegará automáticamente

---

## ❗ Solución de problemas

### Mi API no funciona o da error 500

**Solución:**
1. Ve a Render → Logs
2. Busca líneas rojas (errores)
3. Si dice "db-grande.json not found":
   - Revisa que el Build Command incluya: `node generar-db.js`
   - Redeploy manualmente

### La API es muy lenta

**Causas:**
- Free tier de Render "duerme" después de 15 min sin uso
- Primera petición tarda ~30 segundos en despertar

**Solución:**
- Espera 30 segundos en la primera petición
- Considera upgrade a plan de pago ($7/mes)

### No puedo editar archivos en GitHub desde móvil

**Solución:**
- Usa la versión de escritorio del navegador
- O descarga GitHub Mobile app
- O usa [github.dev](https://github.dev) (editor online)

### Quiero más de 200,000 productos pero GitHub no me deja

**Solución:**
1. Sube tu JSON a servicios externos:
   - Dropbox (hasta 2 GB gratis)
   - Google Drive (link público)
   - Cloudinary (para archivos grandes)

2. Usa variable de entorno `DATA_URL`

---

## 📚 Recursos de aprendizaje

### Tutoriales interactivos

- [Aprende REST API](https://restfulapi.net/) - Conceptos básicos
- [HTTP Codes](https://httpstatuses.com/) - Códigos de respuesta
- [JSON Tutorial](https://www.w3schools.com/js/js_json_intro.asp) - Aprender JSON

### Herramientas online (sin instalar)

- [Hoppscotch](https://hoppscotch.io/) - Probar APIs
- [JSONLint](https://jsonlint.com/) - Validar JSON
- [Mockaroo](https://www.mockaroo.com/) - Generar datos falsos


## 🆘 Soporte

### ¿Tienes dudas?

1. **Revisa la sección [Solución de problemas](#-solución-de-problemas)**
2. **Busca en los [Issues del repositorio](https://github.com/TU_USUARIO/TU_REPO/issues)**
3. **Abre un nuevo Issue** describiendo tu problema
4. **Contacta al profesor** si es una duda del curso

### Información útil para reportar problemas

Al abrir un Issue, incluye:
- ✅ URL de tu API en Render
- ✅ Captura de pantalla del error
- ✅ Logs de Render (si hay error 500)
- ✅ Pasos para reproducir el problema

---

## 📄 Licencia

Este proyecto es de uso educativo libre bajo licencia **MIT**.

Puedes:
- ✅ Usar para aprender
- ✅ Modificar como quieras
- ✅ Compartir con otros
- ✅ Usar en proyectos personales

---

## 🎓 Créditos

**Desarrollado para el curso de Desarrollo de Entornos Web**

**Tecnologías:**
- [Node.js](https://nodejs.org/) - Entorno de ejecución
- [json-server](https://github.com/typicode/json-server) - Servidor API
- [Render.com](https://render.com) - Hosting gratuito

**Autor:** [Jorge]  
**Institución:** [IES Domingo Pérez Minik]  
**Año:** 2025-2026

---

## ⭐ Importante

### Primera petición lenta

El plan gratuito de Render "duerme" el servicio después de 15 minutos sin uso.

**La primera petición puede tardar 30-50 segundos**

Después de eso, funciona normal. Es completamente normal en el plan gratuito.

### Límites del plan gratuito

- ⏱️ Servicio se duerme tras 15 min inactivo
- 💾 512 MB RAM
- ⚡ CPU compartida
- 📦 100 GB bandwidth/mes
- 🔄 750 horas/mes

**Para uso educativo es más que suficiente** ✅

---

<div align="center">

### 🚀 ¿Listo para empezar?

**[📖 Volver al inicio](#-json-server-en-rendercom---guía-educativa)**

---

**Si te ha sido útil, dale una ⭐ en GitHub**

Dejate una estrellita, no seas rata.

</div>