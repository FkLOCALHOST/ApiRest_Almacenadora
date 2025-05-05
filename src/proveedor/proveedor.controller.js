'use strict'

import Proveedor from './proveedor.model.js'
import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"


export const agregarProveedor = async (req, res) =>{
    try {
        const {nombre, telefono, direccion, estado} = req.body
        const nuevoProveedor = new Proveedor({
            nombre, 
            telefono,
            direccion,
            estado
        })

        await nuevoProveedor.save()

        res.status(201).json({
            succes: true,
            message: 'Proveedor creado correctamente'
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al agregar el proveedor',
            error: err.message
        } )
        
    }
}

export const actualizarProveedor = async (req, res) => {
    try {
      const { proveedorId } = req.params;
      const { nombre, telefono, direccion } = req.body;
  
      const proveedorExistente = await Proveedor.findById(proveedorId);
      if (!proveedorExistente) {
        return res.status(404).json({
          success: false,
          message: 'Proveedor no encontrado'
        })
      }

      if (nombre) proveedorExistente.nombre = nombre;
      if (telefono) proveedorExistente.telefono = telefono;
      if (direccion) proveedorExistente.direccion = direccion;
  
      const proveedorActualizado = await proveedorExistente.save();
  
      res.status(200).json({
        success: true,
        message: 'Los datos han sido actualizados correctamente',
        proveedor: proveedorActualizado
      })
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error al actualizar los datos del proveedor',
        error: err.message
      })
    }
  }

  export const cambiarEstado = async (req, res) => {
    try {
      const { proveedorId } = req.params;
      const proveedor = await Proveedor.findById(proveedorId);
  
      if (!proveedor) {
        return res.status(404).json({
          success: false,
          message: 'Proveedor no encontrado'
        });
      }
  
      proveedor.estado = !proveedor.estado; 
      const proveedorActualizado = await proveedor.save();
  
      res.status(200).json({
        success: true,
        message: `El estado ha sido cambiado a ${proveedor.estado ? 'ACTIVO' : 'INACTIVO'}`,
        proveedor: proveedorActualizado
      });
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error al cambiar el estado del proveedor',
        error: err.message
      });
    }
  };


export const eliminarProveedor = async (req, res) => {
    try {
        const { proveedorId } = req.params;

        const proveedor = await Proveedor.findByIdAndUpdate(proveedorId, { estado: false },{ new: true });

        if (!proveedor) {
            return res.status(404).json({
                success: false,
                message: 'Proveedor no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Proveedor Eliminado Exitosamente',
            proveedor
        });

    }catch(err) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el proveedor',
            error: err.message
        });
    }
};


export const listarProveedores = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { estado: true };


        const [total, proveedores] = await Promise.all([
            Proveedor.countDocuments(query),
            Proveedor.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);
        return res.status(200).json({
            success: true,
            total,
            proveedores,
            message: proveedores.length === 0 ? 'No se encontraron proveedores activos' : undefined
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al listar los proveedores',
            error: err.message
        });
    }
}

export const buscarProveedor = async (req, res) => {
    try {
      const { nombre } = req.params; 
      const proveedorA = await Proveedor.findOne({ nombre });
  
      if (!proveedorA) {
        return res.status(404).json({
          success: false,
          message: 'Proveedor no encontrado'
        })
      }

      res.status(200).json({
        success: true,
        proveedor: proveedorA
      })
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error al buscar el proveedor',
        error: err.message
      })
    }
}

export const generarPDFProveedores = async (req, res) => {
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

    const proveedores = await Proveedor.find(query).sort(sortOptions);

    if (proveedores.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No hay proveedores activos para mostrar en el PDF.'
      });
    }
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=proveedores.pdf');

    const doc = new PDFDocument({ margin: 30 });
    doc.pipe(res);

    doc.fontSize(18).text('Listado de Proveedores Activos', { align: 'center' });
    doc.moveDown(2);

    const positions = {
      nombre: 50,
      telefono: 200,
      direccion: 300,
      estado: 500,
    };

    const startY = doc.y;
    doc.fontSize(12)
      .text('Nombre', positions.nombre, startY)
      .text('Teléfono', positions.telefono, startY)
      .text('Dirección', positions.direccion, startY)
      .text('Estado', positions.estado, startY);

    doc.moveTo(50, startY + 15).lineTo(550, startY + 15).stroke();

    let currentY = startY + 25; 

    proveedores.forEach((p) => {
      doc.fontSize(10)
        .text(p.nombre, positions.nombre, currentY)
        .text(p.telefono.toString(), positions.telefono, currentY)
        .text(p.direccion, positions.direccion, currentY, { width: 180, ellipsis: true }) 
        .text(p.estado, positions.estado, currentY);

      doc.moveTo(50, currentY + 15).lineTo(550, currentY + 15).stroke();

      currentY += 25; 
    });

    doc.end();

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error al generar el PDF de proveedores',
      error: err.message
    });
  }
};