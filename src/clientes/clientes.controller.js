import { hash } from "bcrypt";
import Clientes from "./clientes.model.js"
import fs from "fs/promises"
import { join, dirname } from "path"
import { fileURLToPath } from "url";
import PDFDocument from "pdfkit"

const  __dirname = dirname(fileURLToPath (import.meta.url))

export const agregarCliente = async (req, res) => {
    try{
        const { nombre, apellido, correo, telefono } = req.body;

        const clientes = new Clientes({nombre, apellido, correo, telefono});
        await clientes.save();

        return res.status(200).json({
            success: true,
            msg: 'El cliente fue agregado exitosamente',
            clientes
        })
    }catch(error){
        return res.status(500).json({
            msg: 'Error al agregar al cliente',
            error
        });
    }
}

export const obtenerClientePorId = async (req, res) => {
    try{
        const { id } = req.params;
        const cliente = await Clientes.findById(id)

        if(!cliente){
            return res.status(404).json({
                success: false,
                message: 'Cliente no esncontrado'
            })
        }

        return res.status(200).json({
            success: true,
            cliente
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al obtener al cliente',
            error: err.message
        })
    }
}

export const listarCientes = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, clientes] = await Promise.all([
            Clientes.countDocuments(query),
            Clientes.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        if (clientes.length === 0) {
            return res.status(204).json({
                success: true,
                message: 'No se encontraron clientes activos'
            });
        }

        return res.status(200).json({
            success: true,
            total,
            clientes
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los clientes',
            error: err.message
        });
    }
};

export const eliminarCliente = async (req, res) => {
    try{
        const { id } = req.params

        const cliente = await Clientes.findByIdAndUpdate(id, { estado: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: 'Cliente eliminado',
            cliente
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el cliente',
            error: err.message
        })
    }
}

export const actualizarCliente = async (req, res) => {
    try{
        const { id } = req.params;
        const data = req.body;

        const cliente = await Clientes.findByIdAndUpdate(id, data, { new: true});

        res.status(200).json({
            success: true,
            mg: 'Cliente actualizado',
            cliente
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar el cliente',
            error: err.message
        })
    }
}

export const generarPDFClientes = async (req, res) => { 
    try {
      const { filtro } = req.query;
  
      const query = { estado: true };
      let sortOptions = {};
  
      switch (filtro) {
        case 'A-Z':
          sortOptions = { nombre: 1 };
          break;
        case 'Z-A':
          sortOptions = { nombre: -1 };
          break;
        case 'reciente':
          sortOptions = { createdAt: -1 };
          break;
        case 'antiguo':
          sortOptions = { createdAt: 1 };
          break;
        default:
          sortOptions = {};
      }
  
      const clientes = await Clientes.find(query).sort(sortOptions);
  
      if (clientes.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No hay clientes activos para mostrar en el PDF.'
        });
      }
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=clientes.pdf');
  
      const doc = new PDFDocument({ margin: 30 });
      doc.pipe(res);
  
      doc.fontSize(18).text('Listado de Clientes Activos', { align: 'center' });
      doc.moveDown(2);
  
      const positions = {
        nombre: 50,
        apellido: 150,
        correo: 280,
        telefono: 450,
      };
  
      const startY = doc.y;
      doc.fontSize(12)
        .text('Nombre', positions.nombre, startY)
        .text('Apellido', positions.apellido, startY)
        .text('Correo', positions.correo, startY)
        .text('Teléfono', positions.telefono, startY);
  
      doc.moveTo(50, startY + 15).lineTo(550, startY + 15).stroke();
  
      let currentY = startY + 25;
  
      clientes.forEach((cliente) => {
        doc.fontSize(10)
          .text(cliente.nombre, positions.nombre, currentY)
          .text(cliente.apellido, positions.apellido, currentY)
          .text(cliente.correo || '-', positions.correo, currentY, {
            width: 150,
            ellipsis: true
          })
          .text(cliente.telefono || '-', positions.telefono, currentY);
  
        doc.moveTo(50, currentY + 15).lineTo(550, currentY + 15).stroke();
        currentY += 25;
      });
  
      doc.end();
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error al generar el PDF de clientes',
        error: err.message
      });
    }
  };