import { hash, verify } from "argon2";
import Trabajador from "../trabajador/trabajador.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) => {
  try {
    const data = req.body;
    let fotoDePerfil = req.file ? req.file.filename : null;

    if (!data.correoT || data.correoT.trim() === "") {
      return res.status(400).json({
        message: "Registro de trabajador fallido",
        error: "El correoT es obligatorio y no puede estar vacío",
      });
    }

    const correoExistente = await Trabajador.findOne({ correoT: data.correoT });

    if (correoExistente) {
      return res.status(400).json({
        message: "Registro de trabajador fallido",
        error: `El correo ${data.correoT} ya está registrado`,
      });
    }

    const encryptedPassword = await hash(data.contrasenaT);
    data.contrasenaT = encryptedPassword;
    data.fotoDePerfil = fotoDePerfil;

    const trabajador = await Trabajador.create(data);

    return res.status(201).json({
      message: "Trabajador ha sido creado",
      nombreT: trabajador.nombreT,
      correoT: trabajador.correoT,
      contrasenaT: "La contraseña ha sido encriptada y no se puede mostrar",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Registro de trabajador fallido",
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  const { correoT, telefonoT, contrasenaT } = req.body;
  try {
    if (!contrasenaT) {
      return res.status(400).json({
        message: "Credenciales inválidas",
        error: "La contraseña es obligatoria",
      });
    }

    const trabajador = await Trabajador.findOne({
      $or: [{ correoT: correoT }, { telefonoT: telefonoT }],
    }).select("+contrasenaT");

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
