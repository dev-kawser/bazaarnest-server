require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.euq4zn2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function clientDatabase() {
    try {
        // Send a ping to confirm a successful connection
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        // Ensures that the client will close when you finish/error
        console.error("Failed to connect to MongoDB", err);
    }
}

module.exports = { client, clientDatabase, ObjectId }
