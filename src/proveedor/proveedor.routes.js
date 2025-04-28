import {Router} from "express"
import { agregarProveedor, eliminarProveedor, listarProveedores, actualizarProveedor, cambiarEstado, buscarProveedor } from "./proveedor.controller.js"
import { agregarProveedorValidator, actualizarProveedorValidator, cambiarEstadoValidator, buscarProveedorValidator, eliminarProveedorValidator  } from "../middlewares/proveedor-validator.js"

const router = Router()


router.post('/agregar', agregarProveedorValidator, agregarProveedor)
router.put('/actualizar/:proveedorId', actualizarProveedorValidator, actualizarProveedor)

router.patch('/cambiar-estado/:proveedorId', cambiarEstadoValidator, cambiarEstado)
router.delete('/eliminar/:proveedorId', eliminarProveedorValidator, eliminarProveedor)
router.get('/listar', listarProveedores)
router.get('/buscar/:nombre', buscarProveedorValidator, buscarProveedor)


export default router