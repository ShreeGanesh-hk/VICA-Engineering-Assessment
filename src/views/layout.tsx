import { Box, Container, Divider, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import LoadingOverLay from '../components/LoadingOverLay';
import MainAppBar from '../components/mainappbar'

export default function Layout() {
    
    const location = useLocation();
    return (

        <div>
            <MainAppBar />
            <main>
                <LoadingOverLay />
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    {location.pathname !== "/" && location.pathname !== "/login" ?
                        <Container >
                            <Typography
                                variant="h5"
                                align="left"
                                color="text.primary"
                                gutterBottom
                            >
                                {location.pathname.split("/")[1][0].toUpperCase() + location.pathname.split("/")[1].slice(1)}
                            </Typography>
                            <Divider />
                        </Container> : null
                    }

                </Box>
                <Container sx={{ py: 8, minHeight: `calc(100vh - 220px)` }} maxWidth="lg">
                    <Outlet />
                </Container>
            </main>
        </div>
    )
}
