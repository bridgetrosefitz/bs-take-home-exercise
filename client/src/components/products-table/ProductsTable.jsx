import { Card } from "..";
import { Pill } from "..";
import "./productsTableStyles.css";

const ScoreCircle = ({ score, styles }) => {
  return (
    <div className="score-circle" style={{ ...styles }}>
      <p>{score}</p>
    </div>
  );
};

const ProductsTable = ({ products }) => {
  const productCells = products.map(
    ({ id, name, total_score, characteristics }) => {
      const characteristicsLabels = (
        <div>
          {characteristics.map((characteristic, index) => (
            <Pill key={characteristic + index}>{characteristic}</Pill>
          ))}
        </div>
      );

      return (
        <Card classNames="product-card" key={id}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <h3>{name}</h3>
              <ScoreCircle
                score={total_score}
                styles={{
                  fontSize: 14,
                  // backgroundColor: total_score > 0 ? "green" : "red",
                  backgroundColor:
                    total_score > 0
                      ? "rgba(0, 128, 0, 0.5)"
                      : "rgba(255, 0, 0, 0.5)",
                }}
              />
            </div>
            {characteristicsLabels}
          </div>
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
