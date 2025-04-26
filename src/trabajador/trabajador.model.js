import {Schema, model} from 'mongoose';

const trabajadorSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxLength: [25, 'El nombre no puede superar los 50 caracteres']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        maxLength: [25, 'El apellido no puede superar los 50 caracteres']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    telefono: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: [true, 'El telefono es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    rendimiento: {
        type: Number,
        default: 0,
        required: true
    },
    fotoDePerfil: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ['EMPLEADO_ROLE', 'ADMIN_ROLE'],
        default: 'EMPLEADO_ROLE'
    },  

},
{
    versionKey: false,
    timeStamps: true
})

trabajadorSchema.methods.toJSON = function(){
    const {_id, ...trabajador} = this.toObject()
    trabajador.tid = _id
    return trabajador
}

export default model('Trabajador', trabajadorSchema)