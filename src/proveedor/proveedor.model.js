import {Schema, model} from 'mongoose'

const proveedorSchema = Schema({
    nombre:{
        type: String,
        require: [true, 'El nombre es obligatorio'],
        unique: true
    },
    telefono:{
        type: Number,
        require: [true, 'El telefono es obligatorio'],
        unique: true
    },
    direccion:{
        type: String,
        require: [true, 'La direccion es obligatoria'],
        unique: true
    },
    estado:{
        type:String,
        enum: ['ACTIVO', 'INACTIVO'],
        default: 'ACTIVO',
    },
},
{
    timestamps: true,
    versionKey: false
})

export default model('Proveedor', proveedorSchema)
 