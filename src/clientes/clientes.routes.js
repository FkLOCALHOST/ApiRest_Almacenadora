import { Router } from 'express';
import { agregarCliente, obtenerClientePorId } from './clientes.controller.js';
import { agregarClienteValidador, obtenerClientePorIdValidador } from '../middlewares/clientes-validators.js';

const router = Router();

router.post('/agregarClientes', agregarClienteValidador,agregarCliente);

router.get('/obtenerClientePorId/:id', obtenerClientePorIdValidador, obtenerClientePorId);

export default router;