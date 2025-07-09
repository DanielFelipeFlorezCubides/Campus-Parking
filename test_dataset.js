// Eliminar colecciones si existen (para entorno limpio)
db.users.drop()
db.vehiculos.drop()
db.sedes.drop()
db.parqueos.drop()

// 1. Insertar usuarios
const usuarios = [
    {
        _id: ObjectId(),
        nombre: "Ana Rodríguez",
        email: "ana@example.com",
        telefono: "3009876543",
        cedula: "1000000003",
        rol: "empleado",
        estado: "activo",
        sede_asignada: ObjectId("66bd69001a1c000003000001"), // Sede central
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd70001a1c000006000001"),
        nombre: "Luis Cárdenas",
        email: "luis.cardenas@sedenorte.com",
        telefono: "3006666601",
        cedula: "1000000030",
        rol: "empleado",
        estado: "activo",
        sede_asignada: ObjectId("66bd66f01a1c000002000001"), // Sede Norte
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd70001a1c000006000002"),
        nombre: "Sandra Mejía",
        email: "sandra.mejia@sedesur.com",
        telefono: "3006666602",
        cedula: "1000000031",
        rol: "empleado",
        estado: "activo",
        sede_asignada: ObjectId("66bd66f01a1c000002000002"), // Sede Sur
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c000001000001"),
        nombre: "Carlos Torres",
        email: "carlos@example.com",
        telefono: "3005555501",
        cedula: "1000000010",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c000001000002"),
        nombre: "María López",
        email: "maria@example.com",
        telefono: "3005555502",
        cedula: "1000000011",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c000001000003"),
        nombre: "Pedro Sánchez",
        email: "pedro@example.com",
        telefono: "3005555503",
        cedula: "1000000012",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c000001000004"),
        nombre: "Lucía Ramírez",
        email: "lucia@example.com",
        telefono: "3005555504",
        cedula: "1000000013",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c000001000005"),
        nombre: "Javier Gómez",
        email: "javier@example.com",
        telefono: "3005555505",
        cedula: "1000000014",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c000001000006"),
        nombre: "Sofía Morales",
        email: "sofia@example.com",
        telefono: "3005555506",
        cedula: "1000000015",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c000001000007"),
        nombre: "Diego Herrera",
        email: "diego@example.com",
        telefono: "3005555507",
        cedula: "1000000016",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c000001000008"),
        nombre: "Valentina Castro",
        email: "valentina@example.com",
        telefono: "3005555508",
        cedula: "1000000017",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c000001000009"),
        nombre: "Mateo Ruiz",
        email: "mateo@example.com",
        telefono: "3005555509",
        cedula: "1000000018",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c00000100000a"),
        nombre: "Camila Ortiz",
        email: "camila@example.com",
        telefono: "3005555510",
        cedula: "1000000019",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c00000100000b"),
        nombre: "Esteban Ríos",
        email: "esteban@example.com",
        telefono: "3005555511",
        cedula: "1000000020",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c00000100000c"),
        nombre: "Daniela Navarro",
        email: "daniela@example.com",
        telefono: "3005555512",
        cedula: "1000000021",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c00000100000d"),
        nombre: "Samuel Pardo",
        email: "samuel@example.com",
        telefono: "3005555513",
        cedula: "1000000022",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c00000100000e"),
        nombre: "Natalia Prieto",
        email: "natalia@example.com",
        telefono: "3005555514",
        cedula: "1000000023",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c00000100000f"),
        nombre: "Tomás Ayala",
        email: "tomas@example.com",
        telefono: "3005555515",
        cedula: "1000000024",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c000001000010"),
        nombre: "Isabella Peña",
        email: "isabella@example.com",
        telefono: "3005555516",
        cedula: "1000000025",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    },
    {
        _id: ObjectId("66bd64a01a1c000001000011"),
        nombre: "Andrés Duarte",
        email: "andres@example.com",
        telefono: "3005555517",
        cedula: "1000000026",
        rol: "cliente",
        estado: "activo",
        fecha_registro: new Date()
    }
]

db.users.insertMany(usuarios)


