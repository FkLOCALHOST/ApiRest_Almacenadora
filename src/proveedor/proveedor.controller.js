'use strict'

import Proveedor from './proveedor.model.js'


export const agregarProveedor = async (req, res) =>{
    try {
        const {nombre, telefono, direccion, estado} = req.body
        const nuevoProveedor = new Proveedor({
            nombre, 
            telefono,
            direccion,
            estado
        })

        await nuevoProveedor.save()

        res.status(201).json({
            succes: true,
            message: 'Proveedor creado correctamente'
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al agregar el proveedor',
            error: err.message
        } )
        
    }
}

export const actualizarProveedor = async (req, res) => {
    try{
        const {proveedorId} = req.params
        const {nombre, telefono, direccion} = req.body;

        const proveedorA = await Proveedor.findByIdAndUpdate(proveedorId, {nombre, telefono, direccion}, {new: true})

        res.status(201).json({
            success: true,
            message: 'Los datos han sido actualizados correctamente',
            proveedor: proveedorA
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al acutualizar los datos del proveedor',
            error: err.message
        })
    }

}

export const cambiarEstado = async (req, res) =>{
    try{
        const {proveedorId} = req.params
        const {estado} = req.body

        const proveedorA = await Proveedor.findByIdAndUpdate(proveedorId, {estado}, {new: true})

        res.status(201).json({
            success: true,
            message: 'El estado ha sido actualizado correctamente',
            proveedor: proveedorA
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al cambiar el estado del proveedor',
            error: err.message
        })
    }
}

export const eliminarProveedor = async (req, res) => {
    try{
        const {proveedorId} = req.params

        await Proveedor.findByIdAndDelete(proveedorId)

        res.status(201).json({
            success: true,
            message: 'El proveedor ha sido eliminado correctamente'
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el proveedor',
            error: err.message
        })
    }
}

export const listarProveedores = async (req, res) =>{
    try{
        const {limite =10, desde = 0} = req.query
        const query = {estado: true}

        const proveedores = await Promise.all([
            Proveedor.countDocuments(query),
            Proveedor.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ])
        res.status(201).json({
            success: true,
            total,
            proveedores

        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al listar los proveedores',
            error: err.message
        })
    }
}


export const buscarProveedor = async (req, res) => {
    try{
        const {proveedorId} = req.params

        const proveedorA = await Proveedor.findById(proveedorId)

        if(!proveedorA){
            return res.status(404).json({
                success: false,
                message: 'Proveedor no encontrado'
            })
        }

        res.status(201).json({
            success: true,
            proveedor: proveedorA
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al buscar el proveedor',
            error: err.message
        })
    }
}
