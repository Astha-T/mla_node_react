import React, { useState, useEffect } from 'react'
import './Pie.css'
import { styled } from '@mui/material/styles';
import  { tableCellClasses } from '@mui/material/TableCell';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#EEE8FF",
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const Result = () => {

    const [voter, setVoter] = React.useState([]);
    const getuser = () => {
        fetch("http://206.189.130.102:5000/api/v1/get-result")
            .then(response => {
                return response.json()
            }).then(data => {
                setVoter(data)
            })
    }
    useEffect(() => {
        getuser()
    }, [])

    return (
        <div>
            <h1 className="piecharttitle2">Past Election Results</h1>
            <Box sx={{ flexGrow: 1 }}>
                <TableContainer component={Paper} sx={{ height: '430px', width: '100%' }}>
                    <Table sx={{ Width: 350 }} size="small" aria-label="a dense table" stickyHeader>
                        <TableHead >
                            <TableRow>
                                <StyledTableCell align="center">Sr.</StyledTableCell>
                                <StyledTableCell align="center">Elections</StyledTableCell>
                                <StyledTableCell align="center">Party 1</StyledTableCell>
                                <StyledTableCell align="center">Party 2</StyledTableCell>
                                <StyledTableCell align="center">Party 3</StyledTableCell>
                                <StyledTableCell align="center">Others</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {voter.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                    <StyledTableCell align="center">{row.election}</StyledTableCell>
                                    <StyledTableCell align="center">{row.partyone}</StyledTableCell>
                                    <StyledTableCell align="center">{row.partytwo}</StyledTableCell>
                                    <StyledTableCell align="center">{row.partythree}</StyledTableCell>
                                    <StyledTableCell align="center">{row.others}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}

export default Result