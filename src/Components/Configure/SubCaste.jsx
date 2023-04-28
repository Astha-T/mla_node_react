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

const SubCaste = withStyles(styles)(props => {

  const [caste, setCaste] = useState([]);
  const [castevalue, setCasteValue] = useState('');
  // const [label, setLable] = useState('Select Block');

  const [subcastevalue, setSubcastevalue] = useState('');
  const [subcasteld, setSubcasteId] = useState('')

  const [subcastedata, setSubcasteData] = useState({ subcastName: "" });

  const [subcaste, setSubcaste] = useState([]);
  const [datalength,setDataLength] = useState()
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => {
    setOpen3(true);
    setSubcasteData('')
  }
  const handleClose3 = () => setOpen3(false);

  const handleChange = (event) => {
    window.location.reload(true)
    localStorage.setItem('caste_id', event.target.value);
    setCasteValue(event.target.value);
    // setLable('')
  };

  const HandleChange2 = (event) => {
    localStorage.setItem('caste_id', event.target.value);
    setCasteValue(event.target.value);
    // setLable('')
  }

  useEffect(() => {
    fetch('http://206.189.130.102:5000/api/v1/get-cast')
      .then(res => res.json())
      .then(data => {

        const updatedList = data.map((rows) => {

          return {
            id: rows._id,
            castName: rows.castName
          }
        })
        setCaste(updatedList)
      })
  }, []);

  const casteId = localStorage.getItem('caste_id')

  useEffect(() => {

    fetch(`http://206.189.130.102:5000/api/v1/get-subcast?castId=` + casteId)
      .then(res => res.json())
      .then(data => {
        const updatedList = data.map((rows2) => {
          return {
            _id: rows2._id,
            subcastName: rows2.subcastName
          }
        })
        setSubcaste(updatedList)
        setDataLength(updatedList.length)
        // if(!blockId)
        // {
        // setLable('Select Block')
        // }
        // else{
        //   setLable('')
        // }
        setCasteValue(casteId)
      })
  }, [])

  let name, value, castId
  const Change = (e) => {
    name = e.target.name;
    value = e.target.value;
    castId = casteId
    setSubcasteData({ ...subcastedata, [name]: value, castId });
  }

  const adddata = () => {
    let { subcastName, castId } = subcastedata
    const res = fetch('http://206.189.130.102:5000/api/v1/add-subcast', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ subcastName, castId })
    });

    const data = res;

    if (data.status === 403 || !data) {
      window.alert("Cannot Add new sub-caste");
    } else {
      window.alert("Sub-caste Added Successfully");
    }
  }

  const editsubcaste = (event) => {
    setOpen(true)
    setSubcasteData('')
    setSubcasteId(event._id)
    setSubcastevalue(event.subcastName)
  }

  const deletesubcaste = (event) => {
    setOpen2(true)
    setSubcasteId(event._id)
    setSubcastevalue(event.subcastName)
  }

  const EditConfirmation = () => {
    setOpen(false)
    let { subcastName } = subcastedata
    fetch(`http://206.189.130.102:5000/api/v1/update-subcast/${subcasteld}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subcastName })
    }).then((result) => {
      result.json().then((res) => {
        window.alert("Sub-caste Updated Successfully")
        window.location.reload(true)
      })
    })
  }

  const DeleteConfirmation = () => {
    setOpen2(false)
    fetch(`http://206.189.130.102:5000/api/v1/delete-subcast/${subcasteld}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res)
        window.alert("Sub-caste removed")
        window.location.reload(true);
      })
    })
  }

  const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
  });

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
            Edit Sub-caste
          </Typography>
          <input value={subcastedata.subcastName} onChange={Change} name='subcastName' className="editinput" placeholder={subcastevalue} />
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
            Delete Sub-caste?
          </Typography>
          <Typography className='deleteBlock' id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure, you want to delete <b>{subcastevalue}</b>?
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
            <InputLabel id="demo-select-small">Select Caste</InputLabel>

            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              className="selectoptionsadd"
              value={castevalue}
              label="Select Caste"
              onChange={HandleChange2}
            >
              {caste.map((row2) => {
                return (
                  <MenuItem value={row2.id}> {row2.castName} </MenuItem>
                )
              })}

            </Select>
          </FormControl>

          <Typography className="addheading" id="modal-modal-title" variant="h6" component="h2">
            Add Mandal
          </Typography>

          <input type="text" value={subcastedata.subcastName} onChange={Change} name='subcastName' className="editinput" placeholder='New Sub-caste' />
          <button className="submitbtn">Submit</button>
        </Box>
      </Modal>

      <div className='content'>
        <h1 className="heading3">Sub-caste Master List</h1>

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
                    <InputLabel id="demo-select-small">Select Caste</InputLabel>

                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      className="selectoptions"
                      value={castevalue}
                      label="Select Caste"
                      onChange={handleChange}
                    >
                      {caste.map((row2) => {
                        return (
                          <MenuItem value={row2.id}> {row2.castName} </MenuItem>
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

              <Typography style={{fontWeight: 'bold'}}>Either caste is not selected or data is not available...</Typography>
              : <>
                <TableHead>
                  <StyledTableRow>

                    <StyledTableCell className="padding">&nbsp;&nbsp;&nbsp;&nbsp;Sr.</StyledTableCell>
                    <StyledTableCell className="row2" align="left">Sub-caste</StyledTableCell>
                    <StyledTableCell align="left">&nbsp;Action</StyledTableCell>

                  </StyledTableRow>
                </TableHead>

                <TableBody>
                  {subcaste.map((row, index) => (
                    <StyledTableRow className="ab" key={index}>

                      <StyledTableCell align="left">&nbsp;{index + 1}</StyledTableCell>
                      <StyledTableCell align="left">{row.subcastName}</StyledTableCell>
                      <StyledTableCell align="left">
                        <BorderColorOutlinedIcon onClick={() => editsubcaste(row)} className="newicon" />
                        <DeleteOutlineIcon onClick={() => deletesubcaste(row)} className="delete" /></StyledTableCell>
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

export default SubCaste;