import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import {Backdrop, Paper, Grid, Modal, Button, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../../css/Backtesting.css";
import { Box } from '@mui/material';

const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled('div')`
  background-color: #fff;
  padding: 60px;
  outline: none;
  width: 180px;
`;

const BackTesting = () => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [coinName, setCoinName] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [rsi, setRsi] = useState("");
  const [ma, setMa] = useState("");
  const [ema, setEma] = useState("");
  const [term, setTerm] = useState("");
  //const [testSize, setTestSize] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [result, setResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [sell, setsell] = useState(null);
  const [buy, setbuy] = useState(null);
  useEffect(() => {
    // 차트 생성
    const chart = createChart(chartContainerRef.current, {
      width: 700,
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
  useEffect(() => {
    if (!isLoading && data) {
      if (!chartInstanceRef.current) {
        chartInstanceRef.current = createChart(chartContainerRef.current, {
          width: 700,
          height: 370,
          crosshair: {
            mode: CrosshairMode.Normal,
          },
        });
      }

      const chart = chartInstanceRef.current;
      const candlestickSeries = chart.addCandlestickSeries();
      // console.log(data);
      candlestickSeries.setData(data);

      const lineSeries = chart.addLineSeries({
        priceLineVisible: false,
        lastValueVisible: false,
        priceLineSource: data[data.length - 1].close,
        priceLineWidth: 1,
      });

      lineSeries.applyOptions({
        priceLineColor: 'rgba(255, 0, 0, 0.8)',
      }); 

      const redDots = []; // Example: Sell data points
      for(var key in sell){
        redDots.push(data[parseInt(key)]);
      }
      redDots.forEach((dataPoint) => {
        const series = chart.addLineSeries({
          lineWidth: 0,
          color: 'red',
          priceLineVisible: false,
        });

        series.setData([
          { time: dataPoint.time, value: dataPoint.close },
        ]);

        series.setMarkers([
          {
            time: dataPoint.time,
            position: 'aboveBar',
            shape: 'circle',
            size: 1,
            color: 'red',
            text: 'sell',
          },
        ]);
      });

      const blueDots = []; // Example: Buy data points
      for(var key in buy){
        blueDots.push(data[parseInt(key)]);
      }
      blueDots.forEach((dataPoint) => {
        const series = chart.addLineSeries({
          lineWidth: 0,
          color: 'blue',
          priceLineVisible: false,
        });

        series.setData([
          { time: dataPoint.time, value: dataPoint.close },
        ]);

        series.setMarkers([
          {
            time: dataPoint.time,
            position: 'belowBar',
            shape: 'circle',
            size: 1,
            color: 'blue',
            text: 'buy',
          },
        ]);
      });

      chart.timeScale().fitContent();
    }
  }, [isLoading, data]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      coin_name: coinName,
      timeFrame : timeFrame,
      parameter: { rsi, ma, ema },
      term,
      start_date: startDate,
      // test_size: testSize,
    };
    const url = "http://127.0.0.1:8000/api/start_bot/";
    axios.post(url, formData)
      .then((res) => {
        const obj = JSON.parse(res.data);
        const temp = Object.values(obj);
        const chart_data = temp.slice(0,temp.length-3);
        setsell(temp[temp.length-3]);
        setbuy(temp[temp.length-2]);
        setResult(temp[temp.length-1]);
          const transformedData = chart_data.map((item) => ({
            time: Date.parse(item.time) / 1000,
            open:item.open,
            high:item.high,
            low:item.low,
            close:item.close,}));

          setData(transformedData);
          setIsLoading(false);
          // setResult(info_data[2]);
      })
      .catch((err) => {console.log(err);setIsLoading(false);});

    // 상태 초기화
    setCoinName("");
    setTimeFrame("");
    setRsi("");
    setMa("");
    setEma("");
    setTerm("");
    setStartDate("");
    //setTestSize("");
    setResult([]); // 초기화: 빈 배열로 설정
  };

  const handleCoinChange = (e) => {
    setCoinName(e.target.value);
  };

  const handleTimeframeChange = (e) => {
    setTimeFrame(e.target.value);
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




  return (
    <>
      <Grid container spacing={2} sx={{ paddingTop: 10, display: 'flex', justifyContent: 'center' }}>
        <Grid item xs={12} sm={10}>
          <Paper sx={{ padding: 2 }}>
            <Grid item>
              <Typography variant="h5">백테스팅</Typography>
            </Grid>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label htmlFor="coinName">코인 이름:</label>
                <FormControl>
                  <Select
                    id="coinName"
                    value={coinName}
                    onChange={handleCoinChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Select Coin" }}
                    style={{ width: "200px" }}
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
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label htmlFor="timeframe">분봉 선택:</label>
                <FormControl>
                  <Select
                    id="timeframe"
                    value={timeFrame}
                    onChange={handleTimeframeChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Timeframe" }}
                    style={{ width: "200px" }}
                  >
                    <MenuItem value="">
                      <em>Choose timeframe</em>
                    </MenuItem>
                    <MenuItem value="1m">1분</MenuItem>
                    <MenuItem value="3m">3분</MenuItem>
                    <MenuItem value="5m">5분</MenuItem>
                    <MenuItem value="15m">15분</MenuItem>
                    <MenuItem value="30m">30분</MenuItem>
                    <MenuItem value="1h">1시간</MenuItem>
                    <MenuItem value="4h">4시간</MenuItem>
                    <MenuItem value="1d">1일</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label htmlFor="term">기간:</label>
                <TextField
                  type=""
                  id="term"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  style={{ width: "200px" }}
                />
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label htmlFor="startDate">시작 날짜:</label>
                <DatePicker
                  id="startDate"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="날짜 선택"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Button type="button" variant="contained" color="success" onClick={handleParameterClick}>
                    ADD Parameter
                  </Button>
                  </div>
                  <div>
                  <Button type="submit" variant="contained" color="success">
                    Start Bot
                  </Button>
                </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "8px" }}>
                
              </div>
            </form>
            
            <Paper sx={{ padding: 2 ,marginTop: "26px"}}>
            <div>
              <label htmlFor="result">Result</label>
              <ChartContainer ref={chartContainerRef}  />
              {/* <pre>{JSON.stringify(result)}</pre> */}
            </div>
            </Paper>

            <StyledModal open={showModal} onClose={() => setShowModal(false)}>
              <ModalContent>
                <h2>Add Parameter</h2>
                <label htmlFor="rsi">RSI:</label>
                <TextField sx={{ marginBottom: '20px' }}
                  type=""
                  id="rsi"
                  value={rsi}
                  onChange={(e) => setRsi(e.target.value)}
                />
                <label htmlFor="ma">MA:</label>
                <TextField sx={{ marginBottom: '20px' }}
                  type=""
                  id="ma"
                  value={ma}
                  onChange={(e) => setMa(e.target.value)}
                />
                <label htmlFor="ema">EMA:</label>
                <TextField sx={{ marginBottom: '20px' }}
                  type=""
                  id="ema"
                  value={ema}
                  onChange={(e) => setEma(e.target.value)}
                />
                <Button type="button" variant="contained" color="success" onClick={handleModalSave}>
                  Save
                </Button>{" "}
                <Button type="button" variant="contained" color="success" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </ModalContent>
            </StyledModal>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100vh"
            >
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <Box ref={chartContainerRef} />
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default BackTesting;