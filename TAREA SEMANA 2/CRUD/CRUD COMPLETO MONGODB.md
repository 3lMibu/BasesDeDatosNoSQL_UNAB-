**CRUD COMPLETO**



**CREATE**



db.clientes.insertOne({

&#x20; nombre: "Pedro",

&#x20; apellido: "Ramos",

&#x20; telefono: "7999-0000",

&#x20; direccion: "San Salvador",

&#x20; cantidad\_libros\_leidos: 8,

&#x20; estado\_civil: "Soltero"

})



**READ**



db.clientes.find()



db.clientes.find({ estado\_civil: "Soltero" })



db.clientes.find({ cantidad\_libros\_leidos: { $gt: 5 } })



**UPDATE**



db.clientes.updateOne(

&#x20; { nombre: "Ana" },

&#x20; { $set: { telefono: "7111-1111" } }

)



db.clientes.updateMany(

&#x20; { estado\_civil: "Soltero" },

&#x20; { $set: { estado\_civil: "En relación" } }

)





**DELETE**



db.clientes.deleteOne({ nombre: "Luis" })



db.clientes.deleteMany({ cantidad\_libros\_leidos: { $lt: 3 } })

