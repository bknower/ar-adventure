import { useEffect } from "react";
import { NPC } from "../../classes/NPC";

export function Challenge({ places }) {
  function generateCyclingNPC(name, description, url, messages) {
    let formedMessages = [];
    for (const [i, message] of messages.entries()) {
      if (i === 0) {
        formedMessages.push({
          m: message,
        });
      } else {
        formedMessages.push({
          m: message,
          cond: () => this.timesTalkedTo % messages.length === i,
        });
      }
    }

    return new NPC(name, description, url, formedMessages);
  }

  class Dora extends NPC {
    messages = [
      { m: "Hola, soy Dora!", cond: () => this.timesTalkedTo % 3 === 0 },
      {
        m: "The Map told me to go to McLeod Suites at 8:45-9:00 PM for a surprise.",
        cond: () => this.timesTalkedTo % 3 === 1,
      },
      { m: "Vamanos! Let's go!", cond: () => this.timesTalkedTo % 3 === 2 },
    ];
    constructor() {
      super(
        "Dora",
        "Backpack, backpack!",
        "https://th.bing.com/th/id/OIP.0JtWTkp8Fd7V3OCF3ykDZwHaK4?pid=ImgDet&rs=1"
      );
    }
  }
  class Ned extends NPC {
    messages = [
      {
        m: "The first day of Husky Hunt Academy can be frightening.",
        cond: () => this.timesTalkedTo % 3 === 0,
      },
      {
        m: "That's why I wrote a survival guide for gym next period at 11:45-12:00 AM.",
        cond: () => this.timesTalkedTo % 3 === 1,
      },
      {
        m: "TIP#630 | Don't be late to gym at Centennial!",
        cond: () => this.timesTalkedTo % 3 === 2,
      },
    ];
    constructor() {
      super(
        "Ned Bigby",
        "I Survived: High School",
        "https://th.bing.com/th/id/OIP.O8726dGBOOCoEngGrxvcZAAAAA?pid=ImgDet&rs=1"
      );
    }
  }
  class Carlos extends NPC {
    messages = [
      {
        m: "Hi! You look like a musical fellow.",
        cond: () => this.timesTalkedTo % 3 === 0,
      },
      {
        m: "Did you hear of the band auditions happening in Curry Ballroom at 1:30-2:15 AM?",
        cond: () => this.timesTalkedTo % 3 === 1,
      },
      {
        m: "James, Logan, Kendall, and I are practicing for it now. See you there!",
        cond: () => this.timesTalkedTo % 3 === 2,
      },
    ];
    constructor() {
      super(
        "Carlos",
        "It's rush hour!",
        "https://i.pinimg.com/originals/6e/19/52/6e1952914430bff9c1f7ede6f64db774.jpg"
      );
    }
  }
  class TimAndMoby extends NPC {
    messages = [
      {
        m: "Did you know the Eoraptor was about the size of a beagle?",
        cond: () => this.timesTalkedTo % 3 === 0,
      },
      {
        m: "Moby, let's go to Willis Volleyball Courts at 4:45-5:00 AM to inspect more fossils!",
        cond: () => this.timesTalkedTo % 3 === 1,
      },
      { m: "-- beep --", cond: () => this.timesTalkedTo % 3 === 2 },
    ];
    constructor() {
      super(
        "Tim & Moby",
        "Dear Tim & Moby, What is serotonin and how can I experience it?",
        "https://th.bing.com/th/id/OIP.Q_8qFbroqvczZ5HdlzW8EwHaFj?pid=ImgDet&rs=1"
      );
    }
  }
  class Jake extends NPC {
    messages = [
      {
        m: "Ohhh, this is the greatest sandwich I've ever made!",
        cond: () => this.timesTalkedTo % 3 === 0,
      },
      {
        m: "Let's pack it for lunch at McLeod Suites at 7:45-8:00 AM.",
        cond: () => this.timesTalkedTo % 3 === 1,
      },
      { m: "Whoo! Can't wait!", cond: () => this.timesTalkedTo % 3 === 2 },
    ];
    constructor() {
      super(
        "Jake",
        "The dog, what is it doing?",
        "https://pp.netclipart.com/pp/s/150-1503227_dog-clipart-body-jake-from-adventure-time.png"
      );
    }
  }
  class Shakespeare extends NPC {
    messages = [
      { m: "Good morrow.", cond: () => this.timesTalkedTo % 3 === 0 },
      {
        m: "Doth thee has't arts to best me in the English language?",
        cond: () => this.timesTalkedTo % 3 === 1,
      },
      {
        m: "Cometh to Shillman Hall at 9:15-9:30 AM to proveth thy knowledge.",
        cond: () => this.timesTalkedTo % 3 === 2,
      },
    ];
    constructor() {
      super(
        "William Shakespeare",
        "I open my book and I jot...",
        "https://3.bp.blogspot.com/-TuQPtJ4pGmg/W56O_Ye1DFI/AAAAAAAADHA/lXT6fKJUkuEyAS-9Ppfj8JrYadeLWSHqQCLcBGAs/s1600/William-Shakespeare-Portrait-of-William-Shakespeare-1564-1616-Chromolithograph.jpg"
      );
    }
  }
  class Sheldon extends NPC {
    messages = [
      {
        m: "Now where was I? Let's see, now here — the rhombicosidodecahedron is an Archimedean solid constructed of 20 regular triangular faces, 30 square face, 12 regular pentagonal faces, 60 vertices, 120 edges…",
        cond: () => this.timesTalkedTo % 3 === 0,
      },
      {
        m: "You know what — I'll give you a more comprehensive explanation on Centennial at 11:00-11:30 AM.",
        cond: () => this.timesTalkedTo % 3 === 1,
      },
      { m: "See you there!", cond: () => this.timesTalkedTo % 3 === 2 },
    ];
    constructor() {
      super(
        "Sheldon Cooper",
        "Bzangaznbaninga",
        "https://www.dkoding.in/wp-content/uploads/Sheldon-Cooper-Death-TBBTH-Trending-Today-DKODING.jpg"
      );
    }
  }
  class Sam extends NPC {
    messages = [
      {
        m: "Man, I can't go to tonight's webshow. Ms. Briggs gave me detention again.",
        cond: () => this.timesTalkedTo % 3 === 0,
      },
      {
        m: "It's totally unfair that I can't eat a turkey leg during English. Prepositions make me hungry!",
        cond: () => this.timesTalkedTo % 3 === 1,
      },
      {
        m: "Hey, if you can just sneak into Richards 458 at 2:15-2:45 PM, we can just film the show there.",
        cond: () => this.timesTalkedTo % 3 === 2,
      },
    ];
    constructor() {
      super(
        "Sam Puckett",
        "iHate This Hunt",
        "https://pbs.twimg.com/profile_images/550826967818174465/9XGIP90w_400x400.jpeg"
      );
    }
  }

  useEffect(() => {
    places["West Village Parking Garage"].npcs.push(new Dora());
    places["Marino"].npcs.push(new Ned());

    places["Cargill Hall"].npcs.push(new Carlos());
    places["Robinson Hall"].npcs.push(new TimAndMoby());
    places["Squashbusters"].npcs.push(new Jake());
    places["Gainsborough Parking Garage"].npcs.push(new Shakespeare());
    places["ISEC 2"].npcs.push(new Sheldon());
    places["Renaissance Parking Garage"].npcs.push(new Sam());
  }, []);
}
