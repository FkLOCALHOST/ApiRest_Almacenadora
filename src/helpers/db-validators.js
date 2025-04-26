import Productos from "../productos/productos.model.js"

export const productExists = async (idProducto = " ") => {
    const existe = await Productos.findById(idProducto)
    if(!existe){
        throw new Error("No existe el producto con el ID proporcionado")
    }
}