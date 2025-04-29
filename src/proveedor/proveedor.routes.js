import {Router} from "express"
import { agregarProveedor, eliminarProveedor, listarProveedores, actualizarProveedor, cambiarEstado, buscarProveedor } from "./proveedor.controller.js"
import { agregarProveedorValidator, actualizarProveedorValidator, cambiarEstadoValidator, buscarProveedorValidator, eliminarProveedorValidator  } from "../middlewares/proveedor-validator.js"

const router = Router()


router.post('/agregar', agregarProveedorValidator, agregarProveedor)
router.put('/modificar/:id', actualizarProveedorValidator, actualizarProveedor)

router.patch('/cambiar-estado/:id', cambiarEstadoValidator, cambiarEstado)
router.delete('/eliminar/:id', eliminarProveedorValidator, eliminarProveedor)
router.get('/listar', listarProveedores)
router.get('/buscar/:id', buscarProveedorValidator, buscarProveedor)


export default router