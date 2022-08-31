type Message = {
  m: string;
  cond?: () => boolean;
  effect?: () => void;
};

export abstract class NPC {
  name: string;
  description: string;
  messages: Message[] = [];
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  getMsg() {
    if (this.messages.length > 1) {
      for (var i = 1; i < this.messages.length; i++) {
        const msg = this.messages[i];
        if (msg["cond"] && msg["cond"]()) {
          if (msg["effect"]) {
            msg["effect"]();
          }

          return msg["m"];
        }
      }
    }
    if (this.messages[0]["effect"]) {
      this.messages[0]["effect"]();
    }
    return this.messages[0]["m"];
  }
}
