import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../constants";

import { ProductsTable } from "../components";
const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/products`);
        setProducts(response.data);
        console.log("Products loaded:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ProductsTable products={products} />
    </div>
  );
};

export default ProductsPage;
