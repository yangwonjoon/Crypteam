/*eslint-disable*/
import React from 'react';
import { AppBar, Toolbar, Typography, Button,Box } from '@mui/material';
import { Route, Link } from 'react-router-dom';
import Login from "./Login.js";
import SignUp from "./SignUp.js";

const Navibar = () => {
  return (
    <AppBar sx={{ backgroundColor: '#2E581F' }} position="sticky">
      <Toolbar>
      <Typography sx={{ flexGrow: 1}}>
          <Button color="inherit" component={Link} to="/main">C.M.T</Button>
      </Typography>
      <Typography sx={{ flexGrow: 0.8}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* <Button color="inherit" component={Link} to="/createmodel" >모델생성</Button> */}
          <Button color="inherit" component={Link} to="/backtesting" >백테스팅</Button>
          <Button color="inherit" component={Link} to="/virtualinvest" >모의투자</Button>
          <Button color="inherit" component={Link} to="/autotrading" >실전자동매매</Button>
          <Button color="inherit" component={Link} to="/coinnews" >코인동향</Button>
          <Button color="inherit" component={Link} to="/notice" >공지사항</Button>
        </div>
      </Typography>
      <Typography align="right">
        <div>
          <Button component={Link} to="/Login" color="inherit" sx={{ ml: 'auto' }}>로그인</Button>
          <Button component={Link} to="/signup" color="inherit">회원가입</Button>
        </div>
      </Typography>
        
        
      </Toolbar>
    </AppBar>
    
  );
};

export default Navibar;