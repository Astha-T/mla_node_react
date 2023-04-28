import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
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
import SignIn from '../Login,Register/Login2'
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
  height: 250,
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
  height: 200,
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

const MandalMaster = withStyles(styles)(props => {

  // Getting token value from session storage
  const tokenstring = sessionStorage.getItem('token')
  const usertoken = JSON.parse(tokenstring);

  const [tabledata, setTableData] = useState([]);
  const [block, setBlock] = useState('');
  // const [label, setLable] = useState('Select Block');

  const [mandalvalue, setMandalvalue] = useState('');
  const [mandald, setMandalId] = useState('')

  const [mandaldata, setMandalData] = useState({ mandalName: "" });

  const [mandal, setMandal] = useState([]);
  const [datalength, setDataLength] = useState()
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => {
    setOpen3(true);
    setMandalData('')
  }
  const handleClose3 = () => 
  {
    setOpen3(false);
    window.location.reload(true)
  }

  const handleChange = (event) => {
    window.location.reload(true)
    localStorage.setItem('block_id', event.target.value);
    setBlock(event.target.value);
    // setLable('')
  };

  const HandleChange2 = (event) => {
    localStorage.setItem('block_id', event.target.value);
    setBlock(event.target.value);
    // setLable('')
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
  }, []);

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
        setDataLength(updatedList.length)
        // if(!blockId)
        // {
        // setLable('Select Block')
        // }
        // else{
        //   setLable('')
        // }
        setBlock(blockId)
      })
  }, [])

  let name, value, block_id
  const Change = (e) => {
    name = e.target.name;
    value = e.target.value;
    block_id = blockId
    setMandalData({ ...mandaldata, [name]: value, block_id });
  }

  const adddata = () => {
    let { mandalName, block_id } = mandaldata
    const res = fetch('http://206.189.130.102:5000/api/v1/add-mandal', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ mandalName, block_id })
    });

    const data = res;

    if (data.status === 403 || !data) {
      window.alert("Cannot Add new mandal");
    } else {
      window.alert("Mandal Added Successfully");
    }
  }

  const editmandal = (event) => {
    setOpen(true)
    setMandalData('')
    setMandalId(event._id)
    setMandalvalue(event.mandalName)
  }

  const deletemandal = (event) => {
    setOpen2(true)
    setMandalId(event._id)
    setMandalvalue(event.mandalName)
  }

  const EditConfirmation = () => {
    setOpen(false)
    let { mandalName } = mandaldata
    fetch(`http://206.189.130.102:5000/api/v1/update-mandal/${mandald}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mandalName })
    }).then((result) => {
      result.json().then((res) => {
        window.alert("Mandal Updated Successfully")
        window.location.reload(true)
      })
    })
  }

  const DeleteConfirmation = () => {
    setOpen2(false)
    fetch(`http://206.189.130.102:5000/api/v1/delete-mandal/${mandald}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res)
        window.alert("Mandal removed")
        window.location.reload(true);
      })
    })
  }

  const navigate = useNavigate();

  const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
  });

  // redirecting on login page value of token is empty
  if (!usertoken) {
    return <SignIn />
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
        <Box component='form' onSubmit={EditConfirmation} sx={style3}>
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
            Edit Mandal
          </Typography>
          <input value={mandaldata.mandalName} onChange={Change} name='mandalName' className="editinput" placeholder={mandalvalue} />
          <button className="submitbtn">Submit</button>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style3}>
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
            Delete Mandal?
          </Typography>
          <Typography className='deleteBlock' id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure, you want to delete <b>{mandalvalue}</b>?
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
        <Box component='form' onSubmit={adddata} sx={style2}>
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
              onChange={HandleChange2}
            >
              {tabledata.map((row2) => {
                return (
                  <MenuItem value={row2.id}> {row2.blockName} </MenuItem>
                )
              })}

            </Select>
          </FormControl>

          <Typography className="addheading" id="modal-modal-title" variant="h6" component="h2">
            Add Mandal
          </Typography>

          <input type="text" value={mandaldata.mandalName} onChange={Change} name='mandalName' className="editinput" placeholder='New Mandal' />
          <button className="submitbtn" onClick={()=>window.location.reload(true)}>Submit</button>
        </Box>
      </Modal>

      <div className='content'>
        <h1 className="heading3">Mandal Master</h1>

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
                </StyledTableCell>
              </StyledTableRow>

            </TableBody>

          </Table>
        </TableContainer>

        <TableContainer className='table' component={Paper}>

          <Table sx={{ minWidth: 280 }} aria-label="customized table">
            {!datalength ?

              <Typography style={{fontWeight: 'bold'}}>Either block is not selected or data is not available...</Typography>
              : <>

                <TableHead>
                  <StyledTableRow>

                    <StyledTableCell className="padding">&nbsp;&nbsp;&nbsp;&nbsp;Sr.</StyledTableCell>
                    <StyledTableCell className="row2" align="left">Mandal</StyledTableCell>
                    <StyledTableCell align="left">&nbsp;&nbsp;Action</StyledTableCell>

                  </StyledTableRow>
                </TableHead>

                <TableBody>
                  {mandal.map((row, index) => (
                    <StyledTableRow className="ab" key={index}>

                      <StyledTableCell align="left">&nbsp;{index + 1}</StyledTableCell>
                      <StyledTableCell align="left">{row.mandalName}</StyledTableCell>
                      <StyledTableCell align="left">
                        <BorderColorOutlinedIcon onClick={() => editmandal(row)} className="newicon" />
                        <DeleteOutlineIcon onClick={() => deletemandal(row)} className="delete" /></StyledTableCell>
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
});

export default MandalMaster;