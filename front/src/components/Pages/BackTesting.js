import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import "../../css/Backtesting.css";

const BackTesting = () => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [coinName, setCoinName] = useState("");
  const [rsi, setRsi] = useState("");
  const [ma, setMa] = useState("");
  const [ema, setEma] = useState("");
  const [term, setTerm] = useState("");
  const [testSize, setTestSize] = useState("");
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 차트 생성
    const chart = createChart(chartContainerRef.current, {
      width: 800,
      height: 400,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });
    chartInstanceRef.current = chart;

    // 선 시리즈 생성
    const lineSeries = chart.addLineSeries();
    lineSeries.setData(
      result && result.length > 0 ? result.map((data) => ({ time: data.time, value: data.close })) : []
    );

    return () => {
      chart.remove();
    };
  }, [result]);

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
      .then((res) => {
        if (Array.isArray(res.data)) {
          setResult(res.data);
        } else {
          setResult([]);
        }
      })
      .catch((err) => console.log(err));

    // 상태 초기화
    setCoinName("");
    setRsi("");
    setMa("");
    setEma("");
    setTerm("");
    setTestSize("");
    setResult([]); // 초기화: 빈 배열로 설정
  };

  const handleCoinChange = (e) => {
    setCoinName(e.target.value);
  };

  const handleParameterClick = () => {
    setShowModal(true);
  };

  const handleModalSave = () => {
    setShowModal(false);
    // Send data to server using axios.post
  };

  const ChartContainer = styled("div")`
    /* CSS 스타일링을 여기에 적용하세요 */
  `;

  const Modal = styled("div")`
    /* CSS 스타일링을 여기에 적용하세요 */
  `;

  return (
    <>
      <form onSubmit={handleSubmit} className="backtesting-form">
        <div>
          <label htmlFor="coinName">Coin Name:</label>
          <FormControl>
            <Select
              id="coinName"
              value={coinName}
              onChange={handleCoinChange}
              displayEmpty
              inputProps={{ "aria-label": "Select Coin" }}
            >
              <MenuItem value="">
                <em>Choose a coin</em>
              </MenuItem>
              <MenuItem value="BTC">BTC</MenuItem>
              <MenuItem value="ETH">ETH</MenuItem>
              <MenuItem value="ETC">ETC</MenuItem>
              <MenuItem value="XRP">XRP</MenuItem>
              <MenuItem value="ADA">ADA</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <label htmlFor="term">Term:</label>
          <TextField
            type="number"
            id="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="testSize">Test Size:</label>
          <TextField
            type="number"
            id="testSize"
            value={testSize}
            onChange={(e) => setTestSize(e.target.value)}
          />
        </div>
        <div>
          <Button type="button" onClick={handleParameterClick}>
            ADD Parameter
          </Button>
        </div>
        <Button type="submit">Start Bot</Button>

          <div>
            <label htmlFor="result">Result</label>
            <ChartContainer ref={chartContainerRef} className="chart-container" />
            {/* <pre>{JSON.stringify(result)}</pre> */}
          </div>
       
      </form>
      {showModal && (
        <Modal>
          <div>
            <h2>Add Parameter</h2>
            <label htmlFor="rsi">RSI:</label>
            <TextField
              type="text"
              id="rsi"
              value={rsi}
              onChange={(e) => setRsi(e.target.value)}
            />
            <label htmlFor="ma">MA:</label>
            <TextField
              type="text"
              id="ma"
              value={ma}
              onChange={(e) => setMa(e.target.value)}
            />
            <label htmlFor="ema">EMA:</label>
            <TextField
              type="text"
              id="ema"
              value={ema}
              onChange={(e) => setEma(e.target.value)}
            />
            <Button type="button" onClick={handleModalSave}>
              Save
            </Button>
            <Button type="button" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </div>
        </Modal>
      )}
      
    </>
  );
};

export default BackTesting;
