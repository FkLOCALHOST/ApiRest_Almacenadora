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
