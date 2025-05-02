import Bodega from './bodega.model.js';
import Trabajador from "../trabajador/trabajador.model.js"
import Lote from "../lote/lote.model.js"
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { dirname } from "path";
import { fileURLToPath } from 'url'
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const agregarBodega = async(req, res) =>{

    try {
        const data = req.body;

        await Lote.findByIdAndUpdate(data.lote, { estado: false}, {new: true})

        const bodega = new Bodega({
            ...data
        });

        await bodega.save();

        res.status(200).json({
            success: true,
            bodega
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al crear el registro de bodega',
            error: err.message 
        });
    }
}

export const obtenerBodegas = async (req, res) => {
    try {

        const query = { estado: true };

        const [total, bodegas] = await Promise.all([
            Bodega.countDocuments(query),
            Bodega.find(query)
                .populate('lote', 'numeroLote cantidad fechaCaducidad productos estado')
                .populate('trabajador', 'nombreT apellidoT dpi telefonoT correoT')
        ]);

        if (bodegas.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron registros de la bodega"
            });
        }

        return res.status(200).json({
            success: true,
            total,
            bodegas
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los registros en bodega",
            error: err.message
        });
    }
};

export const buscarBodega = async (req, res) => {
    const { idBodega } = req.params;

    try{
        const bodega = await Bodega.findById(idBodega);

        if(!bodega){
            return res.status(404).json({ 
                success: false, 
                message: 'Registro de bodega no encontrado' 
            });
        }

        res.status(200).json({
            success: true,
            bodega
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al buscar el producto",
            error: err.message
        });
    }
}

export const actualizarBodega = async(req, res) => {
    try {
        const { idBodega } = req.params;
        const data = req.body;

        const bodega = await Bodega.findById(idBodega);

        if (!bodega) {
            return res.status(404).json({
                success: false,
                message: 'Bodega no encontrada'
            });
        }

        if(data.lote){
            const loteExistente = await Lote.findById(data.lote);
            if (!loteExistente) {

                return res.status(404).json({
                    success: false,
                    message: 'Lote no encontrado'
                });
            }
        }

        if(data.trabajador){
            const trabajadorExistente = await Trabajador.findById(data.trabajador);
            if (!trabajadorExistente) {

                return res.status(404).json({
                    success: false,
                    message: 'Trabajador no encontrado'
                });
            }
        }

        const bodegaActualizada = await Bodega.findByIdAndUpdate(idBodega, data, { new: true });

        return res.status(200).json({
            success: true,
            message: 'Bodega actualizada correctamente',
            bodega: bodegaActualizada
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar la bodega',
            error: err.message
        });
    }
};


export const obtenerBodegasPdf = async (req, res) => {
    try {
        
        const bodegas = await Bodega.find()
            .populate('lote', 'numeroLote cantidad fechaCaducidad productos estado')
            .populate('trabajador', 'nombreT apellidoT dpi telefonoT correoT');

        if (!bodegas || bodegas.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron registros de la bodega"
            });
        }

        const doc = new PDFDocument({ margin: 40, size: 'A4' });
        const outputPath = path.join(__dirname, `../../public/uploads/bodegas-listado${Date.now()}.pdf`);
        doc.pipe(fs.createWriteStream(outputPath));

        
        doc.fontSize(20).text('Listado de Bodegas', { align: 'center' });
        doc.moveDown();

        bodegas.forEach((bodega, index) => {
            doc
                .fontSize(14)
                .fillColor('#000')
                .text(`Bodega #${index + 1}`, { underline: true });

            doc
                .fontSize(12)
                .text(`Fecha de ingreso: ${bodega.fechaIngreso || 'N/A'}`)
                .text(`Fecha de salida: ${bodega.fechaSalida || 'N/A'}`)
                .moveDown(0.3);

            doc
                .font('Helvetica-Bold').text('Lote:', { continued: true }).font('Helvetica')
                .text(`  #${bodega.lote.numeroLote} | Estado: ${bodega.lote.estado}`)
                .text(`  Cantidad: ${bodega.lote.cantidad}`)
                .text(`  Fecha de caducidad: ${bodega.lote.fechaCaducidad}`)
                .moveDown(0.3);

            doc
                .font('Helvetica-Bold').text('Trabajador:', { continued: true }).font('Helvetica')
                .text(`  ${bodega.trabajador.nombreT} ${bodega.trabajador.apellidoT}`)
                .text(`  DPI: ${bodega.trabajador.dpi}`)
                .text(`  Teléfono: ${bodega.trabajador.telefonoT}`)
                .text(`  Correo: ${bodega.trabajador.correoT}`)
                .moveDown();

          
            doc.moveTo(40, doc.y).lineTo(555, doc.y).strokeColor('#999').stroke();
            doc.moveDown();
        });

        doc.end();
       

        return res.status(200).json({
            success: true,
            total: bodegas.length,
            message: 'PDF generado correctamente',
            rutaPDF: '/uploads/bodegas-listado.pdf'
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los registros en bodega",
            error: err.message
        });
    }
};

