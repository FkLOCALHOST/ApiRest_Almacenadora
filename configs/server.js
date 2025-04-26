"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import trabajadorRoutes from "../src/trabajador/trabajador.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import proveedorRoutes from "../src/proveedor/proveedor.routes.js"
import clientesRoutes from "../src/clientes/clientes.routes.js";
import { crearEmpleado } from "../src/trabajador/trabajador.controller.js";
import Trabajador from "../src/trabajador/trabajador.model.js";
import productosRoutes from "../src/productos/productos.routes.js";

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
};

const routes = (app) => {
    app.use("almacenadora/v1/trabajador", trabajadorRoutes);

    app.use('almacenadora/v1/proveedor', proveedorRoutes)

    app.use("almacenadora/v1/clientes", clientesRoutes)

    app.use("almacenadora/v1/productos", productosRoutes);
    
};

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

const inicializarAdmin = async () => {
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
            await crearEmpleado({ body: adminUser }, { status: () => ({ json: () => {} }) });
            console.log("Administrador creado con éxito");
        } 
    } catch (error) {
        console.error("Error al crear el Administrador:", error);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        inicializarAdmin(); 
        routes(app);
        const port = process.env.PORT || 3001; // Asegúrate de que el puerto sea 3001
        app.listen(port, () => {
            console.log(`Server running on port ${port} `);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};

