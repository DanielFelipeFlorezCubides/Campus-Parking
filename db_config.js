// Database set up
db.users.drop();
db.vehiculos.drop();
db.sedes.drop();
db.parqueos.drop();

// Users collection
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id", "nombre", "email", "telefono",
        "cedula", "rol", "estado"
      ],
      properties: {
        _id: { bsonType: "objectId" },
        nombre: { bsonType: "string", minLength: 2, maxLength: 60 },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        },
        telefono: {
          bsonType: "string",
          pattern: "^[0-9]{10}$"
        },
        cedula: {
          bsonType: "string",
          pattern: "^[0-9]{8,12}$"
        },
        rol: {
          bsonType: "string",
          enum: ["administrador", "empleado", "cliente"]
        },
        sede_asignada: {
          bsonType: "objectId"
        },
        estado: {
          bsonType: "string",
          enum: ["activo", "inactivo"]
        },
        fecha_registro: {
          bsonType: "date"
        }
      },
      additionalProperties: false
    }
  }
});


// Vehicles collection
db.createCollection("vehiculos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id", "placa", "marca", "modelo",
        "linea", "color", "tipo", "propietario", "estado"
      ],
      properties: {
        _id: { bsonType: "objectId" },
        placa: {
          bsonType: "string",
          minLength: 6,
          maxLength: 7,
          pattern: "^[A-Z]{3}[0-9]{3}$"
        },
        marca: { bsonType: "string", minLength: 2, maxLength: 50 },
        modelo: { bsonType: "int", minimum: 1990, maximum: 2025 },
        linea: { bsonType: "string", minLength: 2, maxLength: 50 },
        color: {
          bsonType: "string",
          pattern: "^[A-Z][a-z]{2,}$"
        },
        tipo: {
          bsonType: "string",
          enum: ["carro", "moto", "bicicleta", "camion"]
        },
        propietario: {
          bsonType: "object",
          required: ["_id", "nombre", "telefono", "cedula"],
          properties: {
            _id: { bsonType: "objectId" },
            nombre: { bsonType: "string" },
            telefono: { bsonType: "string" },
            cedula: { bsonType: "string" }
          }
        },
        estado: {
          bsonType: "string",
          enum: ["activo", "inactivo"]
        }
      },
      additionalProperties: false
    }
  }
});

// Places collection
db.createCollection("sedes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id", "nombre", "ciudad", "direccion", "telefono", "estado"
      ],
      properties: {
        _id: { bsonType: "objectId" },
        nombre: { bsonType: "string", minLength: 3, maxLength: 100 },
        ciudad: { bsonType: "string", minLength: 3, maxLength: 50 },
        direccion: { bsonType: "string", minLength: 10, maxLength: 200 },
        telefono: {
          bsonType: "string",
          pattern: "^[0-9]{10}$"
        },
        horario_apertura: {
          bsonType: "string",
          pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
        },
        horario_cierre: {
          bsonType: "string",
          pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
        },
        estado: {
          bsonType: "string",
          enum: ["activa", "inactiva", "mantenimiento"]
        },
        zonas: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: [
              "_id", "nombre", "capacidad_maxima", "cupos_disponibles",
              "tipos_vehiculo_permitidos", "tarifa_por_hora", "estado"
            ],
            properties: {
              _id: { bsonType: "objectId" },
              nombre: { bsonType: "string", minLength: 2, maxLength: 50 },
              capacidad_maxima: { bsonType: "int", minimum: 1, maximum: 1000 },
              cupos_disponibles: { bsonType: "int", minimum: 0 },
              tipos_vehiculo_permitidos: {
                bsonType: "array",
                items: {
                  bsonType: "string",
                  enum: ["carro", "moto", "bicicleta", "camion"]
                },
                minItems: 1
              },
              tarifa_por_hora: {
                bsonType: "object",
                required: ["carro", "moto", "bicicleta", "camion"],
                properties: {
                  carro: { bsonType: "double", minimum: 0 },
                  moto: { bsonType: "double", minimum: 0 },
                  bicicleta: { bsonType: "double", minimum: 0 },
                  camion: { bsonType: "double", minimum: 0 }
                },
                additionalProperties: false
              },
              estado: {
                bsonType: "string",
                enum: ["activa", "inactiva", "mantenimiento"]
              }
            }
          }
        }
      },
      additionalProperties: false
    }
  }
});


// Parking lots collection
db.createCollection("parqueos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "_id", "vehiculo", "usuario", "sede", "zona",
        "fecha_entrada", "estado"
      ],
      properties: {
        _id: { bsonType: "objectId" },
        vehiculo: {
          bsonType: "object",
          required: ["_id", "placa", "tipo", "color"],
          properties: {
            _id: { bsonType: "objectId" },
            placa: { bsonType: "string" },
            tipo: { bsonType: "string" },
            color: { bsonType: "string" }
          }
        },
        usuario: {
          bsonType: "object",
          required: ["_id", "nombre", "cedula"],
          properties: {
            _id: { bsonType: "objectId" },
            nombre: { bsonType: "string" },
            cedula: { bsonType: "string" }
          }
        },
        sede: {
          bsonType: "object",
          required: ["_id", "nombre"],
          properties: {
            _id: { bsonType: "objectId" },
            nombre: { bsonType: "string" }
          }
        },
        zona: {
          bsonType: "object",
          required: ["_id", "nombre", "tarifa_por_hora"],
          properties: {
            _id: { bsonType: "objectId" },
            nombre: { bsonType: "string" },
            tarifa_por_hora: {
              bsonType: "object",
              required: ["carro", "moto", "bicicleta", "camion"],
              properties: {
                carro: { bsonType: "double" },
                moto: { bsonType: "double" },
                bicicleta: { bsonType: "double" },
                camion: { bsonType: "double" }
              }
            }
          }
        },
        fecha_entrada: { bsonType: "date" },
        fecha_salida: { bsonType: "date" },
        tiempo_total_minutos: { bsonType: "int", minimum: 0 },
        costo_total: { bsonType: "double", minimum: 0 },
        estado: {
          bsonType: "string",
          enum: ["activo", "finalizado", "cancelado"]
        },
        empleado_entrada_id: { bsonType: "objectId" },
        empleado_salida_id: { bsonType: "objectId" }
      },
      additionalProperties: false
    }
  }
});


db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ cedula: 1 }, { unique: true });
db.users.createIndex({ rol: 1 });
db.users.createIndex({ sede_asignada: 1 });
db.vehiculos.createIndex({ placa: 1 }, { unique: true });
db.vehiculos.createIndex({ "propietario._id": 1 });
db.vehiculos.createIndex({ tipo: 1 });
db.sedes.createIndex({ ciudad: 1 });
db.sedes.createIndex({ estado: 1 });
db.parqueos.createIndex({ "vehiculo._id": 1 });
db.parqueos.createIndex({ "usuario._id": 1 });
db.parqueos.createIndex({ "sede._id": 1, "zona._id": 1 });
db.parqueos.createIndex({ fecha_entrada: 1 });
db.parqueos.createIndex({ estado: 1 });