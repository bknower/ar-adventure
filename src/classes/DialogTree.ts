export class DialogTree {
  msg: string;
  options: DialogTree[];
  conditional?: () => boolean;
  constructor(msg: string, options: DialogTree[], conditional?: () => boolean) {
    this.msg = msg;
    this.options = options;
    this.conditional = conditional;
  }
}
