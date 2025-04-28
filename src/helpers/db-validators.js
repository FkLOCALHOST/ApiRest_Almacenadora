import Trabajador from '../trabajador/trabajador.model.js';
import Productos from "../productos/productos.model.js";
import Clientes from "../clientes/clientes.model.js";
import Proveedor from '../proveedor/proveedor.model.js';
import Lote from '../lote/lote.model.js'

export const esRolTrabajador = async (tid = " ") => {
    const trabajador = await Trabajador.findById(tid)
    if(!trabajador){
        throw new Error("Trabajador no encontrado")
    }
    if(trabajador.role !== "EMPLEADO_ROLE"){
        throw new Error("Solo se puede actualizar empleados")
    }
}

export const emailTExists = async (correoT = '') => {
    const existe = await Trabajador.findOne({correoT})
    if(existe){
        throw new Error(`El correo ${correoT} ya existe`)
    }
}

export const trabajadorExists = async (tid = '') => {
    const existe = await Trabajador.findById(tid)
    if(!existe){
        throw new Error(`El trabajador con el ID ${tid} no existe`)
    }
}
export const dpiExists = async (dpiT = '') => {
    const existe = await Trabajador.findOne({dpiT})
    if(existe){
        throw new Error(`El DPI ${dpiT} ya existe`)
    }
}

export const productExists = async (idProducto = " ") => {
    const existe = await Productos.findById(idProducto)
    if(!existe){
        throw new Error("No existe el producto con el ID proporcionado")
    }
}

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

export const loteExistente = async (id = '') => {
    const existe = await Lote.findById(id)
    if(!existe){
        throw new Error('No existe un lote con el ID proporcionado')
    }
}