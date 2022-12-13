import ProgressBar from './ProgressBar';
import Thumb from './Thumb';
import Ruler from './Ruler';
import Observer from '../../Observer/Observer';
import { IConfig, ObserverDataValues } from './types';

class View extends Observer<ObserverDataValues> {
  config: IConfig = {
    valueFrom: 0,
    valueTo: 0,
    vertical: false,
  };

  private rangeSliderElement: HTMLElement;
  private progressBarElement: ProgressBar | undefined;
  private valueFrom: Thumb | undefined;
  private valueTo: Thumb | undefined;
  private rulerElement: Ruler | undefined;

  constructor(sliderSelector: HTMLElement) {
    super();
    this.rangeSliderElement = sliderSelector as HTMLElement;
    // console.log(this, this.rangeSliderElement);

    this.createProgressBar();
    this.createThumb();
    this.createRuler();
    this.updateConfig();
    this.broadcast({ value: this.config });
  }

  updateConfig() {
    this.valueFrom?.subscribe(({ value }) => {
      this.config.valueFrom = value;
      this.broadcast({ value: this.config });
    });
    // this.valueFrom?.subscribe((value) => {
    //   this.valueFrom = value;
    // });
    this.valueTo?.subscribe(({ value }) => {
      this.config.valueTo = value;
      this.broadcast({ value: this.config });
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
    this.valueFrom = new Thumb(this.rangeSliderElement, 'valueFrom', 'from');
    this.valueTo = new Thumb(this.rangeSliderElement, 'valueTo', 'to');
  }
}

// const newView = Array.from(document.querySelectorAll('.slider-js')) as Array<HTMLElement>;
// if (newView) {
//   newView.forEach((sliderSelector: HTMLElement) => new View(sliderSelector));
// }

export default View;
