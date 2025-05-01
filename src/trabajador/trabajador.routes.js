import { Router } from "express";
import {
  
  obtenerTrabajadores,
  actualizarEmpleado,
  eliminarEmpleado,
  generarPDFTrabajadores

} from "./trabajador.controller.js";

import {
  obtenerTrabajadoresValidator,
  actualizarEmpleadoValidator,
  eliminarEmpleadoValidator,
} from "../middlewares/trabajador-validators.js";

const router = Router();



router.get(
  "/obtenerTrabajadores",
  obtenerTrabajadoresValidator,
  obtenerTrabajadores
);

router.put(
  "/actualizarEmpleado/:tid",
  actualizarEmpleadoValidator,
  actualizarEmpleado
);

router.delete(
  "/eliminarEmpleado/:tid",
  eliminarEmpleadoValidator,
  eliminarEmpleado
);

router.get("/generarPDFTrabajadores", generarPDFTrabajadores);


export default router;
