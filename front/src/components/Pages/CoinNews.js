/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Box,Grid, Typography, TextField, Paper,Button,TableCell, TableContainer, Table, TableRow } from '@mui/material';
//import NewsItem from '../NewsItem';
// import axios from 'axios';
function CoinNews() {
  const [NewsData, setNewsData] = useState([{
    id:'',
    coin_name:'',
    title:'',
    url:'',
    time:''
  }]);

  // const [searchValue, setSearchValue] = useState('');
  const [selectedCoin, setSelectedCoin] = useState('전체');

  useEffect(() => {
    async function fetchNewsData() {
      const response = await axios.get('http://127.0.0.1:8000/api/news/');
      setNewsData(JSON.parse(response.data));
    }
    fetchNewsData();
  }, []);

  const coins = ['전체', '비트코인', '이더리움', '이더리움 클래식', '리플', '카르다노 에이다'];
  const handleCoinClick = (coin_name) => {
        setSelectedCoin(coin_name);
    };
    // const filteredCoins = NewsData.filter((NewsData) => {
    //     if (selectedCoin === '전체') {
    //         return NewsData.title.toLowerCase().includes(searchValue.toLowerCase());
    //     } else {
    //         return NewsData.coin_name === selectedCoin && NewsData.title.toLowerCase().includes(searchValue.toLowerCase());
    //     }
    // });
    const filteredCoins = NewsData.filter((NewsData)=>{
      if (selectedCoin === '전체') {
        return true;
      } else {
        return NewsData.coin_name === selectedCoin;
      }
    })



  return (
    <div>
      <Grid container spacing={2} sx={{paddingTop:10, display: 'flex', justifyContent: 'center'}} >
      <Grid item xs={1} sm={2} >
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            코인
          </Typography>
          {coins.map((coin_name) => (
            <Typography key={coin_name} sx={{ marginBottom: 1, cursor: 'pointer' }} onClick={() => handleCoinClick(coin_name)}>
              {coin_name}
            </Typography>
          ))}
          {/* 배열 categories순회 map함수는 배열의 각 요소를 함수에 적용하고
          그 결과를 새로운 배열로 반환 . 각 요소를 하나의 typography요소로 변환하고
          생성된 모든 요소를 배열로 반환.
          key 프롭은 배열의 요소를 식별하는 역할, sx프롭은 스타일 지정. */}
        </Paper>
      </Grid>
        <Grid item xs={10} sm={9}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
              코인동향            
          </Typography>
          
          <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="a dense table">
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>No.</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>제목</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>날짜</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', borderBottomWidth: 2 }}>코인</TableCell>
                </TableRow>

                {filteredCoins.map((NewsData) => (
                <TableRow key={NewsData.id}>
                    <TableCell sx={{ borderBottomWidth: 2 }}>{NewsData.id}</TableCell>
                    <TableCell onClick={() => window.open(NewsData.url, '_blank')} sx={{ borderBottomWidth: 2 }}>{NewsData.title}</TableCell>
                    <TableCell sx={{ borderBottomWidth: 2 }}>{NewsData.time}</TableCell>
                    <TableCell sx={{ borderBottomWidth: 2 }}>{NewsData.coin_name}</TableCell>
                </TableRow>
                ))}
              </Table>
              </TableContainer>
            
            </Paper>
        </Grid>
      </Grid>
        
    </div>
  );
}

export default CoinNews;