import { Schema, model} from "mongoose"

const bodegaSchema = Schema({
    numeroBodega: {
        type: String,
        required: [true, "El número de bodega es requerido"],
        minLength: 4,
        maxLength: 6,
        unique: true
    },
    fechaIngreso: {
        type: Date,
        required: [true, "La fecha de ingreso es requerida"]
    },
    fechaSalida: {
        type: Date,
        required: [true, "La fecha de salida es requerida"]
    },
    lote: {
        type: Schema.Types.ObjectId,
        ref: 'Lote',
        required: [true, "El número de lote es requerido"]
    },
    trabajador: {
        type: Schema.Types.ObjectId,
        ref: 'Trabajador',
        required: [true, "El trabajador es requerido"]
    },
    estado:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})


export default model("Bodega", bodegaSchema)