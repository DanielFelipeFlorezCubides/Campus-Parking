# Campus Parking - Sistema de Gestión de Parqueaderos Multisede

## 📋 Descripción del Proyecto

**Campus Parking** es un sistema completo de gestión de parqueaderos que permite administrar múltiples sedes, zonas de parqueo, vehículos y usuarios con diferentes roles. El sistema está diseñado para manejar operaciones de entrada y salida de vehículos, cálculo automático de tarifas, y generación de reportes analíticos.

### 🎯 Características Principales

- ✅ **Gestión Multisede**: Administración de múltiples ubicaciones
- ✅ **Zonas Especializadas**: Diferentes tipos de vehículos por zona
- ✅ **Sistema de Roles**: Administradores, empleados y clientes
- ✅ **Tarifas Dinámicas**: Precios por tipo de vehículo y zona
- ✅ **Transacciones ACID**: Consistencia garantizada en operaciones críticas
- ✅ **Reportes Analíticos**: 8 consultas predefinidas para análisis
- ✅ **Validaciones Robustas**: JSON Schema en todas las colecciones
- ✅ **Seguridad por Roles**: Control de acceso granular

---

## 🏗️ Arquitectura de la Base de Datos

### Colecciones Principales

#### 1. **users** - Gestión de Usuarios
Almacena información de todos los usuarios del sistema con tres roles diferenciados:

**Campos principales:**
- `_id`: Identificador único
- `nombre`: Nombre completo del usuario
- `email`: Correo electrónico (único)
- `telefono`: Número de contacto (10 dígitos)
- `cedula`: Documento de identidad (único)
- `rol`: `administrador` | `empleado` | `cliente`
- `sede_asignada`: ID de sede (solo empleados)
- `estado`: `activo` | `inactivo`

**Validaciones:**
- Email con formato válido
- Teléfono de exactamente 10 dígitos
- Cédula entre 8-12 dígitos
- Roles restringidos a valores específicos

#### 2. **vehiculos** - Registro de Vehículos
Gestiona todos los vehículos registrados en el sistema:

**Campos principales:**
- `placa`: Formato colombiano (ABC123 o ABC123A)
- `marca`, `modelo`, `linea`: Información del vehículo
- `color`: Primera letra mayúscula
- `tipo`: `carro` | `moto` | `bicicleta` | `camion`
- `propietario_id`: Referencia al usuario propietario

**Validaciones:**
- Placa con formato específico colombiano
- Modelo entre 1990-2025
- Color con formato de capitalización

#### 3. **sedes** - Ubicaciones Físicas
Define las diferentes ubicaciones del sistema:

**Campos principales:**
- `nombre`: Nombre de la sede
- `ciudad`: Ciudad donde se ubica
- `direccion`: Dirección completa
- `telefono`: Contacto de la sede
- `horario_apertura` / `horario_cierre`: Formato HH:MM
- `estado`: `activa` | `inactiva` | `mantenimiento`

#### 4. **zonas** - Áreas de Parqueo
Subdivide cada sede en zonas especializadas:

**Campos principales:**
- `nombre`: Identificación de la zona
- `sede_id`: Referencia a la sede
- `capacidad_maxima`: Número máximo de vehículos
- `cupos_disponibles`: Cupos actuales libres
- `tipos_vehiculo_permitidos`: Array de tipos permitidos
- `tarifa_por_hora`: Objeto con precios por tipo de vehículo

**Estructura de tarifas:**
```json
{
  "carro": 3000.0,
  "moto": 1500.0,
  "bicicleta": 500.0,
  "camion": 8000.0
}
```

#### 5. **parqueos** - Registro de Operaciones
Almacena cada operación de entrada/salida:

