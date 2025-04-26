import { body, param } from "express-validator";
import { productExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";


export const createProductValidator = [
    body("nombreProducto").notEmpty().withMessage("El nombre del producto es requerido"),
    body("descripcion").notEmpty().withMessage("La descripción es requerida"),
    body("precio").notEmpty().withMessage("El precio es requerido"),
    body("categoria").notEmpty().withMessage("La categoría es requerida"),
    body("urlImagen").notEmpty().withMessage("La imagen del producto es requerida"),  
    validarCampos,
    handleErrors
];

export const getProductByIdValidator = [
    param("idProducto").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("idProducto").custom(productExists),
    validarCampos,
    handleErrors
];

export const updateProductValidator = [
    param("idProducto", "No es un ID válido").isMongoId(),
    param("idProducto").custom(productExists),
    validarCampos,
    handleErrors
]

export const deleteCategoryValidator = [
    param("idProducto", "No es un ID válido").isMongoId(),
    param("idProducto").custom(productExists),
    validarCampos,
    handleErrors
]