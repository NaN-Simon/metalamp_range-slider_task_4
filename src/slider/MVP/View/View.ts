import ProgressBar from './ProgressBar';

class View {
  private rangeSliderElement: HTMLElement;

  private progressBarElement: ProgressBar | undefined;

  constructor(sliderSelector: HTMLElement) {
    this.rangeSliderElement = sliderSelector as HTMLElement;

    this.createProgressBar();
  }

  createProgressBar() {
    this.progressBarElement = new ProgressBar(this.rangeSliderElement);
  }
}

const newView = Array.from(document.querySelectorAll('.slider-js')) as Array<HTMLElement>;
if (newView) {
  newView.forEach((sliderSelector: HTMLElement) => new View(sliderSelector));
}

export default View;
