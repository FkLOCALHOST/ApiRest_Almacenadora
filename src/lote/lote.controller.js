import Lote from './lote.model.js'
import Products from '../productos/productos.model.js'
import PDFDocument from 'pdfkit'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const crearLote = async (req, res) => {
  try {
      const { numeroLote, cantidad, fechaCaducidad, productoId } = req.body;

      const producto = await Products.findById(productoId);
      if (!producto) {
          return res.status(404).json({
              success: false,
              message: `No se encontró el producto con el ID: ${productoId}`,
          });
      }

      const lote = new Lote({
          numeroLote,
          cantidad,
          fechaCaducidad,
          productos: producto._id,
      });

      await lote.save();

      const loteConDatos = await Lote.findById(lote._id).populate('productos', 'nombreProducto');

      return res.status(200).json({
          success: true,
          message: 'El lote fue creado exitosamente',
          lote: loteConDatos,
      });
  } catch (error) {
      return res.status(500).json({
          success: false,
          message: 'Error al crear el lote',
          error: error.message,
      });
  }
};

export const obtenerLotePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const lote = await Lote.findById(id)

        if(!lote){
            return res.status(404).json({
                success: false,
                message: 'Lote no encontrado'
            })
        }

        return res.status(200).json({
            success: true,
            lote
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el lote',
            error: err.message
        })
    }
}

export const listarLotes = async (req, res) => {
  try {
      const { limite = 10, desde = 0 } = req.query;
      const query = { estado: true };

      const [total, lotes] = await Promise.all([
          Lote.countDocuments(query),
          Lote.find(query)
              .populate('productos', 'nombreProducto') 
              .skip(Number(desde))
              .limit(Number(limite))
      ]);

      return res.status(200).json({
          success: true,
          total,
          lotes,
          message: lotes.length === 0 ? 'No se encontraron lotes activos' : undefined
      });
  } catch (err) {
      return res.status(500).json({
          success: false,
          message: 'Error al obtener los lotes',
          error: err.message
      });
  }
};

export const eliminarLote = async (req, res) => {
    try{
        const { id } = req.params

        const lote = await Lote.findByIdAndUpdate(id, { estado: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: 'Lote eliminado',
            lote
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el lote',
            error: err.message
        })
    }
}

export const actualizarLote = async (req, res) => {
  try {
      const { id } = req.params;
      const { numeroLote, cantidad, fechaCaducidad, producto, estado } = req.body;

      const data = {
          numeroLote,
          cantidad,
          fechaCaducidad,
          estado,
          productos: producto, // 👈 importante: mapea 'producto' a 'productos'
      };

      const lote = await Lote.findByIdAndUpdate(id, data, { new: true }).populate('productos', 'nombreProducto');

      res.status(200).json({
          success: true,
          message: 'Lote actualizado',
          lote
      });
  } catch (err) {
      return res.status(500).json({
          success: false,
          message: 'Error al actualizar el Lote',
          error: err.message
      });
  }
};

