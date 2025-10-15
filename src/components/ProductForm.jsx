import React, { useState } from "react";
import axios from "axios";

const ProductForm = ({ onNewProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    material: "",
    packaging: "",
    energy: "",
    recyclable: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "https://sustainability-score-calculator-backend.onrender.com/api/products",
        formData
      );
      if (onNewProduct) onNewProduct(response.data);
      setFormData({
        name: "",
        material: "",
        packaging: "",
        energy: "",
        recyclable: false,
      });
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Sustainability Score Calculator</h2>
      <form className="mt-4" style={{ maxWidth: "500px", margin: "auto" }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Material</label>
          <input type="text" className="form-control" name="material" value={formData.material} onChange={handleChange} placeholder="e.g., recycled, plastic, bamboo" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Packaging</label>
          <input type="text" className="form-control" name="packaging" value={formData.packaging} onChange={handleChange} placeholder="e.g., minimal, recyclable, plastic" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Energy Type</label>
          <input type="text" className="form-control" name="energy" value={formData.energy} onChange={handleChange} placeholder="e.g., renewable, non-renewable" required />
        </div>

        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" name="recyclable" checked={formData.recyclable} onChange={handleChange} />
          <label className="form-check-label">Recyclable</label>
        </div>

        <button type="submit" className="btn btn-primary w-100">Calculate Score</button>
      </form>

      {error && <p className="text-danger mt-3 text-center">{error}</p>}
    </div>
  );
};

export default ProductForm;
