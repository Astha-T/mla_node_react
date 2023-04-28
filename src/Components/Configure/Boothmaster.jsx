import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { experimentalStyled as styled } from '@mui/material/styles';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { deepPurple } from '@mui/material/colors';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DashboardLayout from '../SideBarMui';
import '../Login,Register/Login.css'
import Button from '@mui/material/Button';
import SideBar from '../SideBar';
import Header from '../Header'
import './pages.css'

//style for 'edit/delete booth' modals
const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  height: 200,
  borderRadius: 5
};

//style for 'add booth' modals
const style3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  height: 350,
  borderRadius: 5
};

//style for table cell
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
    height: '50%',
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: 400,
    borderBottom: 0,
    height: 19,
    marginBottom: 0,
    paddingBottom: 2,
    paddingTop: 5
  },
}));

//style for table row
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.white
}));

const BoothMaster = () => {

  // Getting token value from session storage
  const tokenstring = sessionStorage.getItem('token')
  const usertoken = JSON.parse(tokenstring);

  //states to get booths and selecting blocks, mandals and booths
  const [booth, setBooth] = useState([]);
  const [datalength,setDataLength] = useState()
  const [tabledata, setTableData] = useState([])
  const [block, setBlock] = useState('');
  const [mandaltitle, setmandalTitile] = useState('');
  const [mandal, setMandal] = useState([]);
  const [sectortitle, setsectortitle] = useState('');
  const [sector, setSector] = useState([]);

  //states to edit/delete and add booth data
  const [boothvalue, setBoothvalue] = useState('');
  const [boothld, setBoothId] = useState('')
  const [boothdata, setBoothData] = useState({ boothName: "" });

  //states for modals
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => {
    setOpen3(true);
    setBoothData('')
  }
  const handleClose3 = () => 
  {
    setOpen3(false);
    window.location.reload(true)
  }
  const handleChange = (event) => {
    window.location.reload(true)
    // setLable('')
    setBlock(event.target.value)
    localStorage.setItem('block_id', event.target.value)
  };

  const handleChange2 = (event) => {
    window.location.reload(true)
    // setLabel2('')
    setmandalTitile(event.target.value)
    localStorage.setItem('mandal_id', event.target.value)
  };

  const handleChange3 = (event) => {
    window.location.reload(true)
    // setLable3('')
    setsectortitle(event.target.value)
    localStorage.setItem('sector_id', event.target.value)
  }

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
        setTableData(updatedList)
      })
  })

  const blockId = localStorage.getItem('block_id')

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
        // if(!blockId)
        //   {
        //   setLable('Select Block')
        //   }
        //   else{
        //     setLable('')
        //   }
        setBlock(blockId)
      })
  }, [])

  const mandalId = localStorage.getItem('mandal_id')

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
        // if(!mandalId)
        //   {
        //   setLabel2('Select Mandal')
        //   }
        //   else{
        //    setLabel2('')
        //   }
        setmandalTitile(mandalId)
      })
  }, [])

  const sectorId = localStorage.getItem('sector_id')

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
        setDataLength(updatedList.length)
        // setDataLength(updatedList.length)
        // if(!sector)
        //   {
        //   setLable3('Select Sector')
        //   }
        //   else{
        //     setLable3('')
        //   }
        setsectortitle(sectorId)
      })

  }, [])

  const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
  });

  const changedata = (event) => {

    // setLable('')
    localStorage.setItem('block_id', event.target.value)
    setBlock(event.target.value)
  }

  const chnagedata2 = (event) => {
    // setLabel2('')
    localStorage.setItem('mandal_id', event.target.value)
    setmandalTitile(event.target.value)
  }

  const changedata3 = (event) => {
    // setLable3('')
    localStorage.setItem('sector', event.target.value)
    setsectortitle(event.target.value)
  }

  let name, value, block_id, mandal_id, sector_id
  const Change = (e) => {
    name = e.target.name;
    value = e.target.value;
    sector_id = sectorId;
    mandal_id = mandalId;
    block_id = blockId;
    setBoothData({ ...boothdata, [name]: value, block_id, mandal_id, sector_id });
  }

  const adddata = () => {
    let { boothName, block_id, mandal_id, sector_id } = boothdata
    const res = fetch('http://206.189.130.102:5000/api/v1/add-booth', {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ boothName, block_id, mandal_id, sector_id })
    });

    const data = res;

    if (data.status === 403 || !data) {
      window.alert("Cannot Add new booth");
    } else {
      window.alert("Booth Added Successfully");
    }
  }
  const editbooth = (event) => {
    setOpen(true)
    setBoothData('')
    setBoothId(event._id)
    setBoothvalue(event.boothName)
  }

  const deletebooth = (event) => {
    setOpen2(true)
    setBoothId(event._id)
    setBoothvalue(event.boothName)
  }

  const EditConfirmation = () => {
    setOpen(false)
    let { boothName } = boothdata
    fetch(`http://206.189.130.102:5000/api/v1/update-booth/${boothld}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boothName })
    }).then((result) => {
      result.json().then((res) => {
        window.alert("Booth Updated Successfully")
        window.location.reload(true)
      })
    })
  }

  const DeleteConfirmation = () => {
    setOpen2(false)
    fetch(`http://206.189.130.102:5000/api/v1/delete-booth/${boothld}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res)
        window.alert("Booth removed")
      })
    })
  }

  const navigate = useNavigate();

  // redirecting on login page value of token is empty
  if (!usertoken) {
    navigate('/')
  }

  return (
    <RootStyle>
    <DashboardLayout />

    <Box sx={{ width: '100%' }}>
      <Header />

      <Box sx={{ '& button': { m: 1 } }}>

        <Button onClick={handleOpen3} className='addbtn' variant="outlined" size="small">Add</Button>
        <Button onClick={() => navigate(-1)} className='backbtn' id='configureback' style={{marginTop: '-2.15%', marginLeft: '91%'}} variant="outlined" >Back</Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component='form' onSubmit={EditConfirmation} sx={style2}>
          <IconButton className="cross" aria-label="delete"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseOutlinedIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Booth
          </Typography>
          <input value={boothdata.boothName} onChange={Change} name='boothName' className="editinput" placeholder={boothvalue} />
          <button className="submitbtn" onClick={EditConfirmation}>Submit</button>
        </Box>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <IconButton className="cross" aria-label="delete"
            onClick={handleClose2}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseOutlinedIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Booth?
          </Typography>
          <Typography className='deleteBlock' id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure, you want to delete <b>{boothvalue}</b>?
          </Typography>
          <button className="submitbtn" onClick={DeleteConfirmation}>Delete</button>
        </Box>
      </Modal>
      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component='form' onSubmit={adddata} sx={style3}>
          <IconButton className="cross" aria-label="delete"
            onClick={handleClose3}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}>
            <CloseOutlinedIcon />
          </IconButton>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Select Block</InputLabel>

            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              className="selectoptionsadd"
              value={block}
              label='Select Block'
              onChange={changedata}
            >
              {tabledata.map((row2) => {
                return (
                  <MenuItem value={row2.id}> {row2.blockName} </MenuItem>
                )
              })}

            </Select>

          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Select Mandal</InputLabel>

            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={mandaltitle}
              className='selectoptionsadd'
              label='Select Mandal'
              onChange={chnagedata2}
            >
              {mandal.map((row) => {
                return (
                  <MenuItem value={row._id}>{row.mandalName}</MenuItem>
                )
              })}
            </Select>

          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Select Sector</InputLabel>

            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={sectortitle}
              label='Select Sector'
              className='selectoptionsadd'
              onChange={changedata3}
            >
              {sector.map((row3) => {
                return (
                  <MenuItem value={row3._id}>{row3.sectorName}</MenuItem>
                )
              })}
            </Select>

          </FormControl>

          <Typography className="addheading" id="modal-modal-title" variant="h6" component="h2">
            Add Booth
          </Typography>

          <input type="text" value={boothdata.boothName} onChange={Change} name='boothName' className="editinput" placeholder='New Booth' />
          <button className="submitbtn" onClick={()=>window.location.reload(true)}>Submit</button>
        </Box>
      </Modal>

      <div className='content'>
        <h1 className="heading3">Booth Master List</h1>

        <TableContainer className='table1' component={Paper}>

          <Table sx={{ minWidth: 280 }} aria-label="customized table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell />
              </StyledTableRow>
            </TableHead>

            <TableBody>

              <StyledTableRow>
                <StyledTableCell>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Select Block</InputLabel>

                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      className="selectoptions"
                      value={block}
                      label='Select Block'
                      onChange={handleChange}
                    >
                      {tabledata.map((row2) => {
                        return (
                          <MenuItem value={row2.id}> {row2.blockName} </MenuItem>
                        )
                      })}

                    </Select>

                  </FormControl>

                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Select Mandal</InputLabel>

                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={mandaltitle}
                      className="selectoptions"
                      label='Select Mandal'
                      onChange={handleChange2}
                    >
                      {mandal.map((row) => {
                        return (
                          <MenuItem value={row._id}>{row.mandalName}</MenuItem>
                        )
                      })}
                    </Select>

                  </FormControl>

                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Select Sector</InputLabel>

                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={sectortitle}
                      className='selectoptions'
                      label='Select Sector'
                      onChange={handleChange3}
                    >
                      {sector.map((row3) => {
                        return (
                          <MenuItem value={row3._id}>{row3.sectorName}</MenuItem>
                        )
                      })}
                    </Select>

                  </FormControl>
                </StyledTableCell>
              </StyledTableRow>

            </TableBody>

          </Table>
        </TableContainer>

        <TableContainer className='tablebooth' component={Paper}>

          <Table sx={{ minWidth: 280 }} aria-label="customized table">
            {!datalength ?

              <Typography style={{fontWeight: 'bold'}}>Either block/mandal/sector is not selected or data is not available...</Typography>
              : <>

                <TableHead>
                  <StyledTableRow>

                    <StyledTableCell className="padding">&nbsp;&nbsp;&nbsp;&nbsp;Sr.</StyledTableCell>
                    <StyledTableCell className="row2" align="left">&nbsp;Booth</StyledTableCell>
                    <StyledTableCell align="left">&nbsp;Action</StyledTableCell>


                  </StyledTableRow>
                </TableHead>

                <TableBody>
                  {booth.map((row4, index) => (
                    <StyledTableRow className="ab" key={index}>

                      <StyledTableCell align="left">&nbsp;{index + 1}</StyledTableCell>
                      <StyledTableCell align="left">{row4.boothName}</StyledTableCell>
                      <StyledTableCell align="left">
                        <BorderColorOutlinedIcon onClick={() => editbooth(row4)} className="newicon" />
                        <DeleteOutlineIcon onClick={() => deletebooth(row4)} className="delete" />
                      </StyledTableCell>
                    </StyledTableRow>

                  ))}
                </TableBody>
                </>}
              </Table>
            </TableContainer>
      </div>
    </Box >
    </RootStyle>
  )
}

export default BoothMaster;