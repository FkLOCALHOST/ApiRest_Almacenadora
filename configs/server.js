"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import trabajadorRoutes from "../trabajador/trabajador.routes.js"


import apiLimiter from "../src/middlewares/rate-limit-validator.js"
import proveedorRoutes from "../src/proveedor/proveedor.routes.js"







import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import clientesRoutes from "../src/clientes/clientes.routes.js";

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);
};

const routes = (app) => {
    app.use("administradorBodega/v1/trabajador", trabajadorRoutes);

    app.use('/almacenadora/v1/proveedor', proveedorRoutes)


    app.use("/bodega/v1/clientes", clientesRoutes)

    
};

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {

        middlewares(app);

       middlewares(app);


        conectarDB();
        routes(app);
        const port = process.env.PORT || 3001; // Asegúrate de que el puerto sea 3001
        app.listen(port, () => {
            console.log(`Server running on port ${port} matutina`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};

