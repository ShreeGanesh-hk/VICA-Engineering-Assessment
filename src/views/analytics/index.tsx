import { Alert, Box, Grid, Paper, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
} from 'chart.js';
import { Pie , Line } from 'react-chartjs-2';
import { GetGenreChartData, LineChartData, PieChartData } from '../../services/chartData';
import { useAppDispatch, useAppSelector } from '../../data-manage/hooks';
import { setLoadingIndicator } from '../../data-manage/features/loading';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const LineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'No of Books Published By Year',
      },
    },
  }

  export const PieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'No of Books By Genre',
      },
    },
  }




const Analytics = () => {
    const [success, setSuccess] = useState(false);
    const dispatch = useAppDispatch();
    const { books } = useAppSelector(state => state.bookManagement);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [genereChartData, setGenreChartData] = useState<PieChartData>({} as PieChartData);
    const [publishedChartData, setPublisedChartData] = useState<LineChartData>({} as LineChartData);

    useEffect(() => {
        try {
            dispatch(setLoadingIndicator(true));
            GetGenreChartData(books).then((data) => {
                setGenreChartData(data.genereBook);
                setPublisedChartData(data.publishedBook);
                dispatch(setLoadingIndicator(false));
                setSuccess(true);
            }).finally(() => { setDataLoaded(true) })
        }
        catch {
            setError(true);
        }
    }, [books, dispatch])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccess(false);
        setError(false);
    }

    return (
        <div>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
            }} >
                {dataLoaded ?
                    <Grid sx={{ flexGrow: 1 }} justifyContent="space-around" container>
                        <Grid sm={5} md={5} lg={5} item>
                            <Paper

                            > <Pie options={PieChartOptions} data={genereChartData} /></Paper>
                        </Grid>
                        <Grid sm={5} md={5} lg={5} item>
                            <Paper>
                            <Line options={LineChartOptions} data={publishedChartData} /></Paper>
                        </Grid>
                    </Grid>


                    :
                    <h2>Loading data please wait...</h2>

                }

            </Box>
            <Snackbar open={success} anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
                    Analytics Loaded successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} variant="filled" severity="success" sx={{ width: '100%' }}>
                    {"Something went wrong please retry"}
                </Alert>
            </Snackbar>
        </div >
    )
}

export default Analytics