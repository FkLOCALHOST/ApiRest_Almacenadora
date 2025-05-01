import { Router } from "express";
import { agregarProducto, listarProductos, buscarProducto, actualizarProducto, eliminarProducto, generarPDFProductos } from "./productos.controller.js";
import { createProductValidator, getProductByIdValidator, updateProductValidator, deleteProductValidator } from "../middlewares/productos-validators.js";

const router = Router();

/**
 * @swagger
 * /productos/agregarProducto:
 *   post:
 *     summary: Agregar un nuevo producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreProducto:
 *                 type: string
 *                 description: Nombre del producto.
 *                 example: "Laptop"
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto.
 *                 example: "Laptop de alta gama con 16GB de RAM."
 *               precio:
 *                 type: number
 *                 description: Precio del producto.
 *                 example: 1500.50
 *               categoria:
 *                 type: string
 *                 description: Categoría del producto.
 *                 example: "Electrónica"
 *               urlImagen:
 *                 type: string
 *                 description: URL de la imagen del producto.
 *                 example: "https://example.com/laptop.jpg"
 *     responses:
 *       200:
 *         description: Producto agregado exitosamente.
 *       400:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/agregarProducto", createProductValidator, agregarProducto);

/**
 * @swagger
 * /productos/listarProductos:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente.
 *       404:
 *         description: No se encontraron productos.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/listarProductos", listarProductos);

/**
 * @swagger
 * /productos/buscarProducto/{idProducto}:
 *   get:
 *     summary: Buscar un producto por ID
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idProducto
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto (MongoDB ObjectId).
 *     responses:
 *       200:
 *         description: Producto encontrado exitosamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/buscarProducto/:idProducto", getProductByIdValidator, buscarProducto);

/**
 * @swagger
 * /productos/actualizarProducto/{idProducto}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idProducto
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto (MongoDB ObjectId).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreProducto:
 *                 type: string
 *                 description: Nombre del producto.
 *                 example: "Laptop"
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto.
 *                 example: "Laptop de alta gama con 16GB de RAM."
 *               precio:
 *                 type: number
 *                 description: Precio del producto.
 *                 example: 1500.50
 *               categoria:
 *                 type: string
 *                 description: Categoría del producto.
 *                 example: "Electrónica"
 *               urlImagen:
 *                 type: string
 *                 description: URL de la imagen del producto.
 *                 example: "https://example.com/laptop.jpg"
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/actualizarProducto/:idProducto", updateProductValidator, actualizarProducto);

/**
 * @swagger
 * /productos/eliminarProducto/{idProducto}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idProducto
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto (MongoDB ObjectId).
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/eliminarProducto/:idProducto", deleteProductValidator, eliminarProducto);

/**
 * @swagger
 * /productos/generarPDFProductos:
 *   get:
 *     summary: Generar un PDF con la lista de productos
 *     tags: [Productos]
 *     parameters:
 *       - in: query
 *         name: filtro
 *         schema:
 *           type: string
 *         description: Filtro para ordenar los productos (A-Z, Z-A, mayor-precio, menor-precio, reciente, antiguo).
 *     responses:
 *       200:
 *         description: PDF generado exitosamente.
 *       404:
 *         description: No hay productos para mostrar en el PDF.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/generarPDFProductos", generarPDFProductos);

export default router;