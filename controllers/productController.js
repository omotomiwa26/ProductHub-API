const Book = require('../models/productsModel');

// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const product = new Product({ ...req.body, owner: req.user.userId });
    await product.save();
    res.status(200).json({
      status: "Success",
      statusCode: 200,
      message: "Product Added Succesfully",
      product
    });
  } catch (error) {
    console.error("Error Adding Product: ", error);
      res.status(500).json({
        status: "Internal Server Error",
        statusCode: 500,
        message: `Failed To Add Product: ${error.message}`,
      });
  }
};

// List all products with optional filtering
exports.listAllProducts = async (req, res) => {
  const { name, category, price } = req.query; 
  const query = {};

  if (name) query.name = name;
  if (category) query.category = category;
  if (price) query.price = { $gte: price };

  try {
    const products = await Product.find(query).where('owner').equals(req.user.userId);
    res.status(200).json({
      status: "Success",
      statusCode: 200,
      message: "Products Listed Succesfully",
      products
    });
  } catch (error) {
    console.error("Error Listing Products: ", error);
      res.status(500).json({
        status: "Internal Server Error",
        statusCode: 500,
        message: `Failed To List Products: ${error.message}`,
});
}
};
// List a single product by ID
exports.listProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.owner.toString() !== req.user.userId) {
      return res.status(404).json({
        status: "Not Found",
        statusCode: 404, 
        message: 'Product Not Found', 
      });
    }
    res.status(200).json({
      status: "Success",
      statusCode: 200, 
      message: `User Profile Updated Successfully` 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.owner.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Product Not Found' });
    }

    Object.assign(product, req.body); // Update fields with new data
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.owner.toString() !== req.user.userId) {
      return res.status(404).json({ message: 'Product Not Found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: `Product '${product.name}' Deleted Successfully` }); // Use name instead of title
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
