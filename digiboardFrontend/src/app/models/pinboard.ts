import {Note} from './note';

export class Pinboard {
  id: number;
  name: string;
  notes: Array<Note>;


  constructor(name: string) {
    this.name = name;
  }


}
