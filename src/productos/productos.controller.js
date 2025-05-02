'use strict';

import Productos from './productos.model.js';
import PDFDocument from 'pdfkit';

export const agregarProducto = async(req, res) =>{
    try {
        const data = req.body;

        const productos = new Productos({
            ...data
        });

        await productos.save();

        res.status(200).json({
            success: true,
            productos
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al crear el producto',
            error: err.message 
        });
    }
}

export const listarProductos = async (req, res) => {
    try {
        const productos = await Productos.find({ estado: true });

        if (!productos || productos.length === 0) {
            return res.status(204).json({
                success: true,
                message: "No se encontraron productos activos"
            });
        }

        return res.status(200).json({
            success: true,
            total: productos.length,
            productos
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        });
    }
};

export const buscarProducto = async (req, res) => {
    const { idProducto } = req.params;

    try{
        const producto = await Productos.findOne({ _id: idProducto, estado: true });

        if(!producto){
            return res.status(404).json({ 
                success: false, 
                message: 'Producto no encontrado' 
            });
        }

        res.status(200).json({
            success: true,
            producto
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Error al buscar el producto',
            error
        });
    }
};

export const actualizarProducto = async(req, res) =>{
    try{
        const { idProducto } = req.params;
        const data = req.body;

        const producto = await Productos.findOne({ _id: idProducto, estado: true });

        const actualizarProducto = await Productos.findByIdAndUpdate(producto._id, data, { new: true })

        res.status(200).json({
            success: true,
            msg: 'Producto actualizado',
            product: actualizarProducto
        });


    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar el producto',
            error: err.message
        })
    }
};


export const eliminarProducto = async (req, res) => {
    try {
        const { idProducto } = req.params;

        const producto = await Productos.findByIdAndUpdate(idProducto, { estado: false },{ new: true });

        if (!producto) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto Eliminado',
            producto
        });

    }catch(err) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el producto',
            error: err.message
        });
    }
};

export const listarPorCantidadVentas = async(req, res) => {
  try {
    const productos = await Productos.find({ estado: true })
      .sort({ cantidadVenta: -1 });
    
    if (!productos || productos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron productos"
      });
    }

    return res.status(200).json({
      success: true,
      total: productos.length,
      productos
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error al listar productos por cantidad de ventas",
      error: error.message
    });
  }
}


export const generarPDFProductos = async (req, res) => {
    try {
      const { filtro } = req.query;
  
      const query = {};
      let sortOptions = {};
  
      switch (filtro) {
        case 'A-Z':
          sortOptions = { nombreProducto: 1 };
          break;
        case 'Z-A':
          sortOptions = { nombreProducto: -1 };
          break;
        case 'mayor-precio':
          sortOptions = { precio: -1 };
          break;
        case 'menor-precio':
          sortOptions = { precio: 1 };
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
  
      const productos = await Productos.find(query).sort(sortOptions);
  
      if (productos.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No hay productos para mostrar en el PDF.',
        });
      }
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=productos.pdf');
  
      const doc = new PDFDocument({ margin: 30 });
      doc.pipe(res);
  
      doc.fontSize(18).text('Listado de Productos', { align: 'center' });
      doc.moveDown(2);
  
      const positions = {
        nombre: 50,
        descripcion: 150,
        precio: 350,
        categoria: 450,
      };
  
      const startY = doc.y;
      doc.fontSize(12)
        .text('Nombre', positions.nombre, startY)
        .text('Descripción', positions.descripcion, startY)
        .text('Precio', positions.precio, startY)
        .text('Categoría', positions.categoria, startY);
  
      doc.moveTo(50, startY + 15).lineTo(550, startY + 15).stroke();
  
      let currentY = startY + 25;
  
      productos.forEach((p) => {
        doc.fontSize(10)
          .text(p.nombreProducto, positions.nombre, currentY)
          .text(p.descripcion || '-', positions.descripcion, currentY, {
            width: 180,
            ellipsis: true
          })
          .text(`$${p.precio.toFixed(2)}`, positions.precio, currentY)
          .text(p.categoria || '-', positions.categoria, currentY);
  
        doc.moveTo(50, currentY + 15).lineTo(550, currentY + 15).stroke();
        currentY += 25;
      });
  
      doc.end();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error al generar el PDF de productos',
        error: err.message,
      });
    }
  };

export const generarPDFProductos = async (req, res) => {
    try {
      const { filtro } = req.query;
  
      const query = {};
      let sortOptions = {};
  
      switch (filtro) {
        case 'A-Z':
          sortOptions = { nombreProducto: 1 };
          break;
        case 'Z-A':
          sortOptions = { nombreProducto: -1 };
          break;
        case 'mayor-precio':
          sortOptions = { precio: -1 };
          break;
        case 'menor-precio':
          sortOptions = { precio: 1 };
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
  
      const productos = await Productos.find(query).sort(sortOptions);
  
      if (productos.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No hay productos para mostrar en el PDF.',
        });
      }
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=productos.pdf');
  
      const doc = new PDFDocument({ margin: 30 });
      doc.pipe(res);
  
      doc.fontSize(18).text('Listado de Productos', { align: 'center' });
      doc.moveDown(2);
  
      const positions = {
        nombre: 50,
        descripcion: 150,
        precio: 350,
        categoria: 450,
      };
  
      const startY = doc.y;
      doc.fontSize(12)
        .text('Nombre', positions.nombre, startY)
        .text('Descripción', positions.descripcion, startY)
        .text('Precio', positions.precio, startY)
        .text('Categoría', positions.categoria, startY);
  
      doc.moveTo(50, startY + 15).lineTo(550, startY + 15).stroke();
  
      let currentY = startY + 25;
  
      productos.forEach((p) => {
        doc.fontSize(10)
          .text(p.nombreProducto, positions.nombre, currentY)
          .text(p.descripcion || '-', positions.descripcion, currentY, {
            width: 180,
            ellipsis: true
          })
          .text(`$${p.precio.toFixed(2)}`, positions.precio, currentY)
          .text(p.categoria || '-', positions.categoria, currentY);
  
        doc.moveTo(50, currentY + 15).lineTo(550, currentY + 15).stroke();
        currentY += 25;
      });
  
      doc.end();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error al generar el PDF de productos',
        error: err.message,
      });
    }
  };


