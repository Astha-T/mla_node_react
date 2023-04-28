import * as React from 'react'
import Link from '@mui/material/Link';
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag'
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import Brightness5Icon from '@mui/icons-material/Brightness5'
import ControlCameraIcon from '@mui/icons-material/ControlCamera'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'

const drawerWidth = 220;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(6)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(7)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#6E3FEE',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function DashboardLayout() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false) ;
    const [show,setShow] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        setShow(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setShow(false);
    };


    const items = [
        <Link href="/dashboard"><Typography style={{color: '#FFFFFF', textDecoration: 'none'}}><LanguageSharpIcon />&nbsp;&nbsp;&nbsp;Dashboard</Typography> </Link>,
        <Link href="/analytical"><Typography style={{color: '#FFFFFF', textDecoration: 'none'}}><OutlinedFlagIcon />&nbsp;&nbsp;&nbsp;Analytics</Typography></Link>,
        <Link href="/datacollector"><Typography style={{color: '#FFFFFF', textDecoration: 'none'}}><BeachAccessIcon />&nbsp;&nbsp;&nbsp;Data Collector</Typography></Link>,
        <Link href="/import"><Typography style={{color: '#FFFFFF', textDecoration: 'none'}} ><AssignmentTurnedInOutlinedIcon />&nbsp;&nbsp;&nbsp;Import Data</Typography></Link>,
        <Link href="/masterlist"><Typography style={{color: '#FFFFFF', textDecoration: 'none'}}><DescriptionOutlinedIcon />&nbsp;&nbsp;&nbsp;Configure</Typography></Link>,
        <Link href="/voter"><Typography style={{color: '#FFFFFF', textDecoration: 'none'}} ><ControlCameraIcon />&nbsp;&nbsp;&nbsp;Voters</Typography></Link>,
        <Link href="/logout"><Typography style={{color: '#FFFFFF', textDecoration: 'none'}} ><ExitToAppRoundedIcon />&nbsp;&nbsp;&nbsp;Logout</Typography></Link>,
    ]
    const item = [
        <Link href="/dashboard"><LanguageSharpIcon style={{color: '#FFFFFF', textDecoration: 'none'}} /></Link>,
        <Link href="/analytical"><OutlinedFlagIcon style={{color: '#FFFFFF', textDecoration: 'none'}}/></Link>,
        <Link href="/datacollector"><BeachAccessIcon style={{color: '#FFFFFF', textDecoration: 'none'}}/></Link>,
        <Link href="/import"><AssignmentTurnedInOutlinedIcon style={{color: '#FFFFFF', textDecoration: 'none'}}/></Link>,
        <Link href="/masterlist"><DescriptionOutlinedIcon style={{color: '#FFFFFF', textDecoration: 'none'}}/></Link>,
        <Link href="/voter"><ControlCameraIcon style={{color: '#FFFFFF', textDecoration: 'none'}}/></Link>,
        <Link href="/voters"><ControlCameraIcon style={{color: '#FFFFFF', textDecoration: 'none'}}/></Link>,
        <Link href="/logout"><ExitToAppRoundedIcon style={{color: '#FFFFFF', textDecoration: 'none'}}/></Link>,
    ]


    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />

            <Drawer variant="permanent" open={open}
                PaperProps={{
                    sx: {
                        bgcolor: '#6E3FEE',
                        borderRight: '2px solid #673AB7',
                        borderRadius: 5
                    },
                }}
            >
                <DrawerHeader>

                    {/* <IconButton onClick={handleDrawerOpen} >
           {theme.direction === 'rtl' ?<ChevronRightIcon />  : <ChevronLeftIcon />}
          </IconButton> */}
                    <IconButton>
                        {open ? <ChevronLeftIcon sx={{ bgcolor: 'white', borderRadius: 5, color: 'dark' }} onClick={handleDrawerClose} /> : <ChevronRightIcon sx={{ bgcolor: 'white', borderRadius: 5, color: 'dark' }} onClick={handleDrawerOpen} />}
                        {show &&  <img className="logo2" src={require('../Image/imgpsh_fullsize_anim.png')} />}</IconButton>
                </DrawerHeader>

                {open ? <List>
                    {items.map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block', color: '#FFFFFF' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    color: '#FFFFFF'
                                }}
                            >
                                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: '#FFFFFF'  }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> : <List>
                    {item.map((text, index) => (
                        <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>}
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, }}>
                <DrawerHeader />
            </Box>
        </Box>
    );
}