const { client, ObjectId } = require("../config/database")
const offerProductsCollection = client.db("bazaarNestDB").collection("offerProducts");

// Post a new offer product
exports.addOfferProduct = async (req, res) => {
    const offerProduct = req.body;

    if (!offerProduct) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const result = await offerProductsCollection.insertOne(offerProduct);

        res.status(201).json({
            message: "Offer product added successfully",
            productId: result.insertedId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding offer product" });
    }
};

// get all offer products
exports.getAllOfferProducts = async (req, res) => {
    try {
        const offerProducts = await offerProductsCollection.find().toArray();
        res.status(200).json(offerProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching offer products" });
    }
};

// get offer product by id
exports.getOfferProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const offerProduct = await offerProductsCollection.findOne({ _id: new ObjectId(id) });

        if (!offerProduct) {
            return res.status(404).json({ message: "Offer product not found" });
        }

        res.status(200).json(offerProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching offer product" });
    }
};

// delete product by ID
exports.deleteOfferProductById = async (req, res) => {
    const productId = req.params.id;

    try {
        const result = await offerProductsCollection.deleteOne({ _id: new ObjectId(productId) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Offer Product not found" });
        }

        res.status(200).json({ message: "Offer Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product" });
    }
};

// update product by ID
exports.updateOfferProductById = async (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    if (!updatedProduct) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Exclude the `_id` field to prevent modification
        const { _id, ...fieldsToUpdate } = updatedProduct;

        const result = await offerProductsCollection.updateOne(
            { _id: new ObjectId(productId) },
            { $set: fieldsToUpdate }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Offer Product not found or no changes made" });
        }

        res.status(200).json({ message: "Offer Product updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating product" });
    }
};