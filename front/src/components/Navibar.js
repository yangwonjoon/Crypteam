/*eslint-disable*/
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, Link ,useLocation} from 'react-router-dom';


const Navibar = () => {
  const location = useLocation();
  const isLoggedIn = sessionStorage.getItem('token') !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic
    sessionStorage.clear(); // Clear stored tokens and user data
    navigate('/main'); // Redirect to the login page
  };

  const handleLinkClick = (path) => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.'); // Show login prompt
      navigate('/login'); // Navigate to the login page
    } else {
      navigate(path); // Navigate to the clicked link
    }
  };

  return (
    <AppBar sx={{ backgroundColor: '#2E581F' }} position="sticky">
      <Toolbar>
      <Typography sx={{ flexGrow: 1}}>
          <Button color="inherit" component={Link} to="/main">C.M.T</Button>
      </Typography>
      <Typography sx={{ flexGrow: 0.8}}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              onClick={() => handleLinkClick('/backtesting')}
            >
              백테스팅
            </Button>
            <Button
              color="inherit"
              onClick={() => handleLinkClick('/virtualinvest')}
            >
              모의투자
            </Button>
            <Button
              color="inherit"
              onClick={() => handleLinkClick('/autotrading')}
            >
              실전자동매매
            </Button>
            <Button color="inherit" component={Link} to="/coinnews">
              코인동향
            </Button>
            <Button color="inherit" component={Link} to="/notice">
              공지사항
            </Button>
        </div>
      </Typography>
      <Typography align="right">
      <div>
            {isLoggedIn ? (
              <Button onClick={handleLogout} color="inherit" sx={{ ml: 'auto' }}>
                로그아웃
              </Button>
            ) : (
              <>
                {location.pathname !== '/login' && (
                  <Button component={Link} to="/login" color="inherit" sx={{ ml: 'auto' }}>
                    로그인
                  </Button>
                )}
                {location.pathname !== '/signup' && (
                  <Button component={Link} to="/signup" color="inherit">
                    회원가입
                  </Button>
                )}
              </>
            )}
          </div>
      </Typography>
        
        
      </Toolbar>
    </AppBar>
    
  );
};

export default Navibar;