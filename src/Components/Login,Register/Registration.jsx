import React from 'react'
import './Registration.css'

const Registration = () => {
    return (
        <div className="container">
            <div className='row'>
                <div className='col-md-12'>
                    <img className="logo" src={require('../../Image/image 1.png')} />
                </div>
                <div className='d-flex justify-content-center align-items-center register'> </div>
                <h1 className='headingr'>Registration</h1>
                <h2 className='namelable'>Name</h2>
                <h2 className='mobilelable'>Mobile Number</h2>
                <h2 className='emaillable'>Email Address</h2>
                <h2 className='passlable'>Password</h2>
                <input className='inputname' type='text'></input>
                <input className='inputmobile' type='text'></input>
                <input className='inputemail' type='text'></input>
                <input className='inputpass' type='password'></input>
                <button className='registerr'>Registration</button>
                <button className='loginr'>Login</button>
            </div>
        </div>
    )
}

export default Registration;
