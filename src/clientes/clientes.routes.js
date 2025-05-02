import { Router } from 'express';
import { agregarCliente, obtenerClientePorId, listarCientes, eliminarCliente, actualizarCliente, generarPDFClientes } from './clientes.controller.js';
import { agregarClienteValidador, obtenerClientePorIdValidador, listarClientesValidador, eliminarClientesValidador, actualizarClientesValidador } from '../middlewares/clientes-validators.js';

const router = Router();

/**
 * @swagger
 * /clientes/agregarClientes:
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
 *                 description: Nombre del cliente.
 *                 example: "Carlos"
 *               apellido:
 *                 type: string
 *                 description: Apellido del cliente.
 *                 example: "Gómez"
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del cliente.
 *                 example: "carlos.gomez@example.com"
 *               telefono:
 *                 type: string
 *                 description: Teléfono del cliente (8 dígitos).
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Cliente agregado exitosamente.
 *       400:
 *         description: Error de validación.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/agregarClientes', agregarClienteValidador, agregarCliente);

/**
 * @swagger
 * /clientes/obtenerClientePorId/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente (MongoDB ObjectId).
 *     responses:
 *       200:
 *         description: Cliente encontrado exitosamente.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/obtenerClientePorId/:id', obtenerClientePorIdValidador, obtenerClientePorId);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Listar todos los clientes
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Número máximo de clientes a listar.
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Número de clientes a omitir desde el inicio.
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', listarClientesValidador, listarCientes);

/**
 * @swagger
 * /clientes/eliminarClientes/{id}:
 *   delete:
 *     summary: Eliminar un cliente (cambia su estado a inactivo)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente (MongoDB ObjectId).
 *     responses:
 *       200:
 *         description: Cliente eliminado exitosamente.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/eliminarClientes/:id', eliminarClientesValidador, eliminarCliente);

/**
 * @swagger
 * /clientes/actualizarClientes/{id}:
 *   put:
 *     summary: Actualizar los datos de un cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del cliente (MongoDB ObjectId).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del cliente.
 *                 example: "Carlos"
 *               apellido:
 *                 type: string
 *                 description: Apellido del cliente.
 *                 example: "Gómez"
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del cliente.
 *                 example: "carlos.gomez@example.com"
 *               telefono:
 *                 type: string
 *                 description: Teléfono del cliente (8 dígitos).
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.put('/actualizarClientes/:id', actualizarClientesValidador, actualizarCliente);

/**
 * @swagger
 * /clientes/generarPDFClientes:
 *   get:
 *     summary: Generar un PDF con la lista de clientes
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: filtro
 *         schema:
 *           type: string
 *         description: Filtro para ordenar los clientes (A-Z, Z-A, reciente, antiguo).
 *     responses:
 *       200:
 *         description: PDF generado exitosamente.
 *       404:
 *         description: No hay clientes activos para mostrar.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/generarPDFClientes', generarPDFClientes);

export default router;