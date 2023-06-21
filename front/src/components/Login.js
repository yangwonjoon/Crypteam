/*eslint-disable*/
import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import api from '../apis/axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const JWT_EXPIRY_TIME = 1800 * 1000 // 만료시간 30분 (밀리초로 표현)
  let count = 0;

  const handleUserEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function onSilentRefresh() {
    api.post('auth/refresh', {
      refresh: sessionStorage.getItem('refresh')
    }).then(handleSubmit).catch(function (err) {
      console.log(err)
    })
  }

  function onLoginSuccess(res) {
    const access = res.data.token.access;
    const refresh = res.data.token.refresh;
    if (count === 0) {  
      navigate('/main')
      count++;
    }
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
    api.defaults.headers.common['Authorization'] = `Bearer ${access}`
    sessionStorage.setItem('token', access);
    sessionStorage.setItem('refresh', refresh);
    //sessionStorage.setItem('nickname', `${res.data.user.nickname}`)
    sessionStorage.setItem('email', `${res.data.user.email}`)
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    api.post('auth/',{
      email: `${email}`,
      password: `${password}`
    }).then(onLoginSuccess)
    .catch(function (res) {
      
    })
  };

  return (
    <Paper variant="outlined" sx={{width: '90%', maxWidth: '500px', margin: '0 auto', padding: '20px' ,mt:10 }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Log In
        </Typography>
        <TextField
          label="EMAIL"
          variant="outlined"
          value={email}
          onChange={handleUserEmailChange}
          sx={{ mb: 2}}
        />
        <TextField

          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="success" type="submit" onClick={handleSubmit} sx={{ mb: 2 }}>
          로그인
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;