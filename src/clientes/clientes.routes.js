import { Router } from 'express';
import { agregarCliente, obtenerClientePorId, listarCientes, eliminarCliente } from './clientes.controller.js';
import { agregarClienteValidador, obtenerClientePorIdValidador, listarClientesValidador, eliminarClientesValidador } from '../middlewares/clientes-validators.js';

const router = Router();

router.post('/agregarClientes', agregarClienteValidador,agregarCliente);

router.get('/obtenerClientePorId/:id', obtenerClientePorIdValidador, obtenerClientePorId);

router.get('/', listarClientesValidador, listarCientes);

router.delete('/eliminarClientes/:id', eliminarClientesValidador, eliminarCliente);

export default router;