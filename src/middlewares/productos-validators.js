import { body, param } from "express-validator";
import { productExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";


export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("nombreProducto").notEmpty().withMessage("El nombre del producto es requerido"),
    body("descripcion").notEmpty().withMessage("La descripción es requerida"),
    body("precio").notEmpty().withMessage("El precio es requerido"),
    body("categoria").notEmpty().withMessage("La categoría es requerida"),
    body("urlImagen").notEmpty().withMessage("La imagen del producto es requerida"),  
    validarCampos,
    handleErrors
];

export const getProductByIdValidator = [
    validateJWT,
    param("idProducto").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("idProducto").custom(productExists),
    validarCampos,
    handleErrors
];

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("idProducto", "No es un ID válido").isMongoId(),
    param("idProducto").custom(productExists),
    validarCampos,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("idProducto", "No es un ID válido").isMongoId(),
    param("idProducto").custom(productExists),
    validarCampos,
    handleErrors
];

export const listarPorCantidadVentasValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];