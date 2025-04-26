import Trabajador from './trabajador.model.js';
import { hash, verify } from "argon2"
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const inicializarAdmin = async () => {
    try {
        const adminExists = await Trabajador.findOne({ role: "ADMIN_ROLE" }); 
        if (!adminExists) {

            const adminUser = {
                nombre: "Daniel",
                apellido: "Sacol",
                correo: "dsacol10@gmail.com",
                telefono: "33815217",
                estado: true,
                role: "ADMIN_ROLE"
            };
            const admin = new User(adminUser);
            await admin.save();
            console.log("Administrador creado con éxito");
        } else {
            console.log("El Administrador ya existe");
        }

    } catch (error) {
        console.error("Error al crear el Administrador:", error);
    }

};

inicializarAdmin();

export const crearTrabajador = async (req, res) => {
    try{
    const data = req.body;
    let profilePicture = req.file ? req.file.filename : null;
    data.profilePicture = profilePicture;
       
    const trabajador = await Trabajador.create(data);

        return res.status(201).json({
            message: "El trabajador fue creado con éxito",
            nombre: trabajador.nombre,
            apellido: trabajador.apellido
        });

    } catch (err) {
        return res.status(500).json({
            message: "Error al crear el trabajador",
            error: err.message
        });
    }
}
