import { Router } from "express";
import { crearLote, obtenerLotePorId, listarLotes } from "./lote.controller.js";
import { crearLoteValidador, obtenerLotePorIdValidador, listarLotesValidador } from "../middlewares/lote-validator.js";

const router = Router()

router.post("/crearLote", crearLoteValidador, crearLote);

router.get("/obtenerLotePorId/:id", obtenerLotePorIdValidador, obtenerLotePorId);

router.get("/", listarLotesValidador, listarLotes )

export default router
