import { Router } from "express";
import {
  obtenerTrabajadores,
  actualizarEmpleado,
  eliminarEmpleado,
  generarPDFTrabajadores,
} from "./trabajador.controller.js";

import {
  obtenerTrabajadoresValidator,
  actualizarEmpleadoValidator,
  eliminarEmpleadoValidator,
} from "../middlewares/trabajador-validators.js";

const router = Router();

/**
 * @swagger
 * /trabajador/obtenerTrabajadores:
 *   get:
 *     summary: Obtener la lista de trabajadores
 *     tags: [Trabajadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número máximo de trabajadores a listar.
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *         description: Número de trabajadores a omitir desde el inicio.
 *     responses:
 *       200:
 *         description: Lista de trabajadores obtenida exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get(
  "/obtenerTrabajadores",
  obtenerTrabajadoresValidator,
  obtenerTrabajadores
);

/**
 * @swagger
 * /trabajador/actualizarEmpleado/{tid}:
 *   put:
 *     summary: Actualizar los datos de un trabajador
 *     tags: [Trabajadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del trabajador (MongoDB ObjectId).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombreT:
 *                 type: string
 *                 description: Nombre del trabajador.
 *                 example: "Juan"
 *               apellidoT:
 *                 type: string
 *                 description: Apellido del trabajador.
 *                 example: "Pérez"
 *               correoT:
 *                 type: string
 *                 description: Correo electrónico del trabajador.
 *                 example: "juan.perez@example.com"
 *               telefonoT:
 *                 type: string
 *                 description: Teléfono del trabajador.
 *                 example: "12345678"
 *               rendimientoT:
 *                 type: number
 *                 description: Rendimiento del trabajador.
 *                 example: 95
 *               rol:
 *                 type: string
 *                 description: Rol del trabajador.
 *                 example: "EMPLEADO_ROLE"
 *     responses:
 *       200:
 *         description: Trabajador actualizado exitosamente.
 *       404:
 *         description: Trabajador no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put(
  "/actualizarEmpleado/:tid",
  actualizarEmpleadoValidator,
  actualizarEmpleado
);

/**
 * @swagger
 * /trabajador/eliminarEmpleado/{tid}:
 *   delete:
 *     summary: Eliminar un trabajador (cambia su estado a inactivo)
 *     tags: [Trabajadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del trabajador (MongoDB ObjectId).
 *     responses:
 *       200:
 *         description: Trabajador eliminado exitosamente.
 *       404:
 *         description: Trabajador no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete(
  "/eliminarEmpleado/:tid",
  eliminarEmpleadoValidator,
  eliminarEmpleado
);

/**
 * @swagger
 * /trabajador/generarPDFTrabajadores:
 *   get:
 *     summary: Generar un PDF con la lista de trabajadores
 *     tags: [Trabajadores]
 *     parameters:
 *       - in: query
 *         name: filtro
 *         schema:
 *           type: string
 *         description: Filtro para ordenar los trabajadores (A-Z, Z-A, reciente, antiguo, rendimiento-alto, rendimiento-bajo).
 *     responses:
 *       200:
 *         description: PDF generado exitosamente.
 *       404:
 *         description: No hay trabajadores activos para mostrar en el PDF.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/generarPDFTrabajadores", generarPDFTrabajadores);

export default router;
