import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Almacenadora",
            version: "1.0.0",
            description: "",
            contact:{
                name: "Los localHost",
                email: ""
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/almacenadora/v1"
            }
        ]
    },
    apis:[
        "./src/clientes/clientes.routes.js",
        "./src/proveedor/proveedor.routes.js",
        "./src/trabajador/trabajador.routes.js",
        "./src/productos/productos.routes.js",
        "./src/lote/lote.routes.js",
        "./src/bodega/bodega.routes.js",
        "./src/auth/auth.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}