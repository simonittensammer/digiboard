export class Note {
  id: number;
  headline: string;
  text: string;
  posX: number;
  posY: number;
  priority: number;


  constructor(headline: string, text: string, posX: number, posY: number, priority: number) {
    this.headline = headline;
    this.text = text;
    this.posX = posX;
    this.posY = posY;
    this.priority = priority;
  }
}
