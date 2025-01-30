import { Card } from ".";

const ProductsTable = ({ products }) => {
  const productCells = products.map(product => (
    <Card key={product.id}>{product.name}</Card>
  ));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
      }}
    >
      {productCells}
    </div>
  );
};

export default ProductsTable;
