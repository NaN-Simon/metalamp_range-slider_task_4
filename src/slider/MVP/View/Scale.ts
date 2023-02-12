import { IConfig } from './types';

export default class Scale {
  protected config!: IConfig;

  private wrapperElement!: HTMLElement;
  private scale!: HTMLElement;

  get getScale() {
    return this.scale;
  }

  getSize(element: HTMLElement) {
    return this.config.isVertical ? element.offsetHeight : element.offsetWidth;
  }

  get getSeparatorCounts() {
    return Math.ceil((this.config.max - this.config.min) / this.config.step);
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  isFloat() {
    if (
      this.config.min % 1 !== 0
      || this.config.max % 1 !== 0
      || this.config.isFloatValues
    ) {
      return true;
    } else {
      return false;
    }
  }

  createScale(rangeSliderSelector: HTMLElement) {
    this.scale ? this.scale.remove() : false;
    this.wrapperElement = rangeSliderSelector;
    this.scale = document.createElement('div');
    this.scale.classList.add('scale');
    this.config.isVertical ? this.scale.classList.add('scale--veritcal') : false;

    /* first scale */
    const firstScale = document.createElement('span');
    firstScale.innerHTML = this.config.min.toString();
    firstScale.classList.add('scale__separator', 'scale__separator--first');
    this.wrapperElement.append(this.scale);
    if (this.config.isVertical) {
      firstScale.classList.add('scale__separator--vertical');
      firstScale.style.top = `${0}px`;
    } else {
      firstScale.style.left = `${0}px`;
    }
    this.scale.append(firstScale);

    /* between scale */
    const pixelSize = (this.config.max - this.config.min) / this.getSize(this.wrapperElement);
    const stepSize = this.config.step / pixelSize;

    for (let i = 1; i < this.getSeparatorCounts; i++) {
      const btwScale = document.createElement('span');
      btwScale.classList.add('scale__separator');
      btwScale.innerHTML = (this.config.min + i * this.config.step).toString();
      if (this.config.isVertical) {
        btwScale.classList.add('scale__separator--vertical');
        btwScale.style.top = `${i * stepSize}px`;
      } else {
        btwScale.style.left = `${i * stepSize}px`;
      }
      this.scale.append(btwScale);
    }

    /* last scale */
    const lastScale = document.createElement('span');
    lastScale.innerHTML = this.config.max.toString();
    lastScale.classList.add('scale__separator', 'scale__separator--last');
    if (this.config.isVertical) {
      lastScale.classList.add('scale__separator--vertical');
      lastScale.style.top = `${this.getSize(this.wrapperElement)}px`;
    } else {
      lastScale.style.left = `${this.getSize(this.wrapperElement)}px`;
    }
    this.wrapperElement.append(this.scale);
    this.scale.append(lastScale);
  }
}
