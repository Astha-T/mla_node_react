import React, { useState, useEffect } from 'react'
import DashboardLayout from '../SideBarMui';
import Header from '../Header';
import { useNavigate, Navigate } from 'react-router-dom';
import './dashboard.css'

import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// theme and style of Item
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  fontFamily: 'Poppins'
}));

const DashBoard = () => {

  // Getting token value from session storage
  const tokenstring = sessionStorage.getItem('token')
  const usertoken = JSON.parse(tokenstring);

  const [data, setData] = useState([])
  const [one, setOne] = useState([])
  const [two, setTwo] = useState([])
  const [three, setThree] = useState([])
  const [four, setFour] = useState([])
  const [blocks, setBlocks] = useState([])
  const [mandals, setMandals] = useState([])
  const [sectors, setSectors] = useState([])
  const [booths, setBooths] = useState([])
  const [item, setItem] = useState([])
  const [partylsit,setPartyList] = useState([])
  const [display,setDisplay] = useState(true)

  useEffect(() => {
    fetch('http://206.189.130.102:5000/getdata')
      .then(res => res.json())
      .then(data => {
        setItem(data)
        setPartyList(data.partyName.length)
      })
  })

  // console.log(partylsit)

  useEffect(() => {
    fetch('http://206.189.130.102:5000/api/v1/get-info?blockName=block')
      .then(res => res.json())
      .then(data => {

        setBlocks(data.length)
      })
  })

  useEffect(() => {
    fetch('http://206.189.130.102:5000/api/v1/get-info?mandalName=mandal')
      .then(res => res.json())
      .then(data => {

        setMandals(data.length)
      })
  })

  useEffect(() => {
    fetch('http://206.189.130.102:5000/api/v1/get-info?sectorName=sector')
      .then(res => res.json())
      .then(data => {

        setSectors(data.length)
      })
  })

  useEffect(() => {
    fetch('http://206.189.130.102:5000/api/v1/get-info?boothName=booth')
      .then(res => res.json())
      .then(data => {

        setBooths(data.length)
      })
  })

  const getitem = () => {
    fetch("http://206.189.130.102:5000/api/v1/totalrujhan")
      .then(response => {
        return response.json()
      }).then(data => {
        setData(data)
      })
  }

  const getitemone = () => {
    fetch("http://206.189.130.102:5000/api/v1/rujhan/BJP")
      .then(response => {
        return response.json()
      }).then(data => {
        setOne(data)
      })
  }

  const getitemtwo = () => {
    fetch("http://206.189.130.102:5000/api/v1/rujhan/Congress")
      .then(response => {
        return response.json()
      }).then(data => {
        setTwo(data)
      })
  }

  const getitemthree = () => {
    fetch("http://206.189.130.102:5000/api/v1/rujhan/AAP")
      .then(response => {
        return response.json()
      }).then(data => {
        setThree(data)
      })
  }

  const getitemfour = () => {
    fetch("http://206.189.130.102:5000/api/v1/rujhan/shiv sena")
      .then(response => {
        return response.json()
      }).then(data => {
        setFour(data)
      })
  }

  useEffect(() => {
    getitem()
    getitemone()
    getitemtwo()
    getitemthree()
    getitemfour()
  }, [])

  function report() {
    var a = one.length;
    var c = data.length;
    var x = a / c * 100;
    x = x.toFixed(2)
    return x;
  }

  function reports() {
    var a = two.length;
    var c = data.length;
    var x = a / c * 100;
    x = x.toFixed(2)
    return x;
  }

  function report3() {
    var a = three.length;
    var c = data.length;
    var x = a / c * 100;
    x = x.toFixed(2)
    return x;
  }

  function report4() {
    var a = four.length;
    var c = data.length;
    var x = a / c * 100;
    x = x.toFixed(2)
    return x;
  }

  const RootStyle = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
});

  const navigate = useNavigate();

  return (
    (!usertoken ? <Navigate to='/' />
      :
      <RootStyle>
        <DashboardLayout/>
        
        <Box sx={{ width: '100%'}}>
        <Header />

        <div className='dash'>
          <CssBaseline />

          {/* main container starts */}
          <Container className="containerdash" maxWidth="md" style={{marginBottom: '5%'}}>

            {/* main box starts */}
            <Box className="mainbox" sx={{ bgcolor: '#F8F8F8', height: '100px', fontFamily: 'Popppins' }}>

              {/* heading */}
              <h1 className="headingdash">Overall Rujhaan</h1>

              {/* grid box 1 starts */}
              <Box className="boxrujhaan">

                {/* main grid 1 starts */}
                <Grid container spacing={{ xs: 3, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                  {partylsit && 
                  <>
                  {item.map((val, index) => {

                    // if(index%3===0)
                    // {
                    //   setStyle=({
                    //     backgroundColor: '#FFE1E2',
                    //     color: '#973629'
                    //   })
                    // }
                    // else if(index%2===0)
                    // {
                    //   setStyle=({
                    //     backgroundColor: '#FFE1E2',
                    //     color: '#973629'
                    //   })
                    // }

                    // else{
                    //   setStyle=({
                    //     backgroundColor: '#FFE1E2',
                    //     color: '#973629'
                    //   })
                    // }

                      return (
                        <>
                          <Grid className="grid" item xs={2} sm={2} md={3}>
                            
                            <Item className="rujhaan1"> {/*style={style}*/ }
                              <h1 className="d-flex justify-content-center align-items-center percentage">{val.value.toFixed(2)}%</h1>
                              <h2 className="d-flex justify-content-center align-items-center Party1">{val.partyName}</h2>
                            </Item>
                          </Grid>
                        </>
                      )
                      
                  })}</>}

                  {!partylsit && 
                  <p className='d-flex justify-content-center align-items-center nopara'>No Rujhaan Data Found</p>}

                </Grid>
                {/* main grid 1 ends*/}

              </Box>
              {/* grid box 1 ends */}

              {/* grid box 2 starts */}
              <Box className="box3" sx={{ flexGrow: 1, marginBottom: '5%'}}>

                {/* main grid 2 starts */}
                <Grid container columnSpacing={{ xs: 4.5, sm: 7, md: 10 }} paddingTop='none'>

                  {/* grid 1 for no. of "Vibhansabha" starts */}
                  <Grid item xs={4} sm={2.3} md={2.3}  >
                    <Item className="partyboxes" >
                      <h1 className="d-flex justify-content-center align-items-center quantity">3</h1>
                      <h2 className="d-flex justify-content-center align-items-center section">Vidhansabha</h2>
                    </Item>
                  </Grid>
                  {/* grid 1 for no. of "Vibhansabha" ends */}

                  {/* grid 2 for no. of "blocks" starts */}
                  <Grid  item xs={4} sm={2.3} md={2.3} ><Link className="switch" href="/blocklist">
                    <Item className="partyboxes">
                      <h1 className="d-flex justify-content-center align-items-center quantity">{blocks}</h1>
                      <h2 className="d-flex justify-content-center align-items-center section">Block</h2>
                    </Item></Link>
                  </Grid>
                  {/* grid 2 for no. of "blocks" ends */}

                  {/* grid 3 for no. of "mandals" starts */}
                  <Grid  item xs={4} sm={2.3} md={2.3} ><Link className="switch" href="/mandalmaster">
                    <Item className="partyboxes">
                      <h1 className="d-flex justify-content-center align-items-center quantity">{mandals}</h1>
                      <h2 className="d-flex justify-content-center align-items-center section">Mandal</h2>
                    </Item></Link>
                  </Grid>
                  {/* grid 3 for no. of "mandals" ends */}

                  {/* grid 4 for no. of "sectors" starts */}
                  <Grid  item xs={4} sm={2.3} md={2.3} ><Link className="switch" href="/sectormaster">
                    <Item className="partyboxes">
                      <h1 className="d-flex justify-content-center align-items-center quantity">{sectors}</h1>
                      <h2 className="d-flex justify-content-center align-items-center section">Sector</h2>
                    </Item></Link>
                  </Grid>
                  {/* grid 4 for no. of "sectors" ends */}

                  {/* grid 5 for no. of "booths" starts */}
                  <Grid  item xs={4} sm={2.3} md={2.3} ><Link className="switch" href="/boothmaster">
                    <Item className="partyboxes">
                      <h1 className="d-flex justify-content-center align-items-center quantity">{booths}</h1>
                      <h2 className="d-flex justify-content-center align-items-center section">Booth</h2>
                    </Item></Link>
                  </Grid>
                  {/* grid 5 for no. of "booths" ends */}

                </Grid>
                {/* main grid 2 ends */}

              </Box>
              {/* grid box 2 ends */}

            </Box>
            {/* main box ends */}

          </Container>
          {/* main container ends */}
        </div>
        
      </Box>
      </RootStyle>)
  )
}

export default DashBoard;