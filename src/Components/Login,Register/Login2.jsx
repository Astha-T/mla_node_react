
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './Login.css'
import { Navigate, useNavigate} from 'react-router-dom';
import { useState } from 'react';

const SignIn = ()  => {

    // variables to store input data in textfields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // state to store login-status
    const [isLogin, setIsLogin] = useState(false)

    // states to set labels of textfields
    const [emaillabel, setEmailLabel] = useState('Enter Email Address');
    const [passlabel, setPassLabel] = useState("Enter Password");

    // functions to change labels of textfields
    const ChangeEmailLabel = (event) => {
        setEmailLabel('')
        setEmail(event.target.value)
    }

    const ChangePassLabel = (event) => {
        setPassLabel('')
        setPassword(event.target.value)
    }

    // login function
    const submitHandler = async(e) => {
        e.preventDefault();

        const res = await fetch('http://206.189.130.102:5000/api/v1/adminlogin', {
            
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST"
            },
            body: JSON.stringify({
                email,
                password
            })
        })

       
        const data =await res.json();
        if (res.status === 400 || !data) {
            window.alert("Invalid Credentials");
        } else {
            window.alert("login successfully");
            sessionStorage.setItem('token', JSON.stringify(data.token));
            console.log(data.token)
            navigate('/dashboard');
        }
    }

    const navigate = useNavigate();

    
  // Getting token value from session storage
  const tokenstring = sessionStorage.getItem('token')
  const usertoken = JSON.parse(tokenstring);

    return (
       <> {usertoken ? <Navigate to ='/dashboard'/>
        // <div> <a href="/" rel="index,follow"></a>
        :<div className='containerlogin'>
        <Container className='containerlogin' maxWidth="xs" style={{backgroundColor: '#7648F0'}}>
            <CssBaseline />

            {/* logo image */}
            <img className='d-flex justify-content-center align-items-center logologin' src={require('../../Image/imgpsh_fullsize_anim.png')} />

            {/* main box start */}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#7648F0'
                }}

                shrink={false}
            >

                <div className="d-flex justify-content-center align-items-center form">

                    {/* login page heading */}
                    <Typography component="h1" variant="h5" className="heading6">
                        Login
                    </Typography>

                    {/* form start */}
                    <Box shrink={false} className="boxlogin" background="#FFFFFF" fontFamily='Poppins' component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>

                        {/* email label */}
                        <Typography component="h1" variant="h5" className="email">
                            Email address
                        </Typography>

                        {/* email textfield */}
                        <TextField
                            required
                            className='inputbox'
                            id="outlined-multiline"
                            label={emaillabel}
                            spacing="0.1"
                            value={email}
                            onChange={ChangeEmailLabel}
                            name="email"
                            InputProps={{
                                className: "inputbox",

                            }}
                            InputLabelProps={{
                                shrink: false,
                                className: "inputboxlabel",
                                spacing: "0.1"
                            }}
                        />

                        {/* password label */}
                        <Typography component="h1" variant="h5" className="password">
                            Password
                        </Typography>

                        {/* password textfield */}
                        <TextField
                            required
                            className='inputbox2'
                            name="password"
                            label={passlabel}
                            value={password}
                            onChange={ChangePassLabel}
                            type="password"
                            id="outlined-multiline-flexible"
                            autoComplete="current-password"
                            InputProps={{
                                className: "inputbox2",

                            }}
                            InputLabelProps={{
                                shrink: false,
                                className: "inputboxlabel2",
                            }}
                        />

                        <div>
                            {/* checkbox */}
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" className="check" />}
                                label=""
                            />

                            {/* checkbox label */}
                            <Typography component="h1" variant="h5" className="d-flex justify-content-left align-items-left remember">
                                Remember me on this computer
                        </Typography>
                        </div>

                        {/* login button */}
                        <Button
                            type="submit"
                            color='warning'
                            onClick={submitHandler}
                            className='loginbuttton'
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Login
                        </Button>

                        {/* registration button */}
                        {/* <Button
                            type="submit"
                            onClick={register}
                            color="primary"
                            className='registerbuttton'
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Registration
                        </Button> */}

                    </Box>
                    {/* form end */}
                </div>
            </Box>
            {/* main box end */}
        </Container>
        </div>}</>
        // </div>
    );
}

export default SignIn;