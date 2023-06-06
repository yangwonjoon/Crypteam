import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/AutoTrading.css'
import { Form, Button } from 'react-bootstrap';

function AutoTrading() {
    const [apiKey, setApiKey] = useState('');
    const [secret, setSecret] = useState('');
    const [symbol, setSymbol] = useState('');
    const [leverage, setLeverage] = useState('');
    const [data, setData] = useState(null);
    const [intervalId, setIntervalId] = useState(null);

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/AutoTradingView/', {
        api_key: apiKey,
        secret: secret,
        symbol: symbol,
        leverage: leverage
        });

        setData(response.data);

        // 시작 버튼을 눌렀을 때 5초마다 자동으로 GET 요청을 보내기 위해 setInterval을 설정합니다.
        const id = setInterval(async () => {
            const result = await axios.get('http://127.0.0.1:8000/api/AutoTradingResult/');
            setData(result.data);
        }, 5000);
        setIntervalId(id);
    } catch (error) {
        console.error(error);
    }
    };

    const handleStop = () => {
    // 중단 버튼을 눌렀을 때 setInterval을 중지합니다.
    clearInterval(intervalId);
    };

    useEffect(() => {
        return () => {
        // 컴포넌트가 언마운트될 때 setInterval을 정리합니다.
        clearInterval(intervalId);
    };
    }, [intervalId]);

    return (
    <>
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
        <Button variant="danger" className="autostop" onClick={handleStop}>
            중단
        </Button>

        {data ? (
            <div className='autoresult'>
                <p>현재 time: <span>{data.time}</span></p>
                <p>현재 가격: <span>{data.price}</span></p>
                <p>현재 수량: <span>{data.amount}</span></p>
                <p>현재 평단가: <span>{data.average_price}</span></p>
                <p>현재 수익률: <span>{data.ROE}%</span></p>
                <p>현재 추세 예측(): <span>{data.pred}</span></p>
                <p>수익: <span>{data.yeild}</span></p>
            </div>
        ) : (
            <p className='autoresult'>로딩중,,</p>
        )}
    </>
    );
}

export default AutoTrading;
