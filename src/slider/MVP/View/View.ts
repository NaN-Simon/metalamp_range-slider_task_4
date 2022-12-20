import ProgressBar from './ProgressBar';
import Thumb from './Thumb';
import Ruler from './Ruler';
import Observer from '../../Observer/Observer';
import { IConfig, ObserverPrompValues, ObserverViewValues } from './types';
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
    floatValues: defaltConfig.floatValues,
  };

  private rangeSliderElement: HTMLElement;
  private progressBarElement: ProgressBar | undefined;
  private valueFrom: Thumb | undefined;
  private valueTo: Thumb | undefined;
  private rulerElement: Ruler | undefined;
  private prompValueFrom: Promp | undefined;
  private prompValueTo: Promp | undefined;

  constructor(sliderSelector: HTMLElement) {
    super();
    this.rangeSliderElement = sliderSelector as HTMLElement;

    this.createProgressBar();
    this.createThumb();
    this.createRuler();
    this.createPromp();
    this.updateConfig();
  }

  updateConfig() {
    this.valueFrom?.subscribe(({ value }) => {
      this.config.valueFrom = value;
      this.broadcast({ value: this.config, flow: 'configValue' });
    });
    this.valueTo?.subscribe(({ value }) => {
      this.config.valueTo = value;
      this.broadcast({ value: this.config, flow: 'configValue' });
    });
    this.prompValueFrom?.updateConfig(this.config);
    this.prompValueTo?.updateConfig(this.config);
  }

  renderThumbValues(data: ObserverViewValues) {
    if (data.flow === 'displayValue') {
      if (this.valueFrom && this.valueFrom.thumbElement) {
        if (data.value.valueTo - data.value.valueFrom >= data.value.gap) {
          this.valueFrom.thumbElement.style.left = `${data.value.valueFrom}%`;
        }
      }
      if (this.valueTo && this.valueTo.thumbElement) {
        if (data.value.valueTo - data.value.valueFrom >= data.value.gap) {
          this.valueTo.thumbElement.style.left = `${data.value.valueTo}%`;
        }
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
      this.valueFrom.thumbElement.style.left = `${defaltConfig.valueFrom}%`;
    }

    this.valueTo = new Thumb(
      this.rangeSliderElement,
      'thumbTo',
      'to',
    );
    if (this.valueTo && this.valueTo.thumbElement) {
      this.valueTo.thumbElement.style.left = `${defaltConfig.valueTo}%`;
    }
  }

  private createPromp() {
    if (this.valueFrom && this.valueFrom.thumbElement) {
      this.prompValueFrom = new Promp(this.valueFrom.thumbElement);
      this.prompValueFrom.createPrompElement();
      this.prompValueFrom.firstPrompLoad(this.config.valueFrom)
    }
    if (this.valueTo && this.valueTo.thumbElement) {
      this.prompValueTo = new Promp(this.valueTo.thumbElement);
      this.prompValueTo.createPrompElement();
      this.prompValueTo.firstPrompLoad(this.config.valueTo)
    }
  }
}

export default View;
