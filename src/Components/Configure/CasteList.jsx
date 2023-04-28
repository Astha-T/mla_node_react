import React, { useEffect, useState } from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import { withStyles } from "@material-ui/core/styles";
import { deepPurple } from '@mui/material/colors';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './pages.css'
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../SideBarMui';
import Header from '../Header'

const styles = theme => ({
  searchbar: {
    height: 39,
    width: 347,
    marginLeft: 276,
    top: 10
  }
})

// style for modals
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

// style for table cells
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

// style for table rows
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.white
}));

const CasteList = withStyles(styles)(props => {

  // states to set table data and edit and add table data
  const [caste, setCaste] = useState([])
  const [datalength, setDataLength] = useState()
  const [castevalue, setCastevalue] = useState('');
  const [CasteId, setCasteId] = useState();
  const [castedata, setCasteData] = useState({ castName: "" });

  // states for modals
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => {
    setOpen3(true);
    setCasteData('');
  }
  const handleClose3 = () =>
    setOpen3(false);

  // variables to store value of edit and add textfields

  // fetching data through API
  useEffect(() => {
    fetch('http://206.189.130.102:5000/api/v1/get-cast')
      .then(res => res.json())
      .then(data => {

        const updatedList = data.map((rows) => {
          return {
            _id: rows._id,
            castName: rows.castName
          }
        })
        setCaste(updatedList)
        setDataLength(updatedList.length)
      })
  })

  const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
  });

  //function to get entered value as updated/new caste
  let name, value
  const Change = (e) => {
    name = e.target.name;
    value = e.target.value;
    setCasteData({ ...castedata, [name]: value, });
  }

  // function to add new caste
  const adddata = () => {
    let { castName } = castedata
    const res = fetch('http://206.189.130.102:5000/api/v1/add-cast', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ castName })
    });

    const data = res;

    if (data.status === 403 || !data) {
      window.alert("Cannot Add new caste");
    } else {
      window.alert("Caste Added Successfully");
    }
  }

  //getting the id and value of the caste to delete existing caste
  const DeleteCaste = (event) => {
    setOpen2(true)
    setCasteId(event._id)
    setCastevalue(event.castName)
  }

  //getting the id and value of the caste to update caste
  const EditCaste = (event) => {
    setOpen(true)
    setCasteData('')
    setCasteId(event._id)
    setCastevalue(event.castName)
  }

  // calling API to delete data
  const DeleteConfirmation = () => {
    setOpen2(false)
    fetch(`http://206.189.130.102:5000/api/v1/delete-cast/${CasteId}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res)
        window.alert("Caste removed")
      })
    })
  }

  // calling API to edit data
  const EditConfirmation = (event) => {
    setOpen(false)
    let { castName } = castedata
    fetch(`http://206.189.130.102:5000/api/v1/update-cast/${CasteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ castName })
    }).then((result) => {
      result.json().then((res) => {
        window.alert("Caste Updated Successfully")
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

          {/* button to add new caste */}
          <Button onClick={handleOpen3} className='addbtn' variant="outlined" size="small">Add</Button>
          <Button onClick={() => navigate(-1)} className='backbtn' id='configureback' style={{ marginTop: '-2.15%', marginLeft: '91%' }} variant="outlined" >Back</Button>
        </Box>

        {/* modal 1 (modal to edit caste) starts */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component='form' onSubmit={EditConfirmation} sx={style2}>

            {/* button to close modal 1 starts */}
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
            {/* buttom to close modal 1 ends */}

            {/* modal 1 content starts */}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit caste
            </Typography>
            <input type="text" name='castName' value={castedata.castName} onChange={Change} className="editinput" placeholder={castevalue} />
            <button type="submit" className="submitbtn">Submit</button>
            {/* modal 1 content ends */}

          </Box>
        </Modal>
        {/* modal 1 (modal to edit caste) ends */}

        {/* modal 2 (modal to delete caste starts) */}
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>

            {/* button to close modal 2 starts */}
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
            {/* button to close modal 2 ends */}

            {/* modal 2 content starts */}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Caste?
            </Typography>
            <Typography className='deleteBlock' id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure, you want to delete <b>{castevalue}</b>?
            </Typography>
            <button onClick={DeleteConfirmation} className="submitbtn">Delete</button>
            {/* modal 2 content ends */}

          </Box>
        </Modal>
        {/* modal 2 (modal to delete caste) ends */}

        {/* modal 3 (modal to add new caste) starts */}
        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component='form' onSubmit={adddata} sx={style2}>

            {/* button to close modal 3 starts */}
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
            {/* button to close modal 3 ends */}

            {/* modal 3 content starts */}
            <Typography className="addheading" id="modal-modal-title" variant="h6" component="h2">
              Add Caste
            </Typography>
            <input type="text" name='castName' value={castedata.castName} onChange={Change} className="editinput" placeholder='New Caste' />
            <button className="submitbtn">Submit</button>
            {/* modal 3 content ends */}

          </Box>
        </Modal>
        {/* modal 3 (modal to add new caste) ends */}

        <div className='content'>

          {/* Heading */}
          <h1 className="heading3">Caste Master List</h1>

          {/* Table starts */}
          <TableContainer className='table3' component={Paper}>
            <Table sx={{ minWidth: 280 }} aria-label="customized table">

              {!datalength ?

                <Typography style={{ fontWeight: 'bold' }}>No Data Available...</Typography>
                : <>
                  <TableHead>

                    {/* table header starts */}
                    <StyledTableRow>
                      <StyledTableCell className='padding'>&nbsp;&nbsp;&nbsp;&nbsp; Sr.</StyledTableCell>
                      <StyledTableCell className="row2" align="left">Caste</StyledTableCell>
                      <StyledTableCell align="left">&nbsp;Action</StyledTableCell>
                    </StyledTableRow>
                    {/* table header ends */}

                  </TableHead>

                  {/* Table body starts */}
                  <TableBody>

                    {/* mapping data from api with table */}
                    {caste.map((row, index) => (
                      // table rows starts
                      <StyledTableRow key={row._id}>
                        <StyledTableCell align="left">&nbsp;&nbsp;{index + 1}</StyledTableCell>
                        <StyledTableCell align="left">{row.castName}</StyledTableCell>
                        <StyledTableCell align="left">
                          <BorderColorOutlinedIcon onClick={() => EditCaste(row)} className="newicon" />
                          <DeleteOutlineIcon onClick={() => DeleteCaste(row)} className="delete" />
                        </StyledTableCell>
                      </StyledTableRow>
                      // table rows ends
                    ))}

                    {/* here we are passing the value of cast to edit button so that we can fetch the value and show it
              as placeholder of edit textfield by using "event.target.value" in "seteditid" function. */}

                  </TableBody>
                  {/* table body ends */}
                </>}
            </Table>
          </TableContainer>
          {/* Table ends */}

        </div>
      </Box>
    </RootStyle>
  )
});

export default CasteList;