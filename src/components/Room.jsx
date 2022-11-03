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
import { ItemList } from "./ItemList";

function Room({ playerPlace, places }) {
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    setRefresh(!refresh);
  }, [playerPlace]);
  const cards = [1, 2, 3];
  return (
    <Container component="main" style={{ overflow: "auto" }}>
      <Stack spacing={2}>
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h2" component="h1" gutterBottom>
            {playerPlace}
          </Typography>
          <Typography variant="body1">
            {places[playerPlace].description}
          </Typography>
        </Container>
        {places[playerPlace].npcs.length > 0 && (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              People
            </Typography>
            <Container component="main" style={{ overflow: "auto" }}>
              <Stack direction="row" xs={12} sm={12} md={12}>
                {places[playerPlace].npcs.map((person, i) => (
                  <Person key={i} person={person} />
                ))}
              </Stack>
            </Container>
          </>
        )}
        {places[playerPlace].items.length > 0 && (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Items
            </Typography>
            <ItemList items={places[playerPlace].items} />
          </>
        )}
        <br />
        <br />
        <br />
        <br />
      </Stack>
    </Container>
  );
}

export default Room;
