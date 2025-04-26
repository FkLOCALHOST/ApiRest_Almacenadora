import Clientes from "../clientes/clientes.model.js";

export const correoExistente = async (correo = '') => {
    const exite = await Clientes.findOne({correo})
    if(exite){
        throw new Error(`El correo ${correo} ya existe`)
    }
}

export const clienteExistente = async (id = '') => {
    const existe = await Clientes.findById(id)
    if(!existe){
        throw new Error('No existe un cliente con el ID proporcionado')
    }
}

