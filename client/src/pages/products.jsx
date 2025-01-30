import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../constants";
import ClipLoader from "react-spinners/ClipLoader";
import { ProductsTable } from "../components";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/products`);
        setProducts(response.data);
        console.log("Products loaded:", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="products-container">
        {isLoading ? (
          <ClipLoader
            color="gray"
            loading={isLoading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <ProductsTable products={products} />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
