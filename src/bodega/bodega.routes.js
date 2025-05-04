import { Router } from "express";
import { agregarBodega, obtenerBodegas, buscarBodega, actualizarBodega, 
    generarPDFBodegas, obtenerBodegaPdf, eliminarBodega, obtenerBodegasPorFechaIngreso, obtenerBodegasPorFechaSalida } from "./bodega.controller.js"; 
import { agregarBodegaValidator, buscarBodegaValidator, eliminarBodegaValidador, listarBodegaValidator } from "../middlewares/bodega-validators.js"; 

const router = Router();

/**
 * @swagger
 * /bodega/agregarBodega:
 *   post:
 *     summary: Agregar una nueva bodega
 *     tags: [Bodegas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lote:
 *                 type: string
 *                 description: ID del lote asociado (MongoDB ObjectId).
 *                 example: "644f1c2e5f1b2c001c8e4d3a"
 *               trabajador:
 *                 type: string
 *                 description: ID del trabajador asociado (MongoDB ObjectId).
 *                 example: "644f1c2e5f1b2c001c8e4d3b"
 *               fechaIngreso:
 *                 type: string
 *                 format: date
 *                 description: Fecha de ingreso de la bodega.
 *                 example: "2025-04-30"
 *               fechaSalida:
 *                 type: string
 *                 format: date
 *                 description: Fecha de salida de la bodega.
 *                 example: "2025-05-15"
 *     responses:
 *       201:
 *         description: Bodega creada correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */
router.post("/agregarBodega", agregarBodegaValidator, agregarBodega);

/**
 * @swagger
 * /bodega:
 *   get:
 *     summary: Obtener todas las bodegas
 *     tags: [Bodegas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de bodegas obtenida exitosamente
 *       404:
 *         description: No se encontraron registros de bodegas
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", listarBodegaValidator, obtenerBodegas);

/**
 * @swagger
 * /bodega/buscarBodega/{idBodega}:
 *   get:
 *     summary: Buscar una bodega por ID
 *     tags: [Bodegas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idBodega
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la bodega a buscar
 *     responses:
 *       200:
 *         description: Bodega encontrada exitosamente
 *       404:
 *         description: Bodega no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/buscarBodega/:idBodega", buscarBodegaValidator, buscarBodega);

/**
 * @swagger
 * /bodega/bodegaPorFechaIngreso:
 *   get:
 *     summary: Obtener bodegas por fecha de ingreso
 *     tags: [Bodegas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de bodegas obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/bodegaPorFechaIngreso", listarBodegaValidator, obtenerBodegasPorFechaIngreso);

/**
 * @swagger
 * /bodega/bodegaPorFechaSalida:
 *   get:
 *     summary: Obtener bodegas por fecha de salida
 *     tags: [Bodegas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de bodegas obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/bodegaPorFechaSalida", listarBodegaValidator, obtenerBodegasPorFechaSalida);

/**
 * @swagger
 * /bodega/pdf:
 *   get:
 *     summary: Generar un PDF con la lista de bodegas
 *     tags: [Bodegas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF generado correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/pdf", listarBodegaValidator, generarPDFBodegas);

/**
 * @swagger
 * /bodega/buscarBodegaPdf/{idBodega}:
 *   get:
 *     summary: Generar un PDF con los detalles de una bodega específica
 *     tags: [Bodegas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idBodega
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la bodega
 *     responses:
 *       200:
 *         description: PDF generado correctamente
 *       404:
 *         description: Bodega no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/buscarBodegaPdf/:idBodega", buscarBodegaValidator, obtenerBodegaPdf);

/**
 * @swagger
 * /bodega/actualizarBodega/{idBodega}:
 *   put:
 *     summary: Actualizar una bodega
 *     tags: [Bodegas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idBodega
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la bodega a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lote:
 *                 type: string
 *                 description: ID del lote asociado
 *               trabajador:
 *                 type: string
 *                 description: ID del trabajador asociado
 *               fechaIngreso:
 *                 type: string
 *                 format: date
 *                 description: Fecha de ingreso
 *               fechaSalida:
 *                 type: string
 *                 format: date
 *                 description: Fecha de salida
 *     responses:
 *       200:
 *         description: Bodega actualizada correctamente
 *       404:
 *         description: Bodega no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/actualizarBodega/:idBodega", buscarBodegaValidator, actualizarBodega);

/**
 * @swagger
 * /bodega/eliminarBodega/{idBodega}:
 *   delete:
 *     summary: Eliminar una bodega
 *     tags: [Bodegas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idBodega
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la bodega a eliminar
 *     responses:
 *       200:
 *         description: Bodega eliminada correctamente
 *       404:
 *         description: Bodega no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/eliminarBodega/:idBodega", eliminarBodegaValidador, eliminarBodega);

export default router;
