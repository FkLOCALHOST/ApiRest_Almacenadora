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


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo trabajador
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombreT:
 *                 type: string
 *                 description: Nombre del trabajador.
 *                 example: "Juan Pérez"
 *               correoT:
 *                 type: string
 *                 description: Correo electrónico del trabajador.
 *                 example: "juan.perez@example.com"
 *               telefonoT:
 *                 type: string
 *                 description: Teléfono del trabajador.
 *                 example: "1234567890"
 *               contrasenaT:
 *                 type: string
 *                 description: Contraseña del trabajador.
 *                 example: "password123"
 *               fotoDePerfil:
 *                 type: string
 *                 format: binary
 *                 description: Foto de perfil del trabajador.
 *     responses:
 *       201:
 *         description: Trabajador registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Trabajador ha sido creado"
 *                 nombreT:
 *                   type: string
 *                   example: "Juan Pérez"
 *                 correoT:
 *                   type: string
 *                   example: "juan.perez@example.com"
 *                 contrasenaT:
 *                   type: string
 *                   example: "La contraseña ha sido encriptada y no se puede mostrar"
 *       400:
 *         description: Error de validación o correo ya registrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registro de trabajador fallido"
 *                 error:
 *                   type: string
 *                   example: "El correo juan.perez@example.com ya está registrado"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Registro de trabajador fallido"
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión como trabajador
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correoT:
 *                 type: string
 *                 description: Correo electrónico del trabajador.
 *                 example: "juan.perez@example.com"
 *               telefonoT:
 *                 type: string
 *                 description: Teléfono del trabajador (opcional si se usa correo).
 *                 example: "1234567890"
 *               contrasenaT:
 *                 type: string
 *                 description: Contraseña del trabajador.
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inicio de sesión exitoso"
 *                 userDetails:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: Token JWT para autenticación.
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     fotoDePerfil:
 *                       type: string
 *                       description: URL de la foto de perfil del trabajador.
 *                       example: "uploads/fotoDePerfil.jpg"
 *       400:
 *         description: Credenciales inválidas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Credenciales inválidas"
 *                 error:
 *                   type: string
 *                   example: "No existe el trabajador con el correoT o teléfono ingresado"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inicio de sesión fallido, error del servidor"
 *                 error:
 *                   type: string
 *                   example: "Error interno del servidor"
 */