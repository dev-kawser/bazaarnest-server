const { client, ObjectId } = require("../config/database")
const offerProductsCollection = client.db("hektoDB").collection("offerProducts");

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