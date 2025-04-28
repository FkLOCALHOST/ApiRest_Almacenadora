import { Schema, model} from "mongoose"

const productsSchema = Schema({
    nombreProducto: {
        type: String,
        required: true,
        trim: true
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
    }
},
{
    versionKey: false,
    timeStamps: true
})


export default model("Products", productsSchema)