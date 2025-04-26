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