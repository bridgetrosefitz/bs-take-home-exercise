import "./pillStyles.css";

const Pill = ({ children, classNames }) => {
  return <div className={`pill ${classNames}`}>{children}</div>;
};

export default Pill;
