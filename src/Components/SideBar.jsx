
import React from 'react'
import './Sidebar.css'
import Link from '@mui/material/Link';

const SideBar = () => {

    // Getting token value from session storage
    const tokenstring = sessionStorage.getItem('token')
    const usertoken = JSON.parse(tokenstring);

    const load = () => {
        window.localStorage.clear()
    }

    return (
        <div className="side">

            {/* Logo */}
            <img className="logo2" src={require('../Image/imgpsh_fullsize_anim.png')} />

            <hr />

            {/* Link with icon images */}
            <Link href="/dashboard" className="navbtn1"><img className='img7' src={require('../Image/Ellipse 244.png')} /><img className='img1_1' src={require('../Image/boximg2.png')} /><img className='img1_2' src={require('../Image/boximg1.png')} /><img className='img1_3' src={require('../Image/boximg1.png')} /><h3 className="option1" onClick={load}>Dashboard </h3></Link>
            <Link href='/analytical' className="navbtn2"><img className='img8' src={require('../Image/Ellipse 244.png')} /><img className='img2' src={require('../Image/Option1.png')} /><h3 className="option2">Analytics (Report)</h3></Link>
            <Link href="/datacollector" className="navbtn3"><img className='img9' src={require('../Image/Ellipse 244.png')} /><img className='img3' src={require('../Image/Option3.png')} /><h3 className="option3" onClick={load}>Data Collectors</h3></Link>
            <Link href="/import" className="navbtn6"><img className='img10' src={require('../Image/Ellipse 244.png')} /><img className='img4' src={require('../Image/Option3.png')} /><h3 className="option6" onClick={load}>Import Data</h3></Link>
            <Link href="/voter" className="navbtn4"><img className='img11' src={require('../Image/Ellipse 244.png')} /><img className='img5' src={require('../Image/Option1.png')} /><h3 className="option4" onClick={load}>Voter</h3></Link>

            {/* to show logout option only when user is already logged-in */}
            
                <Link href="/masterlist" className="navbtn5"><img className='img12' src={require('../Image/Ellipse 244.png')} /><img className='img6' src={require('../Image/Option6.png')} /><h3 className="option5" onClick={load}>Configure</h3></Link>
            
            {(usertoken) &&
                <Link href="/logout" className="navbtn7"><img className='img14' src={require('../Image/Ellipse 244.png')} /><img className='img13' src={require('../Image/Option4.png')} /><h3 className="option7">Logout</h3></Link>
            }
        </div>
    )
}

export default SideBar;