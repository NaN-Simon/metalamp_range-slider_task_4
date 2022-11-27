class ProgressBar {
  private rangeSliderElement: HTMLElement;

  private newProgressBarElement: HTMLElement | undefined;

  constructor(selector: HTMLElement) {
    this.rangeSliderElement = selector;
    this.createBar();
  }

  private createBar() {
    this.newProgressBarElement = document.createElement('div');
    this.newProgressBarElement.classList.add('progress-bar');
    this.rangeSliderElement.prepend(this.newProgressBarElement);
  }
}

export default ProgressBar;
