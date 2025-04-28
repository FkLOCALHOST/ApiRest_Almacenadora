import Lote from './lote.model.js'
import Products from '../productos/productos.model.js'

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
