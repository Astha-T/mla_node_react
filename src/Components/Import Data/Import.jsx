import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { read, utils, writeFile } from 'xlsx';
import Header from '../Header'
import DashboardLayout from '../SideBarMui';
import './Import.css'
import { ReactExcel, readFile, generateObjects } from '@ramonak/react-excel';

import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Import = () => {

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

    const blockId = localStorage.getItem('block_id');
    const mandalId = localStorage.getItem('mandal_id');
    const sectorId = localStorage.getItem('sector_id');
    const boothId = localStorage.getItem('booth_id');

    //states to import data from excelsheet
    const [initialData, setInitialData] = useState(undefined);
    const [currentSheet, setCurrentSheet] = useState({});

    //function to updated excel sheet
    const handleUpload = (event) => {
        const file = event.target.files[0];
        //read excel file
        readFile(file)
            .then((readedData) => setInitialData(readedData))
            .catch((error) => console.error(error));
    };

    //function to save data from excel sheet
    const save = () => {
        const result = generateObjects(currentSheet);

        //save array of objects to backend
        const res = fetch("http://206.189.130.102:5000/upload", {
            method: 'POST',
            body: JSON.stringify(result)
        });

        //getting success/failure status from API
        const data = res;

        if (data.status === 500 || !data) {
            window.alert('Cannot upload data ');
        } else if (data.status === 201) {
            window.alert('Data uploaded successfully');
        }
        console.log(result)
    };



    //   manish code..........

    const [movies, setMovies] = useState([]);

    const saved = () => {
        fetch("http://206.189.130.102:5000/api/v1/addmember", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movies)
        }).then(response => {
            return response.json()
        }).then(data => {
            if (data) {
                window.alert("data uploaded successfully")
            } else {
                window.alert("please try again")
            }
        })
    }


    const handleImport = ($event) => {
        const files = $event.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    const data = rows.map(v => ({ ...v, sector: sectorId, mandal: mandalId, block: blockId, booth_id: boothId }))
                    setMovies(data)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }

    console.log(movies)

    // code end...................
    const navigate = useNavigate();

    return (
        <RootStyle>
        <DashboardLayout/>
        
        <Box sx={{ width: '100%'}}>
            <Header />

            <div className='containerOuter'>
                <Box sx={{ '& button': { m: 1 } }}>

                    {/* button to go to previous page */}
                    <Button onClick={() => navigate(-1)} className='backbtn' id='importback' style={{ marginTop: '2%', marginLeft: '91%' }} variant="outlined" >Back</Button>
                </Box>

                <div >
                    <CssBaseline />

                    {/* import data page container  start*/}
                    <Container className="container2">

                        {/* import data page box start */}
                        <Box className='outerbox' sx={{ bgcolor: '#FFFFFF', height: '50vh', borderRadius: '27px' }}>

                            {/* heading of Import data page */}
                            <h1 className="headingI">Import Data</h1>

                            {/* select block text field start */}
                            <FormControl className='formoptions' sx={{ m: 1, minWidth: 270, color: 'dark' }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Select Block</InputLabel>
                                <Select
                                    labelId="age1"
                                    id="age"
                                    value={age}
                                    sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, backgroundColor: '#F8F8F8' }}
                                    label="Block"
                                    onChange={handleChange}
                                    autoWidth
                                    className='selectblock'
                                >
                                    {block.map((val) => {
                                        return (
                                            <MenuItem value={val.blockName} onClick={() => getusers(val._id)}>{val.blockName}</MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl>
                            {/* select block text field end */}

                            {/* select mandal text field start */}
                            <FormControl className='formoptions' sx={{ m: 1, minWidth: 270, color: 'dark' }}>
                                <InputLabel id="demo-simple-select-autowidth-label2">Select Mandal</InputLabel>
                                <Select
                                    labelId="age1"
                                    id="age"
                                    value={ages}
                                    onChange={handleChanges}
                                    sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, backgroundColor: '#F8F8F8' }}
                                    label="Block"
                                    autoWidth
                                    className='selectmandal'
                                >
                                    {mandal.map((val) => {
                                        return (
                                            <MenuItem value={val.mandalName} onClick={() => getuserss(val._id)}>{val.mandalName}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            {/* select mandal text field end */}

                            {/* select sector text field start */}
                            <FormControl className='formoptions' sx={{ m: 1, minWidth: 270, color: 'dark' }}>
                                <InputLabel id="demo-simple-select-autowidth-label3">Select Sector</InputLabel>
                                <Select
                                    labelId="age1"
                                    id="age"
                                    value={ag}
                                    onChange={handleChan}
                                    sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, backgroundColor: '#F8F8F8' }}
                                    label="Block"
                                    autoWidth
                                    className='selectsector'
                                >
                                    {sector.map((val) => {
                                        return (
                                            <MenuItem value={val.sectorName} onClick={() => getusersss(val._id)}>{val.sectorName}</MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl>
                            {/* select sector text field end */}

                            {/* select booth text field start */}
                            <FormControl className='formoptions' sx={{ m: 1, minWidth: 270, color: 'dark' }}>
                                <InputLabel id="demo-simple-select-autowidth-label4">Select Booth</InputLabel>
                                <Select
                                    labelId="age1"
                                    id="age"
                                    value={a}
                                    onChange={handleCha}
                                    sx={{ '& legend': { display: 'none' }, '& fieldset': { top: 0 }, backgroundColor: '#F8F8F8' }}
                                    label="Block"
                                    autoWidth
                                    className='selectbooth'
                                >
                                    {booth.map((val) => {
                                        return (
                                            <MenuItem value={val.boothName} onClick={() => getuserssss(val._id)}>{val.boothName}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            {/* select booth text field end */}

                            <input
                                type='file'
                                accept='.xlsx'
                                onChange={handleImport}
                                className='file'
                            />
                            <a href={require("./Book1 (2).xlsx")} className='download' download="Book1 (2).xlsx">Download Sample file</a>
                            <ReactExcel
                                initialData={initialData}
                                onSheetUpdate={(currentSheet) => setCurrentSheet(currentSheet)}
                                activeSheetClassName='active-sheet'
                                reactExcelClassName='react-excel'
                            />

                            <button className="submitbtnImp" onClick={saved} >Import</button>

                            {/* /Book1 (2).xlsx */}
                        </Box>
                        {/* import data page box end */}

                    </Container>
                    {/* import data page container  end*/}

                </div>
            </div>
        </Box>
        </RootStyle>
    )
}

export default Import;