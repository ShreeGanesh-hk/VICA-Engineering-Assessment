import { Avatar, Button, Grid, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { InputChangeEventHandler } from '../../utils/eventTypes';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAppDispatch, useAppSelector } from '../../data-manage/hooks';
import { Login, setLogin } from '../../data-manage/features/login';
import { useLocation, useNavigate } from 'react-router-dom';
type LocationState = {
    from: {
      pathname: string;
    }
  }

const LoginPage = () => {
    const [loginUser, setLoginUser] = useState("");
    const [error, setError] = useState(false);
    const dispatch = useAppDispatch();
    const { users } = useAppSelector(state => state.userManagement);
    const paperStyle = { padding: 20, width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as LocationState)?.from?.pathname || "/";

    const handleChange: InputChangeEventHandler = (e) => {
        setLoginUser(e.target.value);
    }

    const handleLogin = () => {
        let user = users.find((user) => user.name === loginUser);
        if (user === undefined) {
            setError(true);
            return;
        }
        else {
            let loggedInUser = {
                loggedIn: true,
                user: user.name,
                role: user.role,
            } as Login
            dispatch(setLogin(loggedInUser));
            navigate(from, { replace: false });
        }
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid container spacing={0}
                    direction="column" alignItems="center"
                    justifyContent="center">
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField
                    fullWidth={true}
                    name='username'
                    error={error}
                    value={loginUser}
                    onChange={handleChange}
                    required
                    id="outlined-required"
                    label="Enter User Name"
                    helperText={error ? "Invalid User" : ""}
                />
                <Button type='submit' onClick={handleLogin} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>

            </Paper>
        </Grid>
    )
}

export default LoginPage