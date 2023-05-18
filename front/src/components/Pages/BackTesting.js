import axios from "axios";

import React, {useState} from "react";
import '../../css/Backtesting.css'


const BackTesting = () => {
  const [coinName, setCoinName] = useState("");
  const [rsi, setRsi] = useState("");
  const [ma, setMa] = useState("");
  const [ema, setEma] = useState("");
  const [term, setTerm] = useState("");
  const [testSize, setTestSize] = useState("");
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      coin_name: coinName,
      parameter: { rsi, ma, ema },
      term,
      test_size: testSize,
    };
    const url = "http://127.0.0.1:8000/api/start_bot/";
    axios
      .post(url, formData)
      .then((res) => setResult(JSON.stringify(res.data)))
      .catch((err) => console.log(err));
  };

  const handleParameterClick = () => {
    setShowModal(true);
  };

  const handleModalSave = () => {
    setShowModal(false);
    // Send data to server using axios.post
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="backtesting-form">
        <div>
          <label htmlFor="coinName">Coin Name:</label>
          <input
            type="text"
            id="coinName"
            value={coinName}
            onChange={(e) => setCoinName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="term">Term:</label>
          <input
            type="number"
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="testSize">Test Size:</label>
          <input
            type="number"
            id="testSize"
            value={testSize}
            onChange={(e) => setTestSize(e.target.value)}
          />
        </div>
        <div>
          <button type="button" onClick={handleParameterClick}>
            ADD Parameter
          </button>
        </div>
        <button type="submit">Start Bot</button>
        <div className="result-container">
          <label htmlFor="result">Result</label>
          <pre>{result}</pre>
        </div>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Parameter</h2>
            <label htmlFor="rsi">RSI:</label>
            <input
              type="text"
              id="rsi"
              value={rsi}
              onChange={(e) => setRsi(e.target.value)}
            />
            <label htmlFor="ma">MA:</label>
            <input
              type="text"
              id="ma"
              value={ma}
              onChange={(e) => setMa(e.target.value)}
            />
            <label htmlFor="ema">EMA:</label>
            <input
              type="text"
              id="ema"
              value={ema}
              onChange={(e) => setEma(e.target.value)}
            />
            <button type="button" onClick={handleModalSave}>
              Save
            </button>
            <button type="button" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
};

export default BackTesting;