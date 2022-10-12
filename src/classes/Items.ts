import { Item } from "./Item";

export const Sword = new Item("Sword", "A sword", {
  attack: () => {
    console.log("You swing your sword at the enemy!");
  },
});

export const Shield = new Item("Shield", "A shield", {
  defend: () => {
    console.log("You defend yourself with your shield!");
  },
  attack: () => {
    console.log("You bash the enemy with your shield!");
  },
});
