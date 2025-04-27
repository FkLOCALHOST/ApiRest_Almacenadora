import Trabajador from "./trabajador.model.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

export const obtenerTrabajadores = [
  validateJWT,

  async (req, res) => {º
    try {
      const { limit = 10, from = 0 } = req.query;
      const query = { status: true };
      const [total, trabajadores] = await Promise.all([
        Trabajador.countDocuments(query),
        Trabajador.find(query).skip(Number(from)).limit(Number(limit)),
      ]);

      return res.status(200).json({
        total,
        trabajadores,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error al obtener los trabajadores",
        error: err.message,
      });
    }
  },
];

export const actualizarEmpleado = [
  validateJWT,

  async (req, res) => {
    try {
      const { tid } = req.params;
      const data = req.body;

      const trabajador = await Trabajador.findByIdAndUpdate(tid, data, {
        new: true,
      });

      return res.status(200).json({
        message: "El empleado fue actualizado con éxito",
        trabajador,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Fallo al actualizar el empleado",
        error: err.message,
      });
    }
  },
];

export const lsitarEmpleado = async (req, res) => {
  try {
    const { limite = 5, desde = 0 } = req.query;
    const query = { status: true };

    const [total, trabajadores] = await Promise.all([
      Trabajador.countDocuments(query),
      Trabajador.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);
    return res.status(200).json({
      success: true,
      total,
      trabajadores,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error al obtener los trabajadores",
      error: err.message,
    });
  }
}
export const eliminarEmpleado = [
  validateJWT,

  async (req, res) => {
    try {
      const { tid } = req.params;
      const trabajador = await Trabajador.findByIdAndUpdate(
        tid,
        { estadoT: false },
        { new: true }
      );

      return res.status(200).json({
        message: "El empleado fue eliminado con éxito",
        trabajador,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Fallo al eliminar el empleado",
        error: err.message,
      });
    }
  },
];
