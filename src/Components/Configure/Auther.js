import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const Authuser = () => {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenstring = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenstring);
        return userToken;
    }

    const [token, setToken] = useState(getToken);
    let saveToken = (token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        setToken(token);
        navigate('/');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/dashboard');
    }


    const http = axios.create({
        baseURL: "http://206.189.130.102:5000/api/v1/adminlogin",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    });

    return {
        setToken: saveToken,
        token,
        getToken,
        http,
        logout
    }
}

export default Authuser;

