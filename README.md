# 🅿️ Sistema de Gestión de Parqueadero – MongoDB

Este proyecto implementa una base de datos NoSQL usando **MongoDB** para gestionar el flujo de vehículos, usuarios y parqueos en distintas **sedes** y **zonas** de un parqueadero.

El modelo fue optimizado utilizando **documentos embebidos**, lo cual permite simplificar las consultas, reducir `$lookup` y mejorar la eficiencia de lectura.

---

## 🧱 Estructura de la Base de Datos

La base de datos se llama: `parqueadero`

### 📂 Colecciones principales:

| Colección   | Descripción |
|------------|-------------|
| `users`    | Usuarios del sistema: administradores, empleados y clientes |
| `vehiculos`| Vehículos registrados, con propietario embebido |
| `sedes`    | Sedes físicas del parqueadero, con zonas embebidas |
| `parqueos` | Registros de ingresos/salidas de vehículos con snapshots embebidos de usuario, sede, zona y vehículo |

---

## 🔗 Relaciones y Embebido

- **Zonas** están **embebidas dentro de cada sede**.
- **Propietario** está **embebido dentro de cada vehículo**.
- **Usuario, vehículo, sede y zona** están embebidos en `parqueos` para preservar **historial completo**.

> 🎯 Esto elimina la necesidad de hacer `$lookup` para la mayoría de operaciones de lectura.

---

## 👥 Roles y Seguridad

Se utilizan **roles personalizados** para controlar el acceso según el tipo de usuario:

### 🔐 Roles definidos (`db.createRole()`):

| Rol               | Permisos |
|------------------|----------|
| `rol_administrador` | Total: lectura/escritura, gestión de usuarios y configuración |
| `rol_empleado_sede` | Lectura parcial (`users`, `vehiculos`), escritura en `parqueos`, lectura en `sedes.zonas` |
| `rol_cliente`        | Solo lectura: su propio perfil, historial de parqueos y disponibilidad de zonas |

Asignación con `db.createUser()` o `db.grantRolesToUser()`.

---

## Operadores en consultas
| Categoría       | Operador         | Descripción                                                     |
| --------------- | ---------------- | --------------------------------------------------------------- |
| **Comparación** | `$eq`            | Igual a (`{ campo: { $eq: valor } }`)                           |
|                 | `$ne`            | Distinto de                                                     |
|                 | `$gt`            | Mayor que                                                       |
|                 | `$gte`           | Mayor o igual que                                               |
|                 | `$lt`            | Menor que                                                       |
|                 | `$lte`           | Menor o igual que                                               |
|                 | `$in`            | Incluido en un arreglo de valores                               |
|                 | `$nin`           | No incluido en un arreglo de valores                            |
| **Lógicos**     | `$and`           | Todas las condiciones deben cumplirse                           |
|                 | `$or`            | Al menos una condición se cumple                                |
|                 | `$not`           | Niega la condición                                              |
|                 | `$nor`           | Ninguna condición se cumple                                     |
| **Elementos**   | `$exists`        | Verifica si un campo existe                                     |
|                 | `$type`          | Verifica el tipo BSON del campo                                 |
| **Array**       | `$all`           | Todos los elementos deben estar presentes en el array           |
|                 | `$elemMatch`     | Al menos un elemento cumple múltiples condiciones               |
|                 | `$size`          | Tamaño exacto del array                                         |
| **Evaluación**  | `$regex`         | Coincidencia por expresión regular                              |
|                 | `$expr`          | Evaluar expresiones agregadas (`$gt`, `$eq`, etc.) sobre campos |
|                 | `$mod`           | Residuo de división (`{ campo: { $mod: [divisor, resto] } }`)   |
| **Texto**       | `$text`          | Búsqueda de texto (requiere índice `text`)                      |
|                 | `$search`        | Palabra clave para búsqueda de texto                            |

---
## Operadores de agregacion
| Categoría                  | Operador                                         | Descripción                                                    |
| -------------------------- | ------------------------------------------------ | -------------------------------------------------------------- |
| **Filtrado**               | `$match`                                         | Filtra documentos según condiciones (`similar a find()`)       |
| **Proyección**             | `$project`                                       | Incluye, excluye o transforma campos                           |
| **Agrupación**             | `$group`                                         | Agrupa documentos y aplica operaciones de agregación           |
| **Ordenamiento**           | `$sort`                                          | Ordena los documentos                                          |
| **Límites**                | `$limit`                                         | Limita el número de documentos devueltos                       |
|                            | `$skip`                                          | Omite los primeros N documentos                                |
| **Descomposición**         | `$unwind`                                        | "Explota" un array en múltiples documentos                     |
| **Reestructuración**       | `$replaceRoot`                                   | Reemplaza el documento por un subdocumento                     |
|                            | `$set` / `$addFields`                            | Añade o actualiza campos sin eliminar los existentes           |
|                            | `$unset`                                         | Elimina campos específicos del documento                       |
| **Búsqueda**               | `$search`                                        | Operador Atlas Search para búsqueda avanzada (requiere índice) |
| **Combinación**            | `$lookup`                                        | Une documentos de otra colección (equivale a un JOIN)          |
|                            | `$merge`                                         | Guarda resultados en otra colección                            |
|                            | `$unionWith`                                     | Une resultados de otra colección en la misma pipeline          |
| **Condicionales**          | `$cond`                                          | Evaluación tipo `if/then/else` dentro de `$project` o `$group` |
|                            | `$switch`                                        | Varios `case/then`, similar a `switch` clásico                 |
|                            | `$ifNull`                                        | Valor por defecto si el campo es `null` o no existe            |
| **Funciones Matemáticas**  | `$sum`, `$avg`, `$min`, `$max`, `$count`         | Estadísticas numéricas estándar                                |
| **Funciones Acumulativas** | `$push`, `$addToSet`, `$first`, `$last`          | Acumulan valores por grupo                                     |
| **Fecha y Hora**           | `$year`, `$month`, `$dayOfWeek`, `$dateToString` | Manipulación de fechas                                         |
| **Conversión**             | `$toString`, `$toInt`, `$toDate`, `$convert`     | Cambio de tipo de datos                                        |
| **Expresiones**            | `$expr`                                          | Permite usar operadores lógicos/matemáticos dentro de `$match` |

