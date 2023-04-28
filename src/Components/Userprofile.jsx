import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './SideBarMui';
import Header from './Header'
import './UserProfile.css'

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UserProfile = () => {

    // Getting token value from session storage
    const tokenstring = sessionStorage.getItem('token')
    const usertoken = JSON.parse(tokenstring);

    const RootStyle = styled('div')({
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden'
    });

    const navigate = useNavigate();

    if (!usertoken) {
        navigate('/')
    }

    // states to set labels of textfields
    // const [namelabel, setnamelabel] = useState("Name");
    // const [mobilelabel, setmobilelabel] = useState("Mobile No.");
    // const [emaillabel, setemaillabel] = useState("Email");
    // const [mobile2label, setmobile2label] = useState("Alternate Mobile No.");

    // functions to change labels of textfields
    // const Changenamelabel = (event) => {
    //     setnamelabel('')
    // }

    // const Changemobilelabel = (event) => {
    //     setmobilelabel('')
    // }

    // const Changeemaillabel = (event) => {
    //     setemaillabel('')
    // }

    // const Changemobile2label = (event) => {
    //     setmobile2label('')
    // }


    return (
        <RootStyle>
        <DashboardLayout/>
        
        <Box sx={{ width: '100%'}}>
            <Header />

            {/* main box starts */}
            <Box className="profilebox" sx={{ width: '50%', maxWidth: 700 }}>

                {/* main heading starts */}
                <Typography variant="h6" className="d-flex justify-content-left align-items-left profile">
                    Profile
                </Typography>
                {/* main heading ends */}

                {/* grid box starts */}
                <Box sx={{ flexGrow: 1 }}>

                    {/* <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}> */}

                    {/* main grid starts */}
                    <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 3, sm: 10, md: 12 }}>

                        {/* grid for name textfield (grid1) starts */}
                        <Grid item xs={2} sm={6} md={6}>

                            <Box
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                color="dark"
                                autoComplete="off"
                            >
                                {/* name textfield starts */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label='Name'
                                    // onChange={Changenamelabel}
                                    className="textfield"
                                    InputProps={{
                                        className: "textfield",

                                    }}
                                    InputLabelProps={{
                                        className: "labelstyle",
                                    }}
                                />
                                {/* name textfield ends */}
                            </Box>

                        </Grid>
                        {/* grid for name textfield (grid1) ends */}

                        {/* grid for mobile textfield (grid2) starts */}
                        <Grid item xs={2} sm={6} md={6}>

                            <Box
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                color="dark"
                                autoComplete="off"
                            >
                                {/* mobile textfield starts */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label='Mobile No.'
                                    // onChange={Changemobilelabel}
                                    className="textfield"
                                    InputProps={{
                                        className: "textfield",

                                    }}
                                    InputLabelProps={{
                                        className: "labelstyle",
                                    }}
                                />
                                {/* mobile textfield ends */}
                            </Box>

                        </Grid>
                        {/* grid for mobile textfield (grid2) ends */}

                        {/* grid for email textfield (grid3) starts */}
                        <Grid item xs={2} sm={6} md={6}>

                            <Box
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                color="dark"
                                autoComplete="off"
                            >
                                {/* email textfield start */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label='Email'
                                    // onChange={Changeemaillabel}
                                    className="textfield2"
                                    InputProps={{
                                        className: "textfield2",
                                    }}
                                    InputLabelProps={{
                                        className: "labelstyle",
                                    }}
                                />
                                {/* email textfield ends */}
                            </Box>

                            {/* grid for email textfield (grid3) ends */}
                        </Grid>

                        {/* grid for alternate mobile textfield (grid4) starts */}
                        <Grid className="grid" item xs={2} sm={6} md={6}>

                            <Box
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                                color="dark"
                                autoComplete="off"
                            >
                                {/* alternate mobile textfield starts */}
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label='Alternate Mobile No.'
                                    // onChange={Changemobile2label}
                                    className="textfield2"
                                    InputProps={{
                                        className: "textfield2",

                                    }}
                                    InputLabelProps={{
                                        className: "labelstyle",
                                    }}
                                />
                                {/* alternate mobile textfield ends */}
                            </Box>

                            {/* grid for alternate mobile textfield (grid4) ends */}
                        </Grid>

                    </Grid>
                    {/* main grid ends */}

                    {/* <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Box className='profilegridbox'></Box>
                    </Grid>
                </Grid> */}

                </Box>
                {/* grid box ends */}

                {/* Update button */}
                <Button className="profilebtn">UPDATE</Button>

            </Box>
            {/* main box ends */}

        </Box >
        </RootStyle>
    )

}

export default UserProfile;