import React, { useRef, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ArchiveIcon from "@mui/icons-material/Archive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PushPinIcon from "@mui/icons-material/PushPin";
import ColorPalette from "../ColorPalette/ColorPalette";
import MoreOptions from "../MoreOption/MoreOption";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Reminder from "../Reminder/Reminder";

function TakeNoteThree(props) {
  const location = window.location.href;
  const [visible,setVisible]= useState(false);
  const updatecolor = () => {
    props.getData();
  };
  const restoreItem = (id) => {
    console.log(id);
    // props.restoreItem(id);
    props.restoreItem(id);
  };
  const deleteForever = (id) => {
    props.deleteForeverItem(id);
  };

  
  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "250px",
          mx: "10px",
        }}
        onMouseEnter={()=> setVisible(true)}
        onMouseLeave={()=> setVisible(false)}
      >
        <Grid item sx={{ position: "relative", minWidth: "240px" }}>
          <Card
            variant="outlined"
            sx={{ borderRadius: "10px", backgroundColor: props.data.color }}
          >
            <Box sx={{ position: "absolute", left: "-10px", top: "-5px",visibility:visible? "visible": "hidden" }}>
              <CheckCircleIcon></CheckCircleIcon>
            </Box>
            <CardContent>
              <Typography
                component={"div"}
                sx={{
                  fontSize: 18,
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                gutterBottom
              >
                {props.data.title}
                <IconButton sx={{visibility:visible? "visible": "hidden"}}>
                  <PushPinIcon />
                </IconButton>
              </Typography>
              <Typography
                sx={{ fontSize: 20, textAlign: "left" }}
                component={"div"}
              >
                {props.data.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexGrow: 1,
                justifyContent: "space-between",
              }}
            >
              {location.includes("trash") ? (
                <Grid container sx={{ display: "flex", flexGrow: 1,visibility:visible? "visible": "hidden" }}>
                  <Grid item sx={{ display: "flex", flexGrow: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => deleteForever(props.data.id)}
                    >
                      <DeleteForeverIcon fontSize="12px" />
                    </IconButton>
                    <IconButton
                      size="small"
                      sx={{ marginLeft: "10px" }}
                      onClick={() => restoreItem(props.data.id)}
                    >
                      <RestoreFromTrashIcon fontSize="12px" />
                    </IconButton>
                  </Grid>
                </Grid>
              ) : (
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "space-between",
                    visibility:visible? "visible": "hidden"
                  }}
                >
                  <Grid
                    item
                    sx={{
                      display: "flex",
                      flexGrow: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    {/* <IconButton size="small">
                      <AddAlertIcon fontSize='12px'/>
                      </IconButton> */}
                    <Reminder />
                    <IconButton size="small">
                      <PersonAddAlt1Icon fontSize="12px" />
                    </IconButton>
                    <ColorPalette
                      fontSize="12px"
                      action={"edit"}
                      noteId={props.data.id}
                      updatecolor={updatecolor}
                    />
                    <IconButton
                      size="small"
                      onClick={() =>props.data.isArchived ?props.onUnArchive(props.data) : props.onArchive(props.data)}
                    >
                      {props.data.isArchived ? (
                        <UnarchiveIcon fontSize="12px" />
                      ) : (
                        <ArchiveIcon fontSize="12px" />
                      )}
                    </IconButton>
                    <MoreOptions
                      noteId={props.data.id}
                      updateData={props.getData}
                    />
                  </Grid>
                </Grid>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}


export default TakeNoteThree;
