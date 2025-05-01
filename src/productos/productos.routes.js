import { Router } from "express";
import { agregarProducto, listarProductos, buscarProducto, actualizarProducto, eliminarProducto } from "./productos.controller.js";
import { createProductValidator, getProductByIdValidator,
         updateProductValidator, deleteProductValidator, getProductValidator } from "../middlewares/productos-validators.js";

const router = Router();

router.post("/agregarProducto", createProductValidator, agregarProducto);

router.get("/listarProductos", getProductValidator, listarProductos);

router.get("/buscarProducto/:idProducto", getProductByIdValidator, buscarProducto);

router.put("/actualizarProducto/:idProducto", updateProductValidator, actualizarProducto);

router.delete("/eliminarProducto/:idProducto", deleteProductValidator, eliminarProducto);

export default router;