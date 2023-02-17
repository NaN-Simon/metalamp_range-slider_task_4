import { IConfig } from './types';

export default class ProgressRange {
  protected config!: IConfig;
  protected progressBar!: HTMLElement;
  protected progressRange!: HTMLElement;
  protected wrapperSize!: number;

  updateConfig(value: IConfig, wrapperSize: number): void {
    this.config = value;
    this.wrapperSize = wrapperSize;
  }

  createRange(rangeSliderSelector: HTMLElement) {
    this.progressBar = rangeSliderSelector;
    this.progressRange ? this.progressRange.remove() : false;
    this.progressRange = document.createElement('div');
    this.progressRange.classList.add('progress-range');
    this.config.isVertical
      ? this.progressRange.classList.add('progress-range--vertical') : false;
    this.progressBar.append(this.progressRange);
  }

  setHTMLPxValue(thumbPosition:string, value: number) {
    if (thumbPosition === 'start') {
      this.config.isVertical
        ? this.progressRange.style.top = `${value}px`
        : this.progressRange.style.left = `${value}px`;
    } else if (this.config.isVertical) {
      this.progressRange.style.top = `${0}px`;
      this.progressRange.style.bottom = `${this.wrapperSize - value}px`;
    } else {
      this.progressRange.style.right = `${this.wrapperSize - value}px`;
    }
  }

  renderProgressRange(thumb:string, pixelValue: number): void {
    if (thumb === 'from') {
      this.config.isVertical
        ? this.progressRange.style.top = `${pixelValue}px`
        : this.progressRange.style.left = `${pixelValue}px`;
    } else {
      this.config.isVertical
        ? this.progressRange.style.bottom = `${this.wrapperSize - pixelValue}px`
        : this.progressRange.style.right = `${this.wrapperSize - pixelValue}px`;
    }
  }
}
