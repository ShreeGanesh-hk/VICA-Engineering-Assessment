import { Grid, Paper } from "@mui/material"
import { Link } from "react-router-dom"

const Missing = () => {
    const paperStyle = { padding: 20, width: 280, margin: "20px auto" }
    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid container spacing={0}
                    direction="column" alignItems="center"
                    justifyContent="center">
                    <h1>Oops!</h1>
                    <p>Page Not Found</p>
                    <div className="flexGrow">
                        <Link to="/">Visit Our Homepage</Link>
                    </div>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Missing
