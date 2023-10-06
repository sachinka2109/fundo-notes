import React from 'react'
import LeftDrawer from './LeftDrawer'
import TakeNoteOne from '../TakeNoteOne/TakeNoteOne'
import TakeNoteTwo from '../TakeNoteTwo/TakeNoteTwo'
import TakeNoteThree from '../TakeNoteThree/TakeNoteThree'
import { Box } from '@mui/material'
import TakeNoteThreeList from '../TakeNoteThree/TakeNoteThreeList'
import {useState} from 'react';
import { useEffect } from 'react'
import {getNotes} from '../../services/dataService'
import { updateArchive,deleteForever,deleteItem } from '../../services/dataService'
import { useLocation } from 'react-router'

function Home() {
  const [viewList,changeViewList] = useState(true);
  const [note,changeNote] = useState(false);
  const [data,setData] = useState([]);
  const[leftDrawerOpen,setLeftDrawerOpen] = useState(false);
  const [searchText,setSearchText] = useState('');
  const currentUrl = useLocation();
  // const [noteState,setNoteState] = useState({
  //   title:'',
  //   description:'',
  //   color:'',
  //   isArchived:false,
  //   isDeleted:false,
  // })

  const onArchive = async (item) => {
    let data = {noteIdList:[item.id],isArchived:true}
    await updateArchive(data);
    getData();
  }

  const onUnArchive = async (item) => {
    let data = {noteIdList:[item.id],isArchived:false}
    await updateArchive(data);
    getData();
  }

  const onChangeView = () => {
    changeViewList(!viewList);
  }

  const onChangeNote = () => {
    changeNote(!note);
  } 

  const focusInput = (e) => {
    if(onChangeNote) {
      e.target.current.focus();
    }
  }

  const restoreItem = async(id) => {
    let data = {noteIdList:[id],isDeleted:false}
    await deleteItem(data);
    getData();
  }

  const deleteForeverItem = async(id) => {
    let data = {noteIdList:[id]}
    await deleteForever(data);
    getData();
  }



  useEffect(()=> {
    if(searchText !== '') {
      const searchResult = data.filter(data => data.title.toLowerCase().includes(searchText.toLowerCase()) || data.description.toLowerCase().includes(searchText.toLowerCase()));
      setData(searchResult);
    } else {
      getData();
    }
  },[searchText,data.length,currentUrl.pathname])


  const getData = async() => {
    let response = await getNotes();
    // console.log(response.data.data.data)
    let arr = response.data.data.data
    if(currentUrl.pathname.includes('dashboard')) {
      let newArray = arr.filter(item => item.isArchived === false && item.isDeleted === false)
      setData(newArray)
    } else if (currentUrl.pathname.includes('archive')) {
      let newArray = arr.filter(item => item.isArchived === true )
      setData(newArray)
    } else if(currentUrl.pathname.includes('trash')) {
      let newArray = arr.filter(item => item.isDeleted === true)
      setData(newArray)
    }
  }
  
  return (
    <Box>
      <Box>
        <LeftDrawer onButtonClick={onChangeView} leftDrawerOpen={leftDrawerOpen} setLeftDrawerOpen={setLeftDrawerOpen} searchText={searchText} setSearchText={setSearchText}/>
      </Box>
      <Box sx={{marginLeft:{xs:'65px',md:leftDrawerOpen? '280px': '68px'},display:'flex',flexDirection:'column'}}>
        <Box marginTop={'20px'}>
          {
            note? <TakeNoteTwo onFocus={focusInput} onChangeNote={onChangeNote} getData={getData}></TakeNoteTwo >:<TakeNoteOne onChangeNote={onChangeNote}></TakeNoteOne>
          } 
        </Box> 
        <Box sx={{display:viewList? 'flex':'block',flexWrap:'wrap',justifyContent:'center',my:'30px',rowGap:'30px'}}>
        {data.map((item) => (viewList ? 
          (<TakeNoteThree key={item.id} data={item} onArchive={()=> onArchive(item)} onUnArchive={()=> onUnArchive(item)} getData={getData} restoreItem={restoreItem} deleteForeverItem={deleteForeverItem} /> ) : 
          (<TakeNoteThreeList key={item.id} data={item} onArchive={()=> onArchive(item)} onUnArchive={()=> onUnArchive(item)} getData={getData} restoreItem={restoreItem} deleteForeverItem={deleteForeverItem}/> ))
        )}
        </Box>
      </Box>
    </Box>
  )
}

export default Home