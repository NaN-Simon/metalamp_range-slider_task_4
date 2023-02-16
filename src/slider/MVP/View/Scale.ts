import { IConfig } from './types';

export default class Scale {
  protected config!: IConfig;
  protected wrapperElement!: HTMLElement;
  protected scale!: HTMLElement;

  protected maxCountOfSeparators!: number;
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

  setHTMLPxValue(elem: HTMLElement, value: number) {
    const classElem = elem;
    this.config.isVertical
      ? classElem.style.top = `${Math.floor(value)}px`
      : classElem.style.left = `${Math.floor(value)}px`;
  }

  setHTMLValue(HTMLElement: HTMLElement, value: number) {
    const elem = HTMLElement;
    this.config.isFloatValues || this.config.min % 1 !== 0 || this.config.max % 1 !== 0
      ? elem.innerText = value.toFixed(1)
      : elem.innerText = value.toFixed(0);
  }

  get getPixelSize() {
    return (this.config.max - this.config.min) / this.getSize(this.wrapperElement);
  }

  get getStepSize() {
    return this.config.step / this.getPixelSize;
  }

  createScale(rangeSliderSelector: HTMLElement) {
    this.scale ? this.scale.remove() : false;
    this.wrapperElement = rangeSliderSelector;
    this.scale = document.createElement('div');
    this.scale.classList.add('scale');
    this.config.isVertical ? this.scale.classList.add('scale--veritcal') : false;

    this.createBetweenScale();
    this.createLastScale();
  }

  calcValuesWith() {
    const sumLength = this.config.min.toString().length + this.config.max.toString().length;
    const strLength = (sumLength / 2.5) * this.getSeparatorCounts;
    const PADDING = 2;
    const FONTSIZE = 8;
    const fullInnerSize = strLength * FONTSIZE * PADDING;
    return Math.ceil(((fullInnerSize * 100) / this.getSize(this.wrapperElement)) / 100);
  }

  getValues() {
    const sliderSize = this.getSize(this.wrapperElement);
    let currentStep = 0;
    let currentValue = this.config.min;

    const arrayPixelValue = [0];
    const arrayValue = [this.config.min];

    while (currentStep <= sliderSize) {
      currentStep += this.getStepSize;
      currentValue += this.config.step;
      if (currentStep < sliderSize) {
        arrayPixelValue.push(currentStep);
        arrayValue.push(currentValue);
      } else {
        arrayPixelValue.push(sliderSize);
        arrayValue.push(this.config.max);
      }
    }
    return [arrayPixelValue, arrayValue];
  }

  createBetweenScale() {
    const indexStep = this.calcValuesWith();
    const [arrayPixelValue, arrayValue] = this.getValues();
    for (let i = 0; i < this.getSeparatorCounts; i += indexStep) {
      /* creating el */
      const btwScale = document.createElement('span');
      btwScale.classList.add('scale__separator');
      this.config.isVertical ? btwScale.classList.add('scale__separator--vertical') : false;

      /* adding value */
      this.setHTMLValue(btwScale, arrayValue[i]);
      this.setHTMLPxValue(btwScale, arrayPixelValue[i]);

      /* check lastSeparator */
      const lastSeparator = this.getSeparatorCounts - indexStep;
      if (i > lastSeparator) {
        const lengthPxLast = btwScale.innerHTML.length * 8;
        this.getSize(this.wrapperElement);
        if (this.getSize(this.wrapperElement) - lengthPxLast < arrayPixelValue[i]) {
          break;
        }
      }

      /* appending */
      this.scale.append(btwScale);
      this.wrapperElement.append(this.scale);
    }
  }

  createLastScale() {
    const lastScale = document.createElement('span');
    this.setHTMLValue(lastScale, this.config.max);
    lastScale.classList.add('scale__separator');
    this.config.isVertical ? lastScale.classList.add('scale__separator--vertical') : false;
    this.setHTMLPxValue(lastScale, this.getSize(this.wrapperElement));
    this.wrapperElement.append(this.scale);
    this.scale.append(lastScale);
  }
}