---
## Expresiones regulares
| Patrón  | Significado                               | Ejemplo de uso                                      |                         |                       |
| ------- | ----------------------------------------- | --------------------------------------------------- | ----------------------- | --------------------- |
| `^`     | Inicio de la cadena                       | `^A` → comienza con "A"                             |                         |                       |
| `$`     | Fin de la cadena                          | `a$` → termina con "a"                              |                         |                       |
| `.`     | Cualquier carácter excepto salto de línea | `c.t` → "cat", "cut", "c2t"                         |                         |                       |
| `*`     | Cero o más repeticiones                   | `lo*` → "l", "lo", "loo", "looo..."                 |                         |                       |
| `+`     | Una o más repeticiones                    | `lo+` → "lo", "loo", pero no "l"                    |                         |                       |
| `?`     | Cero o una repetición (opcional)          | `colou?r` → "color", "colour"                       |                         |                       |
| `[]`    | Conjunto de caracteres                    | `[abc]` → coincide con "a", "b" o "c"               |                         |                       |
| `[^]`   | Negación dentro del conjunto              | `[^abc]` → cualquier carácter excepto "a", "b", "c" |                         |                       |
| `{n}`   | Exactamente n repeticiones                | `[0-9]{3}` → exactamente 3 dígitos                  |                         |                       |
| `{n,}`  | Al menos n repeticiones                   | `a{2,}` → "aa", "aaa", ...                          |                         |                       |
| `{n,m}` | Entre n y m repeticiones                  | `a{2,4}` → "aa", "aaa", "aaaa"                      |                         |                       |
| \`      | \`                                        | Alternancia lógica (OR)                             | \`car                   | bus\` → "car" o "bus" |
| `()`    | Agrupar expresiones                       | \`gr(a                                              | e)y\` → "gray" o "grey" |                       |
| `\`     | Carácter de escape                        | `\.` → coincide literalmente con el punto "."       |                         |                       |

```js
1. Buscar nombres que empiezan con “A”

db.users.find({ nombre: { $regex: /^A/ } })

2. Buscar placas que terminan en números

db.vehiculos.find({ placa: { $regex: /[0-9]{3}$/ } })

3. Correos con dominio @gmail.com

db.users.find({ email: { $regex: /@gmail\.com$/ } })

4. Buscar colores que contengan “azul” sin importar mayúsculas

db.vehiculos.find({ color: { $regex: /azul/i } })

5. Cedulas de 8 a 12 dígitos

db.users.find({ cedula: { $regex: /^[0-9]{8,12}$/ } })

🎯 Bonus: opciones $options

Opción	Significado

i	Ignora mayúsculas/minúsculas (case-insensitive)

m	Evalúa múltiples líneas

x	Ignora espacios en blanco

s	El punto . incluye saltos de línea

Ejemplo:

db.users.find({ nombre: { $regex: /^juan/, $options: "i" } })
```
---

## 🔄 Transacciones

Se usa una **transacción MongoDB** para el flujo de ingreso:

1. Inserta un nuevo documento en `parqueos`
2. Decrementa `cupos_disponibles` en la zona seleccionada

👉 Esto asegura **consistencia** entre el registro de ingreso y la disponibilidad.

📦 Implementado con:

```js
session.startTransaction()
...
insertOne()
updateOne()
...
session.commitTransaction() / abortTransaction()
```
## 🧠 Consultas frecuentes (con aggregate())

Ejemplos incluidos:

- Parqueos por sede en el último mes
- Zonas más ocupadas por sede
- Cliente con más ingresos
- Vehículos activos actualmente
- Ingresos totales por sede
- Historial de parqueos por usuario
- Zonas que han excedido su capacidad
-  📁 Archivo: consultas_agregacion.js

## 🚀 ¿Cómo usar?

Inicia MongoDB en modo replica set (para usar transacciones):

mongod --replSet rs0 --dbpath /data/db

Inicia el replicaset en otra terminal:

rs.initiate()

En MongoDB Compass:

Abre los archivos de *.js (creación de colecciones, inserts, roles, etc)
Usa la pestaña de Playgrounds para ejecutar scripts

## 📁 Archivos incluidos

Archivo	Descripción

01_users.js	Crear colección users

02_vehiculos.js	Crear vehiculos con propietarios embebidos

03_sedes.js	Crear sedes con zonas embebidas

04_parqueos.js	Crear parqueos con snapshots

00_insert_datos.js	Insertar datos simulados

roles.js	Definir y asignar roles personalizados

transaccion_ingreso.js	Registrar ingreso en transacción segura

consultas_agregacion.js	Consultas típicas usando aggregate()

## 💬 Autor

- Daniel Florez Cubides, con un nuevo enfoque en rendimiento, mantenibilidad y claridad.