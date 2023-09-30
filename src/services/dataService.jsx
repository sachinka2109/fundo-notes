import axios from 'axios';

function getHeaders() {
    return {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    }
}

export let createNotes = async(data) => {
    // console.log(data)
    let response = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes',data,getHeaders())
    return response;
}

export let getNotes = async() => {
    let response = await axios.get('http://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList',getHeaders())
    console.log('get notes')
    return response;
}

export let updateColor = async(data) => {
    let response = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes',data,getHeaders())
    return response;
}

export const updateArchive= async(data)=>{
    // console.log(data);
    let response = await axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",data,getHeaders())
    return response
}

export const deleteItem = async(data)=>{
    // console.log(data)
    let response = await axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",data,getHeaders())
    return response
}

export const deleteForever = async(data)=>{
    // console.log('delete-foreer',data);
    let response = await axios.post("http://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes",data,getHeaders())
    return response
}