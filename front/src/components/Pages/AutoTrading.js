import React, { useState } from 'react';
import axios from 'axios';

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
        <form onSubmit={handleSubmit}>
            <label>
            API Key:
            <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            </label>
            <label>
            Secret:
            <input type="text" value={secret} onChange={(e) => setSecret(e.target.value)} />
            </label>
            <label>
            Symbol:
            <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
            </label>
            <label>
            Leverage:
            <input type="text" value={leverage} onChange={(e) =>  setLeverage(e.target.value)} />
            </label>
            <button type="submit">시작</button>
        </form>

        {data ? (
        <div>
            <p>현재 time: <span>{data.time}</span></p>
            <p>현재 가격: <span>{data.price}</span></p>
            <p>현재 수량: <span>{data.amount}</span></p>
            <p>현재 평단가: <span>{data.average_price}</span></p>
            <p>현재 수익률: <span>{data.ROE}%</span></p>
            <p>현재 추세 예측(): <span>{data.pred}</span></p>
            <p>수익: <span>{data.yeild}</span></p>
        </div>
        ) : (

        <p>로딩중,,</p>
        )}
    
    </>
    );
}

export default AutoTrading;
