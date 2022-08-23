import { Entity } from "./Entity";

export class Messages {
  log: string[] = [];
  onSend: (...args: any[]) => any = () => {};
  constructor(onSend: (...args: any[]) => any) {
    this.onSend = onSend;
  }

  send(message: string): void {
    this.log.push(message);
    console.log(message);
    this.onSend();
  }
}
