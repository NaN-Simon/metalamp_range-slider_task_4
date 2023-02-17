import { IConfig } from './types';

export default class Scale {
  protected config!: IConfig;
  protected wrapperElement!: HTMLElement;
  protected scale!: HTMLElement;
  protected maxCountOfSeparators!: number;
  protected separatorCounts!: number;
  protected wrapperSize!: number;
  protected stepSize!: number;

  updateConfig(
    value: IConfig,
    separatorCounts:number,
    wrapperSize: number,
    stepSize: number,
  ): void {
    this.config = value;
    this.separatorCounts = separatorCounts;
    this.wrapperSize = wrapperSize;
    this.stepSize = stepSize;
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
    const strLength = (sumLength / 2.5) * this.separatorCounts;
    const PADDING = 2;
    const FONTSIZE = 8;
    const fullInnerSize = strLength * FONTSIZE * PADDING;
    return Math.ceil(((fullInnerSize * 100) / this.wrapperSize) / 100);
  }

  getValues() {
    let currentStep = 0;
    let currentValue = this.config.min;

    const arrayPixelValue = [0];
    const arrayValue = [this.config.min];

    while (currentStep <= this.wrapperSize) {
      currentStep += this.stepSize;
      currentValue += this.config.step;
      if (currentStep < this.wrapperSize) {
        arrayPixelValue.push(currentStep);
        arrayValue.push(currentValue);
      } else {
        arrayPixelValue.push(this.wrapperSize);
        arrayValue.push(this.config.max);
      }
    }
    return [arrayPixelValue, arrayValue];
  }

  createBetweenScale() {
    const indexStep = this.calcValuesWith();
    const [arrayPixelValue, arrayValue] = this.getValues();
    for (let i = 0; i < this.separatorCounts; i += indexStep) {
      /* creating el */
      const btwScale = document.createElement('span');
      btwScale.classList.add('scale__separator');
      this.config.isVertical ? btwScale.classList.add('scale__separator--vertical') : false;

      /* adding value */
      this.setHTMLValue(btwScale, arrayValue[i]);
      this.setHTMLPxValue(btwScale, arrayPixelValue[i]);

      /* check lastSeparator */
      const lastSeparator = this.separatorCounts - indexStep;
      if (i > lastSeparator) {
        const lengthPxLast = btwScale.innerHTML.length * 8;

        if (this.wrapperSize - lengthPxLast < arrayPixelValue[i]) {
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
    this.setHTMLPxValue(lastScale, this.wrapperSize);
    this.wrapperElement.append(this.scale);
    this.scale.append(lastScale);
  }
}
