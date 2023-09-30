import axios from 'axios'

export let signIn = async(data) => {
    let response = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/login',data)
    console.log(response)
    localStorage.setItem('token',response.data.id);
    return response
}

export let signUp = async(data) => {
    let response = await axios.post('http://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp',data)
    console.log(response)
    return response
}