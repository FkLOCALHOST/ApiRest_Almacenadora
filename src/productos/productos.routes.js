import { Router } from "express";
import { agregarProducto, listarProductos, buscarProducto, actualizarProducto, eliminarProducto } from "./productos.controller.js";
import { createProductValidator, getProductByIdValidator, updateProductValidator, deleteCategoryValidator } from "../middlewares/products-validators.js";

const router = Router();

/**
 * @swagger
 * /agregarProducto:
 *   post:
 *     summary: Agregar un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreProducto:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: Laptop
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto
 *                 example: Laptop de alta gama
 *               precio:
 *                 type: number
 *                 description: Precio del producto
 *                 example: 1500.50
 *               categoria:
 *                 type: string
 *                 description: Categoría del producto
 *                 example: Electrónica
 *               urlImagen:
 *                 type: string
 *                 description: URL de la imagen del producto
 *                 example: https://example.com/laptop.jpg
 *     responses:
 *       200:
 *         description: Producto agregado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.post("/agregarProducto", createProductValidator, agregarProducto);

/**
 * @swagger
 * /listarProductos:
 *   get:
 *     summary: Listar todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente
 *       404:
 *         description: No se encontraron productos
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/listarProductos", listarProductos);

/**
 * @swagger
 * /buscarProducto/{idProducto}:
 *   get:
 *     summary: Buscar un producto por su ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: idProducto
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/buscarProducto/:idProducto", getProductByIdValidator, buscarProducto);

/**
 * @swagger
 * /actualizarProducto/{idProducto}:
 *   put:
 *     summary: Actualizar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: idProducto
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreProducto:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: Laptop
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto
 *                 example: Laptop de alta gama
 *               precio:
 *                 type: number
 *                 description: Precio del producto
 *                 example: 1500.50
 *               categoria:
 *                 type: string
 *                 description: Categoría del producto
 *                 example: Electrónica
 *               urlImagen:
 *                 type: string
 *                 description: URL de la imagen del producto
 *                 example: https://example.com/laptop.jpg
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.put("/actualizarProducto/:idProducto", updateProductValidator, actualizarProducto);

/**
 * @swagger
 * /eliminarProducto/{idProducto}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: idProducto
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete("/eliminarProducto/:idProducto", deleteCategoryValidator, eliminarProducto);

export default router;