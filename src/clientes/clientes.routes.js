import { Router } from 'express';
import { agregarCliente, obtenerClientePorId, listarCientes, eliminarCliente, actualizarCliente, generarPDFClientes } from './clientes.controller.js';
import { agregarClienteValidador, obtenerClientePorIdValidador, listarClientesValidador, eliminarClientesValidador, actualizarClientesValidador } from '../middlewares/clientes-validators.js';

const router = Router();

router.post('/agregarClientes', agregarClienteValidador,agregarCliente);

router.get('/obtenerClientePorId/:id', obtenerClientePorIdValidador, obtenerClientePorId);

router.get('/', listarClientesValidador, listarCientes);

router.delete('/eliminarClientes/:id', eliminarClientesValidador, eliminarCliente);

router.put('/actualizarClientes/:id', actualizarClientesValidador, actualizarCliente);

router.get('/generarPDFClientes', generarPDFClientes);



export default router;