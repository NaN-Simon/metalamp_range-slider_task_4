import { IConfig } from "./types";

export default class Thumb{
  protected config!: IConfig;
  
  private rangeSliderElement: HTMLElement;
  private thumb!: HTMLElement;

  constructor(rangeSliderSelector: HTMLElement) {
    this.rangeSliderElement = rangeSliderSelector;
    this.createThumb();
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  createThumb(){
    this.thumb = document.createElement('div');
    this.thumb.classList.add('thumb')
    this.rangeSliderElement.append(this.thumb)
  }
}