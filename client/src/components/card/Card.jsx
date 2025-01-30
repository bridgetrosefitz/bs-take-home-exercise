import "./cardStyles.css";

const Card = ({ children }) => {
  return (
    <div
      className="card product-card"
      // style={{ padding: 10, borderRadius: 10, border: "1px solid black" }}
    >
      {children}
    </div>
  );
};

export default Card;
