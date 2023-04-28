import React, { useEffect, useState } from 'react'
import './datacollector.css'
import DashboardLayout from '../SideBarMui';
import Header from '../Header';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';

const Viewdatacollector = () => {

    const { id } = useParams();
    const [users, setUsers] = useState('');
    const posts = users.Booth;

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        borderRadius: 20,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const Collector = () => {
        fetch(`http://206.189.130.102:5000/api/v1/search-datacollector/${id}`)
            .then(response => {
                return response.json()
            }).then(data => {
                setUsers(data)
            })
    }


    const navigate = useNavigate();

    const RootStyle = styled('div')({
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden'
    });

    useEffect(() => {
        Collector();
    }, [])

    return (
        <RootStyle>
            <DashboardLayout />

            <Box sx={{ width: '100%' }}>
                <Header />

                <div className='containerAddData'>
                    <Box sx={{ '& button': { m: 1 } }}>
                        <Button onClick={() => navigate(-1)} className='backbtn' id='importback' style={{ marginTop: '2%', marginLeft: '91%' }} variant="outlined" >Back</Button>
                    </Box>

                    <div >
                        <CssBaseline />

                        <Container className="containerview" maxWidth="md">
                            <Box sx={{ flexGrow: 1 }}>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={6} sx={{ p: 2, borderRadius: '20px', display: 'block' }}>
                                        <h1 className='headingViewData'>View Data Collectors </h1>

                                        <Box className='boxleft'>
                                            <Grid className='grid3' container spacing={1}>

                                                <Grid spacing={1} item xs={6} sm={6} md={6} sx={{ p: 2, borderRadius: '20px', display: 'block' }}>
                                                    <Typography className='subtitle1' variant="subtitle1" gutterBottom > Name</Typography>
                                                    <Typography className='subtitle2' variant="subtitle2" gutterBottom > {users.name}</Typography>
                                                </Grid>

                                                <Grid item xs={6} sm={6} md={6} sx={{ p: 2, borderRadius: '20px', display: 'block' }}>
                                                    <Typography className='subtitle1' variant="subtitle1" gutterBottom > Father's Name</Typography>
                                                    <Typography className='subtitle2' variant="subtitle2" gutterBottom >{users.father_name}</Typography>
                                                </Grid>

                                                <Grid item xs={6} sm={6} md={6} sx={{ p: 2, borderRadius: '20px', display: 'block' }}>
                                                    <Typography className='subtitle1' variant="subtitle1" gutterBottom > Adhaar Card-Number</Typography>
                                                    <Typography className='subtitle2' variant="subtitle2" gutterBottom > {users.adhar_card_no}</Typography>
                                                </Grid>

                                                <Grid item xs={6} sm={6} md={6} sx={{ p: 2, borderRadius: '20px', display: 'block' }}>
                                                    <Typography className='subtitle1' variant="subtitle1" gutterBottom > Mobile Number:</Typography>
                                                    <Typography className='subtitle2' variant="subtitle2" gutterBottom > {users.number}</Typography>
                                                </Grid>

                                                <Grid item xs={6} sm={6} md={6} sx={{ p: 2, borderRadius: '20px', display: 'block' }}>
                                                    <Typography className='subtitle1' variant="subtitle1" gutterBottom > Address:</Typography>
                                                    <Typography className='subtitle2' variant="subtitle2" gutterBottom > {users.adress}</Typography>
                                                </Grid>

                                            </Grid>

                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6} md={6} sx={{ p: 2, borderRadius: '20px', display: 'block' }}>
                                        <h1 className='headingViewData2'>Assigned location </h1>

                                        <Box className='boxright' >

                                            <Grid container spacing={{ xs: 1, sm: 4, md: 2 }}>

                                                <Grid spacing={2} item xs={6} sm={6} md={4} sx={{ p: 2, borderRadius: '20px' }}>
                                                    <Item sx={{ height: 'fit-content' }} className='itemview'>
                                                        <Typography variant="subtitle2" className='subtitle1' gutterBottom > Vidhansabha:{users.Vidhanshaba}</Typography>
                                                        <Typography variant="subtitle1" className='subtitle2' gutterBottom style={{ color: '#000000', fontFamily: 'Poppins' }}  > Vidhanshaba:02</Typography>
                                                    </Item>
                                                </Grid>

                                                <Grid spacing={2} item xs={6} sm={6} md={4} sx={{ p: 2, borderRadius: '20px' }}>
                                                    <Item sx={{ minheight: 'fit-content' }} className='itemview'>
                                                        <Typography variant="subtitle2" className='subtitle1' gutterBottom > Block:</Typography>
                                                        <Typography variant="subtitle1" className='subtitle2' gutterBottom style={{ color: '#000000', fontFamily: 'Poppins' }} > {users.Block}</Typography>
                                                    </Item>
                                                </Grid>

                                                <Grid spacing={2} item xs={6} sm={6} md={4} sx={{ p: 2, borderRadius: '20px' }}>
                                                    <Item sx={{ minheight: 'fit-content' }} className='itemview'>
                                                        <Typography variant="subtitle2" className='subtitle1' gutterBottom > Mandal:</Typography>
                                                        <Typography variant="subtitle1" className='subtitle2' gutterBottom style={{ color: '#000000', fontFamily: 'Poppins' }} > {users.Mandal}</Typography>
                                                    </Item>
                                                </Grid>

                                                <Grid spacing={2} item xs={6} sm={6} md={4} sx={{ p: 2, borderRadius: '20px', display: 'block' }}>
                                                    <Item sx={{ minheight: 'fit-content' }} className='itemview'>
                                                        <Typography variant="subtitle2" className='subtitle1' gutterBottom > Sector:</Typography>
                                                        <Typography variant="subtitle1" className='subtitle2' style={{ color: '#000000', fontFamily: 'Poppins' }} gutterBottom > {users.Sector}</Typography>
                                                    </Item>
                                                </Grid>

                                                <Grid spacing={2} item xs={6} sm={6} md={4} sx={{ p: 2, borderRadius: '20px', display: 'block' }}>
                                                    <Item sx={{ width: 200, minheight: 'fir=content' }}>
                                                        <Typography variant="subtitle2" className='subtitle1' gutterBottom > Booth:</Typography>

                                                        {posts?.map((val) => {
                                                            return (
                                                                <Typography variant="subtitle1" className='subtitle2' style={{ color: '#000000', fontFamily: 'Poppins' }} gutterBottom > {val.boothno}</Typography>
                                                            )
                                                        })}

                                                    </Item>
                                                </Grid>

                                            </Grid>

                                        </Box>
                                    </Grid>

                                </Grid>
                            </Box>

                        </Container>
                    </div>
                </div>
            </Box>
            </RootStyle>
            )
}

            export default Viewdatacollector;