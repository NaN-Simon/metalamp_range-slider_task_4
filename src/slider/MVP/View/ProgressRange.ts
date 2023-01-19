import { IConfig } from './types';
export default class ProgressRange {
  protected config!: IConfig;

  private progressBar: HTMLElement;
  private progressRange!: HTMLElement;

  constructor(rangeSliderSelector: HTMLElement) {
    this.progressBar = rangeSliderSelector;

    this.createRange();
  }

  get getProgressRange() {
    return this.progressRange;
  }

  get getWrapperSize(){
    return this.config.isVertical
    ? this.progressBar.getBoundingClientRect().height
    : this.progressBar.getBoundingClientRect().width
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  createRange() {
    this.progressRange = document.createElement('div');
    this.progressRange.classList.add('progress-range');
    this.progressBar.prepend(this.progressRange);
  }

  renderDefaultProgressRange(thumbPosition:string, value: number){
    if(thumbPosition === 'start'){
      this.progressRange.style.left = value + 'px'
    } else {
      this.progressRange.style.right = this.getWrapperSize - value + 'px'
    }
  }

  renderProgressRange(thumb:string, pixelValue: number): void{
    if(thumb === 'from'){
      this.progressRange.style.left = `${pixelValue}px`
    } else {
      this.progressRange.style.right = `${this.progressBar.offsetWidth - pixelValue}px`

    }
  }

}