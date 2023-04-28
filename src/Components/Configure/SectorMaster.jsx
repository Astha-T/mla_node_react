import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { withStyles } from "@material-ui/core/styles";
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
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../SideBarMui';
import Header from '../Header'
import './pages.css'

const styles = ({
  searchbar: {
    height: 39,
    width: 347,
    marginLeft: 276,
    top: 10
  }
})

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
  height: 300,
  borderRadius: 5
};

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.white
}));

const SectorMaster = withStyles(styles)(props => {

  const [sector, setSector] = useState([])

  const [tabledata, setTableData] = useState([])
  const [block, setBlock] = useState('');
  const [mandaltitle, setmandalTitile] = useState('');
  const [mandal, setMandal] = React.useState([]);
  // const [lable, setLable] = useState('Select Block')
  // const [lable2, setLabel2] = useState('Set Mandal')

  const [sectorvalue, setSectorvalue] = useState('');
  const [sectorld, setSectorId] = useState('')

  const [sectordata, setSectorData] = useState({ sectorName: "" });
  const [datalength, setDataLength] = useState()
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => {
    setOpen3(true);
    setSectorData('')
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
    localStorage.setItem('mandal_id', undefined)
  };

  const handleChange2 = (event) => {
    window.location.reload(true)
    // setLabel2('')
    setmandalTitile(event.target.value)
    localStorage.setItem('mandal_id', event.target.value)
  };

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
        // if (!blockId) {
        //   setLable('Select Block')
        // }
        // else {
        //   setLable('')
        // }
        setBlock(blockId)
      })
  }, [])

  const mandalId = localStorage.getItem('mandal_id')

  useEffect(() => {

    fetch(`http://206.189.130.102:5000/api/v1/getsector?mandal_id=` + mandalId)
      .then(res => res.json())
      .then(data => {

        const updatedList = data.map((rows) => {
          return {
            _id: rows._id,
            sectorName: rows.sectorName
          }
        })
        setSector(updatedList)
        setDataLength(updatedList.length)
        // if (!mandalId) {
        //   setLabel2('Select Mandal')
        // }
        // else {
        //   setLabel2('')
        // }
        setmandalTitile(mandalId)
      })
  }, [])

  const changedata = (event) => {
    // setLable('')
    localStorage.setItem('block_id', event.target.value)
    setBlock(event.target.value)
  }

  const changedata2 = (event) => {
    // setLabel2('')
    localStorage.setItem('mandal_id', event.target.value)
    setmandalTitile(event.target.value)
  }

  const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
  });

  let name, value, block_id, mandal_id
  const Change = (e) => {
    name = e.target.name;
    value = e.target.value;
    mandal_id = mandalId
    block_id = blockId
    setSectorData({ ...sectordata, [name]: value, mandal_id, block_id });
  }

  const adddata = () => {
    let { sectorName, block_id, mandal_id } = sectordata
    const res = fetch('http://206.189.130.102:5000/api/v1/add-sector', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ sectorName, block_id, mandal_id })
    });

    const data = res;

    if (data.status === 403 || !data) {
      window.alert("Cannot Add new sector");
    } else {
      window.alert("Sector Added Successfully");
    }
  }

  const editsector = (event) => {
    setOpen(true)
    setSectorData('')
    setSectorId(event._id)
    setSectorvalue(event.sectorName)
  }

  const deletesector = (event) => {
    setOpen2(true)
    setSectorId(event._id)
    setSectorvalue(event.sectorName)
  }

  const EditConfirmation = () => {
    setOpen(false)
    let { sectorName } = sectordata
    fetch(`http://206.189.130.102:5000/api/v1/update-sector/${sectorld}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sectorName })
    }).then((result) => {
      result.json().then((res) => {
        window.alert("Sector Updated Successfully")
        window.location.reload(true)
      })
    })
  }

  const DeleteConfirmation = () => {
    setOpen2(false)
    fetch(`http://206.189.130.102:5000/api/v1/delete-sector/${sectorld}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res)
        window.alert("Sector removed")
        window.location.reload(true)
      })
    })
  }

  const navigate = useNavigate();

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
            Edit Sector
          </Typography>
          <input value={sectordata.sectorName} onChange={Change} name='sectorName' className="editinput" placeholder={sectorvalue} />
          <button className="submitbtn">Submit</button>
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
            Delete Sector?
          </Typography>
          <Typography className='deleteBlock' id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure, you want to delete <b>{sectorvalue}</b>?
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
              label="Select Block"
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
              label="Select Mandal"
              onChange={changedata2}
            >
              {mandal.map((row) => {
                return (
                  <MenuItem value={row._id}>{row.mandalName}</MenuItem>
                )
              })}
            </Select>

          </FormControl>

          <Typography className="addheading" id="modal-modal-title" variant="h6" component="h2">
            Add Sector
          </Typography>

          <input type="text" value={sectordata.sectorName} onChange={Change} name='sectorName' className="editinput" placeholder='New Sector' />
          <button className="submitbtn" onClick={()=>window.location.reload(true)}>Submit</button>
        </Box>
      </Modal>

      <div className='content'>
        <h1 className="heading3">Sector Master List</h1>

        <TableContainer className='table1' component={Paper}>

          <Table sx={{ minWidth: 280 }} aria-label="customized table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell />
              </StyledTableRow>
            </TableHead>

            <TableBody>

              <StyledTableRow className="emptyrow">
                <StyledTableCell>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small">Select Block</InputLabel>

                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      className="selectoptions"
                      value={block}
                      label="Select Block"
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
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={mandaltitle}
                      className='selectoptions'
                      label="Select Mandal"
                      onChange={handleChange2}
                    >
                      {mandal.map((row) => {
                        return (
                          <MenuItem value={row._id}>{row.mandalName}</MenuItem>
                        )
                      })}
                    </Select>

                  </FormControl>
                </StyledTableCell>
              </StyledTableRow>

            </TableBody>

          </Table>
        </TableContainer>

        <TableContainer className='tablesector' component={Paper}>

          <Table sx={{ minWidth: 280 }} aria-label="customized table">
            {!datalength ?

              <Typography style={{fontWeight: 'bold'}}>Either block/mandal is not selected or no data is not availble...</Typography>
              : <>

                <TableHead>
                  <StyledTableRow>

                    <StyledTableCell className="padding" >&nbsp;&nbsp;&nbsp;&nbsp;Sr.</StyledTableCell>
                    <StyledTableCell className="row2" align="left">&nbsp;Sector</StyledTableCell>
                    <StyledTableCell align="left">&nbsp;Action</StyledTableCell>


                  </StyledTableRow>
                </TableHead>

                <TableBody>
                  {sector.map((row, index) => (
                    <StyledTableRow className="ab" key={index}>

                      <StyledTableCell align="left">&nbsp;{index + 1}</StyledTableCell>
                      <StyledTableCell align="left">{row.sectorName}</StyledTableCell>
                      <StyledTableCell align="left">
                        <BorderColorOutlinedIcon onClick={() => editsector(row)} className="newicon" />
                        <DeleteOutlineIcon onClick={() => deletesector(row)} className="delete" /></StyledTableCell>
                    </StyledTableRow>

                  ))}
                </TableBody>
                </>}
              </Table>
        </TableContainer>
      </div>
    </Box>
    </RootStyle>
  )
})

export default SectorMaster;