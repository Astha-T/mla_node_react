import React, { useState, useEffect } from 'react'
import './AR.css'

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EscalatorWarningIcon from '@mui/icons-material/EscalatorWarning';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PieChart from '../../Charts/Demo';
import Googlechart from '../../Charts/Googlechart'
import Result from '../../Charts/result'
import PieNew from '../../Charts/Pie';
import PiechartApex from '../../Charts/ApexPieChart';
import BarCaste from '../../Charts/BarCaste';
import BarPrabhav from '../../Charts/BarChart';
import BarEducation from '../../Charts/BarEducation';
import BarReligion from '../../Charts/BarReligion';
import BarProfessional from '../../Charts/BarProfession';
import BarFinancial from '../../Charts/BarFinancial';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import { Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Header from '../Header'
import DashboardLayout from '../SideBarMui';
import Googlechartgender from '../../Charts/PieGender';
import BarAge from '../../Charts/BarAge';

const result = {
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  height: 200,
  borderRadius: 5
}

const AnalyticalReport = () => {
  const [age, setAge] = React.useState('');
    const [ages, setAges] = React.useState('');
    const [ag, setAg] = React.useState('');
    const [a, setA] = React.useState('');
    const [voter, setVoter] = React.useState([]);
    const [block, setBlock] = React.useState([]);
    const [mandal, setMandal] = useState([]);
    const [sector, setSector] = useState([]);
    const [booth, setBooth] = useState([]);

    const handleChange = (event) => {
        setAge(event.target.value);
        localStorage.setItem('block_id',age)
        
    };
    const handleChanges = (event) => {
        setAges(event.target.value);
        localStorage.setItem('mandal_id',ages)
    };
    const handleChan = (event) => {
        setAg(event.target.value);
        localStorage.setItem('sector_id',ag)
    };
    const handleCha = (event) => {
        setA(event.target.value);
        localStorage.setItem('booth_id',age)
    };

    const getblock = () => {
        fetch("http://206.189.130.102:5000/api/v1/getblock")
            .then(response => {
                return response.json()
            }).then(data => {
                setBlock(data)
            })
    }
    const getuser = () => {
        fetch(`http://206.189.130.102:5000/api/v1/voter`)
            .then(response => {
                return response.json()
            }).then(data => {
                setVoter(data)
            })
    }
    const getusers = (_id) => {
        fetch(`http://206.189.130.102:5000/api/v1/voter?block=` + _id)
            .then(response => {
                return response.json()
            }).then(data => {
                setVoter(data)
            })
        fetch(`http://206.189.130.102:5000/api/v1/getmandal?block_id=` + _id)
            .then(response => {
                return response.json()
            }).then(data => {
                setMandal(data)
                localStorage.setItem('block_id', _id)
            })
    }
    const getuserss = (_id) => {
        fetch(`http://206.189.130.102:5000/api/v1/voter?mandal=` + _id)
            .then(response => {
                return response.json()
            }).then(data => {
                setVoter(data)
            })
        fetch(`http://206.189.130.102:5000/api/v1/getsector?mandal_id=` + _id)
            .then(response => {
                return response.json()
            }).then(data => {
                setSector(data)
                localStorage.setItem('mandal_id', _id)
            })
    }
    const getusersss = (_id) => {
        fetch(`http://206.189.130.102:5000/api/v1/voter?sector=` + _id)
            .then(response => {
                return response.json()
            }).then(data => {
                setVoter(data)
            })
        fetch(`http://206.189.130.102:5000/api/v1/getbooth?sector_id=` + _id)
            .then(response => {
                return response.json()
            }).then(data => {
                setBooth(data)
                localStorage.setItem('sector_id', _id)
            })
    }
    const getuserssss = (_id) => {
        fetch(`http://206.189.130.102:5000/api/v1/voter?booth_id=` + _id)
            .then(response => {
                return response.json()
            }).then(data => {
                setVoter(data)
                localStorage.setItem('booth_id', _id)
            })
    }

    useEffect(() => {
        getuser()
        getblock()
    }, [])

    const RootStyle = styled('div')({
      display: 'flex',
      minHeight: '100%',
      overflow: 'hidden'
  });

    const blockId = localStorage.getItem('block_id')

  const Display = () => {
    localStorage.setItem('displaystatus', true)
    localStorage.setItem('option', 1)
  }

  const option = localStorage.getItem('option')

  const GetReligion = () => {
    window.location.reload(false)
    localStorage.setItem('displaystatus', true)
    localStorage.setItem('option', 1)
    window.scrollTo(0, document.body.scrollHeight);
  }

  const GetEducation = () => {
    window.location.reload(false)
    localStorage.setItem('displaystatus', true)
    localStorage.setItem('option', 2)
    window.scrollTo(0, document.body.scrollHeight);
  }

  const GetAge = () => {
    window.location.reload(false)
    localStorage.setItem('displaystatus', true)
    localStorage.setItem('option', 3)
    window.scrollTo(0, document.body.scrollHeight);
  }

  const GetGender = () => {
    window.location.reload(false)
    localStorage.setItem('displaystatus', true)
    localStorage.setItem('option', 4)
    window.scrollTo(0, document.body.scrollHeight);
  }

  const GetProfession = () => {
    window.location.reload(false)
    localStorage.setItem('displaystatus', true)
    localStorage.setItem('option', 5)
     window.scrollTo(0, document.body.scrollHeight);
  }

  const GetPrabhavshaali = () => {
    window.location.reload(false)
    localStorage.setItem('displaystatus', true)
    localStorage.setItem('option', 6)
     window.scrollTo(0, document.body.scrollHeight);
  }

  const GetCaste = () => {
    window.location.reload(false)
    localStorage.setItem('displaystatus', true)
    localStorage.setItem('option', 7)
     window.scrollTo(0, document.body.scrollHeight);
  }

  const GetFinancial = () => {
    window.location.reload(false)
    localStorage.setItem('displaystatus', true)
    localStorage.setItem('option', 8)
     window.scrollTo(0, document.body.scrollHeight);
  }

  return (
    <RootStyle>
        <DashboardLayout/>
        
        <Box sx={{ width: '100%'}}>
          <Header/>
      <div  >

        <CssBaseline />

        <h1 className="headinganalytic">Analytic Report</h1>

        <Container className="containergrid" backgroundColor='F8F8F8' maxWidth="md" marginTop='0px' >

          <div className='analyticdiv' style={{ backgroundColor: '#FFFFFF', marginTop: '0px', top: 0, borderRadius: 30 }}>

            <Grid container columnSpacing={{ xs: 0.25, sm: 2, md: 8 }}>
              <Grid item xs={12} sm={4} md={2.5}>

                <FormControl className='analyticSelect' sx={{ m: 1, minWidth: 230, maxWidth: 250 }} size="small">
                  {/* <InputLabel id="age1">Select Block</InputLabel> */}
                  <Typography className='d-flex justify-content-left align-items-left' style={{ marginLeft: '8%' }}>Select Block</Typography>
                  <Select
                    labelId="age1"
                    id="age"
                    value={age}
                    sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, backgroundColor: '#F8F8F8' }}
                    label="Block"
                    onChange={handleChange}
                    autoWidth
                    className='analyticSelect'
                >
                    {block.map((val) => {
                        return (
                            <MenuItem value={val.blockName} onClick={() => getusers(val._id)}>{val.blockName}</MenuItem>
                        )
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4} md={2.5} >
                <FormControl className='analyticSelect' sx={{ m: 1, minWidth: 230, maxWidth: 250 }} size="small">
                  <Typography className='d-flex justify-content-left align-items-left' style={{ marginLeft: '8%' }}>Select Mandal</Typography>
                  <Select
                    labelId="age1"
                    id="age"
                    value={ages}
                    onChange={handleChanges}
                    sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, backgroundColor: '#F8F8F8' }}
                    label="Block"
                    autoWidth
                    className='analyticSelect'
                >
                    {mandal.map((val) => {
                        return (
                            <MenuItem value={val.mandalName} onClick={() => getuserss(val._id)}>{val.mandalName}</MenuItem>
                        )
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4} md={2.5} sx={{ borderRadius: '20px', display: 'block' }}>
                <FormControl className='analyticSelect' sx={{ m: 1, minWidth: 230, maxWidth: 250 }} size="small">
                  <Typography className='d-flex justify-content-left align-items-left' style={{ marginLeft: '8%' }}>Select Sector</Typography>
                  <Select
                    labelId="age1"
                    id="age"
                    value={ag}
                    onChange={handleChan}
                    sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, backgroundColor: '#F8F8F8' }}
                    label="Block"
                    autoWidth
                    className='analyticSelect'
                >
                    {sector.map((val) => {
                        return (
                            <MenuItem value={val.sectorName} onClick={() => getusersss(val._id)}>{val.sectorName}</MenuItem>
                        )
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4} md={2.5} >
                <FormControl className='analyticSelect' sx={{ m: 1, minWidth: 230, maxWidth: 250 }} size="small">
                  <Typography className='d-flex justify-content-left align-items-left' style={{ marginLeft: '8%' }}>Select Booth</Typography>
                  <Select
                    labelId="age1"
                    id="age"
                    value={a}
                    onChange={handleCha}
                    sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, backgroundColor: '#F8F8F8' }}
                    label="Block"
                    autoWidth
                    className='analyticSelect'
                >
                    {booth.map((val) => {
                        return (
                            <MenuItem value={val.boothName} onClick={() => getuserssss(val._id)}>{val.boothName}</MenuItem>
                        )
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4} md={2} sx={{ borderRadius: '20px', display: 'block' }}>
                <Button variant="outlined" className='analyticsubmit' style={{ backgroundColor: '#7041EE', color: '#FFFFFF' }} onClick={Display} >SUBMIT</Button>
              </Grid>
            </Grid>
          </div>

          <div className='analyticdiv3'>
            <Grid container spacing={{ xs: 2.2, sm: 3, md: 3 }}>
              <Grid item xs={12} sm={6} md={6} id='chart'>
               {!blockId?<PiechartApex />:<PiechartApex />} 
               {!blockId?<PiechartApex />:<PieNew />} 
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Result className='result'/>
              </Grid>
            </Grid>
          </div>


          <div className='analyticdiv2'>

            <Grid container columnSpacing={{ xs: 0.25, sm: 0.25, md: 0.25 }}>
              <Grid item xs={6} sm={3} md={3}>
                <Paper className='papergrid'style={{ backgroundColor: '#FDF8E2' }} onClick={GetReligion}>
                  <Grid container columnSpacing={{ xs: 0.25, sm: 0.25, md: 0.25 }}>
                    <Grid item xs={9} sm={9} md={9}>
                      <Typography className='textpaper' style={{ marginTop: '5%' }}>Religion Count</Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                      <img className='imagea' style={{ backgroundColor: '#FFEEA3' }} src={require("../../Image/ReligionCount.png")} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
                <Paper className='papergrid' style={{ backgroundColor: '#DBF7E9' }} onClick={GetEducation}>
                  <Grid container columnSpacing={{ xs: 0.25, sm: 0.25, md: 0.25 }}>
                    <Grid item xs={9} sm={9} md={9}>
                      <Typography className='textpaper' style={{ marginTop: '5%' }}>Education Count</Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                      <SchoolOutlinedIcon className='imageb' style={{ backgroundColor: '#9CF3C8' }} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
                <Paper className='papergrid' style={{ backgroundColor: '#FFE1E2' }} onClick={GetAge}>
                  <Grid container columnSpacing={{ xs: 0.25, sm: 0.25, md: 0.25 }}>
                    <Grid item xs={9} sm={9} md={9}>
                      <Typography className='textpaperage' style={{ marginTop: '5%' }}>Age Count </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                      <EscalatorWarningIcon className='imageb' style={{ backgroundColor: '#FAB7B9' }} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
                <Paper className='papergrid' style={{ backgroundColor: '#E2EBFD' }} onClick={GetGender}>
                  <Grid container columnSpacing={{ xs: 0.25, sm: 0.25, md: 0.25 }}>
                    <Grid item xs={9} sm={9} md={9}>
                      <Typography className='textpaper' style={{ marginTop: '5%' }}>Gender Count </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                      <img className='imagec' style={{ backgroundColor: '#95B8FB' }} src={require("../../Image/Gender.png")} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
                <Paper className='papergrid' style={{ backgroundColor: '#FDF8E2' }} onClick={GetProfession}>
                  <Grid container columnSpacing={{ xs: 0.25, sm: 0.25, md: 0.25 }}>
                    <Grid item xs={9} sm={9} md={9}>
                      <Typography className='textpaper' style={{ marginTop: '5%' }}>Profession Count </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                      <BadgeOutlinedIcon className='imageb' style={{ backgroundColor: '#FFEEA3' }} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
                <Paper className='papergrid' style={{ backgroundColor: '#DBF7E9' }} onClick={GetPrabhavshaali}>
                  <Grid container columnSpacing={{ xs: 0.25, sm: 0.25, md: 0.25 }}>
                    <Grid item xs={9} sm={9} md={9}>
                      <Typography className='textpaperprabhav'>Prabhavshaali Count </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                      <InsertChartOutlinedRoundedIcon className='imageb' style={{ backgroundColor: '#9CF3C8' }} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
                <Paper className='papergrid' style={{ backgroundColor: '#FFE1E2' }} onClick={GetCaste}>
                  <Grid container columnSpacing={{ xs: 0.25, sm: 0.25, md: 0.25 }}>
                    <Grid item xs={9} sm={9} md={9}>
                      <Typography className='textpapercaste' >Caste (Subcaste) Count </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                      <GroupsOutlinedIcon className='imageb' style={{ backgroundColor: '#FAB7B9' }} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={6} sm={3} md={3}>
                <Paper className='papergrid' style={{ backgroundColor: '#E2EBFD' }} onClick={GetFinancial}>
                  <Grid container columnSpacing={{ xs: 0.25, sm: 0.25, md: 0.25 }}>
                    <Grid item xs={9} sm={9} md={9}>
                      <Typography className='textpaperfinancial' >Financial Status Count </Typography>
                    </Grid>
                    <Grid item xs={3} sm={3} md={3}>
                      <CurrencyRupeeIcon className='imageb' style={{ backgroundColor: '#95B8FB' }} />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

          </div>

          <div className='analyticdiv3'>
            <Grid container spacing={{ xs: 2.2, sm: 3, md: 3 }} >
              <Grid item xs={12} sm={12} md={12} >
                {/* {!option && <BarReligion />} */}
                {option === '1' && <BarReligion/>}
                {option === '2' && <BarEducation />}
                {option === '3' && <BarAge />}
                {option === '4' && <Googlechartgender />}
                {option === '5' && <BarProfessional />}
                {option === '6' && <BarPrabhav />}
                {option === '7' && <BarCaste />}
                {option === '8' && <BarFinancial />}
              </Grid>
            </Grid>
          </div>

        </Container>
      </div>
    </Box>
    </RootStyle>
  )
}

export default AnalyticalReport;