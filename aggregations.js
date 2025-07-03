"use campus_parking"

// 1. ¿Cuántos parqueos se registraron por sede en el último mes?
db.parqueos.aggregate([
    {
        $match: {
            fecha_entrada: { $gte: new Date(new Date().setdate(new Date().getDate() - 30)) },
        },
    },
    {
        $lookup: {
            from: "sedes",
            localField: "sede_id",
            foreignField: "_id",
            as: "sede_info",
        },
    },
    {
        $unwind: "$sede_info",
    },
    {
        $group: {
            _id: "$sede_id",
            nombre_sede: { $first: "$sede_info.nombre" },
            ciudad: { $first: "$sede_info.ciudad" },
            total_parqueos: { $sum: 1 },
        },
    },
    {
        $sort: { total_parqueos: -1 },
    },
]);

// 2. ¿Cuáles son las zonas más ocupadas en cada sede?
db.parqueos.aggregate([
    {
        $lookup: {
            from: "zonas",
            localField: "zona_id",
            foreignField: "_id",
            as: "zona_info",
        },
    },
    {
        $unwind: "$zona_info",
    },
    {
        $lookup: {
            from: "sedes",
            localField: "sede_id",
            foreignField: "_id",
            as: "sede_info",
        },
    },
    {
        $unwind: "$sede_info",
    },
    {
        $group: {
            _id: {
                sede_id: "$sede_id",
                zona_id: "$zona_id",
            },
            nombre_sede: { $first: "$sede_info.nombre" },
            nombre_zona: { $first: "$zona_info.nombre" },
            total_usos: { $sum: 1 },
        },
    },
    {
        $sort: { "_id.sede_id": 1, total_usos: -1 },
    },
    {
        $group: {
            _id: "$_id.sede_id",
            nombre_sede: { $first: "$nombre_sede" },
            zona_mas_ocupada: { $first: "$nombre_zona" },
            max_usos: { $first: "$total_usos" },
            todas_zonas: {
                $push: {
                    zona: "$nombre_zona",
                    usos: "$total_usos",
                },
            },
        },
    },
]);

// 3. ¿Cuál es el ingreso total generado por parqueo en cada sede

db.parqueos.aggregate([
    {
        $match: {
            estado: "finalizado",
            costo_total: { $exists: true },
        },
    },
    {
        $lookup: {
            from: "sedes",
            localField: "sede_id",
            foreignField: "_id",
            as: "sede_info",
        },
    },
    {
        $unwind: "$sede_info",
    },
    {
        $group: {
            _id: "$sede_id",
            nombre_sede: { $first: "$sede_info.nombre" },
            ciudad: { $first: "$sede_info.ciudad" },
            ingreso_total: { $sum: "$costo_total" },
            parqueos_pagados: { $sum: 1 },
        },
    },
    {
        $sort: { ingreso_total: -1 },
    },
]);

// 4. ¿Qué cliente ha usado más veces el parqueadero?
db.parqueos.aggregate([
    {
        $lookup: {
            from: "users",
            localField: "usuario_id",
            foreignField: "_id",
            as: "usuario_info",
        },
    },
    {
        $unwind: "$usuario_info",
    },
    {
        $match: {
            "usuario_info.rol": "cliente",
        },
    },
    {
        $group: {
            _id: "$usuario_id",
            nombre_cliente: { $first: "$usuario_info.nombre" },
            email: { $first: "$usuario_info.email" },
            total_parqueos: { $sum: 1 },
            gasto_total: { $sum: { $ifNull: ["$costo_total", 0] } },
        },
    },
    {
        $sort: { total_parqueos: -1 },
    },
    {
        $limit: 5,
    },
]);

// 5. ¿Qué tipo de vehículo es más frecuente por sede?
db.parqueos.aggregate([
    {
        $lookup: {
            from: "vehiculos",
            localField: "vehiculo_id",
            foreignField: "_id",
            as: "vehiculo_info",
        },
    },
    {
        $unwind: "$vehiculo_info",
    },
    {
        $lookup: {
            from: "sedes",
            localField: "sede_id",
            foreignField: "_id",
            as: "sede_info",
        },
    },
    {
        $unwind: "$sede_info",
    },
    {
        $group: {
            _id: {
                sede_id: "$sede_id",
                tipo_vehiculo: "$vehiculo_info.tipo",
            },
            nombre_sede: { $first: "$sede_info.nombre" },
            total: { $sum: 1 },
        },
    },
    {
        $sort: { "_id.sede_id": 1, total: -1 },
    },
    {
        $group: {
            _id: "$_id.sede_id",
            nombre_sede: { $first: "$nombre_sede" },
            tipo_mas_frecuente: { $first: "$_id.tipo_vehiculo" },
            max_cantidad: { $first: "$total" },
            todos_tipos: {
                $push: {
                    tipo: "$_id.tipo_vehiculo",
                    cantidad: "$total",
                },
            },
        },
    },
]);

