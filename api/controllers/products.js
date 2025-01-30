import axios from "axios";
const jsonServerUrl = "http://localhost:4000"; // Adjust if necessary

const getProducts = async (req, res) => {
  try {
    const response = await axios.get(`${jsonServerUrl}/products`);
    let filteredProducts = [];
    if (req.query.characteristic) {
      filteredProducts = response.data.filter(product =>
        product.characteristics.includes(req.query.characteristic)
      );
    } else {
      filteredProducts = response.data;
    }
    res.json(filteredProducts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
};

// TO DO: Make this case insensitive
// TO DO: Add error handling
// TO DO: Consider whether there are downsides to building filter into getProducts
// TO DO: error handling for if no results with given filter
// TO DO: import filters and make filters dynamic

export default { getProducts };
