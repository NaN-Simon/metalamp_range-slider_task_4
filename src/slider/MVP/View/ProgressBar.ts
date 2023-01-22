import { IConfig } from './types';

export default class ProgressBar {
  protected config!: IConfig;

  private rangeSliderElement!: HTMLElement;
  private progressBar!: HTMLElement;

  get getProgressBar() {
    return this.progressBar;
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  createBar(rangeSliderSelector: HTMLElement) {
    this.progressBar ? this.progressBar.remove() : false
    this.rangeSliderElement = rangeSliderSelector;
    this.progressBar = document.createElement('div');
    this.progressBar.classList.add('progress-bar');
    this.config.isVertical ? this.rotateBar() : false
    this.rangeSliderElement.prepend(this.progressBar);
  }

  rotateBar(){
    this.progressBar.classList.add('progress-bar--vertical');
  }
}
