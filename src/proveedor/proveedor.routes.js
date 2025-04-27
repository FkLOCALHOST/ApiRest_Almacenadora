import { Router } from "express";
import { agregarProveedor, eliminarProveedor, listarProveedores, actualizarProveedor, cambiarEstado, buscarProveedor } from "./proveedor.controller.js";
import { agregarProveedorValidator, actualizarProveedorValidator, cambiarEstadoValidator, buscarProveedorValidator, eliminarProveedorValidator } from "../middlewares/proveedor-validator.js";

const router = Router();

/**
 * @swagger
 * /proveedor/agregar:
 *   post:
 *     summary: Agregar un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del proveedor
 *                 example: Proveedor A
 *               telefono:
 *                 type: number
 *                 description: Teléfono del proveedor
 *                 example: 12345678
 *               direccion:
 *                 type: string
 *                 description: Dirección del proveedor
 *                 example: Calle 123, Ciudad
 *               estado:
 *                 type: string
 *                 description: Estado del proveedor (ACTIVO o INACTIVO)
 *                 example: ACTIVO
 *     responses:
 *       201:
 *         description: Proveedor creado correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.post('/agregar', agregarProveedorValidator, agregarProveedor);

/**
 * @swagger
 * /proveedor/modificar/{id}:
 *   put:
 *     summary: Actualizar un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del proveedor
 *                 example: Proveedor A
 *               telefono:
 *                 type: number
 *                 description: Teléfono del proveedor
 *                 example: 12345678
 *               direccion:
 *                 type: string
 *                 description: Dirección del proveedor
 *                 example: Calle 123, Ciudad
 *     responses:
 *       201:
 *         description: Proveedor actualizado correctamente
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.put('/modificar/:id', actualizarProveedorValidator, actualizarProveedor);

/**
 * @swagger
 * /proveedor/cambiar-estado/{id}:
 *   patch:
 *     summary: Cambiar el estado de un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proveedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 description: Nuevo estado del proveedor (ACTIVO o INACTIVO)
 *                 example: INACTIVO
 *     responses:
 *       201:
 *         description: Estado del proveedor actualizado correctamente
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.patch('/cambiar-estado/:id', cambiarEstadoValidator, cambiarEstado);

/**
 * @swagger
 * /proveedor/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proveedor
 *     responses:
 *       201:
 *         description: Proveedor eliminado correctamente
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete('/eliminar/:id', eliminarProveedorValidator, eliminarProveedor);

/**
 * @swagger
 * /proveedor/listar:
 *   get:
 *     summary: Listar todos los proveedores
 *     tags: [Proveedores]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de proveedores a listar
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de proveedores a omitir
 *     responses:
 *       201:
 *         description: Lista de proveedores obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.get('/listar', listarProveedores);

/**
 * @swagger
 * /proveedor/buscar/{id}:
 *   get:
 *     summary: Buscar un proveedor por su ID
 *     tags: [Proveedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proveedor
 *     responses:
 *       201:
 *         description: Proveedor encontrado
 *       404:
 *         description: Proveedor no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.get('/buscar/:id', buscarProveedorValidator, buscarProveedor);

export default router;