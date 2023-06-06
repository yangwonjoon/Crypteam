/*eslint-disable*/
import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { Box } from '@mui/material';

const Chart = () => {
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/Simulate/')
      .then((response) => {
        let obj = response.data;
        const temp = Object.values(obj);
        setData(temp);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      if (!chartInstanceRef.current) {
        chartInstanceRef.current = createChart(chartContainerRef.current, {
          width: 700,
          height: 370,
          crosshair: {
            mode: CrosshairMode.Normal,
          },
        });
      }

      const chart = chartInstanceRef.current;
      const candlestickSeries = chart.addCandlestickSeries();
      candlestickSeries.setData(data);

      const lineSeries = chart.addLineSeries({
        priceLineVisible: false,
        lastValueVisible: false,
        priceLineSource: data[data.length - 1].close,
        priceLineWidth: 1,
      });

      lineSeries.applyOptions({
        priceLineColor: 'rgba(255, 0, 0, 0.8)',
      });

      const redDots = [data[2], data[7]]; // Example: Sell data points
      redDots.forEach((dataPoint) => {
        const series = chart.addLineSeries({
          lineWidth: 0,
          color: 'red',
          priceLineVisible: false,
        });

        series.setData([
          { time: dataPoint.time, value: dataPoint.close },
        ]);

        series.setMarkers([
          {
            time: dataPoint.time,
            position: 'aboveBar',
            shape: 'circle',
            size: 1,
            color: 'red',
            text: 'sell',
          },
        ]);
      });

      const blueDots = [data[5], data[67]]; // Example: Buy data points
      blueDots.forEach((dataPoint) => {
        const series = chart.addLineSeries({
          lineWidth: 0,
          color: 'blue',
          priceLineVisible: false,
        });

        series.setData([
          { time: dataPoint.time, value: dataPoint.close },
        ]);

        series.setMarkers([
          {
            time: dataPoint.time,
            position: 'belowBar',
            shape: 'circle',
            size: 1,
            color: 'blue',
            text: 'buy',
          },
        ]);
      });

      chart.timeScale().fitContent();
    }
  }, [isLoading, data]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Box ref={chartContainerRef} />
      )}
    </Box>
  );
};

export default Chart;
