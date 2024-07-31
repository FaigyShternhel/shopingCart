import React, { useEffect, useState } from 'react';
import { TextField, Button, Link, Typography, Box, Alert, Grid } from '@mui/material';
import { logIn } from '../../Redux/user/userActions';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [firstName, setfirstName] = useState('');
  const [pesonalId, setpesonalId] = useState('');
  const user = useAppSelector((state: any) => state.user);
  const navigate = useNavigate()
  const [err, setErr] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logIn(firstName, pesonalId));
  }
  useEffect(() => {
    if (user.currentUser && user.currentUser.id) {
      navigate("/homePage");
    }
    if (user.failedMessage == '401') {
      setErr(true);
    }
  }, [user]);

  return (
    <Grid container id="loginPage" spacing={0}>
      {err && <Grid item xs={12} alignItems={"center"}><Alert sx={{
        height: "40px", width: "220px", ml: "200px",
        my: 0,

      }} severity="error">שם משתמש או סיסמא שגויים</Alert></Grid>}
      <Grid item xs={12}><Box
        id="loginFormContainer"
        className="inputField"
        sx={{
          backgroundColor: "transparent",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "400px",
          mx: "auto",
          mt: "100px",
          border: "1px solid #ccc",
          borderRadius: "20px",
          boxShadow: "150px 150px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" mb={3}>
          התחברות
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="שם משתמש"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
          <TextField
            label="סיסמא"
            type="pesonalId"
            variant="outlined"
            fullWidth
            margin="normal"
            value={pesonalId}
            onChange={(e) => setpesonalId(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            כניסה
          </Button>
        </form>
        <Link href="/signup" mt={2} color="primary">
          משתמש חדש? לחץ כאן
        </Link>
      </Box></Grid>
    </Grid>
  );
};

export default LoginForm;