// 2. Insertar sedes con zonas embebidas
const sedes = [
    {
        _id: ObjectId("66bd69001a1c000003000001"),
        nombre: "Sede Central",
        ciudad: "Bogotá",
        direccion: "Calle 123 #45-67",
        telefono: "6011234567",
        horario_apertura: "08:00",
        horario_cierre: "20:00",
        estado: "activa",
        zonas: [
            {
                _id: ObjectId("66bd69001a1c000003000101"),
                nombre: "Zona A",
                capacidad_maxima: 30,
                cupos_disponibles: 25,
                tipos_vehiculo_permitidos: ["carro", "moto"],
                tarifa_por_hora: {
                    carro: 3000,
                    moto: 1500,
                    bicicleta: 1000,
                    camion: 5000
                },
                estado: "activa"
            },
            {
                _id: ObjectId("66bd69001a1c000003000102"),
                nombre: "Zona B",
                capacidad_maxima: 15,
                cupos_disponibles: 10,
                tipos_vehiculo_permitidos: ["bicicleta"],
                tarifa_por_hora: {
                    carro: 0,
                    moto: 0,
                    bicicleta: 800,
                    camion: 0
                },
                estado: "activa"
            }
        ]
    },
    {
        _id: ObjectId("66bd66f01a1c000002000001"),
        nombre: "Sede Norte",
        ciudad: "Medellín",
        direccion: "Av. 80 #45-32",
        telefono: "6041234567",
        horario_apertura: "07:00",
        horario_cierre: "21:00",
        estado: "activa",
        zonas: [
            {
                _id: ObjectId("66bd66f01a1c000002000101"),
                nombre: "Zona C",
                capacidad_maxima: 20,
                cupos_disponibles: 15,
                tipos_vehiculo_permitidos: ["carro", "camion"],
                tarifa_por_hora: {
                    carro: 3500,
                    moto: 0,
                    bicicleta: 0,
                    camion: 6000
                },
                estado: "activa"
            }
        ]
    },
    {
        _id: ObjectId("66bd66f01a1c000002000002"),
        nombre: "Sede Sur",
        ciudad: "Cali",
        direccion: "Cra. 5 #30-50",
        telefono: "6027654321",
        horario_apertura: "06:00",
        horario_cierre: "22:00",
        estado: "activa",
        zonas: [
            {
                _id: ObjectId("66bd66f01a1c000002000102"),
                nombre: "Zona D",
                capacidad_maxima: 25,
                cupos_disponibles: 20,
                tipos_vehiculo_permitidos: ["moto", "bicicleta"],
                tarifa_por_hora: {
                    carro: 0,
                    moto: 1800,
                    bicicleta: 900,
                    camion: 0
                },
                estado: "activa"
            }
        ]
    }
]

db.sedes.insertMany(sedes)


