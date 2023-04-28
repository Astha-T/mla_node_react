import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Link from '@mui/material/Link';
import { Navigate, useNavigate } from 'react-router-dom';
import './Header.css'
import SideBarR from './SideBarR';
import { Grid } from '@mui/material';

const Header = () => {

  // Getting token value from session storage
  const tokenstring = sessionStorage.getItem('token')
  const usertoken = JSON.parse(tokenstring);

  const navigate = useNavigate();

  if (!usertoken) {
    navigate('/')
  }

  return (
    <>{!usertoken ? <Navigate to='/' />
      : <div className="header">

        {/* Hi user buttton */}
        <Box style={{backgroundColor: '#FFFFFF'}}
        // onClick={preventDefault}
        >

          <Grid container spacing={1}>

            <Grid spacing={1} item xs={10} sm={10} md={10}></Grid>

              {/* Avatar (user icon) */}
              <Grid spacing={1} item xs={2} sm={2} md={2}>
              <Stack direction="row" spacing={2}>
                <Avatar className="avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </Stack>
              </Grid>

              <Grid spacing={1} item xs={2} sm={2} md={2}>
              <Stack direction="row" spacing={2}>
                <Link href="/userprofile" className='btn' border="success" underline="none" color="dark" endIcon={<KeyboardArrowDownIcon />}>
                  Hi, User <KeyboardArrowDownIcon />
                </Link>
              </Stack>
              </Grid>
              </Grid>
            </Box>

          </div>}</>
        )
}

        export default Header;