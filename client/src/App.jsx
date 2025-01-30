import React from "react";
import { ProductsPage } from "./pages";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      {/* <header className="header">
        <h1>Product Compass</h1>
      </header>
      <div className="setup-message">
        ✅ If you're seeing the list of products below, everything is up and running!
      </div>
      <div>
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <h3>{product.name}</h3>
            {product.characteristics.map((char, charIndex) => (
              <span key={charIndex} className="characteristic-tag">
                {char}
              </span>
            ))}
          </div>
        ))}
      </div> */}
      <ProductsPage />
    </div>
  );
};

export default App;
