import React from 'react'
import TextField from '@mui/material/TextField';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Container, Paper } from '@mui/material';


function TakeNoteOne(props) {
  let openTakeNoteTwo = () => {
    props.onChangeNote();
  }
  return (
    <React.Fragment>
      <Container maxWidth='sm'>
        <Paper elevation={3} style={{ border: 'none',padding:'5px 10px 5px 10px',borderRadius:'10px'}}>
          <Typography variant="body1" color="initial" sx={{display:'flex',alignItems:'center'}} component={'div'}>
              <TextField id="notes" variant="standard" placeholder='Take a note...' fullWidth style={{ outline: 'none' }}  InputProps={{disableUnderline: true}} onFocus={openTakeNoteTwo}/>
                <IconButton>
                <CheckBoxIcon />
                </IconButton>
                <IconButton>
                <InsertPhotoIcon />
                </IconButton>
          </Typography>
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default TakeNoteOne