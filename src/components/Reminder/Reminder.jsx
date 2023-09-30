import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AddAlertIcon from '@mui/icons-material/AddAlert';

export default function Reminder({noteId,updateData}) {
  // console.log(action)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  //  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <React.Fragment>
      <Box>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper sx={{ borderRadius: "4px" }}>
                <Typography sx={{ py: 2 }} component={"div"}>
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      display: "flex",
                      alignItems: "center",
                      height: 306,
                      width: 302
                    }}
                  >
                    <List sx={{width:'100%'}}>
                      <ListItem disablePadding sx={{textAlign:'left'}} >
                        <ListItemText primary="Reminder :" 
                        primaryTypographyProps={{
                            fontSize: "0.9rem",
                            p:2
                        }}
                        />
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton sx={{textAlign:'left'}}>
                          <ListItemText primary="Later Today" 
                            primaryTypographyProps={{
                                fontSize: "0.8rem", 
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton sx={{textAlign:'left'}}>
                          <ListItemText primary="Tomorrow" 
                            primaryTypographyProps={{
                                fontSize: "0.8rem", 
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton sx={{textAlign:'left'}}>
                          <ListItemText primary="Next Week" 
                            primaryTypographyProps={{
                                fontSize: "0.8rem", 
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton sx={{textAlign:'left'}}>
                          <ListItemText primary="Home" 
                            primaryTypographyProps={{
                                fontSize: "0.8rem", 
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton sx={{textAlign:'left'}}>
                          <ListItemText primary="Pick date & time" 
                            primaryTypographyProps={{
                                fontSize: "0.8rem", 
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton sx={{textAlign:'left'}}>
                          <ListItemText primary="Pick place" 
                            primaryTypographyProps={{
                                fontSize: "0.8rem", 
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Box>
                </Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
        <IconButton size="small" onClick={handleClick("bottom-start")}>
          <AddAlertIcon fontSize="12px" />
        </IconButton>
      </Box>
    </React.Fragment>
  );
}
