import Observer from '../../Observer/Observer';
import { IThumbValue, IConfig } from './types';

export default class Thumb extends Observer<IThumbValue> {
  protected config!: IConfig;
  protected wrapperElement!: HTMLElement;
  protected thumb!: HTMLElement;
  protected dataName!: string;
  protected separatorCounts!: number;
  protected wrapperSize!: number;
  protected stepSize!: number;

  get getThumb() {
    return this.thumb;
  }

  get getValuesArray() {
    const valuesArray: number[] = [];

    for (let i = 0; i < this.separatorCounts; i++) {
      const value = Number((this.config.min + this.config.step * i).toFixed(2));
      valuesArray.push(value);
    }

    if (valuesArray[valuesArray.length - 1] !== this.config.max) {
      valuesArray.push(this.config.max);
    }

    return valuesArray;
  }

  get getRangeSliderRect() {
    const rect = this.wrapperElement.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      x: rect.x,
      y: rect.y,
    };
  }

  updateConfig(
    value: IConfig,
    separatorCounts:number,
    wrapperSize: number,
    stepSize: number,
  ): void {
    this.config = { ...value };
    this.separatorCounts = separatorCounts;
    this.wrapperSize = wrapperSize;
    this.stepSize = stepSize;
  }

  protected getPxValueAndValue(e: MouseEvent): number[] {
    const rect = this.getRangeSliderRect; // position rangeSlider wrapper

    const shift = this.config.isVertical ? (e.y - rect.y) : (e.x - rect.x); // position cursor relatively rangeSliderWrapper size

    let pixelValue = (Math.round(shift / this.stepSize) * this.stepSize); // pixelValue via step

    if (pixelValue <= 0) pixelValue = 0; // border validation min

    if (pixelValue >= this.wrapperSize) pixelValue = this.wrapperSize; // border validation max

    let value = (((pixelValue / this.stepSize) * this.config.step) + this.config.min); // value via step

    value = this.config.isFloatValues // changeable option isFloatValues
      ? Number(value.toFixed(2))
      : Number(value.toFixed(0));

    return [pixelValue, value];
  }

  getStartPosition(thumb: string) {
    // TODO найти способ нахождения индекса без forEach (this.getValuesArray)
    // this.config.valueFrom в порядковый номер на линии progressBar 17.02 уже wrapperElement
    let position = 0;

    if (thumb === 'from') {
      const indexFrom = this.getValuesArray.indexOf(this.config.valueFrom);
      position = indexFrom * this.stepSize;
    } else if (this.config.valueTo) {
      const indexTo = (this.getValuesArray.indexOf(this.config.valueTo));

      if (this.config.valueTo === this.getValuesArray[this.getValuesArray.length - 1]) {
        position = this.wrapperSize;
      } else {
        position = indexTo * this.stepSize;
      }
    }

    return position;
  }

  createThumb(rangeSliderSelector: HTMLElement, dataName: string) {
    this.wrapperElement = rangeSliderSelector;
    this.dataName = dataName;

    this.thumb ? this.thumb.remove() : false;
    this.thumb = document.createElement('div');
    this.thumb.classList.add('thumb');
    this.config.isVertical ? this.thumb.classList.add('thumb--vertical') : false;
    this.thumb.setAttribute('data-name', this.dataName);
    this.wrapperElement.append(this.thumb);

    this.renderDefaultThumbPosition();

    this.clickHandlerBar();
    this.clickHandlerThumb();
  }

  renderDefaultThumbPosition() {
    if (this.dataName === 'from') {
      const from = `${this.getStartPosition('from')}px`;

      this.config.isVertical
        ? this.thumb.style.top = from
        : this.thumb.style.left = from;
    } else {
      const to = `${this.getStartPosition('to')}px`;

      this.config.isVertical
        ? this.thumb.style.top = to
        : this.thumb.style.left = to;
    }
  }

  protected comparePositionOnClick(closestValue:number) {
    const compareWithFrom = (Math.abs(this.config.valueFrom - closestValue));
    const compareWithTo = this.config.valueTo
      ? (Math.abs(this.config.valueTo - closestValue))
      : false;

    let closestThumb = this.config.valueTo && compareWithFrom >= compareWithTo ? 'to' : 'from';

    if (this.config.valueFrom === this.config.valueTo && closestValue < this.config.valueFrom) {
      closestThumb = 'from';
    }
    if (this.config.max === this.config.valueFrom) {
      closestThumb = 'from';
    }

    return closestThumb;
  }

  protected clickHandlerBar() {
    this.onMouseClick = this.onMouseClick.bind(this);
    this.wrapperElement.addEventListener('mousedown', this.onMouseClick);
  }

  protected onMouseClick(e: MouseEvent) {
    const [closestPxValue, closestValue] = this.getPxValueAndValue(e);
    const closestThumb = this.comparePositionOnClick(closestValue);

    if (closestThumb === 'from') {
      this.broadcast({ pxValueAndValue: [closestPxValue, closestValue], dataName: 'from' });
    } else {
      this.broadcast({ pxValueAndValue: [closestPxValue, closestValue], dataName: 'to' });
    }
  }

  protected clickHandlerThumb() {
    this.thumb.onmousedown = () => {
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseDown);
    };
  }

  protected onMouseDown() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseDown);
  }

  protected onMouseMove(e: MouseEvent):void {
    e.preventDefault();
    this.thumb.ondragstart = () => false;

    this.broadcast({ pxValueAndValue: this.getPxValueAndValue(e), dataName: this.dataName });
  }

  renderThumb(pxValue: number): void {
    this.config.isVertical
      ? this.thumb.style.top = `${pxValue}px`
      : this.thumb.style.left = `${pxValue}px`;
  }
}
