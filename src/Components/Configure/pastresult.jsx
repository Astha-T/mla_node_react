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
    height: 450,
    borderRadius: 5,

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

const Pastresult = withStyles(styles)(props => {

    const [result, setResult] = React.useState([]);
    const [profession, setProfession] = useState([])
    const [datalength, setDataLength] = useState()
    const [ProfId, setProfId] = useState('')
    const [profffvalue, setProffvalue] = useState('');
    const [profdata, setProfData] = useState({ proffesionName: "" });

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [open2, setOpen2] = React.useState(false);
    const handleClose2 = () => setOpen2(false);
    const [open3, setOpen3] = React.useState(false);
    const handleOpen3 = () => {
        setOpen3(true);
        setProfData('');
    }
    const handleClose3 = () => setOpen3(false);

    let name, value
    const Change = (e) => {
        name = e.target.name;
        value = e.target.value;
        setProfData({ ...profdata, [name]: value });
    }

    const adddata = () => {
        let { proffesionName } = profdata
        const res = fetch('http://206.189.130.102:5000/api/v1/add-proffesion', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ proffesionName })
        });

        const data = res;

        if (data.status === 403 || !data) {
            window.alert("Cannot Add new profession");
        } else {
            window.alert("Proffesion Added Successfully");
        }
    }

    useEffect(() => {
        fetch('http://206.189.130.102:5000/api/v1/get-result')
            .then(res => res.json())
            .then(data => {
                const updatedList = data.map((rows) => {
                    return {
                        _id: rows._id,
                        proffesionName: rows.proffesionName
                    }
                })
                setProfession(updatedList)
                setDataLength(updatedList.length)
            })
    })

    const [update, setUpdate] = useState({
        election: "", partyone: "", partytwo: "", partythree: "", others: ""
    });

    let nam, valu
    const manage = (e) => {
        nam = e.target.name;
        valu = e.target.value;
        setUpdate({ ...update, [nam]: valu });
    }
    const getuser = () => {
        fetch("http://206.189.130.102:5000/api/v1/get-result")
            .then(response => {
                return response.json()
            }).then(data => {
                setResult(data)
            })
    }
    const PostResult = async (e) => {

        e.preventDefault();
        const { election, partyone, partytwo, partythree, others } = update;
        const res = fetch("http://206.189.130.102:5000/api/v1/add-result", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ election, partyone, partytwo, partythree, others })
        });

        const data = await res;

        if (!data) {
            window.alert(" plz filled  properly");
        } else {
            window.alert("Past-Result Created");
            getuser()
        }
    }

    const RootStyle = styled('div')({
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden'
    });

    function Deletepro(event) {
        setProffvalue(event.election)
        setOpen2(true)
        setProfId(event._id)
    }

    const DeleteConfirmation = () => {
        {
            setOpen2(false)

            fetch(`http://206.189.130.102:5000/api/v1/delete-result/${ProfId}`, {
                method: "DELETE"
            }).then((result) => {
                result.json().then((res) => {
                    console.warn(res)
                    window.alert("Data removed")
                    getuser()
                })
            })
        }
    }

    const Editpro = (event) => {

        setOpen(true)
        setProfData('')
        setProfId(event._id)
        setProffvalue(event.proffesionName)
    }

    const EditConfirmation = () => {

        setOpen(false)
        let { proffesionName } = profdata
        fetch(`http://206.189.130.102:5000/api/v1/update-proffesion/${ProfId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ proffesionName })
        }).then((result) => {
            result.json().then((res) => {
                window.alert("Profession Updated Successfully")
            })
        })
    }

    const navigate = useNavigate();

    useEffect(() => {
        getuser()
    }, [])

    return (
        <RootStyle>
            <DashboardLayout />

            <Box sx={{ width: '100%' }}>
                <Header />
                <Box sx={{ '& button': { m: 1 } }}>
                    <Button onClick={handleOpen3} className='addbtn' variant="outlined" size="small">Add</Button>
                    <Button onClick={() => navigate(-1)} className='backbtn' style={{ marginTop: '-2.15%', marginLeft: '91%' }} variant="outlined" >Back</Button>
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
                            Edit Profession
                        </Typography>
                        <input type="text" name='proffesionName' value={profdata.proffesionName} onChange={Change} className="editinput" placeholder={profffvalue} />
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
                            Delete proffesionName?
                        </Typography>
                        <Typography className='deleteBlock' id="modal-modal-description" sx={{ mt: 2 }}>
                            Are you sure, you want to delete <b>{profffvalue}</b>?
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
                            Add Results
                        </Typography>
                        <input type="text" name='election' value={update.election} onChange={manage} className="editinput" placeholder='Election Name' />
                        <Box>
                            <Typography className="addheading" id="modal-modal-title" variant="h6" component="h2">Status</Typography>
                            <Box sx={{ display: 'flex' }}>
                                <label className="editinput" placeholder='Party One'>Party One</label>
                                <input type="text" name='partyone' value={update.partyone} onChange={manage} className="editinput" placeholder='Election Name' />
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <label className="editinput" placeholder='Party One'>Party Two</label>
                                <input type="text" name='partytwo' value={update.partytwo} onChange={manage} className="editinput" placeholder='Election Name' />
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <label className="editinput" placeholder='Party One'>Party Three</label>
                                <input type="text" name='partythree' value={update.partythree} onChange={manage} className="editinput" placeholder='Election Name' />
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                <label className="editinput" placeholder='Party One'>Others</label>
                                <input type="text" name='others' value={update.others} onChange={manage} className="editinput" placeholder='Election Name' />
                            </Box>
                        </Box>
                        <button className="submitbtn" onClick={PostResult}>Submit</button>
                    </Box>
                </Modal>







                <div className='content'>
                    <h1 className="heading3">Election Results</h1>

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
                                            <StyledTableCell className="row2" align="left">Elections</StyledTableCell>
                                            <StyledTableCell className="row2" align="left">Party 1</StyledTableCell>
                                            <StyledTableCell className="row2" align="left">Party 2</StyledTableCell>
                                            <StyledTableCell className="row2" align="left">Party 3</StyledTableCell>
                                            <StyledTableCell className="row2" align="left">Others</StyledTableCell>
                                            <StyledTableCell align="left">&nbsp;&nbsp;&nbsp;Action</StyledTableCell>
                                        </StyledTableRow>
                                        {/* table header ends */}

                                    </TableHead>

                                    <TableBody>
                                        {result.map((row, index) => (
                                            <StyledTableRow key={index}>

                                                <StyledTableCell align="left">&nbsp;&nbsp;{index + 1}</StyledTableCell>
                                                <StyledTableCell align="left">{row.election}</StyledTableCell>
                                                <StyledTableCell align="left">{row.partyone}</StyledTableCell>
                                                <StyledTableCell align="left">{row.partytwo}</StyledTableCell>
                                                <StyledTableCell align="left">{row.partythree}</StyledTableCell>
                                                <StyledTableCell align="left">{row.others}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    {/* <BorderColorOutlinedIcon onClick={() => Editpro(row)} className="newicon" /> */}
                                                    <DeleteOutlineIcon onClick={() => Deletepro(row)} className="delete" /></StyledTableCell>
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

export default Pastresult;