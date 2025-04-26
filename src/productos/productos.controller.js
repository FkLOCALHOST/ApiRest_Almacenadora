'use strict';

import Productos from './productos.model.js';

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

export const listarProductos = async(req, res) =>{
    try{
        const productos = await Productos.find();

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

    }catch(err){
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
        const producto = await Productos.findById(idProducto);

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

        const actualizarProducto = await Productos.findByIdAndUpdate(idProducto, data, { new: true })

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


export const eliminarProducto = async(req, res) =>{
    try{
        const { idProducto } = req.params;
        
        await Productos.findByIdAndDelete(idProducto);

        res.status(200).json({ 
            success: true,
            message: 'Producto eliminado exitosamente' 
        });

    }catch(err){
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el producto',
            error: err.message
        });
    }
}



