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