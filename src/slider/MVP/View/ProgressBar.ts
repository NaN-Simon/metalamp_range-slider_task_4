import { IConfig } from './types';

export default class ProgressBar {
  protected config!: IConfig;
  
  private rangeSliderElement: HTMLElement;
  private progressBar!: HTMLElement;

  constructor(rangeSliderSelector: HTMLElement) {
    this.rangeSliderElement = rangeSliderSelector;
    this.createBar();
  }

  get getProgressBar() {
    return this.progressBar;
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  createBar() {
    this.progressBar = document.createElement('div');
    this.progressBar.classList.add('progress-bar');
    this.rangeSliderElement.prepend(this.progressBar);
  }
}
