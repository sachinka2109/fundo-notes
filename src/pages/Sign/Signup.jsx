import React,{useState} from 'react'
import { Grid,TextField,Button,Container, FormControlLabel, Checkbox} from '@mui/material'
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Google from '../../images/google-img.png'
// import axios from 'axios';
import { signUp } from '../../services/userFunction';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function Signup() {
    const navigate = useNavigate();
    const NameRegex = /^[A-Z]{1}[a-z]{2,}$/;
    const UserNameRegex = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]){2,}.[a-z]*$/;
    const passRegex = /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/
    const [details,setDetails] = useState({
        firstName:"",
        lastName:"",
        service:"advance",
        email:"",
        password:"",
        confirmPassword:"",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [checkError, setCheckError] = React.useState({
        firstNameTrue: false,
        firstNameError:"",
        lastNameTrue: false,
        lastNameError:"",
        EmailTrue: false,
        EmailError: '',
        PasswordTrue: false,
        PasswordError: '',
        confirmPasswordTrue: false,
        confirmPasswordError:"",
    })

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleDetails = event => {
        setDetails({
            ...details,
            [event.target.name] : event.target.value
        })
    }

    // const handlePasswordVisibility = () => { 
    //     setDetails((prev) => ({
    //         ...prev,
    //         showPassword : !prev.showPassword
    //     }))
    // }

    const handleSubmit = async(event) => {
        event.preventDefault();
        let firstNameTest = NameRegex.test(details.firstName)
        let lastNameTest = NameRegex.test(details.lastName)
        let emailTest = UserNameRegex.test(details.email)
        let passwordTest = passRegex.test(details.password)
        if(firstNameTest === false) {
            setCheckError({
                firstNameTrue:true,
                firstNameError:'First name must Start with a capital letter and must be minimum length of 3'
            })
        } else if(lastNameTest === false) {
            setCheckError({
                lastNameTrue:true,
                lastNameError:'Last name must start with a capital letter and must be minimum length of 3'
            })
        } else if(emailTest === false) {
            setCheckError({
                EmailTrue:true,
                EmailError: 'Enter Valid Email'
            })
        }   else if(passwordTest === false) {
            setCheckError({
                PasswordTrue:true,
                PasswordError: 'The Password must contain atleast 8 characters,One UppercaseLetter,One LowercaseLetter,One number and Special Character'
            })
        } else if(details.password !== details.confirmPassword) {
            setCheckError({
                confirmPasswordTrue:true,
                confirmPasswordError: 'Password does not match'
            })
        }
        if(firstNameTest && lastNameTest && emailTest && passwordTest === true && checkError.confirmPasswordTrue === false) {
            try {
                let response = await signUp(details)
                console.log(response.data)
                return navigate('/signin')
            }catch(err) {
                toast.error('User Already Exists');
            }
        }
    }

    // useEffect(() => {
    //     console.log('Signup component has mounted.');
    //     return () => {
    //     console.log('Signup component will unmount.');
    //     };
    // }, []);

  return (
    <form onSubmit={handleSubmit}>
        <Container maxWidth="lg">
            <Grid container sx={{padding:{xs:0,sm:'30px'},border:{xs:0,sm:'1px solid #dadce0'},margin:'50px 0',borderRadius:'8px',alignItems:'center'}}>
                <Grid item xs={12} md={8}>
                    <Grid container justifyContent="flex-start" alignItems="flex-start">
                        <Grid item xs={12} textAlign={'left'}>
                            <svg viewBox="0 0 75 24" width="75" height="24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="l5Lhkf"><g id="qaEJec"><path fill="#ea4335" d="M67.954 16.303c-1.33 0-2.278-.608-2.886-1.804l7.967-3.3-.27-.68c-.495-1.33-2.008-3.79-5.102-3.79-3.068 0-5.622 2.41-5.622 5.96 0 3.34 2.53 5.96 5.92 5.96 2.73 0 4.31-1.67 4.97-2.64l-2.03-1.35c-.673.98-1.6 1.64-2.93 1.64zm-.203-7.27c1.04 0 1.92.52 2.21 1.264l-5.32 2.21c-.06-2.3 1.79-3.474 3.12-3.474z"></path></g><g id="YGlOvc"><path fill="#34a853" d="M58.193.67h2.564v17.44h-2.564z"></path></g><g id="BWfIk"><path fill="#4285f4" d="M54.152 8.066h-.088c-.588-.697-1.716-1.33-3.136-1.33-2.98 0-5.71 2.614-5.71 5.98 0 3.338 2.73 5.933 5.71 5.933 1.42 0 2.548-.64 3.136-1.36h.088v.86c0 2.28-1.217 3.5-3.183 3.5-1.61 0-2.6-1.15-3-2.12l-2.28.94c.65 1.58 2.39 3.52 5.28 3.52 3.06 0 5.66-1.807 5.66-6.206V7.21h-2.48v.858zm-3.006 8.237c-1.804 0-3.318-1.513-3.318-3.588 0-2.1 1.514-3.635 3.318-3.635 1.784 0 3.183 1.534 3.183 3.635 0 2.075-1.4 3.588-3.19 3.588z"></path></g><g id="e6m3fd"><path fill="#fbbc05" d="M38.17 6.735c-3.28 0-5.953 2.506-5.953 5.96 0 3.432 2.673 5.96 5.954 5.96 3.29 0 5.96-2.528 5.96-5.96 0-3.46-2.67-5.96-5.95-5.96zm0 9.568c-1.798 0-3.348-1.487-3.348-3.61 0-2.14 1.55-3.608 3.35-3.608s3.348 1.467 3.348 3.61c0 2.116-1.55 3.608-3.35 3.608z"></path></g><g id="vbkDmc"><path fill="#ea4335" d="M25.17 6.71c-3.28 0-5.954 2.505-5.954 5.958 0 3.433 2.673 5.96 5.954 5.96 3.282 0 5.955-2.527 5.955-5.96 0-3.453-2.673-5.96-5.955-5.96zm0 9.567c-1.8 0-3.35-1.487-3.35-3.61 0-2.14 1.55-3.608 3.35-3.608s3.35 1.46 3.35 3.6c0 2.12-1.55 3.61-3.35 3.61z"></path></g><g id="idEJde"><path fill="#4285f4" d="M14.11 14.182c.722-.723 1.205-1.78 1.387-3.334H9.423V8.373h8.518c.09.452.16 1.07.16 1.664 0 1.903-.52 4.26-2.19 5.934-1.63 1.7-3.71 2.61-6.48 2.61-5.12 0-9.42-4.17-9.42-9.29C0 4.17 4.31 0 9.43 0c2.83 0 4.843 1.108 6.362 2.56L14 4.347c-1.087-1.02-2.56-1.81-4.577-1.81-3.74 0-6.662 3.01-6.662 6.75s2.93 6.75 6.67 6.75c2.43 0 3.81-.972 4.69-1.856z"></path></g></svg>
                            <h3>Create Your Google Account</h3>
                            <h5>to continue to Gmail</h5>
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <TextField data-testid="textfield" id="firstname" label="First name" variant="outlined" 
                                    fullWidth
                                    value={details.fname} onChange={handleDetails}
                                    name='firstName'
                                    error={checkError.firstNameTrue}
                                    helperText={checkError.firstNameError}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField data-testid="textfield" id="lastname" label="Last name" variant="outlined" 
                                    fullWidth
                                    value={details.lname} onChange={handleDetails}
                                    name='lastName'
                                    error={checkError.lastNameTrue}
                                    helperText={checkError.lastNameError}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} marginTop={'20px'}>
                                <TextField data-testid="textfield" id="email" label="Username" variant="outlined" 
                                fullWidth
                                value={details.email} onChange={handleDetails}
                                name='email'
                                // helperText="You can use letters,numbers, & symbols"
                                error={checkError.EmailTrue}
                                helperText={checkError.EmailError? checkError.EmailError : 'You can use letters,numbers & symbols'}
                                />
                            </Grid>
                            <Grid container spacing={2} style={{display:'flex',alignItems:'flex-top',marginTop:'20px'}}>
                                <Grid item sx={{display:'flex',gap:2,flexDirection:{xs:'column',md:'row'}}} xs={12}>
                                    <TextField data-testid="textfield" id="password" label="Password" variant="outlined" 
                                    fullWidth
                                    value={details.password} onChange={handleDetails}
                                    type={showPassword? 'text': 'password'}
                                    name='password'
                                    error={checkError.PasswordTrue}
                                    helperText={checkError.PasswordError}
                                    />
                                    <TextField data-testid="textfield" id="confirmPassword" label="Confirm" variant="outlined" 
                                    fullWidth
                                    type={showPassword? 'text': 'password'}
                                    name='confirmPassword'
                                    error={checkError.confirmPasswordTrue}
                                    helperText={checkError.confirmPasswordError}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} sx={{display:'flex',alignItems:'center'}}>

                                </Grid>
                                {
                                    checkError.PasswordError || checkError.confirmPasswordError ? '' :(
                                        <Grid item style={{color:'rgba(0, 0, 0, 0.6)',paddingTop:'0'}}>
                                            <h5>Use 8 or more characters with a mix of letters,numbers & symbols</h5>
                                        </Grid>
                                    )
                                }
                                <Grid item justifyContent={'flex-start'} xs={10} style={{paddingTop:'0',textAlign:'left'}}>
                                    <FormControlLabel
                                    control={<Checkbox size='medium' checked={showPassword} onChange={handlePasswordVisibility}/>}
                                    label="Show password"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'50px'}}>
                                <Grid item xs={12} md={12} style={{display:'flex',justifyContent:'space-between'}}>
                                    <Link to='/'>
                                        <Button variant='text' style={{ textTransform: 'none',fontSize:'16px'}}>Sign in instead</Button>
                                    </Link>
                                    <Button variant='contained' type='submit' data-testid='submitbtn'>
                                        Next
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4} sx={{display:{xs:'none',md:'flex'}}}>
                    <Grid container sx={{display:'flex',justifyContent:'center'}}>
                        <Grid item>
                            <img src={Google} alt="" style={{ width: '100%', height: '80vh',objectFit:'cover'}}/>
                            <h5 style={{textAlign:'center',marginTop:'-150px',fontSize:'18px',color:'rgba(0, 0, 0, 0.6)'}}>One account.All of Google working for you</h5>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    </form>
  )
}

export default Signup