import { Card } from "..";
import { Pill } from "..";
import "./productsTableStyles.css";

const ScoreCircle = ({ score, classNames }) => {
  return (
    <div className={`score-circle ${classNames}`}>
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
          <div className="vertical-spaced-container">
            <div className="header-section">
              <h3>{name}</h3>
              <ScoreCircle
                score={total_score}
                classNames={
                  total_score > 0 ? "positive-score" : "negative-score"
                }
              />
            </div>
            {characteristicsLabels}
          </div>
        </Card>
      );
    }
  );

  return <div id="product-cards-container">{productCells}</div>;
};

export default ProductsTable;
