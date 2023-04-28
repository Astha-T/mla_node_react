import React from 'react'
import { experimentalStyled as styled } from '@mui/material/styles';
import { Navigate, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import DashboardLayout from '../SideBarMui';
import Header from '../Header'
import './Master.css'

const MasterList = () => {

  // Getting token value from session storage
  const tokenstring = sessionStorage.getItem('token')
  const usertoken = JSON.parse(tokenstring);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 23
  }));

  const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

  const navigate = useNavigate();

  if(!usertoken){
    navigate('/')
  }

  return (
    <> {!usertoken ? <Navigate to ='/'/>
    :<RootStyle>
    <DashboardLayout/>
    
    <Box sx={{ width: '100%'}}>
      <Header/>
      <div className='content'>

        <h1 className="heading2"> Configure</h1>

        <Box className="box" sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 5, md: 5 }}>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/blocklist">
              <Item className="item"> 
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Block master</h2>
                </Item></Link></Grid>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/mandalmaster">
              <Item className="item">
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Mandal master</h2>
                </Item></Link></Grid>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/sectormaster">
              <Item className="item">
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Sector master list</h2>
                </Item></Link></Grid>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/boothmaster">
              <Item className="item">
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Booth master list</h2>
                </Item></Link></Grid>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/castelist">
              <Item className="item">
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Caste master list</h2>
                </Item></Link></Grid>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/subcastelist">
              <Item className="item">
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Sub-Caste master list</h2>
                </Item></Link></Grid>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/professionmaster">
              <Item className="item">
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Profession master</h2>
                </Item></Link></Grid>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/prabhavshaalimastrer">
              <Item className="item">
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Prabhavshaali master</h2>
              </Item></Link></Grid>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/educationlevel">
              <Item className="item">
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Education level</h2>
                </Item></Link></Grid>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/partynames">
              <Item className="item">
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Party names</h2>
                </Item></Link>
            </Grid>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/religion">
              <Item className="item">
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Religion</h2>
                </Item></Link>
            </Grid>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/financial">
              <Item className="item">
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Financial Status</h2>
              </Item></Link>
            </Grid>

            <Grid item xs={1} sm={1} md={1}><Link className="switch" href="/pastresult">
              <Item className="item">
                <img src={require('../../Image/Vector.png')} />
                <h2 className='d-flex justify-content-center align-items-center title2'>Past Result</h2>
              </Item></Link>
            </Grid>

          </Grid>
        </Box>
      </div>
    </Box>
    </RootStyle>}</>
  )
};

export default MasterList;