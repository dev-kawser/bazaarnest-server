const { client, ObjectId } = require("../config/database")
const productsCollection = client.db("hektoDB").collection("products");