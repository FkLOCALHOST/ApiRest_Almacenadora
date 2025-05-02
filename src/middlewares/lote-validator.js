import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { loteExistente } from "../helpers/db-validators.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const crearLoteValidador = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body('numeroLote').notEmpty().withMessage('El numero del lote es requerido'),
    body('numeroLote').isLength({ min: 4, max: 15}).withMessage('El numero del lote debe de tener entre 4 y 15 digitos'),
    body('cantidad').notEmpty().withMessage('La cantidad del lote es requerido'),
    body('fechaCaducidad').notEmpty().withMessage('La fecha de caducidad del lote es requerido'),
    body('productoId').notEmpty().withMessage('EL id del producto es requerido'),
    body('productoId').isMongoId().withMessage('El ID del producto debe ser un ID válido de MongoDB'),
    validarCampos,
    handleErrors
];

export const obtenerLotePorIdValidador = [
    validateJWT,
    param('id').isMongoId().withMessage('El ID no es valido'),
    param('id').custom(loteExistente),
    validarCampos,
    handleErrors
];

export const listarLotesValidador = [
    validateJWT,
    validarCampos,
    handleErrors
];

export const eliminarLoteValidador = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param('id').isMongoId().withMessage('El ID no es valido'),
    param('id').custom(loteExistente),
    validarCampos,
    handleErrors
];

export const actualizarLotesValidador = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param('id').isMongoId().withMessage('El ID no es valido'),
    param('id').custom(loteExistente),
    validarCampos,
    handleErrors
];

export const listarTotalProductosValidador = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
];