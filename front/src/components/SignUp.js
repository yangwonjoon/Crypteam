/*eslint-disable*/
import { useState } from "react";
import { Typography, Paper, Box, TextField, Button } from "@mui/material";

const Signup = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [apikey, setApikey] = useState("");
  const [seckey, setSeckey] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

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

  return (
    <Paper variant="outlined" sx={{width: '90%', maxWidth: '500px', margin: '0 auto', padding: '20px' ,mt:6 }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 3 }}>
    <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
          Sign Up
        </Typography>
      <TextField
        label="ID"
        variant="outlined"
        margin="normal"
        value={id}
        onChange={handleIdChange}
      />
      <TextField
        label="PW"
        variant="outlined"
        margin="normal"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <TextField
        label="CONFIRM PW"
        variant="outlined"
        margin="normal"
        type="password"
        value={passwordConfirm}
        onChange={handlePasswordConfirmChange}
      />
      <TextField
        label="NAME"
        variant="outlined"
        margin="normal"
        value={username}
        onChange={handleUsernameChange}
      />
      <TextField
        label="BIRTHDAY"
        variant="outlined"
        margin="normal"
        value={birthday}
        onChange={handleBirthdayChange}
      />
      <TextField
        label="EMAIL"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        label="PHONE NUMBER"
        variant="outlined"
        margin="normal"
        value={phonenum}
        onChange={handlePhonenumChange}
      />
      <TextField
        label="APIKEY"
        variant="outlined"
        margin="normal"
        value={apikey}
        onChange={handleApikeyChange}
      />
      <TextField
        label="SECKEY"
        variant="outlined"
        margin="normal"
        value={seckey}
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