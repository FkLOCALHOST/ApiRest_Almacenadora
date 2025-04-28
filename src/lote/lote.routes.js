import { Router } from "express";
import { crearLote, obtenerLotePorId, listarLotes, eliminarLote } from "./lote.controller.js";
import { crearLoteValidador, obtenerLotePorIdValidador, listarLotesValidador, eliminarLoteValidador } from "../middlewares/lote-validator.js";

const router = Router()

router.post("/crearLote", crearLoteValidador, crearLote);

router.get("/obtenerLotePorId/:id", obtenerLotePorIdValidador, obtenerLotePorId);

router.get("/", listarLotesValidador, listarLotes );

router.delete("/eliminarLote/:uid", eliminarLoteValidador, eliminarLote);

export default router
