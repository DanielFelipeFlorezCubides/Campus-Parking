// 1. ROL ADMINISTRADOR
// Acceso total a todas las colecciones y operaciones

db.createRole({
  role: "administrador_campus",
  privileges: [
    {
      resource: { db: "campus_parking", collection: "" },
      actions: ["find", "insert", "update", "remove", "createIndex", "dropIndex", "createCollection", "dropCollection"],
    },
  ],
  roles: [
    { role: "dbAdmin", db: "campus_parking" },
    { role: "userAdmin", db: "campus_parking" },
  ],
});

// 2. ROL EMPLEADO DE SEDE
// Acceso limitado según la sede asignada

db.createRole({
  role: "empleado_sede",
  privileges: [
    // Lectura de clientes y vehículos
    {
      resource: { db: "campus_parking", collection: "users" },
      actions: ["find"],
    },
    {
      resource: { db: "campus_parking", collection: "vehiculos" },
      actions: ["find"],
    },
    // Lectura de sedes (solo su sede asignada se filtrará por aplicación)
    {
      resource: { db: "campus_parking", collection: "sedes" },
      actions: ["find"],
    },
    // Lectura de zonas (solo de su sede)
    {
      resource: { db: "campus_parking", collection: "zonas" },
      actions: ["find"],
    },
    // Gestión completa de parqueos (crear, leer, actualizar)
    {
      resource: { db: "campus_parking", collection: "parqueos" },
      actions: ["find", "insert", "update"],
    },
  ],
  roles: [],
});

// 3. ROL CLIENTE
// Solo lectura de su propia información y disponibilidad general

db.createRole({
  role: "cliente_campus",
  privileges: [
    // Lectura limitada de usuarios (solo su propia información)
    {
      resource: { db: "campus_parking", collection: "users" },
      actions: ["find"],
    },
    // Lectura de sus propios vehículos
    {
      resource: { db: "campus_parking", collection: "vehiculos" },
      actions: ["find"],
    },
    // Lectura de sedes (información general)
    {
      resource: { db: "campus_parking", collection: "sedes" },
      actions: ["find"],
    },
    // Lectura de zonas (disponibilidad y precios)
    {
      resource: { db: "campus_parking", collection: "zonas" },
      actions: ["find"],
    },
    // Lectura de su historial de parqueos
    {
      resource: { db: "campus_parking", collection: "parqueos" },
      actions: ["find"],
    },
  ],
  roles: [],
});

// CREACIÓN DE USUARIOS DE EJEMPLO

// Crear usuario administrador
  db.createUser({
    user: "admin_campus",
    pwd: "admin123",
    roles: [{ role: "administrador_campus", db: "campus_parking" }],
  });

// Crear usuario empleado
  db.createUser({
    user: "empleado_bogota",
    pwd: "emp123",
    roles: [{ role: "empleado_sede", db: "campus_parking" }],
  });

// Crear usuario cliente
  db.createUser({
    user: "cliente_juan",
    pwd: "cliente123",
    roles: [{ role: "cliente_campus", db: "campus_parking" }],
  });