// 6. Historial de parqueos de un cliente específico

db.parqueos.aggregate([
    {
        $match: {
            usuario_id: primerCliente._id,
        },
    },
    {
        $lookup: {
            from: "sedes",
            localField: "sede_id",
            foreignField: "_id",
            as: "sede_info",
        },
    },
    {
        $lookup: {
            from: "zonas",
            localField: "zona_id",
            foreignField: "_id",
            as: "zona_info",
        },
    },
    {
        $lookup: {
            from: "vehiculos",
            localField: "vehiculo_id",
            foreignField: "_id",
            as: "vehiculo_info",
        },
    },
    {
        $unwind: "$sede_info",
    },
    {
        $unwind: "$zona_info",
    },
    {
        $unwind: "$vehiculo_info",
    },
    {
        $project: {
            fecha_entrada: 1,
            fecha_salida: 1,
            sede: "$sede_info.nombre",
            zona: "$zona_info.nombre",
            vehiculo: "$vehiculo_info.placa",
            tipo_vehiculo: "$vehiculo_info.tipo",
            tiempo_minutos: "$tiempo_total_minutos",
            costo: "$costo_total",
            estado: 1,
        },
    },
    {
        $sort: { fecha_entrada: -1 },
    },
]);

// 7. Vehículos parqueados actualmente en cada sede

db.parqueos.aggregate([
    {
        $match: {
            estado: "activo",
        },
    },
    {
        $lookup: {
            from: "sedes",
            localField: "sede_id",
            foreignField: "_id",
            as: "sede_info",
        },
    },
    {
        $lookup: {
            from: "zonas",
            localField: "zona_id",
            foreignField: "_id",
            as: "zona_info",
        },
    },
    {
        $lookup: {
            from: "vehiculos",
            localField: "vehiculo_id",
            foreignField: "_id",
            as: "vehiculo_info",
        },
    },
    {
        $unwind: "$sede_info",
    },
    {
        $unwind: "$zona_info",
    },
    {
        $unwind: "$vehiculo_info",
    },
    {
        $group: {
            _id: "$sede_id",
            nombre_sede: { $first: "$sede_info.nombre" },
            vehiculos_activos: {
                $push: {
                    placa: "$vehiculo_info.placa",
                    tipo: "$vehiculo_info.tipo",
                    zona: "$zona_info.nombre",
                    entrada: "$fecha_entrada",
                },
            },
            total_activos: { $sum: 1 },
        },
    },
    {
        $sort: { total_activos: -1 },
    },
]);

// 8. Zonas que han excedido su capacidad

db.parqueos.aggregate([
    {
        $lookup: {
            from: "zonas",
            localField: "zona_id",
            foreignField: "_id",
            as: "zona_info",
        },
    },
    {
        $unwind: "$zona_info",
    },
    {
        $lookup: {
            from: "sedes",
            localField: "sede_id",
            foreignField: "_id",
            as: "sede_info",
        },
    },
    {
        $unwind: "$sede_info",
    },
    {
        $group: {
            _id: {
                zona_id: "$zona_id",
                fecha: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$fecha_entrada",
                    },
                },
            },
            nombre_sede: { $first: "$sede_info.nombre" },
            nombre_zona: { $first: "$zona_info.nombre" },
            capacidad_maxima: { $first: "$zona_info.capacidad_maxima" },
            parqueos_simultaneos: {
                $sum: {
                    $cond: [
                        {
                            $or: [
                                { $eq: ["$estado", "activo"] },
                                {
                                    $and: [{ $ne: ["$fecha_salida", null] }, { $gte: ["$fecha_salida", "$fecha_entrada"] }],
                                },
                            ],
                        },
                        1,
                        0,
                    ],
                },
            },
        },
    },
    {
        $match: {
            $expr: { $gt: ["$parqueos_simultaneos", "$capacidad_maxima"] },
        },
    },
    {
        $project: {
            sede: "$nombre_sede",
            zona: "$nombre_zona",
            fecha: "$_id.fecha",
            capacidad_maxima: 1,
            parqueos_simultaneos: 1,
            exceso: { $subtract: ["$parqueos_simultaneos", "$capacidad_maxima"] },
        },
    },
    {
        $sort: { exceso: -1 },
    },
]);