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
import { ItemList } from "./ItemList";

function Test() {
  const [count, setCount] = useState({ count: 0 });
  return (
    <>
      <CountContainer count={count} />
      <Button
        onClick={() =>
          setCount((count) => {
            return { count: count.count + 1 };
          })
        }
      >
        Click Me
      </Button>
    </>
  );
}

const CountContainer = ({ count }) => {
  return (
    <div>
      <h1>{count.count}</h1>
    </div>
  );
};

export default Test;
