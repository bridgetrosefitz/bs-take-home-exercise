import "./cardStyles.css";

const Card = ({ children, classNames }) => {
  return (
    <div
      className={`card ${classNames}`}
      // style={{ padding: 10, borderRadius: 10, border: "1px solid black" }}
    >
      {children}
    </div>
  );
};

export default Card;
