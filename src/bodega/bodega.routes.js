import { Router } from "express";
import { agregarBodega, obtenerBodegas, buscarBodega, actualizarBodega, 
    obtenerBodegasPdf, obtenerBodegaPdf, eliminarBodega, obtenerBodegasPorFechaIngreso, obtenerBodegasPorFechaSalida } from "./bodega.controller.js"; 
import { agregarBodegaValidator, buscarBodegaValidator, eliminarBodegaValidador } from "../middlewares/bodega-validators.js"; 

const router = Router();

router.post("/agregarBodega", agregarBodegaValidator, agregarBodega)

router.get("/", obtenerBodegas)

router.get("/buscarBodega/:idBodega", buscarBodegaValidator, buscarBodega)

router.get("/bodegaPorFechaIngreso", obtenerBodegasPorFechaIngreso)

router.get("/bodegaPorFechaSalida", obtenerBodegasPorFechaSalida)

router.get("/pdf", obtenerBodegasPdf)

router.get("/buscarBodegaPdf/:idBodega", buscarBodegaValidator, obtenerBodegaPdf)

router.put("/actualizarBodega/:idBodega", buscarBodegaValidator, actualizarBodega)

router.delete("/eliminarBodega/:idBodega", eliminarBodegaValidador, eliminarBodega)

export default router;