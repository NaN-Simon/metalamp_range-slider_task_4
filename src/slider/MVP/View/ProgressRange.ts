import { IConfig } from './types';
export default class ProgressRange {
  protected config!: IConfig;

  private progressBar!: HTMLElement;
  private progressRange!: HTMLElement;

  get getProgressRange() {
    return this.progressRange;
  }

  get isVertical(){
    return this.config.isVertical
  }

  get getOffset(){
    return this.isVertical
    ? this.progressBar.offsetHeight
    : this.progressBar.offsetWidth;
  }

  get getWrapperSize(){
    return this.isVertical
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
    this.isVertical
    ? this.progressRange.classList.add('progress-range--vertical') : false
    this.progressBar.prepend(this.progressRange);
  }

  renderDefaultProgressRange(thumbPosition:string, value: number){
    if(thumbPosition === 'start'){
      this.isVertical
      ? this.progressRange.style.top = value + 'px'
      : this.progressRange.style.left = value + 'px'
    } else {
      if(this.isVertical){

        this.progressRange.style.top = 0 + 'px'
        this.progressRange.style.bottom = this.getWrapperSize - value + 'px'
      } else {
        this.progressRange.style.right = this.getWrapperSize - value + 'px'
      }
    }
  }

  renderProgressRange(thumb:string, pixelValue: number): void{
    if(thumb === 'from'){
      this.isVertical
      ? this.progressRange.style.top = `${pixelValue}px`
      : this.progressRange.style.left = `${pixelValue}px`
    } else {
      this.isVertical
      ? this.progressRange.style.bottom = `${this.getOffset - pixelValue}px`
      : this.progressRange.style.right = `${this.getOffset - pixelValue}px`

    }
  }

}