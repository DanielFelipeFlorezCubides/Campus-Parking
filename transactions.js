// Conectar a base de datos
const session = db.getMongo().startSession();
const parqueaderoDB = session.getDatabase("parqueadero");

try {
  // Iniciar la transacción
  session.startTransaction();

  // Datos de entrada simulados (en producción vendrían de la app)
  const clienteId = ObjectId("64f0e9a71234567890abcdef");
  const vehiculoId = ObjectId("64f0e9a71234567890abcdee");
  const sedeId = ObjectId("64f0e9a71234567890abcd99");
  const zonaId = ObjectId("64f0e9a71234567890abcd88");
  const empleadoId = ObjectId("64f0e9a71234567890abcd01");

  const parqueoNuevo = {
    _id: ObjectId(),
    vehiculo: {
      _id: vehiculoId,
      placa: "ABC123",
      tipo: "carro",
      color: "Rojo"
    },
    usuario: {
      _id: clienteId,
      nombre: "Juan Pérez",
      cedula: "1000000001"
    },
    sede: {
      _id: sedeId,
      nombre: "Sede Central"
    },
    zona: {
      _id: zonaId,
      nombre: "Zona A",
      tarifa_por_hora: {
        carro: 3000,
        moto: 1500,
        bicicleta: 1000,
        camion: 5000
      }
    },
    fecha_entrada: new Date(),
    estado: "activo",
    empleado_entrada_id: empleadoId
  };

  // Paso 1: Insertar parqueo
  parqueaderoDB.parqueos.insertOne(parqueoNuevo, { session });

  // Paso 2: Disminuir cupos_disponibles en zona embebida dentro de sede
  const updateZona = parqueaderoDB.sedes.updateOne(
    {
      _id: sedeId,
      "zonas._id": zonaId,
      "zonas.cupos_disponibles": { $gt: 0 } // no permitir negativos
    },
    {
      $inc: { "zonas.$.cupos_disponibles": -1 }
    },
    { session }
  );

  if (updateZona.matchedCount === 0) {
    throw new Error("No se encontró la zona o no hay cupos disponibles.");
  }

  // Confirmar la transacción
  session.commitTransaction();
  print("✅ Transacción completada exitosamente");

} catch (error) {
  // 🔴 Si algo falla, revertimos los cambios
  print("❌ Error en la transacción:", error.message);
  session.abortTransaction();
}

session.endSession();
