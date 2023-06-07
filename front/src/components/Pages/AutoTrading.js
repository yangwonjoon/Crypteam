import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../css/AutoTrading.css'
import { Form, Button } from 'react-bootstrap';
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
    const resultContainerRef = useRef(null);
    const [time, setTime] = useState(0);
    const [open, setOpen] = useState(0);
    const [high, setHigh] = useState(0);
    const [low, setLow] = useState(0);
    const [close, setClose] = useState(0);
    
    const candlestickSeriesRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = setInterval(async () => {
            try {
                const result = await axios.get('http://127.0.0.1:8000/api/AutoTrading/');
                setData(prevData => [...prevData, result.data]); // GET 요청 결과 데이터를 배열에 추가합니다.
                scrollToBottom();
                // const obj = JSON.parse(result.data);
                
                const temp = Object.values(result.data);
                const chart_data = temp.slice(6,temp.length);
                console.log(chart_data[0],chart_data[1],chart_data[2],chart_data[3],chart_data[4]);
                setTime(chart_data[0]);
                setOpen(chart_data[1]);
                setHigh(chart_data[2]);
                setLow(chart_data[3]);
                setClose(chart_data[4]);
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
        console.log(response.data);
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
useEffect(() => {
    const fetchData = async () => {
      try {
            const candlestickSeries = candlestickSeriesRef.current;
            console.log(open,high,low,close,time);
            candlestickSeries.update({
            time : Date.parse(time) / 1000,
            open: open,
            high: high,
            low: low,
            close: close,
          });
        
      } catch (error) {
        console.error(error);
      }
    };

    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 800,
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
//스크롤 맨 아래로
const scrollToBottom = () => { 
    if (resultContainerRef.current) {
        resultContainerRef.current.scrollTop = resultContainerRef.current.scrollHeight;
    }
};

return (
    <>
    <div className='auto-container'>
        <div className='form-container'>
        <Form onSubmit={handleSubmit} className="autoform">
            <Form.Group controlId="apiKey">
                <Form.Label>API Key: </Form.Label>
                <Form.Control type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="secret">
                <Form.Label>Secret: </Form.Label>
                <Form.Control type="text" value={secret} onChange={(e) => setSecret(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="symbol">
                <Form.Label>Symbol: </Form.Label>
                <Form.Control type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="leverage">
                <Form.Label>Leverage: </Form.Label>
                <Form.Control type="text" value={leverage} onChange={(e) => setLeverage(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
                시작
            </Button>
        </Form>
        </div>
        <Button variant="danger" className="autostop" onClick={handleStop}>
            중단
        </Button>

        <div className='result-container' ref={resultContainerRef}>
        {data.length > 0 ? (
            data.map((result, index) => (
                <div className='autoresult' key={index}>
                    <p>현재 time: <span>{result.time}</span></p>
                    <p>현재 가격: <span>{result.price}</span></p>
                    <p>현재 수량: <span>{result.amount}</span></p>
                    <p>현재 평단가: <span>{result.average_price}</span></p>
                    <p>현재 수익률: <span>{result.ROE}%</span></p>
                    <p>현재 추세 예측(): <span>{result.pred}</span></p>
                    <p>수익: <span>{result.yeild}</span></p>
                </div>
            ))
        ) : (
            <p className='autoresult'>로딩중…</p>
        )}
        </div>
    </div>
    <div ref={chartContainerRef}></div>
    </>
);
}

export default AutoTrading;