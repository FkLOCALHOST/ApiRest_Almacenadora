import { Router } from "express";
import { crearLote, obtenerLotePorId } from "./lote.controller.js";
import { crearLoteValidador, obtenerLotePorIdValidador } from "../middlewares/lote-validator.js";

const router = Router()

router.post("/crearLote", crearLoteValidador, crearLote);

router.get("/obtenerLotePorId/:id", obtenerLotePorIdValidador, obtenerLotePorId);

export default router
