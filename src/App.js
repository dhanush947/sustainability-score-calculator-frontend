import React, { useState, useEffect } from "react";
import ProductForm from "./components/ProductForm";
import ResultCard from "./components/ResultCard";
import HistoryList from "./components/HistoryList";
import axios from "axios";
import './styles.css';

function App() {
  const [latestProduct, setLatestProduct] = useState(null);
  const [products, setProducts] = useState([]);

  // Load products from backend
  useEffect(() => {
    axios
      .get("https://sustainability-score-calculator-backend.onrender.com/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Delete product
  const handleDelete = (id) => {
    axios
      .delete(`https://sustainability-score-calculator-backend.onrender.com/${id}`)
      .then(() => setProducts((prev) => prev.filter((p) => p.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <ProductForm
        onNewProduct={(product) => {
          setLatestProduct(product);
          setProducts((prev) => [...prev, product]);
        }}
      />

      {latestProduct && <ResultCard product={latestProduct} />}

      <HistoryList products={products} onDelete={handleDelete} />
    </div>
  );
}

export default App;
