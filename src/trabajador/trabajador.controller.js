import Trabajador from "./trabajador.model.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import PDFDocument from "pdfkit";

export const obtenerTrabajadores = [
  validateJWT,

  async (req, res) => {
    try {
      const { limit = 10, from = 0 } = req.query;
      const query = { estadoT: true };
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


export const generarPDFTrabajadores = async (req, res) => {
  try {
    const { filtro } = req.query;

    const query = { estadoT: true };
    let sortOptions = {};

    switch (filtro) {
      case 'A-Z':
        sortOptions = { nombreT: 1 };
        break;
      case 'Z-A':
        sortOptions = { nombreT: -1 };
        break;
      case 'reciente':
        sortOptions = { createdAt: -1 };
        break;
      case 'antiguo':
        sortOptions = { createdAt: 1 };
        break;
      case 'rendimiento-alto':
        sortOptions = { rendimientoT: -1 };
        break;
      case 'rendimiento-bajo':
        sortOptions = { rendimientoT: 1 };
        break;
      default:
        sortOptions = {};
    }

    const trabajadores = await Trabajador.find(query)
      .select('nombreT apellidoT correoT telefonoT dpi rendimientoT role estadoT')
      .sort(sortOptions);

    if (trabajadores.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No hay trabajadores activos para mostrar en el PDF.'
      });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=trabajadores.pdf');

    const doc = new PDFDocument({ margin: 30 });
    doc.pipe(res);

    doc.fontSize(18).text('Listado de Trabajadores Activos', { align: 'center' });
    doc.moveDown(2);

    const positions = {
      nombre: 40,
      apellido: 120,
      correo: 200,
      telefono: 320,
      dpi: 400,
      rendimiento: 490,
      rol: 540,
    };

    const startY = doc.y;
    doc.fontSize(12)
      .text('Nombre', positions.nombre, startY)
      .text('Apellido', positions.apellido, startY)
      .text('Correo', positions.correo, startY)
      .text('Teléfono', positions.telefono, startY)
      .text('DPI', positions.dpi, startY)
      .text('Rend.', positions.rendimiento, startY)
      .text('Rol', positions.rol, startY);

    doc.moveTo(40, startY + 15).lineTo(570, startY + 15).stroke();

    let currentY = startY + 25; 


    trabajadores.forEach((t) => {
      doc.fontSize(10)
        .text(t.nombreT, positions.nombre, currentY)
        .text(t.apellidoT, positions.apellido, currentY)
        .text(t.correoT, positions.correo, currentY, { width: 110, ellipsis: true }) 
        .text(t.telefonoT.toString(), positions.telefono, currentY)
        .text(t.dpi, positions.dpi, currentY)
        .text(t.rendimientoT.toString(), positions.rendimiento, currentY)
        .text(t.role, positions.rol, currentY);


      doc.moveTo(40, currentY + 15).lineTo(570, currentY + 15).stroke();

      currentY += 25; 
    });

    doc.end();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Error al generar el PDF de trabajadores',
      error: err.message,
    });
  }
};
