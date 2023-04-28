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
import './pages.css';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../SideBarMui';
import Header from '../Header';

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

const EducationLevel = withStyles(styles)(props => {

  const [education1, setEducation1] = useState([])
  const [datalength,setDataLength] = useState()
  const [eduvalue, setEduvalue] = useState('');
  const [eduId, setEduId] = useState('');

  const [educationdata, setEducationData] = useState({ educationName: "" });

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => {
    setOpen3(false);
    setEducationData('')
  }

  useEffect(() => {
    fetch('http://206.189.130.102:5000/api/v1/get-education')
      .then(res => res.json())
      .then(data => {
        const updatedList = data.map((rows) => {
          return {

            _id: rows._id,
            educationName: rows.educationName
          }
        })
        setEducation1(updatedList)
        setDataLength(updatedList.length)
      })
  })

  let name, value
  const Change = (e) => {
    name = e.target.name;
    value = e.target.value;
    setEducationData({ ...educationdata, [name]: value, });
  }

  const adddata = () => {
    let { educationName } = educationdata
    const res = fetch('http://206.189.130.102:5000/api/v1/add-education', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ educationName })
    });

    const data = res;

    if (data.status === 403 || !data) {
      window.alert("Cannot Add new education");
    } else {
      window.alert("Education Added Successfully");
    }
  }

  function DeleteEdu(event) {
    setEduvalue(event.educationName)
    setOpen2(true)
    setEduId(event._id)
  }

  const DeleteConfirmation = () => {
    setOpen2(false)
    fetch(`http://206.189.130.102:5000/api/v1/delete-education/${eduId}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res)
        window.alert("Data removed")
      })
    })
  }

  function EditEdu(event) {
    setOpen(true)
    setEducationData('')
    setEduId(event._id)
    setEduvalue(event.educationName)
  }

  const EditConfirmation = () => {
    setOpen(false)
    let { educationName } = educationdata
    fetch(`http://206.189.130.102:5000/api/v1/update-education/${eduId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ educationName })
    }).then((result) => {
      result.json().then((res) => {
        window.alert("Data Updated Successfully")
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
            Edit data
          </Typography>
          <input type="text" name="educationName" value={educationdata.educationName} onChange={Change} className="editinput" placeholder={eduvalue} />
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
            Delete Data?
          </Typography>
          <Typography className='deleteBlock' id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure, you want to delete <b>{eduvalue}</b>?
          </Typography>
          <button onClick={DeleteConfirmation} className="submitbtn">Delete</button>
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
          <Typography className="addheading" id="modal-modal-title" variant="h6" component="h2">
            Add Education
          </Typography>
          <input type="text" name='educationName' value={educationdata.educationName} onChange={Change} className="editinput" placeholder='New Data' />
          <button className="submitbtn">Submit</button>
        </Box>
      </Modal>

      <div className='content'>
        <h1 className="heading3">Education Level</h1>

        <TableContainer className='table3' component={Paper}>
          <Table sx={{ minWidth: 280 }} aria-label="customized table">
            {!datalength ?

              <Typography style={{fontWeight: 'bold'}}>No Data Available...</Typography>
              : <>
                <TableHead>

                  {/* table header starts */}
                  <StyledTableRow>
                    <StyledTableCell className='padding'>&nbsp;&nbsp;&nbsp;&nbsp; Sr.</StyledTableCell>
                    <StyledTableCell className="row2" align="left">Education</StyledTableCell>
                    <StyledTableCell align="left">&nbsp;Action</StyledTableCell>
                  </StyledTableRow>
                  {/* table header ends */}

                </TableHead>

                <TableBody>
                  {education1.map((row, index) => (
                    <StyledTableRow key={index}>

                      <StyledTableCell align="left">&nbsp;&nbsp;{index + 1}</StyledTableCell>
                      <StyledTableCell align="left">{row.educationName}</StyledTableCell>
                      <StyledTableCell align="left">
                        <BorderColorOutlinedIcon onClick={() => EditEdu(row)} className="newicon" />
                        <DeleteOutlineIcon onClick={() => DeleteEdu(row)} className="delete" /></StyledTableCell>
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

export default EducationLevel;