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
    body("nombreT").notEmpty().withMessage("El nombre es obligatorio").isLength({ max: 25 }).withMessage("El nombre no puede superar los 25 caracteres"),
    body("apellidoT").notEmpty().withMessage("El apellido es obligatorio").isLength({ max: 25 }).withMessage("El apellido no puede superar los 25 caracteres"),
    body("correoT").isEmail().withMessage("El correo no es válido").custom(emailTExists),
    body("dpi").isLength({ min: 13, max: 13 }).withMessage("El DPI debe tener 13 dígitos").matches(/^\d+$/).withMessage("El DPI debe contener solo números").custom(dpiExists),
    body("contrasenaT")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un símbolo"),
    body("telefonoT").isLength({ min: 8, max: 8 }).withMessage("El teléfono debe tener 8 dígitos").matches(/^\d+$/).withMessage("El teléfono debe contener solo números"),
    body("estadoT").isBoolean().withMessage("El estado debe ser un valor booleano"),
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
    body("nombreT").optional().isLength({ max: 25 }).withMessage("El nombre no puede superar los 25 caracteres"),
    body("apellidoT").optional().isLength({ max: 25 }).withMessage("El apellido no puede superar los 25 caracteres"),
    body("correoT").optional().isEmail().withMessage("El correo no es válido"),
    body("telefonoT").optional().isLength({ min: 8, max: 8 }).withMessage("El teléfono debe tener 8 dígitos").matches(/^\d+$/).withMessage("El teléfono debe contener solo números"),
    body("rendimientoT").optional().isNumeric().withMessage("El rendimiento debe ser un número"),
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
    body("nombreT").notEmpty().withMessage("El nombreT es obligatorio"),
    body("correoT")
        .notEmpty().withMessage("El correoT es obligatorio")
        .isEmail().withMessage("El correoT no es válido")
        .custom(emailTExists),
    body("contrasenaT")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un símbolo"),
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
    body("correoT").notEmpty().withMessage("El correoT es obligatorio").isEmail().withMessage("No es un correoT válido"),
    body("contrasenaT")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 8 }).withMessage("La contraseña debe contener al menos 8 caracteres"),
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