**Campos principales:**
- `vehiculo_id`, `usuario_id`, `sede_id`, `zona_id`: Referencias
- `fecha_entrada`: Timestamp de ingreso
- `fecha_salida`: Timestamp de salida (null si activo)
- `tiempo_total_minutos`: Duración calculada
- `costo_total\`: Monto a pagar
- `estado`: `activo` | `finalizado` | `cancelado`
- `empleado_entrada_id` / `empleado_salida_id`: Empleados responsables

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- MongoDB 4.4 o superior
- MongoDB Shell (mongosh)
- Acceso de administrador a la base de datos

### Pasos de Instalación

#### 1. Configurar la Base de Datos
```bash
mongosh < db_config.js
```
**Qué hace:**
- Crea la base de datos `campus_parking`
- Define las 5 colecciones con validaciones JSON Schema
- Establece índices para optimización de consultas
- Configura restricciones de unicidad

#### 2. Poblar con Datos de Prueba
```bash
mongosh < test_dataset.js
```
**Datos incluidos:**
- 3 sedes (Bogotá, Medellín, Cali)
- 15 zonas (5 por sede)
- 26 usuarios (1 admin, 10 empleados, 15 clientes)
- 30 vehículos variados
- 10 registros de parqueo (5 activos, 5 finalizados)

#### 3. Configurar Seguridad
```bash
mongosh < roles.js
```
**Roles creados:**
- `administrador_campus`: Acceso total
- `empleado_sede`: Gestión de parqueos
- `cliente_campus`: Solo lectura personal

#### 4. Probar Transacciones
```bash
mongosh < transactions.js
```
**Demostraciones:**
- Ingreso exitoso con actualización de cupos
- Salida con cálculo automático de costos
- Manejo de errores y rollback

---

## 📊 Consultas Analíticas

El sistema incluye 8 consultas predefinidas para análisis de negocio:

### Ejecutar Reportes
```bash
mongosh < aggregations.js
```

### Consultas Disponibles

#### 1. **Parqueos por Sede (Último Mes)**
Muestra la cantidad de parqueos registrados por cada sede en el último mes.

#### 2. **Zonas Más Ocupadas**
Identifica las zonas con mayor utilización en cada sede.

#### 3. **Ingresos Totales por Sede**
Calcula los ingresos generados por cada sede basado en parqueos finalizados.

#### 4. **Cliente Más Frecuente**
Lista los 5 clientes que más han utilizado el sistema.

#### 5. **Tipo de Vehículo Más Frecuente**
Analiza qué tipo de vehículo es más común en cada sede.

#### 6. **Historial de Cliente Específico**
Muestra el historial completo de parqueos de un cliente.

#### 7. **Vehículos Actualmente Parqueados**
Lista todos los vehículos que están actualmente en las instalaciones.

#### 8. **Zonas que Exceden Capacidad**
Identifica situaciones donde se ha excedido la capacidad máxima.

---

## 🔐 Sistema de Seguridad

### Roles y Permisos

#### **Administrador** (`administrador_campus`)
- ✅ Acceso total a todas las colecciones
- ✅ Crear/eliminar usuarios y roles
- ✅ Administrar configuración de la base de datos
- ✅ Ejecutar todas las operaciones CRUD

#### **Empleado** (`empleado_sede`)
- ✅ Leer información de clientes y vehículos
- ✅ Gestionar parqueos (entrada/salida)
- ✅ Acceder a información de su sede asignada
- ❌ No puede eliminar registros históricos

#### **Cliente** (`cliente_campus`)
- ✅ Ver su propia información personal
- ✅ Consultar disponibilidad de zonas
- ✅ Acceder a su historial de parqueos
- ❌ No puede modificar datos

### Usuarios de Ejemplo
- **admin_campus** / admin123 (Administrador)
- **empleado_bogota** / emp123 (Empleado)
- **cliente_juan** / cliente123 (Cliente)

---

## ⚡ Transacciones ACID

El sistema implementa transacciones para garantizar la consistencia en operaciones críticas:

### Operaciones Transaccionales

#### **Registro de Ingreso**
1. Verificar disponibilidad de cupos
2. Validar tipo de vehículo permitido
3. Insertar registro de parqueo
4. Decrementar cupos disponibles
5. Commit o rollback automático

#### **Registro de Salida**
1. Localizar parqueo activo
2. Calcular tiempo y costo
3. Actualizar registro con información de salida
4. Incrementar cupos disponibles
5. Commit o rollback automático

### Características de las Transacciones
- **Read Concern**: `majority` para consistencia
- **Write Concern**: `majority` para durabilidad
- **Rollback automático** en caso de error
- **Validaciones de negocio** dentro de la transacción

---

## 📈 Índices y Optimización

### Índices Implementados

#### **Colección users**
- `email` (único)
- `cedula` (único)
- `rol`
- `sede_asignada`

#### **Colección vehiculos**
- `placa` (único)
- `propietario_id`
- `tipo`

#### **Colección sedes**
- `ciudad`
- `estado`

#### **Colección zonas**
- `sede_id`
- `sede_id + estado` (compuesto)
- `tipos_vehiculo_permitidos`

#### **Colección parqueos**
- `vehiculo_id`
- `usuario_id`
- `sede_id + zona_id` (compuesto)
- `fecha_entrada`
- `estado`
- `sede_id + fecha_entrada` (compuesto)

---

## 🛠️ Casos de Uso Principales

### 1. **Registro de Entrada de Vehículo**
```javascript
// Ejemplo de flujo de entrada
1. Empleado escanea placa del vehículo
2. Sistema verifica vehículo registrado
3. Valida cupos disponibles en zona apropiada
4. Registra entrada con timestamp
5. Actualiza cupos disponibles
6. Genera ticket de entrada
```

### 2. **Registro de Salida de Vehículo**
```javascript
// Ejemplo de flujo de salida
1. Empleado localiza parqueo activo por placa
2. Sistema calcula tiempo de permanencia
3. Aplica tarifa según tipo de vehículo y zona
4. Registra salida con costo total
5. Libera cupo en la zona
6. Genera recibo de pago
```

### 3. **Consulta de Disponibilidad**
```javascript
// Cliente consulta cupos disponibles
db.zonas.find({
  sede_id: ObjectId("sede_id"),
  tipos_vehiculo_permitidos: "carro",
  cupos_disponibles: { $gt: 0 },
  estado: "activa"
})
```

### 4. **Reporte de Ingresos Diarios**
```javascript
// Administrador consulta ingresos del día
db.parqueos.aggregate([
  {
    $match: {
      fecha_entrada: {
        $gte: new Date("2024-01-01T00:00:00Z"),
        $lt: new Date("2024-01-02T00:00:00Z")
      },
      estado: "finalizado"
    }
  },
  {
    $group: {
      _id: null,
      total_ingresos: { $sum: "$costo_total" },
      total_parqueos: { $sum: 1 }
    }
  }
])
```

---

## 🔧 Mantenimiento y Monitoreo

### Tareas de Mantenimiento Recomendadas

#### **Diarias**
- Verificar parqueos activos vs cupos disponibles
- Revisar transacciones fallidas
- Monitorear uso por sede

#### **Semanales**
- Ejecutar consultas analíticas
- Revisar rendimiento de índices
- Validar integridad referencial

#### **Mensuales**
- Archivar registros antiguos
- Optimizar índices
- Revisar y actualizar roles de usuario

### Consultas de Monitoreo

#### **Verificar Consistencia de Cupos**
```javascript
db.zonas.aggregate([
  {
    $lookup: {
      from: "parqueos",
      let: { zona_id: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ["$zona_id", "$$zona_id"] },
                { $eq: ["$estado", "activo"] }
              ]
            }
          }
        }
      ],
      as: "parqueos_activos"
    }
  },
  {
    $project: {
      nombre: 1,
      capacidad_maxima: 1,
      cupos_disponibles: 1,
      parqueos_activos: { $size: "$parqueos_activos" },
      cupos_ocupados_calculados: {
        $subtract: ["$capacidad_maxima", "$cupos_disponibles"]
      }
    }
  }
])
```

#### **Detectar Parqueos Huérfanos**
```javascript
db.parqueos.aggregate([
  {
    $lookup: {
      from: "vehiculos",
      localField: "vehiculo_id",
      foreignField: "_id",
      as: "vehiculo"
    }
  },
  {
    $match: {
      vehiculo: { $size: 0 }
    }
  }
])
```

---

## 🚨 Solución de Problemas Comunes

### **Error: Cupos Inconsistentes**
**Síntoma:** Los cupos disponibles no coinciden con parqueos activos
**Solución:**
```javascript
// Recalcular cupos disponibles
db.zonas.find().forEach(function(zona) {
  const parqueosActivos = db.parqueos.countDocuments({
    zona_id: zona._id,
    estado: "activo"
  });
  const cuposDisponibles = zona.capacidad_maxima - parqueosActivos;
  
  db.zonas.updateOne(
    { _id: zona._id },
    { $set: { cupos_disponibles: cuposDisponibles } }
  );
});
```

### **Error: Transacción Fallida**
**Síntoma:** Operaciones de entrada/salida no se completan
**Diagnóstico:**
1. Verificar conectividad de red
2. Confirmar permisos de usuario
3. Revisar logs de MongoDB
4. Validar integridad de datos

### **Error: Validación de Schema**
**Síntoma:** Inserción de documentos rechazada
**Solución:**
1. Revisar formato de datos
2. Validar tipos de campo
3. Confirmar campos requeridos
4. Verificar restricciones de longitud

---

## 📚 Recursos Adicionales

### **Documentación Técnica**
- [MongoDB Manual](https://docs.mongodb.com/)
- [Aggregation Pipeline](https://docs.mongodb.com/manual/aggregation/)
- [Transactions](https://docs.mongodb.com/manual/core/transactions/)
- [JSON Schema Validation](https://docs.mongodb.com/manual/core/schema-validation/)

### **Herramientas Recomendadas**
- **MongoDB Compass**: GUI para administración
- **Studio 3T**: Cliente avanzado para MongoDB
- **Robo 3T**: Cliente ligero y gratuito
- **MongoDB Charts**: Visualización de datos

### **Comandos Útiles**
```bash
# Conectar a la base de datos
mongosh "mongodb://localhost:27017/campus_parking"

# Verificar estado de la base de datos
db.stats()

# Listar todas las colecciones
show collections

# Ver índices de una colección
db.parqueos.getIndexes()

# Verificar validaciones de schema
db.runCommand({listCollections: 1, filter: {name: "users"}})
```

---

## 👥 Autor
- Daniel Felipe Florez Cubides

### **Estructura del Proyecto**
```
campus-parking-mongodb/
├── db_config.js          # Configuración inicial
├── test_dataset.js       # Datos de prueba
├── aggregations.js       # Consultas analíticas
├── roles.js             # Configuración de seguridad
├── transactions.js      # Demostraciones ACID
└── README.md           # Esta documentación
```

---

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🎉 ¡Listo para Usar!

El sistema **Campus Parking** está completamente configurado y listo para producción. Todos los archivos están optimizados para ejecutarse directamente en MongoDB shell sin dependencias adicionales.

**¡Comienza ahora ejecutando los scripts en orden y tendrás un sistema completo de gestión de parqueaderos funcionando en minutos!**
