const { client, ObjectId } = require("../config/database")
const blogsCollection = client.db("bazaarNestDB").collection("blogs");

// get all blog
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogsCollection.find().toArray();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get blog by id
exports.getBlogById = async (req, res) => {
    const id = req.params.id;
    try {
        const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });
        if (blog) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};