import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { correoExistente, clienteExistente } from "../helpers/db-validators.js";

export const agregarClienteValidador = [
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
    param('id').isMongoId().withMessage('El ID no es valido'),
    param('id').custom(clienteExistente),
    validarCampos,
    handleErrors
];

export const listarClientesValidador = [
    validarCampos,
    handleErrors
];

export const eliminarClientesValidador = [
    param('id').isMongoId().withMessage('El ID no es valido'),
    param('id').custom(clienteExistente),
    validarCampos,
    handleErrors
];

export const actualizarClientesValidador = [
    param('id').isMongoId().withMessage('El ID no es valido'),
    param('id').custom(clienteExistente),
    validarCampos,
    handleErrors
];