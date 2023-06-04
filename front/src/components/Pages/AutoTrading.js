import React, { useState } from 'react';
import axios from 'axios';
import '../../css/AutoTrading.css'
import {Form,Button} from 'react-bootstrap';

function AutoTrading() {

    const [apiKey, setApiKey] = useState('');
    const [secret, setSecret] = useState('');
    const [symbol, setSymbol] = useState('');
    const [leverage, setLeverage] = useState('');
    const [data, setData] = useState(null);

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
        } catch (error) {

        console.error('error');
    }
    };

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
