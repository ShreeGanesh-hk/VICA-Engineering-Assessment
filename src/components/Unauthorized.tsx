import { Button, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();
    const paperStyle = { padding: 20, width: 280, margin: "20px auto" }
    const btnstyle = { margin: '8px 0' }
    const goBack = () => navigate("/login", { replace: true });

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid container spacing={0}
                    direction="column" alignItems="center"
                    justifyContent="center">
                    <h1>Unauthorized</h1>
                </Grid>
                <br />
                <p>You do not have access to the requested page.</p>

                <Button type='submit' onClick={goBack} color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>

            </Paper>
        </Grid>

    )
}

export default Unauthorized
