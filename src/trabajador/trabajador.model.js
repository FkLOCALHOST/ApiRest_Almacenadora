import {Schema, model} from 'mongoose';

const trabajadorSchema = Schema({
    nombreT: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        maxLength: [25, 'El nombre no puede superar los 50 caracteres']
    },
    dpi: {
        type: String,
        required: [true, 'El DPI es obligatorio'],
        unique: true,
        minLength: 13,
        maxLength: 13
    },
    apellidoT: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        maxLength: [25, 'El apellido no puede superar los 50 caracteres']
    },
    correoT: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
    },
    telefonoT: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: [true, 'El telefono es obligatorio']
    },
    estadoT: {
        type: Boolean,
        default: true,
        required: true
    },
    rendimientoT: {
        type: Number,
        default: 0,
        required: true
    },
    contrasenaT: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minLength: [8, 'La contraseña debe tener al menos 8 caracteres']
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