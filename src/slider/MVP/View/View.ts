import ProgressBar from './ProgressBar';
import Thumb from './Thumb';
import Ruler from './Ruler';
import Observer from '../../Observer/Observer';
import { IConfig } from '../Model/types'

interface Ithumb{
  thumbFrom: number
  thumbTo: number
}

class View extends Observer<Ithumb> {
  config: Ithumb = {
    thumbFrom: 0,
    thumbTo: 0,
  };

  valueFrom = 0;

  valueTo = 0;

  private rangeSliderElement: HTMLElement;

  private progressBarElement: ProgressBar | undefined;

  private thumbFrom: Thumb | undefined;

  private thumbTo: Thumb | undefined;

  private rulerElement: Ruler | undefined;

  constructor(sliderSelector: HTMLElement) {
    super();
    this.rangeSliderElement = sliderSelector as HTMLElement;
    console.log(this,this.rangeSliderElement);

    this.createProgressBar();
    this.createThumb();
    this.createRuler();
    this.updateConfig();
    this.broadcast(this.config);
  }

  updateConfig() {
    this.thumbFrom?.subscribe((value) => {
      this.config.thumbFrom = value;
      // console.log(this.config);
      // console.log('from', this.valueFrom, 'to', this.valueTo);
      this.broadcast(this.config);
    });
    // this.thumbFrom?.subscribe((value) => {
    //   this.valueFrom = value;
    //   console.log('from', this.valueFrom, 'to', this.valueTo);
    // });
    this.thumbTo?.subscribe((value) => {
      this.config.thumbTo = value;
      // console.log(this.config);
      // console.log('from', this.valueFrom, 'to', this.valueTo);
      this.broadcast(this.config);
    });
  }

  /* Creating Elements */
  private createRuler() {
    this.rulerElement = new Ruler(this.rangeSliderElement);
  }

  private createProgressBar() {
    this.progressBarElement = new ProgressBar(this.rangeSliderElement);
  }

  private createThumb() {
    this.thumbFrom = new Thumb(this.rangeSliderElement, 'thumbFrom', 'from');
    this.thumbTo = new Thumb(this.rangeSliderElement, 'thumbTo', 'to');
  }
}

// const newView = Array.from(document.querySelectorAll('.slider-js')) as Array<HTMLElement>;
// if (newView) {
//   newView.forEach((sliderSelector: HTMLElement) => new View(sliderSelector));
// }

export default View;
