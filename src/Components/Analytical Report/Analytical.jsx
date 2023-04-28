import React, { useState, useEffect } from 'react'
import './AR.css'

import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import TransgenderIcon from '@mui/icons-material/Transgender';
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
import Carousel from "react-elastic-carousel";
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import { Paper, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Header from '../Header'
import SideBar from '../SideBar'
import Googlechartgender from '../../Charts/PieGender';
import BarAge from '../../Charts/BarAge';
import Box from '@mui/material/Box';

const breakPoints = [
  { width: 1, itemsToShow: 2, itemsToScroll: 2 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 4, itemsToScroll: 4 },
  { width: 1200, itemsToShow: 4, itemsToScroll: 4 },
];

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
  const [valueblock, setValueblock] = React.useState('');
  const [valuemandal, setValuemandal] = React.useState('');
  const [valuesector, setValuesector] = React.useState('');
  const [valuebooth, setValuebooth] = React.useState('');

  const [block, setBlock] = useState([]);
  const [mandal, setMandal] = useState([]);
  const [sector, setSector] = useState([]);
  const [booth, setBooth] = useState([]);

  const blockId1 = localStorage.getItem('block_id')
  const mandalId1 = localStorage.getItem('mandal_id')
  const sectorId1 = localStorage.getItem('sector_id')

  const handleChangeBlock = (event) => {
    window.location.reload(true)
    setValueblock(event.target.value)
    localStorage.setItem('block_id', event.target.value)
    localStorage.setItem('block_name', event.target.text)
  };


  const handleChangeMandal = (event) => {
    window.location.reload(true)
    setValuemandal(event.target.value)
    localStorage.setItem('mandal_id', event.target.value)
    localStorage.setItem('block_id', blockId1)
  };

  const handleChangeSector = (event) => {
    window.location.reload(true)
    setValuesector(event.target.value)
    localStorage.setItem('sector_id', event.target.value)
    localStorage.setItem('block_id', blockId1)
    localStorage.setItem('mandal_id', mandalId1)
  };

  const handleChangeBooth = (event) => {
    window.location.reload(true)
    setValuebooth(event.target.value)
    localStorage.setItem('booth_id', event.target.value)
    localStorage.setItem('block_id', blockId1)
    localStorage.setItem('mandal_id', mandalId1)
    localStorage.setItem('sector_id', sectorId1)
  };

  // API to fetch blocks
  useEffect(() => {
    fetch('http://206.189.130.102:5000/api/v1/getblock')
      .then(res => res.json())
      .then(data => {

        const updatedList = data.map((rows) => {

          return {
            id: rows._id,
            blockName: rows.blockName
          }
        })
        setBlock(updatedList)
        setValueblock(blockId)
      })
  })

  // getting block id
  const blockId = localStorage.getItem('block_id')

  // API to get mandal
  useEffect(() => {

    fetch(`http://206.189.130.102:5000/api/v1/getmandal?block_id=` + blockId)
      .then(res => res.json())
      .then(data => {
        const updatedList = data.map((rows2) => {
          return {
            _id: rows2._id,
            mandalName: rows2.mandalName
          }
        })
        setMandal(updatedList)
        setValuemandal(mandalId)
      })
  }, [])

  // getting mandal id
  const mandalId = localStorage.getItem('mandal_id')

  // API to get sector
  useEffect((data) => {

    fetch(`http://206.189.130.102:5000/api/v1/getsector?mandal_id=` + mandalId)
      .then(res => res.json())
      .then(data => {

        const updatedList = data.map((rows3) => {
          return {
            _id: rows3._id,
            sectorName: rows3.sectorName
          }
        })
        setSector(updatedList)
        setValuesector(sectorId)
      })
  }, [])

  // getting sector id
  const sectorId = localStorage.getItem('sector_id')

  // API to fetch booth
  useEffect(() => {

    fetch(`http://206.189.130.102:5000/api/v1/getbooth?sector_id=` + sectorId)
      .then(res => res.json())
      .then(data => {

        const updatedList = data.map((rows4) => {
          return {
            _id: rows4._id,
            boothName: rows4.boothName
          }
        })
        setBooth(updatedList)
        setValuebooth(boothId)
      })
  }, [])

  // getting booth id
  const boothId = localStorage.getItem('booth_id')

  const Display = () => {
    localStorage.setItem('displaystatus', true)
    window.location.reload(true)
    localStorage.setItem('option', 1)
  }

  const option = localStorage.getItem('option')

  const GetReligion = () => {
    window.location.reload(true)
    localStorage.setItem('option', 1)
  }

  const GetEducation = () => {
    window.location.reload(true)
    localStorage.setItem('option', 2)
  }

  const GetAge = () => {
    window.location.reload(true)
    localStorage.setItem('option', 3)
  }

  const GetGender = () => {
    window.location.reload(true)
    localStorage.setItem('option', 4)
  }

  const GetProfession = () => {
    window.location.reload(true)
    localStorage.setItem('option', 5)
  }

  const GetPrabhavshaali = () => {
    window.location.reload(true)

    localStorage.setItem('option', 6)
  }

  const GetCaste = () => {
    window.location.reload(true)
    localStorage.setItem('option', 7)
  }

  const GetFinancial = () => {
    window.location.reload(true)
    localStorage.setItem('option', 8)
  }

  return (
    <div>
      <Header />
      <SideBar />
      <div  >

        <CssBaseline />

        <h1 className="headinganalytic">Analytic Report</h1>

        <Container className="containergrid" backgroundColor='F8F8F8' maxWidth="md" marginTop='0px' >

          <div className='analyticdiv' style={{ backgroundColor: '#FFFFFF', marginTop: '0px', top: 0, borderRadius: 30 }}>

            <Grid container columnSpacing={{ xs: 0.25, sm: 8, md: 8 }}>
              <Grid item xs={12} sm={2.5} md={2.5}>

                <FormControl className='analyticSelect' sx={{ m: 1, minWidth: 230, maxWidth: 250 }} size="small">
                  {/* <InputLabel id="age1">Select Block</InputLabel> */}
                  <Typography className='d-flex justify-content-left align-items-left' style={{ marginLeft: '8%' }}>Select Block</Typography>
                  <Select
                    labelId="age1"
                    id="age"
                    sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, backgroundColor: '#F8F8F8' }}
                    value={valueblock}
                    label="Block"
                    autoWidth
                    className='analyticSelect'
                    onChange={handleChangeBlock}
                  >
                    {block.map((val) => {
                      return (
                        <MenuItem value={val.id}>{val.blockName}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={2.5} md={2.5} >
                <FormControl className='analyticSelect' sx={{ m: 1, minWidth: 230, maxWidth: 250 }} size="small">
                  <Typography className='d-flex justify-content-left align-items-left' style={{ marginLeft: '8%' }}>Select Mandal</Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Mandal"
                    sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, backgroundColor: '#F8F8F8' }}
                    value={valuemandal}
                    autoWidth
                    className='analyticSelect'
                    onChange={handleChangeMandal}
                  >
                    {mandal.map((val) => {
                      return (
                        <MenuItem value={val._id}>{val.mandalName}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={2.5} md={2.5} sx={{ borderRadius: '20px', display: 'block' }}>
                <FormControl className='analyticSelect' sx={{ m: 1, minWidth: 230, maxWidth: 250 }} size="small">
                  <Typography className='d-flex justify-content-left align-items-left' style={{ marginLeft: '8%' }}>Select Sector</Typography>
                  <Select
                    labelId="demo"
                    id="demo-simple"
                    label="Sector"
                    sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, backgroundColor: '#F8F8F8' }}
                    value={valuesector}
                    className='analyticSelect'
                    autoWidth
                    onChange={handleChangeSector}
                  >
                    {sector.map((val) => {
                      return (
                        <MenuItem value={val._id} >{val.sectorName}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={2.5} md={2.5} >
                <FormControl className='analyticSelect' sx={{ m: 1, minWidth: 230, maxWidth: 250 }} size="small">
                  <Typography className='d-flex justify-content-left align-items-left' style={{ marginLeft: '8%' }}>Select Booth</Typography>
                  <Select
                    labelId="demo"
                    id="demo-simple"
                    label="Sector"
                    sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, backgroundColor: '#F8F8F8' }}
                    className='analyticSelect'
                    value={valuebooth}
                    autoWidth
                    onChange={handleChangeBooth}
                  >
                    {booth.map((val) => {
                      return (
                        <MenuItem value={val._id}>{val.boothName}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={2} md={2} sx={{ borderRadius: '20px', display: 'block' }}>
                <Button variant="outlined" className='analyticsubmit' style={{ backgroundColor: '#7041EE', color: '#FFFFFF' }} onClick={Display} >SUBMIT</Button>
              </Grid>
            </Grid>
          </div>



          <div className='analyticdiv3'>
            <Grid container spacing={{ xs: 2.2, sm: 3, md: 3 }}>
              <Grid item xs={12} sm={6} md={6} >
               {!blockId?<Googlechart />:<PieNew />} 
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Result />
              </Grid>
            </Grid>
          </div>


          <div className='analyticdiv2'>

            <Grid container columnSpacing={{ xs: 0.25, sm: 0.25, md: 0.25 }}>
              <Grid item xs={6} sm={3} md={3}>
                <Paper className='papergrid' style={{ backgroundColor: '#FDF8E2' }} onClick={GetReligion}>
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
            <Grid container spacing={{ xs: 2.2, sm: 3, md: 3 }}>
              <Grid item xs={12} sm={12} md={12} >
                {!option && <BarReligion />}
                {option === '1' && <BarReligion />}
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
    </div>
  )
}

export default AnalyticalReport;