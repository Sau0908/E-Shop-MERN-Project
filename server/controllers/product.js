import Product from "../models/product.js";
import { toSlug } from "../utils/helper.js";
import { uploadImageToCloudinary } from "../utils/fileUpload.js";

export const createProduct = async (req, res) => {
  try {
    const { productName, description, price, category, quantity } = req.body;
    const slug = toSlug(productName);
    const file = req.file;

    const imageUrl = await uploadImageToCloudinary(file);

    const product = new Product({
      productName,
      description,
      price,
      category,
      quantity,
      slug,
      image: imageUrl,
    });
    const resp = await product.save();

    res.status(201).json(resp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productName, description, price, category, quantity } = req.body;
    const file = req.file;

    let updatedFields = { productName, description, price, category, quantity };

    if (file) {
      const imageUrl = await uploadImageToCloudinary(file);
      updatedFields.image = imageUrl;
    }

    if (productName) {
      updatedFields.slug = toSlug(productName);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
