import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import './datacollector.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import DashboardLayout from '../SideBarMui';
import Header from '../Header';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';

const Editdatacollector = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [users, setUsers] = useState('');
    const [username, setUserName] = useState('')
    const [userfathername, setUserFatherName] = useState('')
    const [useremail, setUserEmail] = useState('')
    const [usermobile, setUserMobile] = useState('')
    const [useraddress, setUserAddress] = useState('')
    const [useraadahar, setUserAadhar] = useState('')
    const [userpassword, setUserPassword] = useState('')
    const [useredit, setUseredit] = React.useState('')

    let name, value
    const handleEditName = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUseredit({ ...useredit, [name]: value });
        setUserName(e.target.value)
    }

    const handleEditFatherName = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUseredit({ ...useredit, [name]: value });
        setUserFatherName(e.target.value)
    }

    const handleEditEmail = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUseredit({ ...useredit, [name]: value });
        setUserEmail(e.target.value)
    }
    const handleEditMobile = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUseredit({ ...useredit, [name]: value });
        setUserMobile(e.target.value)
    }
    const handleEditAAdhar = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUseredit({ ...useredit, [name]: value });
        setUserAadhar(e.target.value)
    }

    const handleEditPassword = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUseredit({ ...useredit, [name]: value });
        setUserPassword(e.target.value)
    }

    const handleEditAddress = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUseredit({ ...useredit, [name]: value });
        setUserAddress(e.target.value)
    }

    const RootStyle = styled('div')({
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden'
      });

    const Collector = () => {
        fetch(`http://206.189.130.102:5000/api/v1/search-datacollector/${id}`)
            .then(response => {
                return response.json()
            }).then(data => {
                setUsers(data)
                setUserName(data.name)
                setUserFatherName(data.father_name)
                setUserEmail(data.email)
                setUserMobile(data.number)
                setUserAadhar(data.adhar_card_no)
                setUserPassword(data.password)
                setUserAddress(data.adress)
            })
    }

    const updatePost = () => {
        let { name, number, adress, father_name, adhar_card_no, password, email } = useredit
        fetch(`http://206.189.130.102:5000/api/v1/update-datacollector/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, number, adress, father_name, adhar_card_no, password, email })
        }).then((result) => {
            result.json().then((res) => {
                window.alert("data collector updated")

            })
        })
        navigate('/datacollector');
        window.location.reload(true)
    }

    useEffect(() => {
        Collector();
    }, [])

    return (
        <RootStyle>
            <DashboardLayout />

            <Box sx={{ width: '100%' }}>
                <Header />

                <Box sx={{ '& button': { m: 1 } }}>
                    {/* button to go to previous page */}
                    <Button onClick={() => navigate(-1)} className='backbtn' id='importback' style={{ marginTop: '2%', marginLeft: '91%' }} variant="outlined" >Back</Button>
                </Box>

                <div className='content'>
                    <h1 className="heading3" id='dataheading' style={{ marginTop: '-2.2%' }}>Edit Data Collectors</h1>

                    <div >
                        <CssBaseline />

                        <div className='containerAddData'>
                            <Container className="container2" maxWidth="md" >

                                <div className='dataedit' style={{ bgcolor: '#FFFFFF', borderRadius: '27px' }}>

                                    <Typography className='subtitle'> Add Details Of Data Collectors</Typography>

                                    <Grid component='form' onSubmit={() => updatePost()} style={{ marginLeft: 5 }} container spacing={0.25}>
                                        <Grid style={{ marginBottom: 0 }} item xs={12} sm={4} md={4} sx={{ borderRadius: '20px', display: 'block' }}>

                                            <Grid container spacing={1}>

                                                <Grid item xs={12} sm={12} md={12}>
                                                    <Typography className='d-flex justify-content-left align-items-left editdatalabel'> Name</Typography>
                                                    <TextField id='outlined-name' className='adddatatext' variant="outlined" size="small" value={username} name="name" onChange={(e) => handleEditName(e)}></TextField>
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12} >
                                                    <Typography className='d-flex justify-content-left align-items-left editdatalabel'> Aadhar Card Number</Typography>
                                                    <TextField id="outlined-basic" className='adddatatext' type="number" variant="outlined" size="small" name="adhar_card_no" value={useraadahar} onChange={(e) => handleEditAAdhar(e)}></TextField>
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12} >
                                                    <Typography className='d-flex justify-content-left align-items-left editdatalabel'> Email id</Typography>
                                                    <TextField id="outlined-basic" className='adddatatext' variant="outlined" size="small" name="email" value={useremail} onChange={(e) => handleEditEmail(e)}></TextField>
                                                </Grid>

                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={4} md={4} sx={{ borderRadius: '20px', display: 'block' }}>
                                            <Grid container spacing={1}>

                                                <Grid item xs={12} sm={12} md={12}>
                                                    <Typography className='d-flex justify-content-left align-items-left editdatalabel'> Father's Name</Typography>
                                                    <TextField id="outlined-basic" className='adddatatext' variant="outlined" size="small" name="father_name" value={userfathername} onChange={(e) => handleEditFatherName(e)}></TextField>
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12} >
                                                    <Typography className='d-flex justify-content-left align-items-left editdatalabel'> Mobile Number</Typography>
                                                    <TextField id="outlined-basic" className='adddatatext' type="number" variant="outlined" size="small" name="number" value={usermobile} onChange={(e) => handleEditMobile(e)}></TextField>
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={12} >
                                                    <Typography className='d-flex justify-content-left align-items-left editdatalabel'> Password</Typography>
                                                    <TextField id="outlined-basic" className='adddatatext' variant="outlined" size="small" name="password" value={userpassword} onChange={(e) => handleEditPassword(e)}></TextField>
                                                </Grid>

                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={4} md={4} sx={{ borderRadius: '20px', display: 'block' }}>
                                            <Grid container spacing={1}>

                                                <Grid item xs={12} sm={12} md={12} sx={{ p: 2, borderRadius: '20px', display: 'block' }}>
                                                    <Typography className='d-flex justify-content-left align-items-left editdatalabel'> Address</Typography>
                                                    <TextField id="outlined-basic" className='adddatatext' variant="outlined" multiline rows={5} name="adress" value={useraddress} onChange={(e) => handleEditAddress(e)}></TextField>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Button className="submitbtndata" style={{ backgroundColor: '#7041EE', color: '#FFFFFF', marginRight: '5%', marginBottom: '5%' }} onClick={() => updatePost()} >Submit</Button>

                                </div>

                            </Container>

                        </div>
                    </div>
                </div>
            </Box>
            </RootStyle>
            )
}

            export default Editdatacollector;