import { hash, verify } from "argon2";
import Trabajador from "../trabajador/trabajador.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
  try {
    const data = req.body;
    let fotoDePerfil = req.file ? req.file.filename : null;
    const encryptedPassword = await hash(data.contrasenaT);
    data.contrasenaT = encryptedPassword;
    data.fotoDePerfil = fotoDePerfil;

    const trabajador = await Trabajador.create(data);

    return res.status(201).json({
      message: "Trabajador ha sido creado",
      nombre: trabajador.nombre,
      correoT: trabajador.correoT,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Registro de trabajador fallido",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { correoT, telefono, contrasenaT } = req.body;
  try {
    const trabajador = await Trabajador.findOne({
      $or: [{ correoT: correoT }, { telefono: telefono }],
    });

    if (!trabajador) {
      return res.status(400).json({
        message: "Credenciales inválidas",
        error: "No existe el trabajador con el correoT o teléfono ingresado",
      });
    }

    const validPassword = await verify(trabajador.contrasenaT, contrasenaT);

    if (!validPassword) {
      return res.status(400).json({
        message: "Credenciales inválidas",
        error: "Contraseña incorrecta",
      });
    }

    const token = await generateJWT(trabajador.id);

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      userDetails: {
        token: token,
        fotoDePerfil: trabajador.fotoDePerfil,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Inicio de sesión fallido, error del servidor",
      error: err.message,
    });
  }
};
