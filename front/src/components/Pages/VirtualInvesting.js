/*eslint-disable*/
import axios from 'axios';
import React, { useRef, useEffect,useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { Box } from '@mui/material';

const Chart = () => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/Simulate/')
      .then((response) => {
        let obj = response.data;
        const temp = Object.values(obj);
        console.log(temp);
        setData(temp);
    if (!chartInstanceRef.current) {
      chartInstanceRef.current = createChart(chartContainerRef.current, {
        width: 700,
        height: 370,
        //배경 검정색할려면
        // layout: {
        //   background: {
        //           type: 'solid',
        //           color: '#000000',
        //       },
        //   textColor: 'rgba(255, 255, 255, 0.9)',
        // },
        
        crosshair: {
          mode: CrosshairMode.Normal,
        },
      });
    }
    //차트 가져옴
    const chart = chartInstanceRef.current;

    // 캔들스틱 시리즈를 차트에 추가
    const candlestickSeries = chart.addCandlestickSeries();


    candlestickSeries.setData(data);

    const lineSeries = chart.addLineSeries({
      priceLineVisible: false,
      lastValueVisible: false,
      priceLineSource: data[data.length - 1].close,
      priceLineWidth: 1,
    });

    // Customize the price line color
    lineSeries.applyOptions({
      priceLineColor: 'rgba(255, 0, 0, 0.8)',
    });

    




    // 예시 sell 데이터 point로 표시
    const redDots = [data[2], data[7]]; // Example
    redDots.forEach((dataPoint) => {
      // Add a line series with a marker
      const series = chart.addLineSeries({
        lineWidth: 0,
        color: 'red',
        priceLineVisible: false,
      });

      // Add the data point as a marker
      series.setData([
        { time: dataPoint.time, value: dataPoint.close },
      ]);

      // Customize the marker style
      series.setMarkers([
        {
          time: dataPoint.time,
          position: 'aboveBar',
          shape: 'circle',
          size: 1,
          color: 'red',
          text:'sell',
        },
      ]);

      
    });

    //buy데이터 예시
    const blueDots = [data[5], data[67]]; // Example: Data points at index 2 and 4
    blueDots.forEach((dataPoint) => {
      // Add a line series with a marker
      const series = chart.addLineSeries({
        lineWidth: 0,
        color: 'blue',
        
        priceLineVisible: false,
      });

      // Add the data point as a marker
      series.setData([
        { time: dataPoint.time, value: dataPoint.close },
      ]);


      // 파란색 점 표시
      series.setMarkers([
        {
          time: dataPoint.time,
          position: 'belowBar',
          shape: 'circle',
          size: 1,
          color: 'blue',
          text:'buy',
        },
      ]);
    });

    // 차트의 축을 자동으로 조정하여 확대,축소 가능하도록
    chart.timeScale().fitContent();
  })
  .catch(error => {
    console.error(error);
  });
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      <Box ref={chartContainerRef} />
    </Box>
  );
};

export default Chart;