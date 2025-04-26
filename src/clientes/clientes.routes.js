import { Router } from 'express';
import { agregarCliente } from './clientes.controller.js';
import { agregarClienteValidador } from '../middlewares/clientes-validators.js';

const router = Router();

router.post('/agregarClientes', agregarClienteValidador,agregarCliente);

export default router;