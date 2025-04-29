import Lote from './lote.model.js'
import Products from '../productos/productos.model.js'
import PDFDocument from 'pdfkit'

export const crearLote = async (req, res) => {
    try {
        const { numeroLote, cantidad, fechaCaducidad, productoId } = req.body;

        const productorecord = await Products.findById(productoId);
        if (!productorecord) {
            return res.status(404).json({
                msg: `No se encontró el producto con el ID: ${productoId}`
            });
        }

        const lote = new Lote({
            numeroLote,
            cantidad,
            fechaCaducidad,
            productos: [{ productoId}]
        });

        await lote.save();

        const loteConDatos = await Lote.findById(lote._id)
        .populate('productos.productoId');

        return res.status(200).json({
            success: true,
            msg: 'El lote fue creado exitosamente',
            lote: loteConDatos
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al crear el Lote',
            error: error.message
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
    try{
        const { limite = 10, desde = 0 } = req.query
        const query = { estado: true }
        
        const [total, lotes] = await Promise.all([
            Lote.countDocuments(query),
            Lote.find(query)
                    .skip(Number(desde))
                    .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            lotes
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los Lotes',
            error: err.message
        })
    }
}

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
    try{
        const { id } = req.params;
        const data = req.body;

        const lote = await Lote.findByIdAndUpdate(id, data, { new: true});

        res.status(200).json({
            success: true,
            mg: 'Lote actualizado',
            lote
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar el Lote',
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