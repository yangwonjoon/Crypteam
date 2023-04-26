import React, { useState } from "react";
import axios from "axios";
import "../../css/Backtesting.css";
import Parameter from "../modal/Parameter.js";

const BackTesting = () => {
  const [coinName, setCoinName] = useState("");
  const [parameter, setParameter] = useState("");
  const [term, setTerm] = useState("");
  const [testSize, setTestSize] = useState("");
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      coin_name: coinName,
      parameter,
      term,
      test_size: testSize,
    };
    const url = "http://127.0.0.1:8000/api/start_bot/";
    axios
      .post(url, formData)
      .then((res) => setResult(JSON.stringify(res.data)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="coinName">Coin Name:</label>
          <input
            type="text"
            id="coinName"
            value={coinName}
            onChange={(e) => setCoinName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button onClick={() => setShowModal(true)}>Show Modal</button>
        </div>

        <div className="form-group">
          <label htmlFor="term">Term:</label>
          <input
            type="number"
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="testSize">Test Size:</label>
          <input
            type="number"
            id="testSize"
            value={testSize}
            onChange={(e) => setTestSize(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Start Bot
        </button>
        <div>
          <pre>{result}</pre>
        </div>
      </form>

      <Parameter
        showModal={showModal}
        onClose={handleModalClose}
        setParameter={setParameter}
      />
    </div>
  );
};

export default BackTesting;
