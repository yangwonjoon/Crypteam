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
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
            코인동향            
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                {coins.map((coin_name) => (
                     <Typography
                     key={coin_name}
                     sx={{ marginRight: 1, marginBottom: 1, cursor: 'pointer' }}
                     onClick={() => handleCoinClick(coin_name)}
                     >
                     {coin_name}
                     </Typography>
                 ))}
             </Box>                        
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
        
    </div>
  );
}

export default CoinNews;