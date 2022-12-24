import ProgressBar from './ProgressBar';
import Thumb from './Thumb';
import Ruler from './Ruler';
import Observer from '../../Observer/Observer';
import { IConfig, ObserverViewValues } from './types';
import defaltConfig from '../Model/defaultConfig';
import Promp from './Promp';

class View extends Observer<ObserverViewValues> {
  config: IConfig = {
    min: defaltConfig.min,
    max: defaltConfig.max,
    valueFrom: defaltConfig.valueFrom,
    valueTo: defaltConfig.valueTo,
    gap: defaltConfig.gap,
    vertical: defaltConfig.vertical,
    isFloatValues: defaltConfig.isFloatValues,
    rectWidth: defaltConfig.rectWidth,
  };

  private rangeSliderElement: HTMLElement;
  private progressBarElement: ProgressBar | undefined;
  private valueFrom: Thumb | undefined;
  private valueTo: Thumb | undefined;
  private rulerElement: Ruler | undefined;
  private prompValueFrom: Promp | undefined;
  private prompValueTo: Promp | undefined;
  // private rectWidth: number | undefined;

  constructor(sliderSelector: HTMLElement) {
    super();
    this.rangeSliderElement = sliderSelector as HTMLElement;

    this.createProgressBar();
    this.createThumb();
    this.createRuler();
    this.createPromp();
    this.updateConfig();
  }

  updateConfig(): any {
    this.valueFrom?.subscribe((data) => {
      if (data.flow === 'postitionThumb') {
        this.config.valueFrom = data.value;
        this.config.rectWidth = data.rectWidth
        console.log(this.config.rectWidth, data.rectWidth);

        this.broadcast({ value: this.config, flow: 'configValue' });
      }
    });

    this.valueTo?.subscribe((data) => {
      if (data.flow === 'postitionThumb') {
        this.config.valueTo = data.value;
        this.config.rectWidth = data.rectWidth
        // console.log(data.rectWidth);
        this.broadcast({ value: this.config, flow: 'configValue' });
      }
    });
  }

  renderThumbValues(data: ObserverViewValues) {
    // todo: переписать закоменченый код, т.к значение всеравно меняется.
    if (data.flow === 'displayValue') {
      if (this.valueFrom && this.valueFrom.thumbElement) {
        // if (data.value.valueTo - data.value.valueFrom >= data.value.gap) {
        this.valueFrom.thumbElement.style.left = `${data.value.valueFrom}px`;
        // }
      }
      if (this.valueTo && this.valueTo.thumbElement) {
        // if (data.value.valueTo - data.value.valueFrom >= data.value.gap) {
        this.valueTo.thumbElement.style.left = `${data.value.valueTo}px`;
        // }
      }
    }
  }

  renderPrompValues(data: ObserverViewValues) {
    if (this.prompValueFrom && this.prompValueFrom.prompElement) {
      this.prompValueFrom.prompElement.innerHTML = data.value.valueFrom.toString();
    }
    if (this.prompValueTo && this.prompValueTo.prompElement) {
      this.prompValueTo.prompElement.innerHTML = data.value.valueTo.toString();
    }
  }

  /* Creating Elements */

  private createRuler() {
    this.rulerElement = new Ruler(this.rangeSliderElement);
    this.rulerElement.createRulerElement(
      defaltConfig.min,
      defaltConfig.max,
      defaltConfig.gap,
    );
  }

  private createProgressBar() {
    this.progressBarElement = new ProgressBar(this.rangeSliderElement);
  }

  private createThumb() {
    this.valueFrom = new Thumb(
      this.rangeSliderElement,
      'thumbFrom',
      'from',
    );
    if (this.valueFrom && this.valueFrom.thumbElement) {
      this.valueFrom.firstThumbLoad(defaltConfig.valueFrom);
    }

    this.valueTo = new Thumb(
      this.rangeSliderElement,
      'thumbTo',
      'to',
    );
    if (this.valueTo && this.valueTo.thumbElement) {
      this.valueTo.firstThumbLoad(defaltConfig.valueTo);
    }
  }

  private createPromp() {
    if (this.valueFrom && this.valueFrom.thumbElement) {
      this.prompValueFrom = new Promp(this.valueFrom.thumbElement);
      this.prompValueFrom.firstPrompLoad(this.config.valueFrom);
    }
    if (this.valueTo && this.valueTo.thumbElement) {
      this.prompValueTo = new Promp(this.valueTo.thumbElement);
      this.prompValueTo.firstPrompLoad(this.config.valueTo);
    }
  }
}

export default View;
