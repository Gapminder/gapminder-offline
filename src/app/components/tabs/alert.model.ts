export class AlertModel {
  public message: string;
  public stack: string;
  public collapsed: boolean = true;

  public constructor(message: string, stack: string) {
    this.message = message;
    this.stack = stack;
  }

  public toggle(): void {
    this.collapsed = !this.collapsed;
  }
}
