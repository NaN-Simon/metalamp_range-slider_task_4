import { IConfig } from './types';

export default class Scale {
  protected config!: IConfig;

  private rangeSliderElement: HTMLElement;
  private scale!: HTMLElement;

  constructor(rangeSliderSelector: HTMLElement, defaultConfig: IConfig) {
    this.config = defaultConfig;
    this.rangeSliderElement = rangeSliderSelector;
    this.createScale();
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  isFloat() {
    if (
      this.config.min % 1 !== 0 ||
      this.config.max % 1 !== 0 ||
      this.config.isFloatValues
    ) {
      return true;
    }
  }
  createScale() {
    const isFloat = this.isFloat();

    this.scale = document.createElement('div');
    this.scale.classList.add('scale');
    for (
      let i = this.config.min;
      i <= this.config.max - 1;
      i += this.config.step
    ) {
      const scaleSeparator = document.createElement('div');
      scaleSeparator.classList.add('scale__separator');
      if (isFloat) {
        scaleSeparator.innerHTML = i.toFixed(1).toString();
      } else {
        scaleSeparator.innerHTML = i.toFixed(0).toString();
      }
      this.scale.append(scaleSeparator);
    }
    const scaleSeparator = document.createElement('div');
    scaleSeparator.classList.add('scale__separator');
    if (isFloat) {
      scaleSeparator.innerHTML = this.config.max.toFixed(1).toString();
    } else {
      scaleSeparator.innerHTML = this.config.max.toFixed(0).toString();
    }
    this.scale.append(scaleSeparator);
    this.rangeSliderElement.append(this.scale);
  }
}
