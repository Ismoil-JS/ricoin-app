import ProductService from "./product.service.js"

class ProductController {
    
    async getProducts(_, res) {
        try {
            const products = await ProductService.getProducts();

            res.status(200).json(products);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await ProductService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async createProduct(req, res) {
        try {
            const product = await ProductService.createProduct(req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const product = await ProductService.updateProduct({
                id: req.params.id,
                ...req.body
            });
            res.status(200).json(product);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const product = await ProductService.deleteProduct(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            res.status(error.status).json({ message: error.message });
        }
    }
}

export default new ProductController();