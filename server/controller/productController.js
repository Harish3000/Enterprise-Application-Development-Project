import Product from "../model/productModel";

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const { productName } = newProduct;

    const productExist = await Product.findOne({ productName });
    if (productExist) {
      return res.status(400).json({ message: "Products already exists." });
    }
    const savedData = await newProduct.save();
    // res.status(200).json(savedData);
    res.status(200).json({ message: "Product created successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllProducts= async (req, res) => {
  try {
    const productData = await Product.find();
    if (!productData || productData.length === 0) {
      return res.status(404).json({ message: "Product data not found." });
    }
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(productExist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(404).json({ message: "Product not found." });
    }
    const updatedData = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    // res.status(200).json(updatedData);
    res.status(200).json({ message: "Product Updated successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(404).json({ message: "Product not found." });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
