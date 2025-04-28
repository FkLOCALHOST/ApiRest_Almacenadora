import { Router } from "express";
import { crearLote } from "./lote.controller.js";
import { crearLoteValidador } from "../middlewares/lote-validator.js";

const router = Router()

router.post("/crearLote", crearLoteValidador, crearLote);

export default router
