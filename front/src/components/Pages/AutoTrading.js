import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../../css/AutoTrading.css'
import { Form, Button } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';

function AutoTrading() {
    const [apiKey, setApiKey] = useState('');
    const [secret, setSecret] = useState('');
    const [symbol, setSymbol] = useState('');
    const [leverage, setLeverage] = useState('');
    const [data, setData] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const resultContainerRef = useRef(null);
    const [chart, setChart] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/AutoTrading/', {
            api_key: apiKey,
            secret: secret,
            symbol: symbol,
            leverage: leverage
            });
            setData([response.data]); // POST 요청 응답 데이터를 배열에 담아 설정합니다.
            console.log(response.data);
          // 시작 버튼을 눌렀을 때 5초마다 자동으로 GET 요청을 보내기 위해 setInterval을 설정합니다.
            const id = setInterval(async () => {
            try {
                const result = await axios.get('http://127.0.0.1:8000/api/AutoTrading/');
                setData(prevData => [...prevData, result.data]); // GET 요청 결과 데이터를 배열에 추가합니다.
                scrollToBottom();
            } catch (error) {
                console.error(error);
            }
            }, 5000);
            setIntervalId(id);
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
      const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
      const price = parseFloat(response.data.price);
      const time = new Date();

      if (chart) {
        chart.data.labels.push(time);
        chart.data.datasets[0].data.push(price);

        if (chart.data.labels.length > 50) {
          chart.data.labels.shift();
          chart.data.datasets[0].data.shift();
        }

        chart.update();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const interval = setInterval(fetchData, 5000);

  return () => {
    clearInterval(interval);
  };
}, [chart]);

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
                    <Form.Control type="text" value={apiKey} onChange={(e)  => setApiKey(e.target.value)} />
                </Form.Group>
    
                <Form.Group controlId="secret">
                    <Form.Label>Secret: </Form.Label>
                    <Form.Control type="text" value={secret} onChange={(e)  => setSecret(e.target.value)} />
                </Form.Group>
    
                <Form.Group controlId="symbol">
                    <Form.Label>Symbol: </Form.Label>
                    <Form.Control type="text" value={symbol} onChange={(e)  => setSymbol(e.target.value)} />
                </Form.Group>
    
                <Form.Group controlId="leverage">
                    <Form.Label>Leverage: </Form.Label>
                    <Form.Control type="text" value={leverage} onChange={(e)    => setLeverage(e.target.value)} />
                </Form.Group>
    
                <Button variant="primary" type="submit" className='btn'>
                    시작
                </Button>
    
                <Button variant="danger" className="btn" onClick={handleStop}   >
                중단
                </Button>
            </Form>
            </div>
            <div className='result'>
            {data.length > 0 ? (
            <div className="result-container" ref={resultContainerRef}>
            <>
            {data.map((result, index) => (
                <div className="autoresult" key={index}>
                <p><strong>Current time:</strong> 
                <span>{result.time}</ span></p>
            <p>
                <strong>Current price:</strong> 
                <span>{result.price}</span>
                </p>
            <p>
                <strong>Current amount:</strong> 
                <span>{result.amount}</span>
            </p>
            <p>
                <strong>Current average price:</strong>{" "}
                <span>{result.average_price}</span>
            </p>
            <p>
                <strong>Current rate of return:</strong>{" "}
                <span>{result.ROE}%</span>
            </p>
            <p>
                <strong>Predict current trend():</strong> 
                <span>{result.pred}</span>
            </p>
            <p>
                <strong>Revenue:</strong> 
                <span>{result.yield}</span>
            </p>
            </div>
        ))}
        </>
        </div>
        ) : (
            <p className="author-result">No data available</p>
        )}
        </div>

        </div>

        <canvas id="chart"></canvas>
    </>
);
}

export default AutoTrading;