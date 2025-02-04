import { Card } from "..";
import { Pill } from "..";
import "./productsTableStyles.css";

const ScoreCircle = ({ score }) => {
  return <div className="score-circle">{score}</div>;
};

const ProductsTable = ({ products }) => {
  const productCells = products.map(
    ({ id, name, total_score, characteristics }) => {
      const characteristicsLabels = characteristics.map(
        (characteristic, index) => (
          <Pill key={characteristic + index} styles={{ fontSize: 14 }}>
            {characteristic}
          </Pill>
        )
      );

      return (
        <Card classNames="product-card" key={id}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <h3>{name}</h3>
            <ScoreCircle score={total_score} />
          </div>
          {characteristicsLabels}
        </Card>
      );
    }
  );

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
