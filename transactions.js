const session = db.getMongo().startSession();
const dbSession = session.getDatabase("campus_parking");

session.startTransaction();

try {
  // Paso 1: Buscar zona con cupos disponibles
  const zona = dbSession.zonas.findOne(
    {
      _id: ObjectId("507f1f77bcf86cd799439021"),
      cupos_disponibles: { $gt: 0 }
    },
    { session }
  );

  if (!zona) throw "❌ No hay cupos disponibles en esta zona.";

  // Paso 2: Insertar parqueo
  dbSession.parqueos.insertOne(
    {
      _id: ObjectId(),
      vehiculo_id: ObjectId("507f1f77bcf86cd799439096"),
      usuario_id: ObjectId("507f1f77bcf86cd799439061"),
      sede_id: ObjectId("507f1f77bcf86cd799439011"),
      zona_id: zona._id,
      fecha_entrada: new Date(),
      estado: "activo",
      empleado_entrada_id: ObjectId("507f1f77bcf86cd799439042")
    },
    { session }
  );

  // Paso 3: Disminuir cupos
  dbSession.zonas.updateOne(
    { _id: zona._id },
    { $inc: { cupos_disponibles: -1 } },
    { session }
  );

  // Paso 4: Commit
  session.commitTransaction();
  print("✅ Transacción completada: Ingreso registrado correctamente.");

} catch (e) {
  // Rollback si hay error
  session.abortTransaction();
  print("❌ Transacción cancelada:", e);
} finally {
  // Cierre de sesión
  session.endSession();
}
