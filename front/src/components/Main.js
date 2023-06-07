/*eslint-disable*/
import React from 'react';
import { Typography, Button, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div style={{ padding: '16px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper style={{ padding: '16px' }}>
            <Typography variant="h4" align="center" gutterBottom>
              C.M.T
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Coin Cryptocurrency Trading
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Button component={Link} to="/login" variant="contained" color="success" size="large">
                  로그인
                </Button>
              </Grid>
              <Grid item>
                <Button component={Link} to="/signup" variant="outlined" color="success" size="large">
                  회원가입
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} >
          <Paper style={{ padding: '16px' }}>
            <Typography variant="h5" gutterBottom>
            딥러닝을 이용한 자동매매 플랫폼
            </Typography>
            <Typography variant="body1" gutterBottom>
              플랫폼에 대한 소개나 간단한 정보를 제공
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
