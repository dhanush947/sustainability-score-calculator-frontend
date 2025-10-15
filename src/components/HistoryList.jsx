import React from "react";
import { motion } from "framer-motion";

const HistoryList = ({ products, onDelete }) => {
  if (!products || products.length === 0) {
    return <div className="text-center text-muted mt-4">No sustainability data recorded yet.</div>;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="container mt-5">
      <h4 className="text-center mb-3 fw-bold">Sustainability History</h4>
      <div className="table-responsive shadow-sm rounded-3">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-success">
            <tr>
              <th>Product</th>
              <th>Material</th>
              <th>Packaging</th>
              <th>Energy</th>
              <th>Recyclable</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <motion.tr key={item.id || index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.1 }}>
                <td>{item.name}</td>
                <td>{item.material}</td>
                <td>{item.packaging}</td>
                <td>{item.energy}</td>
                <td>{item.recyclable ? "✅" : "❌"}</td>
                <td><strong>{item.score}</strong></td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => onDelete(item.id)}>Delete</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default HistoryList;
