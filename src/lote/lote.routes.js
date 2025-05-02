import { Router } from "express";
import { crearLote, obtenerLotePorId, listarLotes, eliminarLote, actualizarLote, listarTotalProductos } from "./lote.controller.js";
import { crearLoteValidador, obtenerLotePorIdValidador, listarLotesValidador, eliminarLoteValidador, actualizarLotesValidador, listarTotalProductosValidador } from "../middlewares/lote-validator.js";

const router = Router()

router.post("/crearLote", crearLoteValidador, crearLote);

router.get("/obtenerLotePorId/:id", obtenerLotePorIdValidador, obtenerLotePorId);

router.get("/", listarLotesValidador, listarLotes );

router.delete("/eliminarLote/:id", eliminarLoteValidador, eliminarLote);

router.put("/actualizarLote/:id", actualizarLotesValidador, actualizarLote);

router.get("/CantidadTotalProductos", listarTotalProductosValidador ,listarTotalProductos);

export default router
