export class AlertModel {
  message: string;
  stack: string;
  collapsed = true;

  constructor(message: string, stack: string) {
    this.message = message;
    this.stack = stack;
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }
}
