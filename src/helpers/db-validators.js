import Trabajador from '../trabajador/trabajador.model.js';

export const esRolTrabajador = async (tid = " ") => {
    const trabajador = await Trabajador.findById(tid)
    if(!trabajador){
        throw new Error("Trabajador no encontrado")
    }
    if(trabajador.role !== "EMPLEADO_ROLE"){
        throw new Error("Solo se puede actualizar empleados")
    }
}