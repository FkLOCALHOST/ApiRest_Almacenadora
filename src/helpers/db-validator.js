import Proveedor from '../proveedor/proveedor.model.js'

export const nameExists = async (name = "") => {
    const exsite = await Proveedor.findOne({name})
    if (exsite) {
        throw new Error(`El nombre ${name} ya existe`)
    }
}

export const telefonoExists = async (telefono = "") => {
    const exsite = await Proveedor.findOne({telefono})
    if (exsite) {
        throw new Error(`El telefono ${telefono} ya existe`)
    }
}

export const direccionExists = async (direccion = "") => {      
    const exsite = await Proveedor.findOne({direccion})
    if (exsite) {
        throw new Error(`La direccion ${direccion} ya existe`)
    }
}