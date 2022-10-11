import React, { useEffect, useState } from "react";
import { Game } from "../classes/Game";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { CardMedia } from "@mui/material";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Person = ({ person }) => {
  const [talkingTo, setTalkingTo] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (talkingTo) {
      setMsg(person.getMsg());
    }
  }, [talkingTo]);
  return (
    <>
      <Grid item xs={12} sm={6} md={4} paddingRight="1rem">
        <Box sx={{ minWidth: 250 }}>
          <Card variant="outlined">
            <>
              <CardContent>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "textPrimary",
                  }}
                  gutterBottom
                >
                  {person.name}
                </Typography>
                <Typography variant="body2">{person.description}</Typography>
              </CardContent>
              <CardMedia
                component="img"
                // image={require("../assets/people/Joseph_Aoun.jpg")}
                image={person.url}
                style={{ height: "40vh", width: "100%", objectFit: "cover" }}
              />
              <CardActions>
                <Button size="small" onClick={() => setTalkingTo(true)}>
                  Talk To
                </Button>
              </CardActions>
            </>
          </Card>
        </Box>
      </Grid>
      <Modal
        open={talkingTo}
        onClose={() => setTalkingTo(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {person.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {msg}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
