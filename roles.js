// 1. Rol: ADMINISTRADOR
db.createRole({
  role: "rol_administrador",
  privileges: [
    {
      resource: { db: "parqueadero", collection: "" }, // todas las colecciones
      actions: ["find", "insert", "update", "remove"]
    },
    {
      resource: { db: "parqueadero", collection: "" },
      actions: ["createCollection", "createIndex"]
    },
    {
      resource: { db: "parqueadero", collection: "system.users" },
      actions: ["createUser", "updateUser", "grantRole", "dropUser"]
    }
  ],
  roles: [
    { role: "readWrite", db: "parqueadero" },
    { role: "dbAdmin", db: "parqueadero" },
    { role: "userAdmin", db: "parqueadero" }
  ]
})

// 2. Rol: EMPLEADO DE SEDE
db.createRole({
  role: "rol_empleado_sede",
  privileges: [
    {
      resource: { db: "parqueadero", collection: "users" },
      actions: ["find"]
    },
    {
      resource: { db: "parqueadero", collection: "vehiculos" },
      actions: ["find"]
    },
    {
      resource: { db: "parqueadero", collection: "parqueos" },
      actions: ["find", "insert", "update"]
    },
    {
      resource: { db: "parqueadero", collection: "sedes" },
      actions: ["find"]
    },
    {
      resource: { db: "parqueadero", collection: "zonas" },
      actions: ["find"]
    }
  ],
  roles: []
})

// 3. Rol: CLIENTE
db.createRole({
  role: "rol_cliente",
  privileges: [
    {
      resource: { db: "parqueadero", collection: "users" },
      actions: ["find"] // App filtra por su _id
    },
    {
      resource: { db: "parqueadero", collection: "parqueos" },
      actions: ["find"] // App filtra por su usuario._id
    },
    {
      resource: { db: "parqueadero", collection: "sedes" },
      actions: ["find"]
    }
  ],
  roles: []
})

// ADMINISTRADOR
db.createUser({
  user: "admin1",
  pwd: "admin1234",
  roles: [{ role: "rol_administrador", db: "parqueadero" }]
})

// EMPLEADO DE SEDE
db.createUser({
  user: "empleado1",
  pwd: "empleado1234",
  roles: [{ role: "rol_empleado_sede", db: "parqueadero" }]
})

// CLIENTE
db.createUser({
  user: "cliente1",
  pwd: "cliente1234",
  roles: [{ role: "rol_cliente", db: "parqueadero" }]
})
