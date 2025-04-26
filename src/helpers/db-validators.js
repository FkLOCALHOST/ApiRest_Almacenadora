import Clientes from "../clientes/clientes.model.js";

export const correoExistente = async (correo = '') => {
    const exite = await Clientes.findOne({correo})
    if(exite){
        throw new Error(`El correo ${correo} ya existe`)
    }
}