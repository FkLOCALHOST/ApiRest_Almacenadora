import { Schema, model } from 'mongoose';

const loteSchema =  new Schema({
    numeroLote:{
        type: String,
        required: true,
        minLenght: 4,
        maxLength: 15,
        unique: true 
    },
    cantidad: {
        type: String,
        required: true,
    },
    fechaCaducidad: {
        type: String,
        required: true
    },
    productos: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: [true, "El producto es requerido"]
    },
    estado: {
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true
})

export default model('Lote', loteSchema)