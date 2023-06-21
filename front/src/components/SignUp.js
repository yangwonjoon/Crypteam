/*eslint-disable*/
import { useState } from "react";
import {useNavigate, Link} from 'react-router-dom';
//import axios from 'axios';
import api from '../apis/axios';
import { Typography, Paper, Box, TextField, Button } from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();

  //const [user_id, setId] = useState("");
  const [password, setPassword] = useState("");
  //const [re_password, setPasswordConfirm] = useState("");
  const [user_name, setUsername] = useState("");
  const [birth, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhonenum] = useState("");
  const [api_key, setApikey] = useState("");
  const [sec_key, setSeckey] = useState("");
//
  const [confirm, setConfirm] = useState('');
 // const Swal = require('sweetalert2');
//
  const handleSubmit = (event) => {
    event.preventDefault();
    api.post('register/',{
      //user_id: `${user_id}`,
      password: `${password}`,
      //re_password: `${re_password}`,
      user_name: `${user_name}`,
      birth: `${birth}`,
      email: `${email}`,
      phone_number: `${phone_number}`,
      api_key: `${api_key}`,
      sec_key: `${sec_key}`,
    }).then((response)=> {
      console.log(response.data);
      navigate('/Login')
    }).catch((error)=>{
      console.log(error);
    });
  };

  // const handleIdChange = (event) => {
  //   setId(event.target.value);
  // };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // const handlePasswordConfirmChange = (event) => {
  //   setPasswordConfirm(event.target.value);
  // };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhonenumChange = (event) => {
    setPhonenum(event.target.value);
  };

  const handleApikeyChange = (event) => {
    setApikey(event.target.value);
  };

  const handleSeckeyChange = (event) => {
    setSeckey(event.target.value);
  };
//
  function isSame() {
    if(confirm === password)
      return true;
    else
      return false;
  }

  return (
    <Paper variant="outlined" sx={{width: '90%', maxWidth: '500px', margin: '0 auto', padding: '20px' ,mt:6 }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
    <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
          Sign Up
        </Typography>
      <TextField
        label="EMAIL"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={handleEmailChange}
      />
      {/* <TextField
        label="ID"
        variant="outlined"
        margin="normal"
        value={user_id}
        onChange={handleIdChange}
      /> */}
      <TextField
        label="PW"
        variant="outlined"
        margin="normal"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {/* <TextField
        label="CONFIRM PW"
        variant="outlined"
        margin="normal"
        type="password"
        value={re_password}
        onChange={handlePasswordConfirmChange}
        //
        error={confirm ? (!confirm ? isSame() : !isSame()) : false}
            helperText={
              confirm ? (!isSame() ? '비밀번호를 다시 확인해 주세요.' : '') : ''
            }
      /> */}
      <TextField
        label="NAME"
        variant="outlined"
        margin="normal"
        value={user_name}
        onChange={handleUsernameChange}
      />
      <TextField
        label="BIRTHDAY"
        variant="outlined"
        margin="normal"
        value={birth}
        onChange={handleBirthdayChange}
      />
     
      <TextField
        label="PHONE NUMBER"
        variant="outlined"
        margin="normal"
        value={phone_number}
        onChange={handlePhonenumChange}
      />
      <TextField
        label="APIKEY"
        variant="outlined"
        margin="normal"
        value={api_key}
        onChange={handleApikeyChange}
      />
      <TextField
        label="SECKEY"
        variant="outlined"
        margin="normal"
        value={sec_key}
        onChange={handleSeckeyChange}
      />
      <br/>
      <Button variant="contained" color="success" onClick={handleSubmit} sx={{ mb: 2 }}>
        회원가입
      </Button>
    </Box>
    </Paper>
  );
};

export default Signup;