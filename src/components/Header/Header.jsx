import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppsIcon from '@mui/icons-material/Apps';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GridViewIcon from '@mui/icons-material/GridView';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import InfoIcon from '@mui/icons-material/Info';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#f1f3f4',
    '&:focus': {
        backgroundColor:'white',
    },
    width: '100%', 
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
    },
    width: '100%',
  }));


function Header(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [hide,setHide] = useState(true);
    const open = Boolean(anchorEl);
    // const location = window.location.href;
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    let showListView = () => {
        setHide(!hide);
        props.toggleView();
    }
    const navigate = useNavigate();
    let onSignOut = () => {
        localStorage.removeItem('token');
        toast(() => (
            <span style={{display:'flex',alignItems:'center'}}><InfoIcon color='primary'/>You have Logged Out</span>
        ),'duration: 2000');
        navigate('/')
    }

    const openSearchBar = () => {
        
    }

  return (
    <React.Fragment>
        <Box sx={{ flexGrow: 1,position:'sticky',zIndex:3,marginBottom:10 }} >
            <AppBar  elevation={0} sx={{borderBottom:'1px solid #dadce0'}}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center',backgroundColor:'white',color:'#5f6368'}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 1 }}
                        onClick={() => {
                            props.handleOpen();
                            props.setClicked(prev => !prev);
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component={'span'}
                        sx={{ display: { xs:'flex',alignItems:'center' }}}
                    >
                        <React.Fragment>
                            <img
                            className="gb_Rc gb_Rd"
                            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                            srcSet="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x "
                            alt=""
                            aria-hidden="true"
                            role="presentation"
                            style={{ width: '40px', height: '40px' }}
                            />
                            {props.title}
                        </React.Fragment>
                    </Typography>
                    <Box sx={{flexGrow:1,mx:14,display:{xs:'none',md:'flex'}}}>
                        <Search sx={{display:{xs:'none',md:'flex'},justifyContent:'flex-start',alignItems:'center',borderRadius:'10px',padding:'5px',bgcolor: "background.paper",boxShadow:' 0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)'}}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={props.searchText} onChange={(e) => props.setSearchText(e.target.value)}
                            />
                        </Search>
                    </Box>
                    <Box sx={{flexGrow:{xs:1,md:0}}}/>
                    <Box sx={{ display: 'flex',justifyContent:'flex-end'}}>
                        <IconButton size="large"  color="inherit" sx={{display:{xs:'flex',md:'none'}}} onClick={openSearchBar}>
                            <SearchIcon />
                        </IconButton>
                        <IconButton size="large"  color="inherit">
                            <RefreshIcon />
                        </IconButton>
                        <IconButton size="large"  color="inherit" sx={{display:{xs:'none',md:'flex'}}} onClick={showListView}>
                            {hide? <ViewStreamIcon /> : <GridViewIcon />}
                        </IconButton>
                        <IconButton size="large"  color="inherit">
                            <SettingsIcon />
                        </IconButton>
                        <IconButton size="large"  color="inherit">
                            <AppsIcon />
                        </IconButton>
                        <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-haspopup="true"
                        color="inherit"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        >
                            <AccountCircle />   
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                            'aria-labelledby': 'basic-button',
                            }}
                            >
                            <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
    return {
        title: state.navReducer.title
    };
};

export default connect(mapStateToProps)(Header)