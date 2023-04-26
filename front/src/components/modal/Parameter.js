import React, { useState } from "react";
import "../../css/Parameter.css";

const Parameter = ({ showModal, onClose, setParameter }) => {
  const [parameter1, setParameter1] = useState("");
  const [parameter2, setParameter2] = useState("");
  const [parameter3, setParameter3] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    const parameters = [parameter1, parameter2, parameter3].filter(
      (p) => p.trim() !== ""
    );
    setParameter(parameters.join(", "));
    onClose();
  };

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Set Parameters</h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="parameter1">rsi :</label>
            <input
              type="text"
              id="parameter1"
              value={parameter1}
              onChange={(e) => setParameter1(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="parameter2">ma :</label>
            <input
              type="text"
              id="parameter2"
              value={parameter2}
              onChange={(e) => setParameter2(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="parameter3">rsi :</label>
            <input
              type="text"
              id="parameter3"
              value={parameter3}
              onChange={(e) => setParameter3(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Parameters
          </button>
        </form>
      </div>
    </div>
  );
};

export default Parameter;
