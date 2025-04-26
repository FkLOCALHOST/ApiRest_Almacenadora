import { body, param } from "express-validator";
import Trabajador from "../trabajador/trabajador.model.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { esRolTrabajador } from "../helpers/db-validators.js";


export const crearEmpleadoValidator = [
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

export const actualizarEmpleadoValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("tid").isMongoId().withMessage("ID inválido"),
    param("tid").custom(esRolTrabajador),
    body("nombre").optional().notEmpty().withMessage("El nombre es obligatorio"),
    body("apellido").optional().notEmpty().withMessage("El apellido es obligatorio"),
    body("correo").optional().isEmail().withMessage("El correo no es válido"),
    body("telefono").optional().isLength({ min: 8, max: 8 }).withMessage("El teléfono debe tener 8 dígitos"),
    body("rol").optional().isIn(["EMPLEADO_ROLE", "ADMIN_ROLE"]).withMessage("El rol debe ser 'EMPLEADO_ROLE' o 'ADMIN_ROLE'"),
    validarCampos,
    handleErrors
];


