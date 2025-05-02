import { body, param } from "express-validator";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { trabajadorExists} from "../helpers/db-validators.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";


export const agregarBodegaValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("numeroBodega", "El número de bodega es requerido").notEmpty(),
    body("numeroBodega", "El número de bodega debe tener entre 4 y 6 caracteres").isLength({ min: 4, max: 6 }),   
    body("lote", "No es un ID válido").isMongoId(),
    body("trabajador", "No es un ID válido").isMongoId(),
    body("trabajador").custom(trabajadorExists),
    validarCampos,
    handleErrors
];

export const listarBodegaValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];


export const buscarBodegaValidator = [
    validateJWT,
    param("idBodega").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];

export const eliminarBodegaValidador = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param('idBodega').isMongoId().withMessage('No es un ID válido de MongoDB'),
    validarCampos,
    handleErrors
];




