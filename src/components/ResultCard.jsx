import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ResultCard = ({ product }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < product.score) {
        current += 1;
        setProgress(current);
      } else clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, [product.score]);

  const getRemark = (score) => {
    if (score >= 80) return "Excellent Sustainability 🌱";
    if (score >= 50) return "Moderate Sustainability ♻️";
    return "Low Sustainability ⚠️";
  };

  const getGradient = (score) => {
    if (score >= 80) return "linear-gradient(90deg, #00c851, #007e33)";
    if (score >= 50) return "linear-gradient(90deg, #ffbb33, #ff8800)";
    return "linear-gradient(90deg, #ff4444, #cc0000)";
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="card mt-4 mx-auto shadow-lg border-0" style={{ maxWidth: "500px", borderRadius: "16px" }}>
      <div className="card-body text-center">
        <h4 className="card-title mb-3">{product.name}</h4>
        <h5 className="text-muted mb-3">Sustainability Score</h5>
        <div className="progress mb-3" style={{ height: "22px", borderRadius: "12px", background: "#e9ecef", overflow: "hidden" }}>
          <div className="progress-bar" role="progressbar" style={{ width: `${progress}%`, background: getGradient(product.score), transition: "width 0.3s ease-in-out" }}></div>
        </div>
        <h5 className="fw-bold">{progress}/100</h5>
        <p className="mt-2 fs-6">{getRemark(product.score)}</p>
      </div>
    </motion.div>
  );
};

export default ResultCard;
