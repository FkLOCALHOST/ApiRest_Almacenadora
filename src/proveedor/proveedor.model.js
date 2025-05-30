import {Schema, model} from 'mongoose'

const proveedorSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    telefono:{
        type: Number,
        required: [true, 'El telefono es obligatorio'],
    },
    direccion:{
        type: String,
        required: [true, 'La direccion es obligatoria'],
    },
    estado:{
        type: Boolean,
        default: true
    },
},
{
    timestamps: true,
    versionKey: false
})

export default model('Proveedor', proveedorSchema)
 