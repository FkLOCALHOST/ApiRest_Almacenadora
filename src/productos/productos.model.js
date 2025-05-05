import { Schema, model} from "mongoose"

const productsSchema = Schema({
    nombreProducto: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    descripcion: {
        type: String,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: String,
        required: true,
        trim: true
    },
    urlImagen: {
        type: String
    },
    cantidadVenta: {
        type: Number,
        default: 0
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


export default model("Products", productsSchema)