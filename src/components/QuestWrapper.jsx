import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  Children,
  cloneElement,
} from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
// import { RestoreIcon, FavoriteIcon, LocationOnIcon } from "@mui/icons-material";
import BookIcon from "@mui/icons-material/LibraryBooks";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BackpackIcon from "@mui/icons-material/Backpack";
import PlaceIcon from "@mui/icons-material/Place";
import { Game } from "../classes/Game";
import Map from "./Map";
import Inventory from "./Inventory";
import L, { LatLng } from "leaflet";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import NearMeIcon from "@mui/icons-material/NearMe";
import { Place } from "../classes/Place";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { ItemList } from "./ItemList";
import { Item } from "../classes/Item";
import { NPC } from "../classes/NPC";
import { isEqual } from "lodash";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import MessageModal from "./MessageModal";
import { Messages } from "../classes/Messages";
import Room from "./Room";
import DialogueTree from "react-dialogue-tree";
import "react-dialogue-tree/dist/react-dialogue-tree.css";
import { Shield, Sword } from "../classes/Items";

export function QuestWrapper(props) {
  return <>{props.children.map((child) => child({ ...props }))}</>;
}
