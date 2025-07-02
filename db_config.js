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