export const eliminarBodega = async (req, res) => {
    try{
        const { idBodega } = req.params

        const bodega = await Bodega.findByIdAndUpdate(idBodega, { estado: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: 'Bodega eliminada',
            bodega
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar la bodega',
            error: err.message
        })
    }
}



export const obtenerBodegaPdf = async (req, res) => {
    try {
        const { idBodega } = req.params;

        const bodega = await Bodega.findById(idBodega)
        .populate('lote', 'numeroLote cantidad fechaCaducidad productos estado')
        .populate('trabajador', 'nombreT apellidoT dpi telefonoT correoT');

        if (!bodega) {
            return res.status(404).json({
                success: false,
                message: "Bodega no encontrada"
            });
        }

        const doc = new PDFDocument({ margin: 40, size: 'A4' });
        const outputPath = path.join(__dirname, `../../public/uploads/bodega-${idBodega}-${Date.now()}.pdf`);
        doc.pipe(fs.createWriteStream(outputPath));

       
        doc.fontSize(20).text('Detalle de Bodega', { align: 'center' });
        doc.moveDown();

        doc
            .fontSize(14)
            .fillColor('#000')
            .text(`Bodega ID: ${bodega._id}`, { underline: true });

        doc
            .fontSize(12)
            .text(`Fecha de ingreso: ${bodega.fechaIngreso || 'N/A'}`)
            .text(`Fecha de salida: ${bodega.fechaSalida || 'N/A'}`)
            .moveDown(0.3);

        doc
            .font('Helvetica-Bold').text('Lote:', { continued: true }).font('Helvetica')
            .text(`  #${bodega.lote.numeroLote} | Estado: ${bodega.lote.estado}`)
            .text(`  Cantidad: ${bodega.lote.cantidad}`)
            .text(`  Fecha de caducidad: ${bodega.lote.fechaCaducidad}`)
            .moveDown(0.3);

        doc.moveDown(0.3);

        doc
            .font('Helvetica-Bold').text('Trabajador:', { continued: true }).font('Helvetica')
            .text(`  ${bodega.trabajador.nombreT} ${bodega.trabajador.apellidoT}`)
            .text(`  DPI: ${bodega.trabajador.dpi}`)
            .text(`  Teléfono: ${bodega.trabajador.telefonoT}`)
            .text(`  Correo: ${bodega.trabajador.correoT}`)
            .moveDown();

        doc.end();

        return res.status(200).json({
            success: true,
            message: 'PDF generado correctamente',
            rutaPDF: `/uploads/bodega-${idBodega}.pdf`
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al generar el PDF de la bodega",
            error: err.message
        });
    }
};

export const obtenerBodegasPorFechaIngreso = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, bodegas] = await Promise.all([
            Bodega.countDocuments(query),
            Bodega.find(query)
                .sort({ fechaIngreso: -1 })
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('lote', 'numeroLote cantidad fechaCaducidad productos estado')
                .populate('trabajador', 'nombreT apellidoT dpi telefonoT correoT')
        ]);

        if (bodegas.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron registros de la bodega"
            });
        }

        return res.status(200).json({
            success: true,
            total,
            bodegas
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los registros en bodega",
            error: err.message
        });
    }
};

export const obtenerBodegasPorFechaSalida = async (req, res) => {
    try {
        const { limite = 10, desde = 0 } = req.query;
        const query = { estado: true };

        const [total, bodegas] = await Promise.all([
            Bodega.countDocuments(query),
            Bodega.find(query)
                .sort({ fechaSalida: -1 })
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('lote', 'numeroLote cantidad fechaCaducidad productos estado')
                .populate('trabajador', 'nombreT apellidoT dpi telefonoT correoT')
        ]);

        if (bodegas.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron registros de la bodega"
            });
        }

        return res.status(200).json({
            success: true,
            total,
            bodegas
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los registros en bodega",
            error: err.message
        });
    }
};



