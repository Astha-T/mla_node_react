import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import { tableCellClasses } from '@mui/material/TableCell';
import DashboardLayout from '../SideBarMui';
import Header from '../Header';
import './Voter.css'
import { Box, Grid, FormControl, Typography, Select, MenuItem,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// style for table cell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: deepPurple[50],
      color: theme.palette.common.black,
      fontFamily: 'Poppins',
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 0,
    },
    [`&.${tableCellClasses.body}`]: {
      height: '100%',
      fontSize: 14,
      fontFamily: 'Poppins',
      fontWeight: 400,
      borderBottom: 0,
      height: 19,
      marginBottom: 0,
      paddingBottom: 5,
      paddingTop: 8
    },
  }));
  
  // style for table row
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.action.white,
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 600
  }));

const Voter = () => {
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
    };
    const handleChanges = (event) => {
        setAges(event.target.value);
    };
    const handleChan = (event) => {
        setAg(event.target.value);
    };
    const handleCha = (event) => {
        setA(event.target.value);
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
            })
    }
    const getuserssss = (_id) => {
        fetch(`http://206.189.130.102:5000/api/v1/voter?booth_id=` + _id)
            .then(response => {
                return response.json()
            }).then(data => {
                setVoter(data)
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

    return (
        <RootStyle>
            <DashboardLayout />

            <Box sx={{ width: '100%' }}>
                <Header />
            <Box className="box" sx={{ flexGrow: 1 }}>
                <h2 className='heading2' id='headingvoters'>Voter List</h2>
                <Grid container columnSpacing={{ xs: 0.25, sm: 0.25, md: 0.25 }}>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl className='analyticSelect' sx={{ m: 1, minWidth: 230, maxWidth: 250 }} size="small">
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
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl className='analyticSelect' sx={{ m: 1, minWidth: 230, maxWidth: 250 }} size="small">
                            <Typography className='d-flex justify-content-left align-items-left' style={{ marginLeft: '8%' }} >Select Mandal</Typography>
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
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl className='analyticSelect' sx={{ m: 1, minWidth: 230, maxWidth: 250 }} size="small">
                            <Typography className='d-flex justify-content-left align-items-left' style={{ marginLeft: '8%' }} >Select Sector</Typography>
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
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl className='analyticSelect' sx={{ m: 1, minWidth: 230, maxWidth: 250 }} size="small">
                            <Typography className='d-flex justify-content-left align-items-left' style={{ marginLeft: '8%' }} >Select Booth</Typography>
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
                    {/* <Grid item xs={12} sm={2} md={2} sx={{ borderRadius: '20px', display: 'block' }}>
                        <Button variant="outlined" style={{ backgroundColor: '#7041EE', color: '#FFFFFF', marginTop: '45px', marginLeft: '15px' }}  >SUBMIT</Button>
                    </Grid> */}
                </Grid>

                <TableContainer className='votertable' component={Paper}>
                    <Table sx={{ minWidth: 280 }} aria-label="customized table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Voter_id</StyledTableCell>
                                <StyledTableCell align="center">Gender</StyledTableCell>
                                <StyledTableCell align="center">Age</StyledTableCell>
                                <StyledTableCell align="center">Father_name</StyledTableCell>
                                <StyledTableCell align="center">House_no</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {voter.map((row) => (
                                <StyledTableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.voter_id}</StyledTableCell>
                                    <StyledTableCell align="center">{row.gender}</StyledTableCell>
                                    <StyledTableCell align="center">{row.age}</StyledTableCell>
                                    <StyledTableCell align="center">{row.father_name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.house_no}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
        </RootStyle>
    )
}

export default Voter;