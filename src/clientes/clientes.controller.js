import { hash } from "bcrypt";
import Clientes from "./clientes.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url";

const  __dirname = dirname(fileURLToPath (import.meta.url))

export const agregarCliente = async (req, res) => {
    try{
        const { nombre, apellido, correo, telefono } = req.body;

        const clientes = new Clientes({nombre, apellido, correo, telefono});
        await clientes.save();

        return res.status(200).json({
            success: true,
            msg: 'El cliente fue agregado exitosamente',
            clientes
        })
    }catch(error){
        return res.status(500).json({
            msg: 'Error al agregar al cliente',
            error
        });
    }
}

export const obtenerClientePorId = async (req, res) => {
    try{
        const { id } = req.params;
        const cliente = await Clientes.findById(id)

        if(!cliente){
            return res.status(404).json({
                success: false,
                message: 'Cliente no esncontrado'
            })
        }

        return res.status(200).json({
            success: true,
            cliente
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al obtener al cliente',
            error: err.message
        })
    }
}

export const listarCientes = async (req, res) => {
    try{
        const { limite = 10, desde = 0 } = req.query
        const query = { estado: true }
        
        const [total, clientes] = await Promise.all([
            Clientes.countDocuments(query),
            Clientes.find(query)
                    .skip(Number(desde))
                    .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            clientes
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los clientes',
            error: err.message
        })
    }
}

export const eliminarCliente = async (req, res) => {
    try{
        const { id } = req.params

        const cliente = await Clientes.findByIdAndUpdate(id, { estado: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: 'Cliente eliminado',
            cliente
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el cliente',
            error: err.message
        })
    }
}

export const actualizarCliente = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;

        const cliente = await Clientes.findByIdAndUpdate(id, data, { new: true});

        res.status(200).json({
            success: true,
            mg: 'Cliente actualizado',
            cliente
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar el cliente',
            error: err.message
        })
    }
}