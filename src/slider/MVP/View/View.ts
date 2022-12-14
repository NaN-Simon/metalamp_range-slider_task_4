import ProgressBar from './ProgressBar';
import Thumb from './Thumb';
import Ruler from './Ruler';
import Observer from '../../Observer/Observer';
import { IConfig, ObserverViewValues } from './types';
import defaltConfig from '../Model/defaultConfig';

class View extends Observer<ObserverViewValues> {
  config: IConfig = {
    valueFrom: defaltConfig.valueFrom,
    valueTo: defaltConfig.valueTo,
    vertical: defaltConfig.vertical,
    floatValues: defaltConfig.floatValues,
  };

  private rangeSliderElement: HTMLElement;
  private progressBarElement: ProgressBar | undefined;
  private valueFrom: Thumb | undefined;
  private valueTo: Thumb | undefined;
  private rulerElement: Ruler | undefined;

  constructor(sliderSelector: HTMLElement) {
    super();
    this.rangeSliderElement = sliderSelector as HTMLElement;

    this.createProgressBar();
    this.createThumb();
    this.createRuler();
    this.updateConfig();
  }

  updateConfig() {
    this.valueFrom?.subscribe(({ value }) => { // flow: 'postitionThumb'
      this.config.valueFrom = value;
      this.broadcast({ value: this.config, flow: 'configValue' });
    });
    this.valueTo?.subscribe(({ value }) => { // flow: 'postitionThumb'
      this.config.valueTo = value;
      this.broadcast({ value: this.config, flow: 'configValue' });
    });
  }

  renderThumbValues(data: ObserverViewValues) {
    // console.log(data);

    if (data.flow === 'displayValue') {
      if (this.valueFrom && this.valueFrom.thumbElement) {
        this.valueFrom.thumbElement.style.left = `${data.value.valueFrom}%`;
      }
      if (this.valueTo && this.valueTo.thumbElement) {
        this.valueTo.thumbElement.style.left = `${data.value.valueTo}%`;
      }
    }
  }

  /* Creating Elements */
  private createRuler() {
    this.rulerElement = new Ruler(this.rangeSliderElement);
  }

  private createProgressBar() {
    this.progressBarElement = new ProgressBar(this.rangeSliderElement);
  }

  private createThumb() {
    this.valueFrom = new Thumb(this.rangeSliderElement, 'thumbFrom', 'from');
    if (this.valueFrom && this.valueFrom.thumbElement) {
      this.valueFrom.thumbElement.style.left = `${defaltConfig.valueFrom}%`;
    }
    this.valueTo = new Thumb(this.rangeSliderElement, 'thumbTo', 'to');
    if (this.valueTo && this.valueTo.thumbElement) {
      this.valueTo.thumbElement.style.left = `${defaltConfig.valueTo}%`;
    }
  }
}

export default View;
