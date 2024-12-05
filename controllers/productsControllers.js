const { client, ObjectId } = require("../config/database")
const productsCollection = client.db("bazaarNestDB").collection("products");


// Post a new product
exports.addProduct = async (req, res) => {
    const product = req.body;

    if (!product) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const result = await productsCollection.insertOne(product);

        res.status(201).json({
            message: "Product added successfully",
            productId: result.insertedId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding product" });
    }
};

// get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await productsCollection.find().toArray();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
};

// get product by ID
exports.getProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await productsCollection.findOne({ _id: new ObjectId(productId) });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product" });
    }
};

// update product by ID
exports.updateProductById = async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    if (!updatedProduct) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Exclude the `_id` field to prevent modification
        const { _id, ...fieldsToUpdate } = updatedProduct;

        const result = await productsCollection.updateOne(
            { _id: new ObjectId(productId) },
            { $set: fieldsToUpdate }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Product not found or no changes made" });
        }

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product" });
    }
};

// delete product by ID
exports.deleteProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await productsCollection.deleteOne({ _id: new ObjectId(productId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product" });
    }
};