import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {

export const validarCampos = (req, res, next)=> {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return next(errors)
    }
    next()
}