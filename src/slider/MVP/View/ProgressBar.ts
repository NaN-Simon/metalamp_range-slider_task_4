export default class ProgressBar {
  private rangeSliderElement: HTMLElement;
  private progressBar!: HTMLElement;

  constructor(rangeSliderSelector: HTMLElement) {
    this.rangeSliderElement = rangeSliderSelector;
    this.createBar();
  }

  createBar() {
    this.progressBar = document.createElement('div');
    this.progressBar.classList.add('progress-bar');
    this.rangeSliderElement.prepend(this.progressBar);
  }
}
