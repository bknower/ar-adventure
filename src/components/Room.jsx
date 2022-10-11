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
import { Aoun } from "../classes/NPCs";
import { Person } from "./Person";

function Room({ playerPlace }) {
  var room = playerPlace;
  useEffect(() => {
    room = playerPlace;
  }, [playerPlace]);
  const cards = [1, 2, 3, 4, 5];
  return (
    <Container component="main" style={{ overflow: "auto" }}>
      <Stack spacing={2}>
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            {room.name}
          </Typography>
          <Typography variant="body1">{room.description}</Typography>
        </Container>
        <Typography variant="h4" component="h1" gutterBottom>
          People
        </Typography>
        <Container component="main" style={{ overflow: "auto" }}>
          <Stack direction="row">
            {cards.map((i) => (
              <Person key={i} person={new Aoun()} />
            ))}
          </Stack>
        </Container>

        <Typography variant="h4" component="h1" gutterBottom>
          Items
        </Typography>

        <Container component="main" style={{ overflow: "auto" }}>
          <Stack direction="row">
            {cards.map((i) => (
              <Grid key={i} item xs={12} sm={6} md={4} paddingRight="1rem">
                <Box sx={{ minWidth: 250 }}>
                  <Card variant="outlined">
                    <>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                          benevolent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          adjective
                        </Typography>
                        <Typography variant="body2">
                          well meaning and kindly.
                          <br />
                          {'"a benevolent smile"'}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Learn More</Button>
                      </CardActions>
                    </>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Stack>
        </Container>
        <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
          <nav aria-label="main mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
          <Divider />
          <nav aria-label="secondary mailbox folders">
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="Trash" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemText primary="Spam" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </Stack>
    </Container>
  );
}

export default Room;
