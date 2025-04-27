import { Schema, model } from 'mongoose';

const clienteSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es requerido'],
        maxLength: [25, "El nombre no puede exceder los 25 caracteres"]
    },
    apellido:{
        type: String,
        required: [true, 'El apellido es requerido'],
        maxLength: [25, 'El apellido no puede exceder los 25 caracteres']
    },
    correo:{
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true,
    },
    telefono:{
        type: String,
        minLenght: 8,
        maxLength: 8,
        required: true
    },
    estado:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true
})

export default model('Cliente', clienteSchema)