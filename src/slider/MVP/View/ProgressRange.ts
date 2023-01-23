import { IConfig } from './types';
export default class ProgressRange {
  protected config!: IConfig;

  private progressBar!: HTMLElement;
  private progressRange!: HTMLElement;

  get getProgressRange() {
    return this.progressRange;
  }

  get getOffset(){
    return this.config.isVertical
    ? this.progressBar.offsetHeight
    : this.progressBar.offsetWidth;
  }

  get getWrapperSize(){
    return this.config.isVertical
    ? this.progressBar.getBoundingClientRect().height
    : this.progressBar.getBoundingClientRect().width
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  createRange(rangeSliderSelector: HTMLElement) {
    this.progressBar = rangeSliderSelector;
    this.progressRange ? this.progressRange.remove(): false
    this.progressRange = document.createElement('div');
    this.progressRange.classList.add('progress-range');
    this.config.isVertical
    ? this.progressRange.classList.add('progress-range--vertical') : false
    this.progressBar.prepend(this.progressRange);
  }

  renderDefaultProgressRange(thumbPosition:string, value: number){
    console.log('act');
    
    if(thumbPosition === 'start'){
      this.config.isVertical
      ? this.progressRange.style.top = value + 'px'
      : this.progressRange.style.left = value + 'px'
    } else {
      this.config.isVertical
      ? this.progressRange.style.bottom = this.getWrapperSize - value + 'px'
      : this.progressRange.style.right = this.getWrapperSize - value + 'px'
    }
  }

  renderProgressRange(thumb:string, pixelValue: number): void{
    if(thumb === 'from'){
      this.config.isVertical
      ? this.progressRange.style.top = `${pixelValue}px`
      : this.progressRange.style.left = `${pixelValue}px`
    } else {
      this.config.isVertical
      ? this.progressRange.style.bottom = `${this.getOffset - pixelValue}px`
      : this.progressRange.style.right = `${this.getOffset - pixelValue}px`

    }
  }

}