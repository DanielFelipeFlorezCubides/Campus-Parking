// Initial set up

"use campus_parking";

// Collections configuration, starting with users collection

db.createCollection(" users ", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "_id",
                "nombre",
                "email",
                "telefono",
                "cedula",
                "rol",
                "estado"
            ],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "Identificador único del usuario"
                },
                nombre: {
                    bsonType: "string",
                    minLenght: 2,
                    maxLenght: 60,
                    description: "Nombre completo del usuario"
                },
                email: {
                    bsonType: "string",
                    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                    description: "Email valido del usuario"
                },
                telefono: {
                    bsonType: "string",
                    pattern: "^[0-9]{10}$",
                    description: "Número de teléfono de 10 dígitos"
                },
                cedula: {
                    bsonType: "string",
                    pattern: "^[0-9]{8,12}$",
                    description: "Cédula de identidad",
                },
                rol: {
                    bsonType: "string",
                    enum: ["administrador", "empleado", "cliente"],
                    description: "Rol del usuario en el sistema",
                },
                sede_asignada: {
                    bsonType: "objectId",
                    description: "ID de la sede asignada (solo para empleados)",
                },
                estado: {
                    bsonType: "string",
                    enum: ["activo", "inactivo"],
                    description: "Estado del usuario",
                },
                fecha_registro: {
                    bsonType: "date",
                    description: "Fecha de registro del usuario",
                },
            },
            additionalProperties: false
        }
    }
})

// Now moving up to vehicles collection

db.createCollection("vehiculos", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "_id",
                "placa",
                "marca",
                "modelo",
                "linea",
                "color",
                "tipo",
                "propietario_id"
            ],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "Identificador único del vehículo",
                },
                placa: {
                    bsonType: "string",
                    minLength: 6,
                    maxLength: 7,
                    pattern: "^[A-Z]{3}[0-9]{3}$",
                    description: "Placa del vehículo formato AAA123",
                },
                marca: {
                    bsonType: "string",
                    minLength: 2,
                    maxLength: 50,
                    description: "Marca del vehículo",
                },
                modelo: {
                    bsonType: "int",
                    minimum: 1990,
                    maximum: 2025,
                    description: "Año del modelo del vehículo",
                },
                linea: {
                    bsonType: "string",
                    minLength: 2,
                    maxLength: 50,
                    description: "Línea del vehículo",
                },
                color: {
                    bsonType: "string",
                    pattern: "^[A-Z][a-z]{2,}$",
                    description: "Color del vehículo, primera letra mayúscula",
                },
                tipo: {
                    bsonType: "string",
                    enum: ["carro", "moto", "bicicleta", "camion"],
                    description: "Tipo de vehículo",
                },
                propietario_id: {
                    bsonType: "objectId",
                    description: "ID del propietario del vehículo",
                },
                estado: {
                    bsonType: "string",
                    enum: ["activo", "inactivo"],
                    description: "Estado del vehículo",
                },
            },
            additionalProperties: false,
        },
    },
})

// Next up, business locations collection

db.createCollection("sedes", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [
                "_id",
                "nombre",
                "ciudad",
                "direccion",
                "telefono",
                "estado"
            ],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "Identificador único de la sede",
                },
                nombre: {
                    bsonType: "string",
                    minLength: 3,
                    maxLength: 100,
                    description: "Nombre de la sede",
                },
                ciudad: {
                    bsonType: "string",
                    minLength: 3,
                    maxLength: 50,
                    description: "Ciudad donde se ubica la sede",
                },
                direccion: {
                    bsonType: "string",
                    minLength: 10,
                    maxLength: 200,
                    description: "Dirección completa de la sede",
                },
                telefono: {
                    bsonType: "string",
                    pattern: "^[0-9]{10}$",
                    description: "Teléfono de contacto de la sede",
                },
                horario_apertura: {
                    bsonType: "string",
                    pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$",
                    description: "Hora de apertura formato HH:MM",
                },
                horario_cierre: {
                    bsonType: "string",
                    pattern: "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$",
                    description: "Hora de cierre formato HH:MM",
                },
                estado: {
                    bsonType: "string",
                    enum: ["activa", "inactiva", "mantenimiento"],
                    description: "Estado de la sede",
                },
            },
            additionalProperties: false,
        },
    },
})

