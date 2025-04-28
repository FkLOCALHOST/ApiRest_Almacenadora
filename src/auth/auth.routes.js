import { Router } from "express";
import { register, login } from "./auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../middlewares/trabajador-validators.js";
import {  subirFotoDeTrabajador } from "../middlewares/multer-uploads.js";
// import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";

const router = Router();

router.post(
  "/register",
  subirFotoDeTrabajador.single("fotoDePerfil"), // Cambiado de "public" a "fotoDePerfil"
  registerValidator,
  register
);


router.post("/login", loginValidator, login);

export default router;
