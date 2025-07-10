// Primera consulta: Mostrar la cantidad de parqueos realizados por tipo de vehiculo en cada sede

db.parqueos.aggregate([
  {
    $match: {
      estado: "finalizado",
    },
  },
  {
    $group: {
      _id: {
        sede: "$sede.nombre",
        tipo_vehiculo: "$vehiculo.tipo",
      },
      total: { $sum: 1 },
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $group: {
      _id: "$_id.sede",
      tipos: {
        $push: {
          tipo: "$_id.tipo_vehiculo",
          total: "$total",
        },
      },
    },
  },
  {
    $project: {
      sede: "$_id",
      parqueos_realizados: { $arrayElemAt: ["$tipos", 0] },
      _id: 0,
    },
  },
]);


// Segunda consulta: Listar los clientes que han utilizado mas de 5 veces el parqueadero en el ultimo mes
db.parqueos.aggregate([
  {
    $match: {
      fecha_entrada: {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    },
  },

  {
    $group: {
      _id: "$usuario._id",
      nombre: { $first: "$usuario.nombre" },
      cedula: { $first: "$usuario.cedula" },
      total_visitas: { $sum: 1 },
    },
  },
  { $sort: { total_visitas: -1 } },

  {
    $match: {
      $expr: { $gt: ["$total_visitas", 5] },
    },
  },
  {
    $project:{
        nombre: "$nombre",
        cedula: "$cedula",
        visitas: "$total_visitas"
    }
  }
]);

// Tercera consulta: calculal el promedio de tiempo de parqueo por tipo de vehiculo en cada sede
