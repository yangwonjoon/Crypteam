import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../css/AutoTrading.css'
import { Typography, FormControl, MenuItem, Select, Paper, Grid, Box, TextField, Button, Container } from '@mui/material';
// import { Box } from '@mui/material';
import { createChart, CrosshairMode} from 'lightweight-charts';

function AutoTrading() {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null)
    const [apiKey, setApiKey] = useState('');
    const [secret, setSecret] = useState('');
    const [symbol, setSymbol] = useState('');
    const [leverage, setLeverage] = useState('');
    const [data, setData] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const [initData, setInitData] = useState(null);
    const resultContainerRef = useRef(null);
    const candlestickSeriesRef = useRef(null);
      useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
          width: 912,
          height: 400,
          crosshair: {
            mode: CrosshairMode.Normal,
          },
        });
    
        const candlestickSeries = chart.addCandlestickSeries();
        chartRef.current = chart;
        candlestickSeriesRef.current = candlestickSeries;
    
        return () => {
          if (chartRef.current) {
            chartRef.current.remove();
          }
        };
      }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        InitData();
        const id = setInterval(async () => {
            try {
                const result = await axios.get('http://127.0.0.1:8000/api/AutoTrading/');
                setData(prevData => [...prevData, result.data]); // GET 요청 결과 데이터를 배열에 추가합니다.
                scrollToBottom();
                // const obj = JSON.parse(result.data);
                
                const temp = Object.values(result.data);
                const chart_data = temp.slice(7,temp.length);
                // console.log(chart_data[0],chart_data[1],chart_data[2],chart_data[3],chart_data[4]);
                setData(prevData => [...prevData, result.data]);
                scrollToBottom();
                
                const candlestickSeries = candlestickSeriesRef.current;
                console.log(Date.parse(chart_data[0]) / 1000);
                const updatedData = {
                  time: Date.parse(chart_data[0]) / 1000,
                  open: chart_data[1],
                  high: chart_data[2],
                  low: chart_data[3],
                  close: chart_data[4],
                };
                candlestickSeries.update(updatedData);

            } catch (error) {
                console.error(error);
            }
        }, 5000);
        setIntervalId(id);
        
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/AutoTrading/', {
            api_key: apiKey,
            secret: secret,
            symbol: symbol,
            leverage: leverage
        }
        );

        setData([response.data]); // POST 요청 응답 데이터를 배열에 담아 설정합니다.
        console.log("eorror",response.data);
        // 시작 버튼을 눌렀을 때 5초마다 자동으로 GET 요청을 보내기 위해 setInterval을 설정합니다.

    } catch (error) {
        console.log("error");
        console.error(error);
    }
};

const InitData = async (e) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/AutoSetData/', {
      symbol: symbol,
  }
  );
  let obj = response.data;
  const temp = Object.values(obj);
  const transformedData = temp.map((item) => ({
    time: Date.parse(item.time) / 1000,
    open:item.open,
    high:item.high,
    low:item.low,
    close:item.close,
  }));

  console.log(transformedData);
  setInitData(transformedData); // POST 요청 응답 데이터를 배열에 담아 설정합니다.
  const candlestickSeries = candlestickSeriesRef.current;
  candlestickSeries.setData(transformedData);

  // 시작 버튼을 눌렀을 때 5초마다 자동으로 GET 요청을 보내기 위해 setInterval을 설정합니다.

  } catch (error) {
  console.log("error");
  console.error(error);
  }
};

const handleStop = () => {
    clearInterval(intervalId);
};

useEffect(() => {
    return () => {
        clearInterval(intervalId);
    };
}, [intervalId]);

//스크롤 맨 아래로
const scrollToBottom = () => { 
    if (resultContainerRef.current) {
        resultContainerRef.current.scrollTop = resultContainerRef.current.scrollHeight;
    }
};

return (
    <>
    <Grid container spacing={2} sx={{paddingTop:7, display: 'flex', justifyContent: 'center'}} >
        <Grid item xs={1} sm={3} >
        <Paper sx={{ padding: 1 }}>
        <Grid item>
          <Typography variant="h5">     기본설정</Typography>
        </Grid>
          <form onSubmit={handleSubmit} className="autoform">
            <Box sx={{ marginBottom: '20px' }}>
              <label htmlFor="apiKey">API Key:</label>
              <TextField
                type=""
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </Box>

            <Box sx={{ marginBottom: '20px' }}>
              <label htmlFor="secret">Secret:</label>
              <TextField
                type=""
                id="secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
            </Box>

            <Box sx={{ marginBottom: '20px' }}>
              <label htmlFor="symbol">Symbol:</label>
              <TextField
                type=""
                id="symbol"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
              />
            </Box>

            <Box sx={{ marginBottom: '20px' }}>
              <label htmlFor="leverage">Leverage:</label>
              <TextField
                type=""
                id="leverage"
                value={leverage}
                onChange={(e) => setLeverage(e.target.value)}
              />
            </Box>

            <Button variant="contained" color="success" type="submit">
              시작
            </Button>{" "}
            <Button variant="contained" color="success" onClick={handleStop}>
              중단
            </Button>
          </form>
          </Paper>
          </Grid>
        
        
      <Grid item xs={12} sm={7.5}>
      <Paper sx={{ padding: 2 }}>
        <Grid sx={{ marginBottom: '16px' }}>
        <div className='result-container' ref={resultContainerRef}>
        {data.length > 0 ? (
            data.slice(-1).map((result, index) => {
              
              let predText = '';

              // pred 값에 따라 표시할 텍스트를 설정합니다.
              if (result.pred === 0) {
                predText = '매도';
              } else if (result.pred === 1) {
                predText = '매수';
              } else if (result.pred === -1) {
                predText = '관망';
              }

              return(
                <div className='autoresult' key={index}>
                    <p>현재 time: <span>{result.time}</span></p>
                    <p>현재 가격: <span>{result.price}</span></p>
                    <p>현재 수량: <span>{result.amount}</span></p>
                    <p>현재 평단가: <span>{result.average_price}</span></p>
                    <p>현재 수익률: <span>{result.ROE}%</span></p>
                    <p>현재 추세 예측: <span>{predText}</span></p>
                    <p>수익: <span>{result.yeild}</span></p>
                </div>
              );                
          })
        ) : (
            <p className='autoresult'>로딩중…</p>
        )}
        </div>
        </Grid>
        <div ref={chartContainerRef}></div>
      
      </Paper>
      </Grid>
    </Grid>
    </>
);
}

export default AutoTrading;