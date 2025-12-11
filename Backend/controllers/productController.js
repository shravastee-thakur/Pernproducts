import { sql } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;

    console.log("fetched products", products);

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in Get All Products", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await sql`
        SELECT * FROM products
        WHERE id=${id}
    `;

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log("Error in Get Product", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, image } = req.body;
    if (!name || !price || !image) {
      return res
        .status(400)
        .json({ success: false, message: "All fileds are required" });
    }

    const newProduct = await sql`
    INSERT INTO products (name, price, image)
    VALUES (${name}, ${price}, ${image})
    RETURNING *
    `;

    console.log("create product", newProduct);

    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log("Error in create Product", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, image } = req.body;

    const updateProduct = await sql`
    UPDATE products
    SET name=${name}, price=${price}, image=${image}
    WHERE id=${id}
    RETURNING *
    `;

    if (updateProduct.length === 0) {
      res.status(404).json({ success: false, message: "Product not found" });
    }

    console.log("update product", updateProduct);

    res.status(200).json({ success: true, data: updateProduct[0] });
  } catch (error) {
    console.log("Error in update Product", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await sql`
        DELETE FROM products 
        WHERE id=${id}
        RETURNING *
    `;

    if (deletedProduct.length === 0) {
      res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.log("Error in delete Product", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
