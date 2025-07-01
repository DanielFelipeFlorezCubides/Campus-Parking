// Initial set up

"use campus_parking";

// Collections configuration, starting with users collection

db.createCollection(" users ", {
    validator:{
        $jsonSchema: {
            bsonType: "object",
            required: [
                "_id",
                "nombre",
                "email",
                "telefono"
            ],
            properties:{
                _id:{
                    bsonType: "objectId",
                    description: "Identificador unico"
                },
                nombre:{
                    bsonType: "string",
                    description: "El nombre del usuario"
                },
                email:{
                    bsonType: "string",
                    pattern: "",
                    enum: ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com", "icloud.com"],
                    description: "El email debe tener el @ y un dominio valido de correo"
                },
                telefono:{
                    bsonType: "string",
                    pattern: "",
                    description: "El numero de telefono debe tener un sufijo valido y 7 numeros"
                }
            },
            additionalProperties: false
        }
    }
})

// Now moving up to vehicles collection
db.createCollection(" vehiculos ", {
    validator:{
        $jsonSchema: {
            bsonType: "object",
            required: [
                "_id",
                "placa",
                "marca",
                "modelo",
                "linea",
                "color"
            ],
            properties: {
                _id: {
                    bsonType: "objectId",
                    description: "Identificador unico"
                },
                placa: {
                    bsonType: "string",
                    minLenght: 6,
                    pattern: "^[A-Z]{3}[0-9]{3}$",
                    description: "El formato de la placa es AAA123"
                },
                marca: {
                    bsonType: "string",
                    minLenght: 2,
                    description: "La marca debe tener minimo dos caracteres"
                },
                modelo: {
                    bsonType: "int",
                    description: "El modelo debe ser un entero"
                },
                linea: {
                    bsonType: "string",
                    minLenght: 2,
                    description: "La linea debe tener minimo dos caracteres"
                },
                color: {
                    bsonType: "string",
                    pattern: "^[A-Z]\\w{2,}",
                    description: "El color debe comenzar con mayuscula y tener al menos 3 caracteres"
                }
            },
            additionalProperties: false
        }
    }
})