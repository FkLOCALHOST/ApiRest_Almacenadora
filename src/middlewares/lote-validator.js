import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { loteExistente } from "../helpers/db-validators.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const crearLoteValidador = [
    validateJWT, 
    hasRoles("ADMIN_ROLE"),
    body('numeroLote').notEmpty().withMessage('El número del lote es requerido').isLength({ min: 4, max: 15 }).withMessage('El número del lote debe tener entre 4 y 15 caracteres'),
    body('cantidad').notEmpty().withMessage('La cantidad del lote es requerida'),
    body('fechaCaducidad').notEmpty().withMessage('La fecha de caducidad del lote es requerida').isISO8601().withMessage('La fecha de caducidad debe tener un formato válido (YYYY-MM-DD)'),
    body('productoId').notEmpty().withMessage('El ID del producto es requerido').isMongoId().withMessage('El ID del producto debe valido'),
    validarCampos, 
    handleErrors 
];

export const obtenerLotePorIdValidador = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
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