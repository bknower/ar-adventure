type Message = {
  m: string;
  cond?: () => boolean;
  effect?: () => void;
  input?: (response: string) => void;
};

export class NPC {
  name: string;
  description: string;
  messages: Message[];
  url: string;
  timesTalkedTo = 0;
  constructor(
    name: string,
    description: string,
    url = "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png",
    messages: Message[] = []
  ) {
    this.name = name;
    this.description = description;
    this.messages = messages;
    this.url = url;
  }

  getMsg() {
    if (this.messages.length > 1) {
      for (var i = 1; i < this.messages.length; i++) {
        const msg = this.messages[i];
        if (msg["cond"] && msg["cond"]()) {
          this.timesTalkedTo += 1;
          return msg;
        }
      }
    }
    this.timesTalkedTo += 1;
    return this.messages[0];
  }
}
