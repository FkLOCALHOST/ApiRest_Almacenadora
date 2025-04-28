import { Schema, model } from 'mongoose';

const loteSchema =  new Schema({
    numeroLote:{
        type: String,
        required: true,
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
        type: [{
            productoId: {
                type: Schema.Types.ObjectId,
                ref: 'Productos',
                required: true
            }
        }]
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

export default model('Cliente', loteSchema)