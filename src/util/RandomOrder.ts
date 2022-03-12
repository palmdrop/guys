import { shuffleArray } from "./math";

export class RandomOrder {
  private length: number;

  private order: number[];
  private index: number;

  constructor(length: number) {
    this.index = 0;
    this.setLength(length);
  }

  setLength(length: number) {
    this.length = length;
    this.reshuffle();
  }

  reshuffle() {
    this.order = [...Array(this.length).keys()];
    this.index = 0;

    shuffleArray(this.order);

    console.log(this.order);
  }

  next() {
    if(this.index === this.length) {
      this.reshuffle();
    }

    const result = this.order[this.index];
    this.index++;

    return result;
  }
}