export const listarTotalProductos = async (req, res) => {
    try{
        const { nombreProducto } = req.body;
        
        const producto = await Products.findOne({ nombreProducto });
        if(!producto) {
            return res.status(404).json({
                success: false,
                message: 'No se encontro el producto'
            })
        }

        const lotes = await Lote.find({ 'productos.productoId': producto._id, estado: true });

        const totalProducto = lotes.reduce((total, lote) => total + Number(lote.cantidad), 0);

        const uploadsDir = path.join(__dirname, '../../public/uploads/totalProductos');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const filePath = path.join(uploadsDir, `${producto.nombreProducto}_reporte.pdf`);

        const doc = new PDFDocument();

        doc.fontSize(18).text('Reporte de Producto', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Producto: ${producto.nombreProducto}`);
        doc.text(`ID del Producto: ${producto._id}`);
        doc.text(`Cantidad Total en Lotes Activos: ${totalProducto}`);
        doc.moveDown();

        doc.fontSize(12).text('Detalles de los Lotes:', { underline: true });
        lotes.forEach((lote, index) => {
            doc.text(`Lote ${index + 1}:`);
            doc.text(`  Número de Lote: ${lote.numeroLote}`);
            doc.text(`  Cantidad: ${lote.cantidad}`);
            doc.text(`  Fecha de Caducidad: ${lote.fechaCaducidad}`);
            doc.moveDown();
        });

        doc.pipe(fs.createWriteStream(filePath));
        doc.end();
        
        return res.status(200).json({
            success: true,
            message: 'Reporte generado y guardado exitosamente',
            filePath: `/uploads/totalProductos/${producto.nombreProducto}_reporte.pdf`,
            producto: {
                id: producto._id,
                nombre: producto.nombreProducto
            },
            totalProducto
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al listar los productos con la cantidad total',
            error: err.message
        })
    }
}

export const generarPDFLotes = async (req, res) => {
    try {
      const { filtro } = req.query;
  
      const query = { estado: true };
      let sortOptions = {};
  
      switch (filtro) {
        case 'A-Z':
          sortOptions = { numeroLote: 1 };
          break;
        case 'Z-A':
          sortOptions = { numeroLote: -1 };
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
  
      const lotes = await Lote.find(query)
        .populate('productos.productoId', 'nombreProducto')
        .sort(sortOptions);
  
      if (lotes.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No hay lotes activos para mostrar en el PDF.'
        });
      }
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=lotes.pdf');
  
      const doc = new PDFDocument({ margin: 30 });
      doc.pipe(res);
  
      doc.fontSize(18).text('Listado de Lotes Activos', { align: 'center' });
      doc.moveDown(2);
  
      const positions = {
        numeroLote: 50,
        cantidad: 150,
        fechaCaducidad: 230,
        producto: 350,
      };
  
      const startY = doc.y;
      doc.fontSize(12)
        .text('N° Lote', positions.numeroLote, startY)
        .text('Cantidad', positions.cantidad, startY)
        .text('F. Caducidad', positions.fechaCaducidad, startY)
        .text('Producto(s)', positions.producto, startY);
  
      doc.moveTo(50, startY + 15).lineTo(550, startY + 15).stroke();
  
      let currentY = startY + 25;
  
      lotes.forEach(lote => {
        const nombresProductos = lote.productos.map(p => p.productoId?.nombreProducto || 'Sin nombre').join(', ');
  
        doc.fontSize(10)
          .text(lote.numeroLote, positions.numeroLote, currentY)
          .text(lote.cantidad, positions.cantidad, currentY)
          .text(lote.fechaCaducidad, positions.fechaCaducidad, currentY)
          .text(nombresProductos, positions.producto, currentY, { width: 180 });
  
        doc.moveTo(50, currentY + 15).lineTo(550, currentY + 15).stroke();
  
        currentY += 25;
      });
  
      doc.end();
    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Error al generar el PDF de lotes',
        error: err.message
      });
    }
  };


  export const obtenerTotalProductos = async (req, res) => {
    try {
      const lotes = await Lote.find({ estado: true })
        .populate('productos.productoId', 'nombreProducto estado');
  
      const conteoProductos = {};
  
        lotes.forEach(lote => {
            const cantidad = parseInt(lote.cantidad, 10);
    
            if (
            Array.isArray(lote.productos) &&
            lote.productos.length > 0 &&
            lote.productos[0].productoId &&
            lote.productos[0].productoId.estado === true
            ) {
            const producto = lote.productos[0].productoId;
            const nombreProducto = producto.nombreProducto;
    
            if (conteoProductos[nombreProducto]) {
                conteoProductos[nombreProducto] += cantidad;
            } else {
                conteoProductos[nombreProducto] = cantidad;
            }
            }
        });
  
      res.status(200).json({
        success: true,
        productos: conteoProductos
      });
  
    }catch(error) {
      res.status(500).json({
        success: false,
        message: 'Error al obtener el conteo de productos',
        error: error.message
      });
    }
  };