// Now, parking lots collection is next

db.createCollection("zonas", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: [
          "_id",
          "nombre",
          "sede_id",
          "capacidad_maxima",
          "cupos_disponibles",
          "tipos_vehiculo_permitidos",
          "tarifa_por_hora",
          "estado",
        ],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "Identificador único de la zona",
          },
          nombre: {
            bsonType: "string",
            minLength: 2,
            maxLength: 50,
            description: "Nombre de la zona",
          },
          sede_id: {
            bsonType: "objectId",
            description: "ID de la sede a la que pertenece",
          },
          capacidad_maxima: {
            bsonType: "int",
            minimum: 1,
            maximum: 1000,
            description: "Capacidad máxima de vehículos",
          },
          cupos_disponibles: {
            bsonType: "int",
            minimum: 0,
            description: "Cupos actualmente disponibles",
          },
          tipos_vehiculo_permitidos: {
            bsonType: "array",
            items: {
              bsonType: "string",
              enum: ["carro", "moto", "bicicleta", "camion"],
            },
            minItems: 1,
            description: "Tipos de vehículos permitidos en la zona",
          },
          tarifa_por_hora: {
            bsonType: "object",
            required: ["carro", "moto", "bicicleta", "camion"],
            properties: {
              carro: {
                bsonType: "double",
                minimum: 0,
                description: "Tarifa por hora para carros",
              },
              moto: {
                bsonType: "double",
                minimum: 0,
                description: "Tarifa por hora para motos",
              },
              bicicleta: {
                bsonType: "double",
                minimum: 0,
                description: "Tarifa por hora para bicicletas",
              },
              camion: {
                bsonType: "double",
                minimum: 0,
                description: "Tarifa por hora para camiones",
              },
            },
            additionalProperties: false,
            description: "Tarifas por tipo de vehículo",
          },
          estado: {
            bsonType: "string",
            enum: ["activa", "inactiva", "mantenimiento"],
            description: "Estado de la zona",
          },
        },
        additionalProperties: false,
      },
    },
  })

// And finally, vehicles parked collection

db.createCollection("parqueos", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", 
            "vehiculo_id", 
            "usuario_id", 
            "sede_id", 
            "zona_id", 
            "fecha_entrada", 
            "estado"
        ],
        properties: {
          _id: {
            bsonType: "objectId",
            description: "Identificador único del parqueo",
          },
          vehiculo_id: {
            bsonType: "objectId",
            description: "ID del vehículo parqueado",
          },
          usuario_id: {
            bsonType: "objectId",
            description: "ID del usuario propietario",
          },
          sede_id: {
            bsonType: "objectId",
            description: "ID de la sede donde se parquea",
          },
          zona_id: {
            bsonType: "objectId",
            description: "ID de la zona específica",
          },
          fecha_entrada: {
            bsonType: "date",
            description: "Fecha y hora de entrada",
          },
          fecha_salida: {
            bsonType: "date",
            description: "Fecha y hora de salida (null si está activo)",
          },
          tiempo_total_minutos: {
            bsonType: "int",
            minimum: 0,
            description: "Tiempo total en minutos",
          },
          costo_total: {
            bsonType: "double",
            minimum: 0,
            description: "Costo total del parqueo",
          },
          estado: {
            bsonType: "string",
            enum: ["activo", "finalizado", "cancelado"],
            description: "Estado del parqueo",
          },
          empleado_entrada_id: {
            bsonType: "objectId",
            description: "ID del empleado que registró la entrada",
          },
          empleado_salida_id: {
            bsonType: "objectId",
            description: "ID del empleado que registró la salida",
          },
        },
        additionalProperties: false,
      },
    },
  })