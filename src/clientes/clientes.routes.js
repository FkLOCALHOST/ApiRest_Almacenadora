import { Router } from 'express';
import { agregarCliente, obtenerClientePorId, listarCientes, eliminarCliente, actualizarCliente } from './clientes.controller.js';
import { agregarClienteValidador, obtenerClientePorIdValidador, listarClientesValidador, eliminarClientesValidador, actualizarClientesValidador } from '../middlewares/clientes-validators.js';

const router = Router();

/**
 * @swagger
 * /agregarClientes:
 *   post:
 *     summary: Agregar un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del cliente
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 description: Apellido del cliente
 *                 example: Pérez
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del cliente
 *                 example: juan.perez@example.com
 *               telefono:
 *                 type: string
 *                 description: Teléfono del cliente (8 dígitos)
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Cliente agregado exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.post('/agregarClientes', agregarClienteValidador, agregarCliente);

/**
 * @swagger
 * /obtenerClientePorId/{id}:
 *   get:
 *     summary: Obtener un cliente por su ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.get('/obtenerClientePorId/:id', obtenerClientePorIdValidador, obtenerClientePorId);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Listar clientes
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de clientes a listar
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de clientes a omitir
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.get('/', listarClientesValidador, listarCientes);

/**
 * @swagger
 * /eliminarClientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente (cambia su estado a false)
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.delete('/eliminarClientes/:id', eliminarClientesValidador, eliminarCliente);

/**
 * @swagger
 * /actualizarClientes/{id}:
 *   put:
 *     summary: Actualizar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del cliente
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 description: Apellido del cliente
 *                 example: Pérez
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del cliente
 *                 example: juan.perez@example.com
 *               telefono:
 *                 type: string
 *                 description: Teléfono del cliente (8 dígitos)
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 *     security:
 *       - bearerAuth: []
 */
router.put('/actualizarClientes/:id', actualizarClientesValidador, actualizarCliente);

export default router;