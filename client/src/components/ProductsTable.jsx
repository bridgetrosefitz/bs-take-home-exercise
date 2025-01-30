import { Card } from ".";

const ProductsTable = ({ products }) => {
  const productCells = products.map(product => (
    <Card classNames="product-card" key={product.id}>
      {product.name}
    </Card>
  ));

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10,
        width: "100%",
      }}
    >
      {productCells}
    </div>
  );
};

export default ProductsTable;
