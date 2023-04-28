import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './datacollector.css'
import './datacollector.css'
import Button from '@mui/material/Button';
import DashboardLayout from '../SideBarMui';
import Header from '../Header';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Createdatacollector = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [block, setBlock] = useState([]);
  const [mandal, setMandal] = useState([]);
  const [sector, setSector] = useState([]);
  const [booth, setBooth] = useState([]);
  const [boothno, setBoothno] = React.useState('');
  const [age, setAge] = React.useState('');
  const [ages, setAges] = React.useState('');
  const [ag, setAg] = React.useState('');
  const [booth_id, setBooth_id] = React.useState('');
  const [data, setData] = React.useState([]);
  const posts = users.Booth;

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChanges = (event) => {
    setAges(event.target.value);
  };

  const handleChan = (event) => {
    setAg(event.target.value);
  };

  const handleEdit = (e) => {
    setData([...data, { boothno: e.target.value, booth_id: e.target.name }])
    e.target.style.backgroundColor = '#7041EE';
    e.target.style.color = '#FFFFFF';
  }

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

  const getblock = () => {
    fetch(`http://206.189.130.102:5000/api/v1/getblock`)
      .then(response => {
        return response.json()
      }).then(data => {
        setBlock(data)
      })
  }

  const getmandal = (_id) => {
    fetch(`http://206.189.130.102:5000/api/v1/getmandal?block_id=` + _id)
      .then(response => {
        return response.json()
      }).then(data => {
        setMandal(data)
      })
  }

  const getsector = (_id) => {
    fetch(`http://206.189.130.102:5000/api/v1/getsector?mandal_id=` + _id)
      .then(response => {
        return response.json()
      }).then(data => {
        setSector(data)
      })
  }

  const getbooth = (_id) => {
    fetch(`http://206.189.130.102:5000/api/v1/getbooth?sector_id=` + _id)
      .then(response => {
        return response.json()
      }).then(data => {
        setBooth(data)
      })
  }


  const updatelocation = () => {
    let { Block } = age
    let { Mandal } = ages
    let { Sector } = ag
    let { Booth } = data
    fetch(`http://206.189.130.102:5000/api/v1/assigned-location/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Block: age, Mandal: ages, Sector: ag, Booth: data })
    }).then((result) => {
      result.json().then((res) => {
        window.alert("data collector assigned location")
      })
    })
    window.location.reload(false);
  }

  useEffect(() => {
    Collector();
    getblock();

  }, [])

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

            <Box sx={{ width: '100%', height: 'fit-content', padding: 1, border: 'none', borderRadius: '20px', backgroundColor: '#FFFFFF' }} mt={1}>
              <Typography className='subtitleassign'> Assign Location</Typography>

              <Grid container spacing={1}>
                <Grid item xs={12} sm={4} md={4} sx={{ borderRadius: '20px', display: 'block' }}>

                  <FormControl className='optionsform1' sx={{ m: 1, minWidth: 270, maxWidth: 300 }} size="small">
                    <InputLabel id="age1">Block</InputLabel>
                    <Select
                      labelId="age1"
                      id="age"
                      value={age}
                      label="Block"
                      onChange={handleChange}
                    >
                      {block.map((val) => {
                        return (
                          <MenuItem value={val.blockName} onClick={() => getmandal(val._id)}>{val.blockName}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} md={4} sx={{ borderRadius: '20px', display: 'block' }}>
                  <FormControl className='optionsform' sx={{ m: 1, minWidth: 270, maxWidth: 300 }} size="small">
                    <InputLabel id="demo-simple-select-label">Mandal</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Mandal"
                      value={ages}
                      onChange={handleChanges}
                    >
                      {mandal.map((val) => {
                        return (
                          <MenuItem value={val.mandalName} onClick={() => getsector(val._id)}>{val.mandalName}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={4} md={4} sx={{ borderRadius: '20px', display: 'block' }}>
                  <FormControl className='optionsform' sx={{ m: 1, minWidth: 270, maxWidth: 300 }} size="small">
                    <InputLabel id="demo">Sector</InputLabel>
                    <Select
                      labelId="demo"
                      id="demo-simple"
                      label="Sector"
                      value={ag}
                      onChange={handleChan}
                    >
                      {sector.map((val) => {
                        return (
                          <MenuItem value={val.sectorName} onClick={() => getbooth(val._id)}>{val.sectorName}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>


              <FormControl style={{ display: 'inline', marginLeft: '0%' }} sx={{ m: 1, }}>
                {booth.map((val) => {
                  return (
                    <Button className="assignbutton" style={{ backgroundColor: '#FFFFFF', color: '#000000' }} name={val._id} value={val.boothName} variant="contained" onClick={(e) => handleEdit(e, val._id)}>{val.boothName}</Button>
                  )
                })}
              </FormControl>

            </Box>

            <Button className="submitbtnassign" onClick={() => updatelocation()} style={{ backgroundColor: '#7041EE', color: '#FFFFFF', marginBottom: '5%' }} >Submit</Button>

          </Container>
        </div>
      </div>
    </Box>
    </RootStyle>
  )
}

export default Createdatacollector;

