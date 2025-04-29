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
import { register } from "../src/auth/auth.controller.js";
import Trabajador from "../src/trabajador/trabajador.model.js";
import productosRoutes from "../src/productos/productos.routes.js";
import authRoutes from "../src/auth/auth.routes.js";

import bodegaRoutes from "../src/bodega/bodega.routes.js"

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
};

const routes = (app) => {
    app.use("/almacenadora/v1/trabajador", trabajadorRoutes);

    app.use('/almacenadora/v1/proveedor', proveedorRoutes)

    app.use("/almacenadora/v1/clientes", clientesRoutes)

    app.use("/almacenadora/v1/productos", productosRoutes);
    
    app.use("/almacenadora/v1/auth", authRoutes);

    app.use("/almacenadora/v1/bodega", bodegaRoutes)
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
                nombreT: "Daniel",
                apellidoT: "Sacol",
                correoT: "dsacol10@gmail.com",
                telefonoT: "33815217",
                contrasenaT: "123Abc!@",
                dpi: "1234567890123",
                estadoT: true,
                role: "ADMIN_ROLE",
            };
            await register(
                { body: adminUser },
                { status: () => ({ json: () => {} }) }
            );
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

