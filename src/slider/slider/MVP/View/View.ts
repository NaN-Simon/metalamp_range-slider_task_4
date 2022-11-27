import ProgressBar from './ProgressBar';
import Thumb from './Thumb';

class View {
  private hasSecondThumb: boolean;

  private rangeSliderElement: HTMLElement;

  private progressBarElement: ProgressBar | undefined;

  private thumbFrom: Thumb | undefined;

  private thumbTo: Thumb | undefined;

  constructor(sliderSelector: HTMLElement) {
    this.rangeSliderElement = sliderSelector as HTMLElement;

    this.hasSecondThumb = true;
    this.createProgressBar();
    this.createThumb();
  }

  createProgressBar() {
    this.progressBarElement = new ProgressBar(this.rangeSliderElement);
  }

  createThumb() {
    this.thumbFrom = new Thumb(this.rangeSliderElement, 'thumbFrom');
    if (this.hasSecondThumb) {
      this.thumbTo = new Thumb(this.rangeSliderElement, 'thumbTo');
    }
  }
}

const newView = Array.from(document.querySelectorAll('.slider-js')) as Array<HTMLElement>;
if (newView) {
  newView.forEach((sliderSelector: HTMLElement) => new View(sliderSelector));
}

export default View;
