export const hasrole = (...role) => {
    return (req, res, next) => {
      if (!req.trabajador) {  
        return res.status(500).json({
          success: false,
          message: "Se quiere verificar un rol antes de validar el token"
        });
      }
  
      if (!role.includes(req.trabajador.role)) {  
        return res.status(401).json({
          success: false,
          message: `Para esto debes de ser  ${role}`
        });
      }
  
      next();
    };
  };
  