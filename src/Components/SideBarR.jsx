import React from 'react';
import './SidebarR.css';
import Link from '@mui/material/Link';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SideBarR = () => {

    // Getting token value from session storage
    const tokenstring = sessionStorage.getItem('token')
    const usertoken = JSON.parse(tokenstring);

    const navigate =useNavigate();

     if(!usertoken)
     {
        navigate('./')
     }

     const load = () => {
        window.localStorage.clear()
     }

    return (

        <>{!usertoken ? <Navigate to ='/'/>
       : <div className="sideR">

            {/* /*Logo*/}
            <img className="logo2R" src={require('../Image/imgpsh_fullsize_anim.png')} />

            <hr />

            {/* Links with icon images*/}
            <Link href="/dashboard" className="navbtnR1"><img className='img7' src={require('../Image/Ellipse 244.png')} /><img className='img1_1' src={require('../Image/boximg2.png')} /><img className='img1_2' src={require('../Image/boximg1.png')} /><img className='img1_3' src={require('../Image/boximg1.png')} /><h3 className="optionR1" onClick={load}>Dashboard </h3></Link>
            <Link href="/analytical" className="navbtnR2"><img className='img8' src={require('../Image/Ellipse 244.png')} /><img className='img2' src={require('../Image/Option1.png')} /><h3 className="optionR2">Analytics (Report)</h3></Link>
            <Link href="/datacollector" className="navbtnR3"><img className='img9' src={require('../Image/Ellipse 244.png')} /><img className='img3' src={require('../Image/Option3.png')} /><h3 className="optionR3" onClick={load}>Data Collectors</h3></Link>
            <Link href="/import" className="navbtnR6"><img className='img10' src={require('../Image/Ellipse 244.png')} /><img className='img4' src={require('../Image/Option3.png')} /><h3 className="optionR6" onClick={load}>Import Data</h3></Link>
            <Link href="/masterlist" className="navbtnR5"><img className='img12' src={require('../Image/Ellipse 244.png')} /><img className='img6' src={require('../Image/Option6.png')} /><h3 className="optionR5" onClick={load}>Configure</h3></Link>
            <Link href="/voter" className="navbtnR4"><img className='img11' src={require('../Image/Ellipse 244.png')} /><img className='img5' src={require('../Image/Option1.png')} /><h3 className="optionR4" onClick={load}>Voter</h3></Link>
             {/* to show logout option only when user is already logged-in */}
             {(usertoken) &&
             <Link href="/logout" className="navbtnR7"><img className='img14' src={require('../Image/Ellipse 244.png')} /><img className='img13' src={require('../Image/Option4.png')} /><h3 className="optionR7">Logout</h3></Link>
             }
             </div>}</>
    )
}

export default SideBarR;