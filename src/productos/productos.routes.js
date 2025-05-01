import { Router } from "express";
import { agregarProducto, listarProductos, buscarProducto, actualizarProducto, eliminarProducto, generarPDFProductos } from "./productos.controller.js";
import { createProductValidator, getProductByIdValidator,
         updateProductValidator, deleteProductValidator } from "../middlewares/productos-validators.js";

const router = Router();

router.post("/agregarProducto", createProductValidator, agregarProducto);

router.get("/listarProductos", listarProductos);

router.get("/buscarProducto/:idProducto", getProductByIdValidator, buscarProducto);

router.put("/actualizarProducto/:idProducto", updateProductValidator, actualizarProducto);

router.delete("/eliminarProducto/:idProducto", deleteProductValidator, eliminarProducto);

router.get("/generarPDFProductos", generarPDFProductos);


export default router;