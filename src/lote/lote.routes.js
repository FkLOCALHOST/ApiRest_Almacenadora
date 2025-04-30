import { Router } from "express";
import { crearLote, obtenerLotePorId, listarLotes, eliminarLote, actualizarLote } from "./lote.controller.js";
import { crearLoteValidador, obtenerLotePorIdValidador, listarLotesValidador, eliminarLoteValidador, actualizarLotesValidador } from "../middlewares/lote-validator.js";

const router = Router()

router.post("/crearLote", crearLoteValidador, crearLote);

router.get("/obtenerLotePorId/:id", obtenerLotePorIdValidador, obtenerLotePorId);

router.get("/", listarLotesValidador, listarLotes );

router.delete("/eliminarLote/:id", eliminarLoteValidador, eliminarLote);

router.put("/actualizarLote/:id", actualizarLotesValidador, actualizarLote)

export default router
