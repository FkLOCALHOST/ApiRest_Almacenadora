import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { emailTExists, esRolTrabajador, dpiExists, trabajadorExists } from "../helpers/db-validators.js";
export const crearEmpleadoValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
    body("apellido").notEmpty().withMessage("El apellido es obligatorio"),
    body("correo").isEmail().withMessage("El correo no es válido"),
    body("dpi").isLength({ min: 13, max: 13 }).withMessage("El DPI debe tener 13 dígitos"),
    body("dpi").custom(dpiExists),
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

export const eliminarEmpleadoValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("tid").isMongoId().withMessage("ID inválido"),
    param("tid").custom(esRolTrabajador),
    validarCampos,
    handleErrors
];

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("username").notEmpty().withMessage("El nombre de usuario es obligatorio"),
    body("correo").isEmail().withMessage("El correo no es válido"),
    body("correo").custom(emailTExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const passwordValidator = [
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    handleErrors
];

export const loginValidator = [
    body("correoT").optional().isEmail().withMessage("No es un correo válido"),
    body("username").optional().isString().withMessage("Username es en formato erróneo"),
    body("password").isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];

export const getUserByIdValidator = [
    param(" tid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param(" tid").custom(trabajadorExists),
    validarCampos,
    handleErrors
];

export const deleteUserValidator = [
    param(" tid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param(" tid").custom(trabajadorExists),
    validarCampos,
    handleErrors
];

export const updatePasswordValidator = [
    param(" tid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param(" tid").custom(trabajadorExists),
    body("newPassword").isLength({ min: 8 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];

export const updateUserValidator = [
    param(" tid", "No es un ID válido").isMongoId(),
    param(" tid").custom(trabajadorExists),
    validarCampos,
    handleErrors
];

export const updateProfilePictureValidator = [
    param(" tid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param(" tid").custom(trabajadorExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
];