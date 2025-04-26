import { Router } from "express";
import { crearEmpleado, obtenerTrabajadores, actualizarEmpleado, eliminarEmpleado } from "./trabajador.controller.js";
import { subirFotoDeTrabajador } from "../middlewares/multer-uploads.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
import { crearEmpleadoValidator, obtenerTrabajadoresValidator, actualizarEmpleadoValidator, eliminarEmpleadoValidator } from "../middlewares/trabajador-validators.js";

const router = Router();

router.post(
    "/crearEmpleado",
    subirFotoDeTrabajador.single("fotoDePerfil"),
    crearEmpleadoValidator,
    deleteFileOnError,
    crearEmpleado
)

router.get("/obtenerTrabajadores", obtenerTrabajadoresValidator, obtenerTrabajadores);

router.put(
    "actualizarEmpleado/:tid",
    actualizarEmpleadoValidator,
    actualizarEmpleado
)

router.delete(
    "/eliminarEmpleado/:tid",
    eliminarEmpleadoValidator,
    eliminarEmpleado
)

export default router;


