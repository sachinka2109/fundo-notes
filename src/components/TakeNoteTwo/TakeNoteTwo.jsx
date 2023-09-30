import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PushPinIcon from "@mui/icons-material/PushPin";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
// import ColorLensIcon from '@mui/icons-material/ColorLens';
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import Button from "@mui/material/Button";
import ColorPalette from "../ColorPalette/ColorPalette";
import { createNotes } from "../../services/dataService";

function TakeNoteTwo(props) {
  const [notes, setNotes] = useState({
    title: "",
    description: "",
    color: "",
    isArchived: false,
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    setNotes({
      ...notes,
      [e.target.name]: e.target.value,
    });
  };

  // const closeNoteTwoHandler = () => {
  //   props.onChangeNote();
  // }

  const onSubmit = async () => {
    if (notes.title === "" && notes.description === "") {
      props.onChangeNote();
    } else {
      console.log(notes);
      let response = await createNotes(notes);
      console.log(response.data);
      props.getData();
      props.onChangeNote();
    }
  };

  return (
    <React.Fragment>
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Container maxWidth="sm">
          <form>
            <Paper
              elevation={3}
              sx={{
                border: "none",
                padding: "5px 10px 5px 10px",
                borderRadius: "10px",
                backgroundColor: notes.color,
              }}
            >
              <Typography
                component={"div"}
                variant="body1"
                color="initial"
                sx={{
                  margin: 0,
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  variant="standard"
                  id="title"
                  placeholder="Title"
                  fullWidth
                  style={{ outline: "none" }}
                  InputProps={{ disableUnderline: true }}
                  onChange={onChangeHandler}
                  name="title"
                />
                <IconButton aria-label="pin">
                  <PushPinIcon />
                </IconButton>
              </Typography>
              <Typography
                component={"div"}
                variant="body1"
                color="initial"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <TextField
                  id="description"
                  variant="standard"
                  placeholder="Take a note..."
                  fullWidth
                  style={{ outline: "none" }}
                  InputProps={{ disableUnderline: true }}
                  onChange={onChangeHandler}
                  name="description"
                />
              </Typography>
              <Typography
                component={"div"}
                variant="body1"
                color="initial"
                sx={{ margin: 0, display: "flex", alignItems: "center" }}
              >
                <Grid
                  container
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexBasis: "350px",
                      justifyContent: "space-between",
                    }}
                  >
                    <IconButton size="small">
                      <AddAlertIcon fontSize="12px" />
                    </IconButton>
                    <IconButton size="small">
                      <PersonAddAlt1Icon fontSize="12px" />
                    </IconButton>
                    {/* <ColorLensIcon fontSize='12px'/> */}
                    <ColorPalette
                      fontSize="12px"
                      action={"create"}
                      setNotes={setNotes}
                    />
                    {notes.isArchived ? (
                      <IconButton
                        size="small"
                        onClick={() => setNotes({ ...notes, isArchived: false })}
                      >
                        <UnarchiveIcon fontSize="12px" />
                      </IconButton>
                    ) : (
                      <IconButton
                        size="small"
                        onClick={() => setNotes({ ...notes, isArchived: true })}
                      >
                        <ArchiveIcon fontSize="12px" />
                      </IconButton>
                    )}

                    <IconButton size="small">
                      <MoreVertIcon fontSize="12px" />
                    </IconButton>
                    <IconButton size="small">
                      <UndoIcon fontSize="12px" />
                    </IconButton>
                    <IconButton size="small">
                      <RedoIcon fontSize="12px" />
                    </IconButton>
                  </Grid>
                  <Grid item sx={{ display: "flex", alignSelf: "flex-end" }}>
                    <Button
                      variant="text"
                      sx={{ color: "black" }}
                      onClick={onSubmit}
                    >
                      Close
                    </Button>
                  </Grid>
                </Grid>
              </Typography>
            </Paper>
          </form>
        </Container>
      </Grid>
    </React.Fragment>
  );
}

export default TakeNoteTwo;
