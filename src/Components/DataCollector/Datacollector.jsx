import React, { useEffect, useState } from 'react'
import DashboardLayout from '../SideBarMui';
import Header from '../Header';
import '../Configure/pages.css'
import { NavLink } from 'react-router-dom'
import Typography from "@material-ui/core/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { experimentalStyled as styled } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

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
    fontSize: 14,
    fontFamily: 'Poppins',
    fontWeight: 400,
    borderBottom: 0,
    height: 19,
    marginBottom: 0,
    paddingBottom: 2,
    paddingTop: 5,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.action.white,
}));

const Datacollector = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const [users, setUsers] = useState([])
  const [datalength, setDataLength] = useState()

  const getuser = () => {
    fetch("http://206.189.130.102:5000/api/v1/search-datacollector")
      .then(response => {
        return response.json()
      }).then(data => {
        setUsers(data)
        setDataLength(data.length)
      })
  }

  console.log(datalength)

  useEffect(() => {
    getuser()
  }, [])

  function deleteUser(_id) {
    fetch(`http://206.189.130.102:5000/api/v1/delete-datacollector/${_id}`, {
      method: "DELETE"
    }).then((result) => {
      result.json().then((res) => {
        console.warn(res)
        window.alert("data collector removed")
        getuser()
      })
    })

  }

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

        <Box sx={{ '& button': { m: 1 } }}>
          <Button variant="outlined" className='databtn' href="/add">Create Data Collectors</Button>
        </Box>

        <div className='content'>
          <h1 className="headingAddData" style={{ top: '13.5%' }}>Data Collectors</h1>

          <TableContainer className="table3" component={Paper}>
            <Table aria-label="customized table">
              {!datalength ?

                <Typography style={{ fontWeight: 'bold' }}>No Data Available...</Typography>
                : <>
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell className='padding2'>Sr.</StyledTableCell>
                      <StyledTableCell className='thStyle' style={{ paddingLeft: '5%' }}>Data-collector</StyledTableCell>
                      <StyledTableCell className='thStyle'>Mobile Number</StyledTableCell>
                      <StyledTableCell className='thStyle' style={{ paddingLeft: '3.5%' }}>E-mail Id</StyledTableCell>
                      <StyledTableCell className='thStyle' style={{ paddingLeft: '3.5%' }}>Assign Volunteers</StyledTableCell>
                      <StyledTableCell className='thStyle' style={{ paddingLeft: '3.5%' }}>Action</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {users.filter((val) => {
                      if (searchTerm === "") {
                        return val
                      } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                      }
                    }).map((val, index) => (
                      <StyledTableRow
                        key={val.name}
                      >
                        <StyledTableCell style={{ paddingLeft: '2%' }}>{index + 1}</StyledTableCell>
                        <StyledTableCell style={{ paddingLeft: '6%' }}>{val.name}</StyledTableCell>
                        <StyledTableCell style={{ paddingLeft: '2%' }}>{val.number}</StyledTableCell>
                        <StyledTableCell>{val.email}</StyledTableCell>
                        <StyledTableCell><NavLink className="nav" to={`/asign/${val._id}`}><h6>ASSIGN</h6></NavLink></StyledTableCell>

                        <StyledTableCell className='action' >
                          <NavLink to={`/update/${val._id}`} ><BorderColorOutlinedIcon className='newicon' >border_color</BorderColorOutlinedIcon></NavLink>
                          <NavLink to={`/view/${val._id}`}><VisibilityOutlinedIcon className='view'>visibility</VisibilityOutlinedIcon></NavLink>
                          <NavLink to='' onClick={() => deleteUser(val._id)}><DeleteOutlineIcon className='delete'>delete</DeleteOutlineIcon></NavLink>
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

      export default Datacollector;