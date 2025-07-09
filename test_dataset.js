// Eliminar colecciones si existen (para entorno limpio)
db.users.drop()
db.vehiculos.drop()
db.sedes.drop()
db.parqueos.drop()

// 1. Insertar usuarios
const usuarios = [
  {
    _id: ObjectId(),
    nombre: "Juan Pérez",
    email: "juan@example.com",
    telefono: "3001234567",
    cedula: "1000000001",
    rol: "cliente",
    estado: "activo",
    fecha_registro: new Date()
  },
  {
    _id: ObjectId(),
    nombre: "Laura García",
    email: "laura@example.com",
    telefono: "3007654321",
    cedula: "1000000002",
    rol: "cliente",
    estado: "activo",
    fecha_registro: new Date()
  },
  {
    _id: ObjectId(),
    nombre: "Ana Rodríguez",
    email: "ana@example.com",
    telefono: "3009876543",
    cedula: "1000000003",
    rol: "empleado",
    estado: "activo",
    sede_asignada: ObjectId(),
    fecha_registro: new Date()
  }
]

db.users.insertMany(usuarios)


// 2. Insertar sedes con zonas embebidas
const sedes = [
  {
    _id: usuarios[2].sede_asignada,
    nombre: "Sede Central",
    ciudad: "Bogotá",
    direccion: "Calle 123 #45-67",
    telefono: "6011234567",
    horario_apertura: "08:00",
    horario_cierre: "20:00",
    estado: "activa",
    zonas: [
      {
        _id: ObjectId(),
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
        _id: ObjectId(),
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
  }
]

db.sedes.insertMany(sedes)


// 3. Insertar vehículos con propietario embebido
const vehiculos = [
  {
    _id: ObjectId(),
    placa: "ABC123",
    marca: "Toyota",
    modelo: 2020,
    linea: "Corolla",
    color: "Rojo",
    tipo: "carro",
    propietario: {
      _id: usuarios[0]._id,
      nombre: usuarios[0].nombre,
      cedula: usuarios[0].cedula,
      telefono: usuarios[0].telefono
    },
    estado: "activo"
  },
  {
    _id: ObjectId(),
    placa: "XYZ789",
    marca: "Yamaha",
    modelo: 2018,
    linea: "FZ",
    color: "Azul",
    tipo: "moto",
    propietario: {
      _id: usuarios[1]._id,
      nombre: usuarios[1].nombre,
      cedula: usuarios[1].cedula,
      telefono: usuarios[1].telefono
    },
    estado: "activo"
  }
]

db.vehiculos.insertMany(vehiculos)


// 4. Insertar parqueos con snapshots embebidos
const parqueos = [
  {
    _id: ObjectId(),
    vehiculo: {
      _id: vehiculos[0]._id,
      placa: vehiculos[0].placa,
      tipo: vehiculos[0].tipo,
      color: vehiculos[0].color
    },
    usuario: {
      _id: usuarios[0]._id,
      nombre: usuarios[0].nombre,
      cedula: usuarios[0].cedula
    },
    sede: {
      _id: sedes[0]._id,
      nombre: sedes[0].nombre
    },
    zona: {
      _id: sedes[0].zonas[0]._id,
      nombre: sedes[0].zonas[0].nombre,
      tarifa_por_hora: sedes[0].zonas[0].tarifa_por_hora
    },
    fecha_entrada: new Date("2025-07-09T08:30:00Z"),
    fecha_salida: new Date("2025-07-09T10:30:00Z"),
    tiempo_total_minutos: 120,
    costo_total: 6000,
    estado: "finalizado",
    empleado_entrada_id: usuarios[2]._id,
    empleado_salida_id: usuarios[2]._id
  }
]

db.parqueos.insertMany(parqueos)