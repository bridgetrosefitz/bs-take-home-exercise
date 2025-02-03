import axios from "axios";
const jsonServerUrl = "http://localhost:4000"; // Adjust if necessary

const getProducts = async (req, res) => {
  try {
    const response = await axios.get(
      `${jsonServerUrl}/products?characteristics[0]=Humane`
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
};

export default getProducts;
