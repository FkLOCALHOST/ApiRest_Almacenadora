import { body } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const crearLoteValidador = [
    body('numeroLote').notEmpty().withMessage('El numero del lote es requerido'),
    body('numeroLote').isLength({ min: 4, max: 15}).withMessage('El numero del lote debe de tener entre 4 y 15 digitos'),
    body('cantidad').notEmpty().withMessage('La cantidad del lote es requerido'),
    body('fechaCaducidad').notEmpty().withMessage('La fecha de caducidad del lote es requerido'),
    body('productoId').notEmpty().withMessage('EL id del producto es requerido'),
    body('productoId').isMongoId().withMessage('El ID del producto debe ser un ID válido de MongoDB'),
    validarCampos,
    handleErrors
]