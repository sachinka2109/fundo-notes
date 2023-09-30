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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteItem } from "../../services/dataService";

export default function MoreOptions({noteId,updateData}) {
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
  const onDeleteItem = async() => {
    let data={noteIdList:[noteId],isDeleted:true}
    await deleteItem(data);
    updateData();
  }
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
              <Paper sx={{ borderRadius: "10px" }}>
                <Typography sx={{ p: 2 }} component={"span"}>
                  <Box
                    sx={{
                      bgcolor: "background.paper",
                      display: "flex",
                      alignItems: "center",
                      height: 150,
                    }}
                  >
                    <List>
                      <ListItem disablePadding>
                        <ListItemButton sx={{textAlign:'left'}} onClick={onDeleteItem}>
                          <ListItemText primary="Delete Note" 
                            primaryTypographyProps={{
                                fontSize: "0.9rem",
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton sx={{textAlign:'left'}}>
                          <ListItemText primary="Add label" 
                            primaryTypographyProps={{
                                fontSize: "0.9rem", 
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton sx={{textAlign:'left'}}>
                          <ListItemText primary="Make a copy" 
                            primaryTypographyProps={{
                                fontSize: "0.9rem", 
                            }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton sx={{textAlign:'left'}}>
                          <ListItemText primary="Hide Checkboxes" 
                            primaryTypographyProps={{
                                fontSize: "0.9rem", 
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
          <MoreVertIcon fontSize="12px" />
        </IconButton>
      </Box>
    </React.Fragment>
  );
}
