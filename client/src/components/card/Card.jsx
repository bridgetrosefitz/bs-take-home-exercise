import "./cardStyles.css";

const Card = ({ children, classNames }) => {
  return <div className={`card ${classNames}`}>{children}</div>;
};

export default Card;
