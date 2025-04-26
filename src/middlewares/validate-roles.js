export const hasRoles = (...roles) => {
    return (req, res, next) =>{
        if(!req.trabajador){
            return res.status(500).json({
                success: false,
                message: "Se requiere validar el rol sin validar el token primero"
            })
        }

        if(!roles.includes(req.trabajador.role)){
            return res.status(401).json({
                success: false,
                message: `Este servicio requiere una de los siguientes roles: ${roles}`
            })
        }
        next()
    }
}