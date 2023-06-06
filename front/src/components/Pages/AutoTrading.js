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
        {/* 폼 컨트롤들... */}
        <Button variant="primary" type="submit">
          시작
        </Button>
      </Form>

      {data ? (
        <div className='autoresult'>
          {/* 결과 값들... */}
        </div>
      ) : (
        <p className='autoresult'>로딩중,,</p>
      )}

      {/* 중단 버튼 */}
      <Button variant="danger" onClick={handleStop}>
        중단
      </Button>
    </>
  );
}

export default AutoTrading;
