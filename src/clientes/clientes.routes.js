import { Router } from 'express';
import { agregarCliente, obtenerClientePorId, listarCientes } from './clientes.controller.js';
import { agregarClienteValidador, obtenerClientePorIdValidador, listarClientesValidador } from '../middlewares/clientes-validators.js';

const router = Router();

router.post('/agregarClientes', agregarClienteValidador,agregarCliente);

router.get('/obtenerClientePorId/:id', obtenerClientePorIdValidador, obtenerClientePorId);

router.get('/', listarClientesValidador, listarCientes)

export default router;