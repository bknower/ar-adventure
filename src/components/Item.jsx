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
import { CardMedia } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Aoun } from "../classes/NPCs";
import { Person } from "./Person";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
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

export const Item = ({ item, i }) => {
  const [using, setUsing] = useState(false);
  const [inputting, setInputting] = useState(false);
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState("");
  const onClose = () => {
    setUsing(false);
    setInputting(false);
  };
  const submit = () => {
    // msg.input(answer);
    onClose();
  };
  return (
    <>
      <Grid key={i} item xs={12} sm={6} md={4} paddingRight="1rem">
        <Box width="30vh">
          <Card variant="outlined">
            <>
              <CardContent>
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
              <CardMedia
                component="img"
                // image={require("../assets/people/Joseph_Aoun.jpg")}
                image={item.url}
                style={{
                  height: "30vh",
                  width: "100%",
                  objectFit: "scale-down",
                }}
              />
              <CardActions>
                {item.actions &&
                  Object.entries(item.actions).map(([verb, action]) => (
                    <Button
                      size="small"
                      onClick={
                        verb === "use"
                          ? () => {
                              setUsing(true);
                              setMsg(action());
                            }
                          : action
                      }
                      key={verb}
                    >
                      {verb}
                    </Button>
                  ))}
              </CardActions>
            </>
          </Card>
        </Box>
      </Grid>
      <Modal
        open={using}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {msg}
          </Typography>
          {inputting && (
            <>
              <TextField
                id="outlined-basic"
                label="Answer"
                variant="outlined"
                onChange={(e) => setAnswer(e.target.value)}
                fullWidth
                onKeyPress={(ev) => {
                  console.log(`Pressed keyCode ${ev.key}`);
                  if (ev.key === "Enter") {
                    submit();
                    ev.preventDefault();
                  }
                }}
              >
                {answer}
              </TextField>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={submit}
              >
                Answer
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
