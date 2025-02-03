import axios from "axios";
const jsonServerUrl = "http://localhost:4000"; // Adjust if necessary

// const scoreContributions = {
//   Humane: 1,
//   "Locally Produced": 1,
//   Healthy: 1,
//   "Plastic-Free": 2,
//   Unhealthy: -1,
//   Wasteful: -1,
// };

const getProducts = async (req, res) => {
  try {
    const filteredResponse = await axios.get(
      `${jsonServerUrl}/products?characteristics[0]=Humane`
    );
    // let filteredProducts = [];
    // if (req.query.characteristic) {
    //   filteredProducts = response.data.filter(product =>
    //     product.characteristics.includes(req.query.characteristic)
    //   );
    // } else {
    //   filteredProducts = response.data;
    // }
    res.send(filteredResponse.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
};

// const getScores = async (_req, res) => {
//   const response = await axios.get(`${jsonServerUrl}/products`);
//   const productScores = response.data.map(product => {
//     const score = product.characteristic.reduce(
//       (acc, curr) => (acc += scoreContributions[curr]),
//       0
//     );

//     return { ...product, score };
//   });
//   res.json(productScores);
// };

// TO DO: Make this case insensitive
// TO DO: Add error handling
// TO DO: Consider whether there are downsides to building filter into getProducts
// TO DO: error handling for if no results with given filter
// TO DO: import filters and make filters dynamic

export default getProducts;
