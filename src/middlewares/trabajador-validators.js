import { body } from "express-validator";
import Trabajador from "../trabajador/trabajador.model.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";


export const crearTrabajadorValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("apellido").notEmpty().withMessage("El apellido es obligatorio"),
    body("correo").isEmail().withMessage("El correo no es válido"),
    body("telefono").isLength({ min: 8, max: 8 }).withMessage("El teléfono debe tener 8 dígitos"),
    body("estado").isBoolean().withMessage("El estado debe ser un valor booleano"),
    body("rol").isIn(["EMPLEADO_ROLE", "ADMIN_ROLE"]).withMessage("El rol debe ser 'EMPLEADO_ROLE' o 'ADMIN_ROLE'"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const obtenerTrabajadoresValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
];


