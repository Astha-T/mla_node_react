import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { experimentalStyled as styled } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import '../Login,Register/Login.css'
import DashboardLayout from '../SideBarMui';
import Header from '../Header'
import './pages.css'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

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

// style for table row
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.white,
  fontFamily: 'Poppins',
  fontSize: 14,
  fontWeight: 600
}));

const BlockList = () => {

  // states for modals
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => {
    setOpen3(true);
    setBlockData('');
  }
  const handleClose3 = () => setOpen3(false);

  // states to get blocks and add/edit/delete a block
  const [tabledata, setTableData] = useState([])
  const [datalength, setDataLength] = useState()
  const [blockValue, setBlockValue] = useState('');
  const [blockId, setBlockId] = useState('')
  const [blockData, setBlockData] = useState({ blockName: '' })

  // API calling to fetch table data
  useEffect(() => {
    fetch('http://206.189.130.102:5000/api/v1/getblock')
      .then(res => res.json())
      .then(data => {

        localStorage.setItem('blockquantity', JSON.stringify(data.length));
        const updatedList = data.map((rows) => {

          return {
            _id: rows._id,
            blockName: rows.blockName
          }
        })
        setTableData(updatedList)
        setDataLength(updatedList.length)
      })
  })

  //function to get entered value as updated/new caste
  let name, value
  const Change = (e) => {
    name = e.target.name;
    value = e.target.value;
    setBlockData({ ...blockData, [name]: value });
  }

  // function to add new block
  const adddata = () => {
    let { blockName } = blockData
    const res = fetch('http://206.189.130.102:5000/api/v1/add-block', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({ blockName })
    });

    const data = res;

    if (data.status === 403 || !data) {
      window.alert("Cannot Add new block");
    } else {
      window.alert("Block Added Successfully");
    }
  }

  // function to store id of block user wants to edit in API
  const editblock = (event) => {
    setOpen(true)
    setBlockData('')
    setBlockId(event._id)
    setBlockValue(event.blockName)
  }

  //function to store id of block user wants to delete in API
  const deleteblock = (event) => {
    setOpen2(true)
    setBlockId(event._id)
    setBlockValue(event.blockName)
  }

  //function to edit block(using API)
  const EditConfirmation = () => {
    setOpen(false)
    let { blockName } = blockData
    const res = fetch(`http://206.189.130.102:5000/api/v1/update-block/${blockId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blockName })
    }).then((result) => {
      result.json().then((res) => {
        window.alert("Block Updated Successfully")
      })
    })
  }

  //function to delete block(using API)
  const DeleteConfirmation = () => {
    setOpen2(false)
    fetch(`http://206.189.130.102:5000/api/v1/delete-block/${blockId}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res)
        window.alert("Block removed")
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

          {/* Add Button (button to add a block) */}
          <Button onClick={handleOpen3} className='addbtn' variant="outlined" >Add</Button>
          <Button onClick={() => navigate(-1)} className='backbtn' id='configureback' style={{ marginTop: '-2.15%', marginLeft: '91%' }} variant="outlined" >Back</Button>
        </Box>

        {/* Modal 1 (modal opens on click of edit button of table's row ) starts */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" onSubmit={EditConfirmation} sx={style2}>

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
            {/* button to close modal 1 ends */}

            {/* modal 1 content starts */}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit BlockName
            </Typography>
            <input className="editinput" name="blockName" value={blockData.blockName} onChange={Change} placeholder={blockValue} />
            <button type='submit' className="submitbtn2">Submit</button>
            {/* modal 1 content ends */}

          </Box>
        </Modal>
        {/* Modal 1 (modal opens on click of edit button of table's row ) ends */}

        {/* Modal 2 (modal opens on click of delete button of table's row ) starts */}
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

            {/* modal content starts */}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Block?
            </Typography>
            <Typography className='deleteBlock' id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure, you want to delete <b>{blockValue}</b>?
            </Typography>
            <button className="submitbtn3" onClick={DeleteConfirmation}>Delete</button>
            {/* modal content ends */}

          </Box>
        </Modal>
        {/* Modal 2 (modal opens on click of delete button of table's row ) ends */}

        {/* Modal 3 (modal opens on click of add button ) starts */}
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
              Add Block
            </Typography>
            <input type="text" name="blockName" value={blockData.blockName} onChange={Change} className="editinput" placeholder='New Block' />
            <button className="submitbtn">Submit</button>
            {/* modal 3 content ends */}

          </Box>
        </Modal>
        {/* Modal 3 (modal opens on click of add button ) ends */}

        <div className='content'>

          {/* Heading */}
          <h1 className="heading3" >Block Master</h1>

          {/* Table starts */}
          <TableContainer className='table3' component={Paper}>
            <Table sx={{ minWidth: 280 }} aria-label="customized table">
              {!datalength ?

                <Typography style={{ fontWeight: 'bold' }}>No Data Available...</Typography>
                : <>
                  <TableHead>

                    {/* table header starts */}
                    <StyledTableRow className='font'>
                      <StyledTableCell className='padding'>&nbsp;&nbsp;&nbsp;&nbsp; Sr.</StyledTableCell>
                      <StyledTableCell className="row2" align="left">Block</StyledTableCell>
                      <StyledTableCell align="left">&nbsp;&nbsp;Action</StyledTableCell>
                    </StyledTableRow>
                    {/* table header ends */}

                  </TableHead>

                  {/* mapping of API data in table */}
                  <TableBody>
                    {tabledata.map((row, index) => (
                      // table body starts
                      <StyledTableRow key={row.blockName}>
                        <StyledTableCell align="left">&nbsp;&nbsp;{index + 1}</StyledTableCell>
                        <StyledTableCell align="left">{row.blockName}</StyledTableCell>
                        <StyledTableCell align="left">
                          <BorderColorOutlinedIcon onClick={() => editblock(row)} className="newicon" />
                          <DeleteOutlineIcon onClick={() => deleteblock(row)} className="delete" /></StyledTableCell>
                      </StyledTableRow>
                      // table body ends
                    ))}
                  </TableBody>
                </>}
            </Table>
          </TableContainer>
          {/* table ends */}

        </div>
      </Box >
    </RootStyle>
  )
};

export default BlockList;