export abstract class Entity {
  name: string;
  description: string;
  actions: { [key: string]: (...args: any[]) => any } = {};
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }

  act(verb: string): void {
    if (this.actions[verb]) {
      this.actions[verb]();
    } else {
      console.log(`${this.name} doesn't know how to ${verb}.`);
    }
  }
}
