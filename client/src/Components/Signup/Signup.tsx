import React, { useEffect, useState } from "react";
import { TextField, Button, Link, Typography, Box } from "@mui/material";
import { logIn, signIn } from "../../Redux/user/userActions"; // השלם את הנתיב לפי המיקום המתאים
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../../hooks";
import "./Signup.css";
import { User } from "../../types";
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>({
    id: 0,
    firstName: "",
    lastName: "",
    taz: "",
    personalId: "",
    birthdate: new Date(),
    email: "",
    address: "",
  });
  const currentUser = useAppSelector((state: any) => state.user.currentUser);
  const [err, setErr] = useState(false);
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.firstName || !user.lastName || !user.personalId || !user.taz) {
      alert("אנא מלא את כל השדות");
      return;
    }
    dispatch(signIn(user));

    if (currentUser.message=="A user with this personalId already exists") {
      alert("מספר אישי כבר קיים במערכת");
    }
    else if(currentUser.message == "User added successfully") {
      console.log("---------"+currentUser.message);
      navigate("/homePage");
    }
  };

  return (
    <div id="loginPage">
      <Box
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
          p: "20px",
        }}
      >
        <Typography variant="h5" mb={3}>
          הרשמה
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="שם פרטי"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          />
          <TextField
            label="שם משפחה"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          />
          <TextField
            label="תעודת זהות"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.taz}
            onChange={(e) => setUser({ ...user, taz: e.target.value })}
          />
          <TextField
            label="תאריך לידה"
            variant="outlined"
            fullWidth
            margin="normal"
            // value={user.birthdate}
            type="date"
            onChange={(e) =>
              setUser({ ...user, birthdate: new Date(e.target.value) })
            }
          />
          <TextField
            label="מספר אישי"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.personalId}
            onChange={(e) => setUser({ ...user, personalId: e.target.value })}
          />
          <TextField
            label="מייל"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            label="כתובת"
            variant="outlined"
            fullWidth
            margin="normal"
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            כניסה
          </Button>
        </form>
        <Link href="/" mt={2} color="primary">
          משתמש קיים? לחץ כאן
        </Link>
      </Box>
    </div>
  );
};

export default SignupForm;