/*eslint-disable*/
import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}`);
  };

  return (
    <Paper variant="outlined" sx={{width: '90%', maxWidth: '500px', margin: '0 auto', padding: '20px' ,mt:10 }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 5 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Log In
        </Typography>
        <TextField
          label="Id"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
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
        <Button variant="contained" color="success" type="submit" sx={{ mb: 2 }}>
          로그인
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;