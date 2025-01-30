import axios from "axios";
const jsonServerUrl = "http://localhost:4000"; // Adjust if necessary

const getProducts = async (req, res) => {
  try {
    const response = await axios.get(`${jsonServerUrl}/products`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
};

const getFilteredProducts = async (req, res) => {
  const response = await axios.get(`${jsonServerUrl}/products`);
  const filteredProducts = response.data.filter(product =>
    product.characteristics.includes(req.query.characteristic)
  );
  res.json(filteredProducts);
};
// TO DO: Make this case insensitive
// TO DO: Add error handling
// TO DO: Consider whether there are downsides to building filter into getProducts

export default { getProducts, getFilteredProducts };
