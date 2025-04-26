import { Router } from "express";
import { crearTrabajador, obtenerTrabajadores, obtenerTrabajador, actualizarTrabajador, eliminarTrabajador } from "./trabajador.controller.js";
import { subirFotoDeTrabajador } from "../middlewares/multer-uploads.js";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
import { crearTrabajadorValidator, obtenerTrabajadoresValidator } from "../middlewares/trabajador-validators.js";

const router = Router();

router.post(
    "/crearTrabajador",
    subirFotoDeTrabajador.single("fotoDePerfil"),
    crearTrabajadorValidator,
    deleteFileOnError,
    crearTrabajador
)

router.get("/obtenerTrabajadores", obtenerTrabajadoresValidator, obtenerTrabajadores);





