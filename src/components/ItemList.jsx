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
export const ItemList = ({ items }) => {
  return (
    <Container component="main" style={{ overflow: "auto" }}>
      <Stack direction="row">
        {items.map((item, i) => (
          <Grid key={i} item xs={12} sm={6} md={4} paddingRight="1rem">
            <Box sx={{ minWidth: 250 }}>
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
                      height: "40vh",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <CardActions>
                    {Object.entries(item.actions).map(([verb, action]) => (
                      <Button size="small" onClick={action} key={verb}>
                        {verb}
                      </Button>
                    ))}
                  </CardActions>
                </>
              </Card>
            </Box>
          </Grid>
        ))}
      </Stack>
    </Container>
  );
};
