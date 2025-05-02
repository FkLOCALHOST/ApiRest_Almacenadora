import { Router } from "express";
import { crearLote, obtenerLotePorId, listarLotes, eliminarLote, actualizarLote, generarPDFLotes } from "./lote.controller.js";
import { crearLoteValidador, obtenerLotePorIdValidador, listarLotesValidador, eliminarLoteValidador, actualizarLotesValidador } from "../middlewares/lote-validator.js";

const router = Router();

/**
 * @swagger
 * /lote/crearLote:
 *   post:
 *     summary: Crear un nuevo lote
 *     tags: [Lotes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroLote:
 *                 type: string
 *                 description: Número único del lote.
 *                 example: "L12345"
 *               cantidad:
 *                 type: string
 *                 description: Cantidad de productos en el lote.
 *                 example: "100"
 *               fechaCaducidad:
 *                 type: string
 *                 format: date
 *                 description: Fecha de caducidad del lote.
 *                 example: "2025-12-31"
 *               productoId:
 *                 type: string
 *                 description: ID del producto asociado (MongoDB ObjectId).
 *                 example: "644f1c2e5f1b2c001c8e4d3a"
 *     responses:
 *       200:
 *         description: Lote creado exitosamente.
 *       400:
 *         description: Error de validación.
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/crearLote", crearLoteValidador, crearLote);

/**
 * @swagger
 * /lote/obtenerLotePorId/{id}:
 *   get:
 *     summary: Obtener un lote por ID
 *     tags: [Lotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del lote (MongoDB ObjectId).
 *     responses:
 *       200:
 *         description: Lote encontrado exitosamente.
 *       404:
 *         description: Lote no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/obtenerLotePorId/:id", obtenerLotePorIdValidador, obtenerLotePorId);

/**
 * @swagger
 * /lote:
 *   get:
 *     summary: Listar todos los lotes
 *     tags: [Lotes]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número máximo de lotes a listar.
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Número de lotes a omitir desde el inicio.
 *     responses:
 *       200:
 *         description: Lista de lotes obtenida exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", listarLotesValidador, listarLotes);

/**
 * @swagger
 * /lote/eliminarLote/{id}:
 *   delete:
 *     summary: Eliminar un lote (cambia su estado a inactivo)
 *     tags: [Lotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del lote (MongoDB ObjectId).
 *     responses:
 *       200:
 *         description: Lote eliminado exitosamente.
 *       404:
 *         description: Lote no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/eliminarLote/:id", eliminarLoteValidador, eliminarLote);

/**
 * @swagger
 * /lote/actualizarLote/{id}:
 *   put:
 *     summary: Actualizar los datos de un lote
 *     tags: [Lotes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del lote (MongoDB ObjectId).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroLote:
 *                 type: string
 *                 description: Número único del lote.
 *                 example: "L12345"
 *               cantidad:
 *                 type: string
 *                 description: Cantidad de productos en el lote.
 *                 example: "100"
 *               fechaCaducidad:
 *                 type: string
 *                 format: date
 *                 description: Fecha de caducidad del lote.
 *                 example: "2025-12-31"
 *     responses:
 *       200:
 *         description: Lote actualizado exitosamente.
 *       404:
 *         description: Lote no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put("/actualizarLote/:id", actualizarLotesValidador, actualizarLote);

/**
 * @swagger
 * /lote/generarPDFLotes:
 *   get:
 *     summary: Generar un PDF con la lista de lotes
 *     tags: [Lotes]
 *     parameters:
 *       - in: query
 *         name: filtro
 *         schema:
 *           type: string
 *         description: Filtro para ordenar los lotes (A-Z, Z-A, reciente, antiguo).
 *     responses:
 *       200:
 *         description: PDF generado exitosamente.
 *       404:
 *         description: No hay lotes activos para mostrar.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/generarPDFLotes", generarPDFLotes);

export default router;
