"use campus_parking"

// 1. ¿Cuántos parqueos se registraron por sede en el último mes?
db.parqueos.aggregate([
    {
      $match: {
        fecha_entrada: {
          $gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
        }
      }
    },
    {
      $group: {
        _id: "$sede.nombre",
        parqueos_mes: { $sum: 1 }
      }
    },
    { $sort: { parqueos_mes: -1 } }
  ]);  

// 2. ¿Cuáles son las zonas más ocupadas en cada sede?
db.parqueos.aggregate([
    {
      $group: {
        _id: {
          sede: "$sede.nombre",
          zona: "$zona.nombre"
        },
        total_parqueos: { $sum: 1 }
      }
    },
    {
      $sort: { total_parqueos: -1 }
    },
    {
      $group: {
        _id: "$_id.sede",
        zonas: {
          $push: {
            zona: "$_id.zona",
            total_parqueos: "$total_parqueos"
          }
        }
      }
    },
    {
      $project: {
        sede: "$_id",
        zona_mas_ocupada: { $arrayElemAt: ["$zonas", 0] },
        _id: 0
      }
    }
  ]);  

// 3. ¿Cuál es el ingreso total generado por parqueo en cada sede

db.parqueos.aggregate([
    {
      $match: { estado: "finalizado" }
    },
    {
      $group: {
        _id: "$sede.nombre",
        ingresos_totales: { $sum: "$costo_total" }
      }
    },
    { $sort: { ingresos_totales: -1 } }
  ]);  

// 4. ¿Qué cliente ha usado más veces el parqueadero?
db.parqueos.aggregate([
    {
      $group: {
        _id: "$usuario._id",
        nombre: { $first: "$usuario.nombre" },
        cedula: { $first: "$usuario.cedula" },
        total_visitas: { $sum: 1 }
      }
    },
    { $sort: { total_visitas: -1 } },
    { $limit: 1 }
  ]);  

// 5. ¿Qué tipo de vehículo es más frecuente por sede?
db.parqueos.aggregate([
    {
      $group: {
        _id: {
          sede: "$sede.nombre",
          tipo_vehiculo: "$vehiculo.tipo"
        },
        total: { $sum: 1 }
      }
    },
    {
      $sort: { total: -1 }
    },
    {
      $group: {
        _id: "$_id.sede",
        tipos: {
          $push: {
            tipo: "$_id.tipo_vehiculo",
            total: "$total"
          }
        }
      }
    },
    {
      $project: {
        sede: "$_id",
        tipo_mas_frecuente: { $arrayElemAt: ["$tipos", 0] },
        _id: 0
      }
    }
  ]);  

// 6. Historial de parqueos de un cliente específico

db.parqueos.aggregate([
    {
      $match: {
        "usuario.cedula": "CEDULA_DEL_CLIENTE"
      }
    },
    {
      $project: {
        _id: 0,
        fecha_entrada: 1,
        fecha_salida: 1,
        sede: "$sede.nombre",
        zona: "$zona.nombre",
        tipo_vehiculo: "$vehiculo.tipo",
        tiempo_total_minutos: 1,
        costo_total: 1
      }
    },
    { $sort: { fecha_entrada: -1 } }
  ]);  

// 7. Vehículos parqueados actualmente en cada sede

db.parqueos.aggregate([
    {
      $match: {
        estado: "activo"
      }
    },
    {
      $group: {
        _id: "$sede.nombre",
        vehiculos_actuales: {
          $push: {
            placa: "$vehiculo.placa",
            tipo: "$vehiculo.tipo",
            zona: "$zona.nombre",
            entrada: "$fecha_entrada"
          }
        }
      }
    },
    {
      $project: {
        sede: "$_id",
        vehiculos_actuales: 1,
        _id: 0
      }
    }
  ]);  

// 8. Zonas que han excedido su capacidad

db.parqueos.aggregate([
    {
      $match: { estado: "activo" }
    },
    {
      $group: {
        _id: {
          sede: "$sede._id",
          zona: "$zona._id"
        },
        nombre_sede: { $first: "$sede.nombre" },
        nombre_zona: { $first: "$zona.nombre" },
        capacidad: { $first: "$zona.capacidad_maxima" },
        ocupacion_actual: { $sum: 1 }
      }
    },
    {
      $match: {
        $expr: { $gt: ["$ocupacion_actual", "$capacidad"] }
      }
    },
    {
      $project: {
        sede: "$nombre_sede",
        zona: "$nombre_zona",
        ocupacion_actual: 1,
        capacidad: 1,
        _id: 0
      }
    }
  ]);  