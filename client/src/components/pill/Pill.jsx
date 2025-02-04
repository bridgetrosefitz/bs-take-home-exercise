import "./pillStyles.css";

const Pill = ({ children, styles }) => {
  return (
    <div className="pill" style={{ ...styles }}>
      {children}
    </div>
  );
};

export default Pill;
