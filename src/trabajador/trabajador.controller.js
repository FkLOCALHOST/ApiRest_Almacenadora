import Trabajador from "./trabajador.model.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

export const crearEmpleado = [
  validateJWT,
  async (req, res) => {
    try {
      const data = req.body;
      let fotoDePerfil = req.file ? req.file.filename : null;
      data.fotoDePerfil = fotoDePerfil;

      const trabajador = await Trabajador.create(data);

      return res.status(201).json({
        message: "El empleado fue creado con éxito",
        nombre: trabajador.nombre,
        apellido: trabajador.apellido,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Error al crear el empleado",
        error: err.message,
      });
    }
  },
];

export const obtenerTrabajadores = [
  validateJWT,

  async (req, res) => {
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

export const eliminarEmpleado = [
  validateJWT,

  async (req, res) => {
    try {
      const { tid } = req.params;
      const trabajador = await Trabajador.findByIdAndUpdate(
        tid,
        { estado: false },
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
