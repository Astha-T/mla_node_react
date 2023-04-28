import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './datacollector.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DashboardLayout from '../SideBarMui';
import { styled } from '@mui/material/styles';
import Header from '../Header';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CssBaseline from '@mui/material/CssBaseline';
import { color, Container } from '@mui/system';

const ariaLabel = { 'aria-label': 'description' };

const Addcollector = () => {

    const navigate = useNavigate();
    const [update, setUpdate] = useState({
        name: "", number: "", adress: "", email: "", password: "", father_name: "",
        adhar_card_no: "", Booth: "", Sector: "", Mandal: "", Block: "", Vidhanshaba: ""
    });

    let name, value
    const manage = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUpdate({ ...update, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();
        const { name, number, adress, father_name, adhar_card_no, password, email } = update;
        const res = fetch("http://206.189.130.102:5000/api/v1/datacollector-register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, number, adress, email, password, father_name, adhar_card_no })
        });

        const data = await res;

        if (data.status === 422) {
            window.alert(" plz filled required field properly");
        } else if (data.status === 423) {
            window.alert("data-Collector already exit");
        } else {
            window.alert("data-Collector Created");
        }
        navigate('/datacollector');
        console.log(data)

    }

    const RootStyle = styled('div')({
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden'
    });

    return (
        <RootStyle>
            <DashboardLayout />

            <Box sx={{ width: '100%' }}>
                <Header />

            <Box sx={{ '& button': { m: 1 } }}>
                {/* button to go to previous page */}
                <Button onClick={() => navigate(-1)} className='backbtn' id='importback' style={{marginTop: '2%', marginLeft: '91%'}} variant="outlined" >Back</Button>
            </Box>

            <div className='content'>
                <h1 className="heading3" id='dataheading'>Create Data Collectors</h1>

                <div >
                    <CssBaseline />

                    <div className='containerAddData'>
                        <Container className="container2" maxWidth="md" style={{ marginBottom: '5%' }}>

                            <div className='dataadd' style={{ backgroundColor: '#FFFFFF', borderRadius: '27px' }}>

                                <Typography className='subtitle'> Add Details Of Data Collectors</Typography>

                                <Grid style={{ marginLeft: 5 }} container spacing={0.25}>
                                    <Grid style={{ marginBottom: 0 }} item xs={12} sm={4} md={4} sx={{ borderRadius: '20px', display: 'block' }}>

                                        <Grid container spacing={1}>

                                            <Grid item xs={12} sm={12} md={12}>
                                                <TextField InputLabelProps={{ shrink: false }} className='adddatatext' placeholder='Name' size="small" required="true" name='name' value={update.name} onChange={manage}></TextField>
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={12}>
                                                <TextField InputLabelProps={{ shrink: false }} className='adddatatext' placeholder='Aadhar Card Number (optional)' type="number" variant="outlined" size="small" name='adhar_card_no' value={update.adhar_card_no} onChange={manage} ></TextField>
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={12}>
                                                <TextField InputLabelProps={{ shrink: false }} className='adddatatext' placeholder='Email id' variant="outlined" size="small" required="true" name='email' value={update.email} onChange={manage}></TextField>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={4} sx={{ borderRadius: '20px', display: 'block' }}>
                                        <Grid container spacing={1}>

                                            <Grid item xs={12} sm={12} md={12}>
                                                <TextField InputLabelProps={{ shrink: false }} className='adddatatext' id="outlined-basic" placeholder="Father's Name (optional)" variant="outlined" size="small" name='father_name' value={update.father_name} onChange={manage}></TextField>
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={12}>
                                                <TextField InputLabelProps={{ shrink: false }} className='adddatatext' id="outlined-basic" placeholder='Mobile Number' type="number" variant="outlined" size="small" required="true" name='number' value={update.number} onChange={manage}></TextField>
                                            </Grid>

                                            <Grid item xs={12} sm={12} md={12}>
                                                <TextField InputLabelProps={{ shrink: false }} className='adddatatext' id="outlined-basic" placeholder='Password' variant="outlined" size="small" required="true" name='password' value={update.password} onChange={manage}></TextField>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={4} md={4} sx={{ borderRadius: '20px', display: 'block' }}>
                                        <Grid container spacing={1}>

                                            <Grid item xs={12} sm={12} md={12} sx={{ p: 2, borderRadius: '20px', display: 'block' }}>
                                                <TextField InputLabelProps={{ shrink: false }} className='adddatatext' id="outlined-basic" placeholder='Address' variant="outlined" multiline rows={5} name='adress' required="true" value={update.adress} onChange={manage}></TextField>
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Button className="submitbtndata" style={{ backgroundColor: '#7041EE', color: '#FFFFFF', marginRight: '5%', marginBottom: '5%' }} onClick={PostData} >Submit</Button>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
            </Box>
            </RootStyle>
            )
}

            export default Addcollector;