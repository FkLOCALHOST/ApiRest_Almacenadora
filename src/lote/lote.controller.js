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
