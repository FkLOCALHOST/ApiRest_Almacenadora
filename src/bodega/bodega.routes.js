import { Router } from "express";
import { agregarBodega, obtenerBodegas, buscarBodega, actualizarBodega, obtenerBodegasPdf, obtenerBodegaPdf } from "./bodega.controller.js"; 
import { agregarBodegaValidator, buscarBodegaValidator } from "../middlewares/bodega-validators.js"; 

const router = Router();

router.post("/agregarBodega", agregarBodegaValidator, agregarBodega)

router.get("/", obtenerBodegas)

router.get("/buscarBodega/:idBodega", buscarBodegaValidator, buscarBodega)

router.put("/actualizarBodega/:idBodega", buscarBodegaValidator, actualizarBodega)

router.get("/pdf", obtenerBodegasPdf)

router.get("/buscarBodegaPdf/:idBodega", buscarBodegaValidator, obtenerBodegaPdf)

export default router;