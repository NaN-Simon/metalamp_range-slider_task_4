import { IConfig } from './types';
export default class ProgressRange {
  protected config!: IConfig;
  
  private rangeSliderElement: HTMLElement;
  private progressRange!: HTMLElement;

  constructor(rangeSliderSelector: HTMLElement) {
    this.rangeSliderElement = rangeSliderSelector;
    this.createRange();
  }

  get getProgressRange() {
    return this.progressRange;
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  createRange() {
    this.progressRange = document.createElement('div');
    this.progressRange.classList.add('progress-range');
    this.rangeSliderElement.prepend(this.progressRange);
  }

}