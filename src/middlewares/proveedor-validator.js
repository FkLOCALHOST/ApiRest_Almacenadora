import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validate-fields.js";
import {
  nameExists,
  telefonoExists,
  direccionExists,
} from "../helpers/db-validators.js";
import { body } from "express-validator";

import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const agregarProveedorValidator = [
  validateJWT,
  hasRoles("ADMIN_ROLE"),
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .custom(nameExists),
    
  body("telefono")
    .notEmpty()
    .withMessage("El telefono es obligatorio")
    .isNumeric()
    .withMessage("El telefono debe ser un numero")
    .isLength({ min: 8 })
    .withMessage("El telefono debe tener al menos 8 digitos")
    .custom(telefonoExists),

  body("direccion")
    .notEmpty()
    .withMessage("La direccion es obligatoria")
    .isLength({ min: 3 })
    .withMessage("La direccion debe tener al menos 3 caracteres")
    .custom(direccionExists),

  validarCampos,
  handleErrors,
]


export const actualizarProveedorValidator = [
  validateJWT,
  hasRoles("ADMIN_ROLE"),
  body("nombre")
    .custom(nameExists)
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres"),
  body("telefono")
    .custom(telefonoExists)
    .notEmpty()
    .withMessage("El telefono es obligatorio")
    .isNumeric()
    .withMessage("El telefono debe ser un numero")
    .isLength({ min: 8 })
    .withMessage("El telefono debe tener al menos 8 digitos"),
  body("direccion")
    .custom(direccionExists)
    .notEmpty()
    .withMessage("La direccion es obligatoria")
    .isLength({ min: 3 })
    .withMessage("La direccion debe tener al menos 3 caracteres"),
  validarCampos,
  handleErrors,
]


export const listarProveedoresValidator = [
  validateJWT,
  validarCampos,
  handleErrors,
]

export const cambiarEstadoValidator = [
  validateJWT,
  hasRoles("ADMIN_ROLE"),
  validarCampos,
  handleErrors,
]

export const eliminarProveedorValidator = [   
  validateJWT,
  hasRoles("ADMIN_ROLE"),
  validarCampos, 
  handleErrors];

export const buscarProveedorValidator = [
  validarCampos,
  handleErrors,
]






