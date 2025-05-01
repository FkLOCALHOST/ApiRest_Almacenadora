import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { correoExistente, clienteExistente } from "../helpers/db-validators.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const agregarClienteValidador = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('apellido').notEmpty().withMessage('El apellido es requerido'),
    body("correo").notEmpty().withMessage("El correo es requerido"),
    body('correo').isEmail().withMessage('El correo no es valido'),
    body('correo').custom(correoExistente),
    body('telefono').notEmpty().withMessage('El telefono es requerido'),
    body('telefono').isLength({ min: 8, max: 8}).withMessage('El telefono debe de tener 8 digitos'),
    validarCampos,
    handleErrors
];

export const obtenerClientePorIdValidador = [
    validateJWT,
    param('id').isMongoId().withMessage('El ID no es valido'),
    param('id').custom(clienteExistente),
    validarCampos,
    handleErrors
];

export const listarClientesValidador = [
    validateJWT,
    validarCampos,
    handleErrors
];

export const eliminarClientesValidador = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param('id').isMongoId().withMessage('El ID no es valido'),
    param('id').custom(clienteExistente),
    validarCampos,
    handleErrors
];

export const actualizarClientesValidador = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param('id').isMongoId().withMessage('El ID no es valido'),
    param('id').custom(clienteExistente),
    validarCampos,
    handleErrors
];
