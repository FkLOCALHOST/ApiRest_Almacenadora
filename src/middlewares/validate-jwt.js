import jwt from "jsonwebtoken"
import Trabajador from "../trabajador/trabajador.model.js"

export const validateJWT = async (req, res, next) => {
    try{
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            return res.status(400).json({
                success: false,
                message: "No se provió un token en la petición"
            })
        }

        token = token.replace(/^Bearer\s+/, "")

        const { tid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        const trabajador = await Trabajador.findById(tid)

        if(!trabajador){
           return res.status(400).json({
                success: false,
                message: "El trabajador no existe en la base de datos"
           }) 
        }

        if(trabajador.estado === false){
            return res.status(400).json({
                success: false,
                message: "El trabajador fue desactivado"
            })
        }

        req.trabajador = trabajador
        next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al validar el token",
            error: err.message
        })
    }
}