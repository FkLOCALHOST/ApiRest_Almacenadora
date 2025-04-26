import {handleErrors} from './handle-errors.js';
import { validarCampos } from './validate-camps.js';
import { nameExists, telefonoExists, direccionExists } from '../helpers/db-validator.js';
import {body} from 'express-validator';


export const agregarProveedorValidator = [
    body('nombre').custom(nameExists).notEmpty().withMessage('El nombre es obligatorio').isLength({min: 3}).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('telefono').custom(telefonoExists).notEmpty().withMessage('El telefono es obligatorio').isNumeric().withMessage('El telefono debe ser un numero').isLength({min: 8}).withMessage('El telefono debe tener al menos 8 digitos'),
    body('direccion').custom(direccionExists).notEmpty().withMessage('La direccion es obligatoria').isLength({min: 3}).withMessage('La direccion debe tener al menos 3 caracteres'),
    validarCampos,
    handleErrors
]

export const actualizarProveedorValidator = [
    body('nombre').custom(nameExists).notEmpty().withMessage('El nombre es obligatorio').isLength({min: 3}).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('telefono').custom(telefonoExists).notEmpty().withMessage('El telefono es obligatorio').isNumeric().withMessage('El telefono debe ser un numero').isLength({min: 8}).withMessage('El telefono debe tener al menos 8 digitos'),
    body('direccion').custom(direccionExists).notEmpty().withMessage('La direccion es obligatoria').isLength({min: 3}).withMessage('La direccion debe tener al menos 3 caracteres'),
    validarCampos,
    handleErrors
]

export const cambiarEstadoValidator = [
    body('estado').notEmpty().withMessage('El estado es obligatorio').isIn(['ACTIVO', 'INACTIVO']).withMessage('El estado debe ser ACTIVO o INACTIVO'),
    validarCampos,
    handleErrors
]

export const eliminarProveedorValidator = [
    validarCampos,
    handleErrors
]

export const buscarProveedorValidator = [
    body('proveedorId').notEmpty().withMessage('El id del proveedor es obligatorio').isMongoId().withMessage('El id del proveedor no es valido'),
    validarCampos,
    handleErrors
]





