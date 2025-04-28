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
      const { proveedorId } = req.params
      const proveedor = await Proveedor.findById(proveedorId)

      if (!proveedor) {
        return res.status(404).json({
          success: false,
          message: 'Proveedor no encontrado'
        })
      }
  
      const nuevoEstado = proveedor.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
  
      proveedor.estado = nuevoEstado;
      const proveedorActualizado = await proveedor.save()
  
      res.status(200).json({
        success: true,
        message: `El estado ha sido cambiado a ${nuevoEstado}`,
        proveedor: proveedorActualizado
      })
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error al cambiar el estado del proveedor',
        error: err.message
      })
    }
  }


export const eliminarProveedor = async (req, res) => {
    try{
        const {proveedorId} = req.params

        await Proveedor.findByIdAndDelete(proveedorId)

        res.status(201).json({
            success: true,
            message: 'El proveedor ha sido eliminado correctamente'
        })

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el proveedor',
            error: err.message
        })
    }
}


export const listarProveedores = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query
        const query = { estado: 'ACTIVO' }

        const [total, proveedores] = await Promise.all([
            Proveedor.countDocuments(query),
            Proveedor.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            proveedores
        })

    } catch (err) {

        res.status(500).json({
            success: false,
            message: 'Error al listar los proveedores',
            error: err.message
        })
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
    const proveedores = await Proveedor.find({ estado: 'ACTIVO' });

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
    doc.moveDown();


    doc.fontSize(12).text('Nombre', 50, doc.y);
    doc.text('Teléfono', 200, doc.y);
    doc.text('Dirección', 300, doc.y);
    doc.text('Estado', 500, doc.y);
    doc.moveDown();


    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

    proveedores.forEach((p) => {
      doc.fontSize(10)
        .text(p.nombre, 50, doc.y + 10)
        .text(p.telefono.toString(), 200, doc.y)
        .text(p.direccion, 300, doc.y)
        .text(p.estado, 500, doc.y);
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