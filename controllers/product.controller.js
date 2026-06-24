import fs from 'fs';
import * as productService from '../services/product.service.js';
import * as sfile from '../config/archmulter.js';
import * as modelProduct from '../models/product.model.js';

export const getAllProducts = async (req, res) => {
    console.log("------------controller------------");
    try {
        const products = await productService.getAllProducts();
        console.log("... despues de productService.getAllProducts()");
        res.json(products || []);
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo registros" });
    }
};

export const getProductById = async (req, res) => {
    console.log("------------controller------------");
    console.log("req.params.id: " + req.params.id);
    try {
        let products = await productService.getProductByIdService(req.params.id);
        console.log("... despues de productService.getProductByIdService()");
        res.json(products || {});
    } catch (error) {
        res.status(500).json({ error: "Error obteniendo registro" });
    }
};

export const createProduct = async (req, res) => {
    console.log("------------controller------------");
    const objProduct = req.body;
    console.log(objProduct);
    try {
        let idProduct = await productService.createProductService(objProduct);
        console.log("... despues de productService.createProductService()");
        res.json({ "id_product": idProduct });
    } catch (error) {
        res.status(500).json({ error: "Error ingresando registros" });
    }
};

export const updateProduct = (req, res) => {
    console.log("------------controller------------");
    const objProduct = req.body;
    console.log(objProduct);
    productService.updateProductService(req.params.id, objProduct)
        .then(numRegistros => {
            console.log("... despues de productService.updateProductService()");
            res.json({ "numRegistros": numRegistros });
        })
        .catch(err => {
            res.status(500).json({ error: "Error actualizando registro" });
        });
};

export const deleteProduct = (req, res) => {
    console.log("------------controller------------");
    productService.deleteProductService(req.params.id)
        .then(numRegistros => {
            console.log("... despues de productService.deleteProductService()");
            res.json({ "numRegistros": numRegistros });
        })
        .catch(err => {
            res.status(500).json({ error: "Error eliminando registro" });
        });
};

export const upload = async (req, res) => {
    console.log("------------controller------------");
    try {
        sfile.uploadProduct(req, res);
        console.log("response luego de upload");
    } catch (error) {
        res.status(500).json({ error: "Error actualizando archivo" });
    }
};

export const download = async (req, res) => {
    console.log("------------controller------------");
    console.log("req.params.id: " + req.params.id);
    try {
        let rutaArchivo = await modelProduct.downloadArchivo(req.params.id);
        console.log("... despues de modelProduct.downloadArchivo()");
        if (rutaArchivo && fs.existsSync(rutaArchivo)) {
            res.download(rutaArchivo, 'imagen.jpg', (err) => {
                if (err) {
                    console.error('Error al descargar:', err);
                    res.status(500).send({ error: 'Error al descargar el archivo' });
                }
            });
        } else {
            res.status(404).send({ error: 'Archivo no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error obteniendo archivo" });
    }
};
