import React, { useState } from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Drawer from '@mui/material/Drawer';
import Header from '../Header/Header';
import './LeftDrawer.css';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { connect,useDispatch } from 'react-redux';

function LeftDrawer(props) {
  const [state, setState] = React.useState({
    left: false,
  });
  const [clicked,setClicked] = useState(false)
  const [selected,setSelected]= useState("Notes");

  // if(state.left === true) {
  //   props.setLeftDrawerOpen(true);
  // } 
  // if(state.left === false) {
  //   props.setLeftDrawerOpen(false);
  // }
  let dispatch = useDispatch();
  const handleTitleUpdate = (text) => {
    console.log(text)
    dispatch({type:text})
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{width: state.left ? '280px' : '65px'}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {[{text:'Notes',icon: <LightbulbIcon/>,route:'/dashboard'},{text:'Remainder',icon: <NotificationsIcon/>},{text:'Edit Label',icon: <EditIcon/>},{text:'Archive',icon: <ArchiveIcon/>,route:'/archive'},{text:'Trash',icon: <DeleteIcon/>,route:'/trash'}]
        .map(({text,icon,route}, index) => (
          <Link  key={text} to={route} style={{ textDecoration: 'none', color: 'inherit' }}  onClick={() =>{handleTitleUpdate(text);setSelected(text)}}>   
            <ListItem disablePadding>
              {state.left? 
                (
                  <ListItemButton sx={{backgroundColor: selected === text ? '#feefc3' : '','&:hover':{backgroundColor: selected === text ? '#feefc3' : ''}}}>
                    <IconButton size='large' disabled>
                      {icon}
                    </IconButton>
                    <ListItemText primary={text} sx={{marginLeft:'20px'}}/>
                  </ListItemButton> 
                ):
                (
                  <IconButton size='large' sx={{margin:'8px 16px',backgroundColor: selected === text ? '#feefc3' : '','&:hover':{backgroundColor: selected === text ? '#feefc3' : ''} }}>
                    {icon}
                  </IconButton>
                )
              }            
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  let handleOpen = () => {
    setState({...state,left:!state.left});
    props.setLeftDrawerOpen(!props.leftDrawerOpen,console.log(props.leftDrawerOpen));
  }

  return (
    <React.Fragment>
      <Box className='drawer-container'>
        <Header handleOpen={handleOpen} toggleView={props.onButtonClick} searchText={props.searchText} setSearchText={props.setSearchText} setClicked={setClicked}></Header> 
        <Box onMouseLeave={() => !clicked ?  setState({left:false}) : setState({left:true})}>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left',false)}
            variant="permanent" 
            PaperProps={{
              sx:{
                top:'65px',
                border:'none'
              }
            }}
          >
            {list('left')}
          </Drawer>
        </Box>
      </Box>
    </React.Fragment>
  );
}


export default connect()(LeftDrawer)