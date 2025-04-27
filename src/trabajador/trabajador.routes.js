import { Router } from "express";
import { crearEmpleado, obtenerTrabajadores, actualizarEmpleado, eliminarEmpleado } from "./trabajador.controller.js";
import { subirFotoDeTrabajador } from "../middlewares/multer-uploads.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
import { crearEmpleadoValidator, obtenerTrabajadoresValidator, actualizarEmpleadoValidator, eliminarEmpleadoValidator } from "../middlewares/trabajador-validators.js";

const router = Router();

/**
 * @swagger
 * /trabajador/crearEmpleado:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Trabajadores]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del empleado
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 description: Apellido del empleado
 *                 example: Pérez
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del empleado
 *                 example: juan.perez@example.com
 *               telefono:
 *                 type: string
 *                 description: Teléfono del empleado (8 dígitos)
 *                 example: "12345678"
 *               fotoDePerfil:
 *                 type: string
 *                 format: binary
 *                 description: Foto de perfil del empleado
 *               role:
 *                 type: string
 *                 description: Rol del empleado (EMPLEADO_ROLE o ADMIN_ROLE)
 *                 example: EMPLEADO_ROLE
 *     responses:
 *       201:
 *         description: Empleado creado con éxito
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.post(
    "/crearEmpleado",
    subirFotoDeTrabajador.single("fotoDePerfil"),
    crearEmpleadoValidator,
    deleteFileOnError,
    crearEmpleado
);

/**
 * @swagger
 * /trabajador/obtenerTrabajadores:
 *   get:
 *     summary: Obtener una lista de trabajadores
 *     tags: [Trabajadores]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de trabajadores a listar
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de trabajadores a omitir
 *     responses:
 *       200:
 *         description: Lista de trabajadores obtenida con éxito
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.get("/obtenerTrabajadores", obtenerTrabajadoresValidator, obtenerTrabajadores);

/**
 * @swagger
 * /trabajador/actualizarEmpleado/{tid}:
 *   put:
 *     summary: Actualizar los datos de un empleado
 *     tags: [Trabajadores]
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del empleado
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 description: Apellido del empleado
 *                 example: Pérez
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del empleado
 *                 example: juan.perez@example.com
 *               telefono:
 *                 type: string
 *                 description: Teléfono del empleado (8 dígitos)
 *                 example: "12345678"
 *               role:
 *                 type: string
 *                 description: Rol del empleado (EMPLEADO_ROLE o ADMIN_ROLE)
 *                 example: EMPLEADO_ROLE
 *     responses:
 *       200:
 *         description: Empleado actualizado con éxito
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
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
 *     summary: Eliminar un empleado (cambiar su estado a false)
 *     tags: [Trabajadores]
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Empleado eliminado con éxito
 *       404:
 *         description: Empleado no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete(
    "/eliminarEmpleado/:tid",
    eliminarEmpleadoValidator,
    eliminarEmpleado
);

export default router;