// 3. Insertar vehículos con propietario embebido
const vehiculos = [
    {
        _id: ObjectId("66bd6b001a1c000004000001"),
        placa: "AAA101",
        marca: "Toyota",
        modelo: 2021,
        linea: "Corolla",
        color: "Rojo",
        tipo: "carro",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000001"),
            nombre: "Carlos Torres",
            cedula: "1000000010",
            telefono: "3005555501"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000002"),
        placa: "AAA102",
        marca: "Kia",
        modelo: 2020,
        linea: "Rio",
        color: "Negro",
        tipo: "carro",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000002"),
            nombre: "María López",
            cedula: "1000000011",
            telefono: "3005555502"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000003"),
        placa: "AAA103",
        marca: "Renault",
        modelo: 2019,
        linea: "Sandero",
        color: "Blanco",
        tipo: "carro",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000003"),
            nombre: "Pedro Sánchez",
            cedula: "1000000012",
            telefono: "3005555503"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000004"),
        placa: "AAA104",
        marca: "Yamaha",
        modelo: 2018,
        linea: "FZ",
        color: "Azul",
        tipo: "moto",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000004"),
            nombre: "Lucía Ramírez",
            cedula: "1000000013",
            telefono: "3005555504"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000005"),
        placa: "AAA105",
        marca: "Suzuki",
        modelo: 2017,
        linea: "GN125",
        color: "Rojo",
        tipo: "moto",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000005"),
            nombre: "Javier Gómez",
            cedula: "1000000014",
            telefono: "3005555505"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000006"),
        placa: "AAA106",
        marca: "Chevrolet",
        modelo: 2022,
        linea: "Spark",
        color: "Gris",
        tipo: "carro",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000006"),
            nombre: "Sofía Morales",
            cedula: "1000000015",
            telefono: "3005555506"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000007"),
        placa: "AAA107",
        marca: "Mazda",
        modelo: 2019,
        linea: "CX-3",
        color: "Negro",
        tipo: "carro",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000007"),
            nombre: "Diego Herrera",
            cedula: "1000000016",
            telefono: "3005555507"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000008"),
        placa: "AAA108",
        marca: "Bajaj",
        modelo: 2020,
        linea: "Pulsar",
        color: "Azul",
        tipo: "moto",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000008"),
            nombre: "Valentina Castro",
            cedula: "1000000017",
            telefono: "3005555508"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000009"),
        placa: "AAA109",
        marca: "BMW",
        modelo: 2021,
        linea: "G310",
        color: "Blanco",
        tipo: "moto",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000009"),
            nombre: "Mateo Ruiz",
            cedula: "1000000018",
            telefono: "3005555509"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c00000400000a"),
        placa: "AAA110",
        marca: "Ford",
        modelo: 2016,
        linea: "Fiesta",
        color: "Gris",
        tipo: "carro",
        propietario: {
            _id: ObjectId("66bd64a01a1c00000100000a"),
            nombre: "Camila Ortiz",
            cedula: "1000000019",
            telefono: "3005555510"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c00000400000b"),
        placa: "AAA111",
        marca: "Honda",
        modelo: 2020,
        linea: "CB190R",
        color: "Rojo",
        tipo: "moto",
        propietario: {
            _id: ObjectId("66bd64a01a1c00000100000b"),
            nombre: "Esteban Ríos",
            cedula: "1000000020",
            telefono: "3005555511"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c00000400000c"),
        placa: "AAA112",
        marca: "Hyundai",
        modelo: 2018,
        linea: "i10",
        color: "Plata",
        tipo: "carro",
        propietario: {
            _id: ObjectId("66bd64a01a1c00000100000c"),
            nombre: "Daniela Navarro",
            cedula: "1000000021",
            telefono: "3005555512"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c00000400000d"),
        placa: "AAA113",
        marca: "Mercedes",
        modelo: 2022,
        linea: "Sprinter",
        color: "Blanco",
        tipo: "camion",
        propietario: {
            _id: ObjectId("66bd64a01a1c00000100000d"),
            nombre: "Samuel Pardo",
            cedula: "1000000022",
            telefono: "3005555513"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c00000400000e"),
        placa: "AAA114",
        marca: "Volkswagen",
        modelo: 2015,
        linea: "Amarok",
        color: "Gris",
        tipo: "camion",
        propietario: {
            _id: ObjectId("66bd64a01a1c00000100000e"),
            nombre: "Natalia Prieto",
            cedula: "1000000023",
            telefono: "3005555514"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c00000400000f"),
        placa: "AAA115",
        marca: "Chevrolet",
        modelo: 2017,
        linea: "Tracker",
        color: "Negro",
        tipo: "carro",
        propietario: {
            _id: ObjectId("66bd64a01a1c00000100000f"),
            nombre: "Tomás Ayala",
            cedula: "1000000024",
            telefono: "3005555515"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000010"),
        placa: "AAA116",
        marca: "Toyota",
        modelo: 2020,
        linea: "Yaris",
        color: "Rojo",
        tipo: "carro",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000010"),
            nombre: "Isabella Peña",
            cedula: "1000000025",
            telefono: "3005555516"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000011"),
        placa: "AAA117",
        marca: "Renault",
        modelo: 2021,
        linea: "Duster",
        color: "Blanco",
        tipo: "carro",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000011"),
            nombre: "Andrés Duarte",
            cedula: "1000000026",
            telefono: "3005555517"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000012"),
        placa: "AAA118",
        marca: "Giant",
        modelo: 2022,
        linea: "Escape 3",
        color: "Azul",
        tipo: "bicicleta",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000001"),
            nombre: "Carlos Torres",
            cedula: "1000000010",
            telefono: "3005555501"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000013"),
        placa: "AAA119",
        marca: "Trek",
        modelo: 2023,
        linea: "FX 1",
        color: "Negro",
        tipo: "bicicleta",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000002"),
            nombre: "María López",
            cedula: "1000000011",
            telefono: "3005555502"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000014"),
        placa: "AAA120",
        marca: "Ford",
        modelo: 2019,
        linea: "Explorer",
        color: "Gris",
        tipo: "carro",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000003"),
            nombre: "Pedro Sánchez",
            cedula: "1000000012",
            telefono: "3005555503"
        },
        estado: "activo"
    },
    {
        _id: ObjectId("66bd6b001a1c000004000015"),
        placa: "AAA121",
        marca: "KTM",
        modelo: 2021,
        linea: "Duke 200",
        color: "Naranja",
        tipo: "moto",
        propietario: {
            _id: ObjectId("66bd64a01a1c000001000004"),
            nombre: "Lucía Ramírez",
            cedula: "1000000013",
            telefono: "3005555504"
        },
        estado: "activo"
    }
]

db.vehiculos.insertMany(vehiculos)


// 4. Insertar parqueos con snapshots embebidos
const parqueos = [
    {
        _id: ObjectId("66bd6e001a1c000005000001"),
        vehiculo: {
            _id: ObjectId("66bd6b001a1c000004000001"),
            placa: "AAA101",
            tipo: "carro",
            color: "Rojo"
        },
        usuario: {
            _id: ObjectId("66bd64a01a1c000001000001"),
            nombre: "Carlos Torres",
            cedula: "1000000010"
        },
        sede: {
            _id: ObjectId("66bd69001a1c000003000001"),
            nombre: "Sede Central"
        },
        zona: {
            _id: ObjectId("66bd69001a1c000003000101"),
            nombre: "Zona A",
            tarifa_por_hora: {
                carro: 3000,
                moto: 1500,
                bicicleta: 1000,
                camion: 5000
            }
        },
        fecha_entrada: new Date("2025-07-08T08:00:00Z"),
        fecha_salida: new Date("2025-07-08T10:00:00Z"),
        tiempo_total_minutos: 120,
        costo_total: 6000,
        estado: "finalizado",
        empleado_entrada_id: ObjectId("66bd63001a1c000000000003"),
        empleado_salida_id: ObjectId("66bd63001a1c000000000003")
    },
    {
        _id: ObjectId("66bd6e001a1c000005000002"),
        vehiculo: {
            _id: ObjectId("66bd6b001a1c000004000002"),
            placa: "AAA102",
            tipo: "carro",
            color: "Negro"
        },
        usuario: {
            _id: ObjectId("66bd64a01a1c000001000002"),
            nombre: "María López",
            cedula: "1000000011"
        },
        sede: {
            _id: ObjectId("66bd69001a1c000003000001"),
            nombre: "Sede Central"
        },
        zona: {
            _id: ObjectId("66bd69001a1c000003000101"),
            nombre: "Zona A",
            tarifa_por_hora: {
                carro: 3000,
                moto: 1500,
                bicicleta: 1000,
                camion: 5000
            }
        },
        fecha_entrada: new Date("2025-07-08T09:00:00Z"),
        fecha_salida: new Date("2025-07-08T11:00:00Z"),
        tiempo_total_minutos: 120,
        costo_total: 6000,
        estado: "finalizado",
        empleado_entrada_id: ObjectId("66bd63001a1c000000000003"),
        empleado_salida_id: ObjectId("66bd63001a1c000000000003")
    },
    {
        _id: ObjectId("66bd6e001a1c000005000003"),
        vehiculo: {
            _id: ObjectId("66bd6b001a1c000004000003"),
            placa: "AAA103",
            tipo: "carro",
            color: "Blanco"
        },
        usuario: {
            _id: ObjectId("66bd64a01a1c000001000003"),
            nombre: "Pedro Sánchez",
            cedula: "1000000012"
        },
        sede: {
            _id: ObjectId("66bd69001a1c000003000001"),
            nombre: "Sede Central"
        },
        zona: {
            _id: ObjectId("66bd69001a1c000003000101"),
            nombre: "Zona A",
            tarifa_por_hora: {
                carro: 3000,
                moto: 1500,
                bicicleta: 1000,
                camion: 5000
            }
        },
        fecha_entrada: new Date("2025-07-08T10:00:00Z"),
        fecha_salida: new Date("2025-07-08T13:00:00Z"),
        tiempo_total_minutos: 180,
        costo_total: 9000,
        estado: "finalizado",
        empleado_entrada_id: ObjectId("66bd63001a1c000000000003"),
        empleado_salida_id: ObjectId("66bd63001a1c000000000003")
    },
    {
        _id: ObjectId("66bd6e001a1c000005000004"),
        vehiculo: {
            _id: ObjectId("66bd6b001a1c000004000004"),
            placa: "AAA104",
            tipo: "moto",
            color: "Azul"
        },
        usuario: {
            _id: ObjectId("66bd64a01a1c000001000004"),
            nombre: "Lucía Ramírez",
            cedula: "1000000013"
        },
        sede: {
            _id: ObjectId("66bd69001a1c000003000001"),
            nombre: "Sede Central"
        },
        zona: {
            _id: ObjectId("66bd69001a1c000003000101"),
            nombre: "Zona A",
            tarifa_por_hora: {
                carro: 3000,
                moto: 1500,
                bicicleta: 1000,
                camion: 5000
            }
        },
        fecha_entrada: new Date("2025-07-08T10:30:00Z"),
        fecha_salida: new Date("2025-07-08T12:30:00Z"),
        tiempo_total_minutos: 120,
        costo_total: 3000,
        estado: "finalizado",
        empleado_entrada_id: ObjectId("66bd63001a1c000000000003"),
        empleado_salida_id: ObjectId("66bd63001a1c000000000003")
    },
    {
        _id: ObjectId("66bd6e001a1c000005000005"),
        vehiculo: {
            _id: ObjectId("66bd6b001a1c000004000005"),
            placa: "AAA105",
            tipo: "moto",
            color: "Rojo"
        },
        usuario: {
            _id: ObjectId("66bd64a01a1c000001000005"),
            nombre: "Javier Gómez",
            cedula: "1000000014"
        },
        sede: {
            _id: ObjectId("66bd69001a1c000003000001"),
            nombre: "Sede Central"
        },
        zona: {
            _id: ObjectId("66bd69001a1c000003000101"),
            nombre: "Zona A",
            tarifa_por_hora: {
                carro: 3000,
                moto: 1500,
                bicicleta: 1000,
                camion: 5000
            }
        },
        fecha_entrada: new Date("2025-07-08T11:00:00Z"),
        fecha_salida: new Date("2025-07-08T13:00:00Z"),
        tiempo_total_minutos: 120,
        costo_total: 3000,
        estado: "finalizado",
        empleado_entrada_id: ObjectId("66bd63001a1c000000000003"),
        empleado_salida_id: ObjectId("66bd63001a1c000000000003")
    },
    {
        _id: ObjectId("66bd71001a1c000007000001"),
        vehiculo: {
            _id: ObjectId("66bd6b001a1c000004000006"),
            placa: "AAA106",
            tipo: "carro",
            color: "Gris"
        },
        usuario: {
            _id: ObjectId("66bd64a01a1c000001000006"),
            nombre: "Sofía Morales",
            cedula: "1000000015"
        },
        sede: {
            _id: ObjectId("66bd66f01a1c000002000001"),
            nombre: "Sede Norte"
        },
        zona: {
            _id: ObjectId("66bd66f01a1c000002000101"),
            nombre: "Zona C",
            tarifa_por_hora: {
                carro: 3500,
                moto: 0,
                bicicleta: 0,
                camion: 6000
            }
        },
        fecha_entrada: new Date("2025-07-09T08:00:00Z"),
        fecha_salida: new Date("2025-07-09T10:00:00Z"),
        tiempo_total_minutos: 120,
        costo_total: 7000,
        estado: "finalizado",
        empleado_entrada_id: ObjectId("66bd70001a1c000006000001"),
        empleado_salida_id: ObjectId("66bd70001a1c000006000001")
    },
    {
        _id: ObjectId("66bd71001a1c000007000002"),
        vehiculo: {
            _id: ObjectId("66bd6b001a1c000004000007"),
            placa: "AAA107",
            tipo: "carro",
            color: "Negro"
        },
        usuario: {
            _id: ObjectId("66bd64a01a1c000001000007"),
            nombre: "Diego Herrera",
            cedula: "1000000016"
        },
        sede: {
            _id: ObjectId("66bd66f01a1c000002000001"),
            nombre: "Sede Norte"
        },
        zona: {
            _id: ObjectId("66bd66f01a1c000002000101"),
            nombre: "Zona C",
            tarifa_por_hora: {
                carro: 3500,
                moto: 0,
                bicicleta: 0,
                camion: 6000
            }
        },
        fecha_entrada: new Date("2025-07-09T11:00:00Z"),
        fecha_salida: new Date("2025-07-09T12:00:00Z"),
        tiempo_total_minutos: 60,
        costo_total: 3500,
        estado: "finalizado",
        empleado_entrada_id: ObjectId("66bd70001a1c000006000001"),
        empleado_salida_id: ObjectId("66bd70001a1c000006000001")
    },
    {
        _id: ObjectId("66bd71001a1c000007000003"),
        vehiculo: {
            _id: ObjectId("66bd6b001a1c000004000008"),
            placa: "AAA108",
            tipo: "moto",
            color: "Azul"
        },
        usuario: {
            _id: ObjectId("66bd64a01a1c000001000008"),
            nombre: "Valentina Castro",
            cedula: "1000000017"
        },
        sede: {
            _id: ObjectId("66bd66f01a1c000002000002"),
            nombre: "Sede Sur"
        },
        zona: {
            _id: ObjectId("66bd66f01a1c000002000102"),
            nombre: "Zona D",
            tarifa_por_hora: {
                carro: 0,
                moto: 1800,
                bicicleta: 900,
                camion: 0
            }
        },
        fecha_entrada: new Date("2025-07-10T08:00:00Z"),
        fecha_salida: new Date("2025-07-10T10:00:00Z"),
        tiempo_total_minutos: 120,
        costo_total: 3600,
        estado: "finalizado",
        empleado_entrada_id: ObjectId("66bd70001a1c000006000002"),
        empleado_salida_id: ObjectId("66bd70001a1c000006000002")
    },
    {
        _id: ObjectId("66bd71001a1c000007000004"),
        vehiculo: {
            _id: ObjectId("66bd6b001a1c000004000009"),
            placa: "AAA109",
            tipo: "moto",
            color: "Blanco"
        },
        usuario: {
            _id: ObjectId("66bd64a01a1c000001000009"),
            nombre: "Mateo Ruiz",
            cedula: "1000000018"
        },
        sede: {
            _id: ObjectId("66bd66f01a1c000002000002"),
            nombre: "Sede Sur"
        },
        zona: {
            _id: ObjectId("66bd66f01a1c000002000102"),
            nombre: "Zona D",
            tarifa_por_hora: {
                carro: 0,
                moto: 1800,
                bicicleta: 900,
                camion: 0
            }
        },
        fecha_entrada: new Date("2025-07-10T10:00:00Z"),
        fecha_salida: new Date("2025-07-10T11:30:00Z"),
        tiempo_total_minutos: 90,
        costo_total: 2700,
        estado: "finalizado",
        empleado_entrada_id: ObjectId("66bd70001a1c000006000002"),
        empleado_salida_id: ObjectId("66bd70001a1c000006000002")
    }
]

db.parqueos.insertMany(parqueos)