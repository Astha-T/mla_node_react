import React from 'react';
import { useNavigate } from 'react-router-dom'
import Header from '../../Components/Header';
import DashboardLayout from '../SideBarMui';
import { styled } from '@mui/material/styles';
import './Logout.css'
import SignIn from '../Login,Register/Login2';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

/*Logout Model Style start*/
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

/*Logout Model Style end*/

const Logout = () => {

  // Getting token value from session storage
  const tokenstring = sessionStorage.getItem('token')
  const usertoken = JSON.parse(tokenstring);

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false); //close logout model
    navigate(-1);  //navigating to previous page
  }

  // logout function
  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/');
    window.location.reload(true)
  }

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

        <div>

          <Modal
            /*Logout modal start*/
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style2}>

              {/* /*button to close model start*/}
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
              {/* /*button to close model end*/}

              {/* Modal content start */}
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Logout
              </Typography>
              <Typography className='logoutinput' id="modal-modal-description" sx={{ mt: 2 }}>
                Are you sure, you want to Logout?
              </Typography>
              {/* modal content end */}

              {/* logout button */}
              <button onClick={logout} className="submitbtnLog">LogOut</button>

            </Box>
          </Modal>
          {/* Logout modal end */}

        </div>
      </Box>
    </RootStyle>
  )
}

export default Logout;