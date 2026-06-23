import * as modelProduct from "../models/product.model.js";

export const getAllProducts = async () => {
    console.log("------------service------------");
    const results = await modelProduct.getAllProducts();
    return results;
};

export const getProductByIdService = async (id_product) => {
    console.log("------------service------------");
    const results = await modelProduct.getProductById(id_product);
    return results;
};

export const createProductService = async (objProduct, id_category) => {
    console.log("------------service------------");
    const result = await modelProduct.createProduct(objProduct, id_category);
    return result;
};

export const updateProductService = async (id_product, objProduct) => {
    console.log("------------service------------");
    const result = await modelProduct.updateProduct(id_product, objProduct);
    return result;
};

export const deleteProductService = async (id_product) => {
    console.log("------------service------------");
    const result = await modelProduct.deleteProduct(id_product);
    return result;
};