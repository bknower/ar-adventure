export abstract class NPC {
  name: string;
  description: string;
  msg: string = "";
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  abstract hasMsg(): boolean;

  abstract getMsg(): string;

  abstract getResponses(): string[] | undefined;

  abstract answer(msg: string): void;
}
