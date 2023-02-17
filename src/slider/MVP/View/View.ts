import Observer from '../../Observer/Observer';
import { IConfig, IViewValue } from './types';

import ProgressBar from './ProgressBar';
import ProgressRange from './ProgressRange';
import Thumb from './Thumb';
import Scale from './Scale';
import Promp from './Promp';

export default class View extends Observer<IViewValue> {
  protected config!: IConfig;

  protected rangeSlider: HTMLElement;
  protected progressBar!: ProgressBar;
  protected progressRange!: ProgressRange;
  protected thumbFrom!: Thumb;
  protected thumbTo: Thumb | undefined;
  protected prompThumbFrom!: Promp;
  protected prompThumbTo!: Promp;
  protected scale!: Scale;
  protected wrapper!: HTMLElement;

  constructor(rangeSliderSelector: HTMLElement) {
    super();
    this.rangeSlider = rangeSliderSelector;
  }

  get getSeparatorCounts() {
    return Math.ceil((this.config.max - this.config.min) / this.config.step);
  }

  get getWrapperSize() {
    return this.config.isVertical
      ? this.wrapper.offsetHeight
      : this.wrapper.offsetWidth;
  }

  get getPixelStep() {
    return this.getWrapperSize / this.getSeparatorCounts;
  }

  get getPixelSize() {
    return (this.config.max - this.config.min) / this.getWrapperSize;
  }

  get getStepSize() {
    return this.config.step / this.getPixelSize;
  }

  init(value: IConfig) {
    this.config = { ...value };
    this.initWrapper();
    this.initComponents();
    this.setConfig(this.config);
    this.setValues();
    this.resizeEvent();
    this.subscribeThumbs();
  }

  protected resizeEvent() {
    window.addEventListener('resize', () => {
      this.setConfig(this.config);
      this.setValues();
      this.config.hasScale ? this.scale.createScale(this.wrapper) : false;
    });
  }

  setConfig(value: IConfig): void {
    this.progressBar.updateConfig(value);
    this.progressRange.updateConfig(value, this.getWrapperSize);
    this.thumbFrom.updateConfig(
      value,
      this.getSeparatorCounts,
      this.getWrapperSize,
      this.getStepSize,
    );
    this.thumbTo
      ? this.thumbTo.updateConfig(
        value,
        this.getSeparatorCounts,
        this.getWrapperSize,
        this.getStepSize,
      )
      : false;
    if (value.hasScale) {
      this.scale.updateConfig(
        value,
        this.getSeparatorCounts,
        this.getWrapperSize,
        this.getStepSize,
      );
    }
    if (value.hasPromp) {
      this.prompThumbFrom.updateConfig(value);
      this.thumbTo ? this.prompThumbTo.updateConfig(value) : false;
    }
  }

  initWrapper() {
    this.rangeSlider.classList.add('range-slider');
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('range-slider__wrapper');

    this.rangeSlider.append(this.wrapper);
    this.config.isVertical
      ? this.rangeSlider.classList.add('range-slider--vertical')
      : false;
  }

  protected initComponents() {
    this.progressBar = new ProgressBar();
    this.progressRange = new ProgressRange();
    this.thumbFrom = new Thumb();
    this.config.valueTo ? (this.thumbTo = new Thumb()) : false;
    this.config.hasScale ? (this.scale = new Scale()) : false;
    this.config.hasPromp ? (this.prompThumbFrom = new Promp()) : false;
    this.config.hasPromp && this.thumbTo
      ? (this.prompThumbTo = new Promp())
      : false;
  }

  protected setValues() {
    const fromStartPosition = this.thumbFrom.getStartPosition('from') as number;
    const toStartPosition = this.thumbTo ? (this.thumbTo.getStartPosition('to') as number) : undefined;

    this.progressBar.createBar(this.wrapper);
    this.progressRange.createRange(this.wrapper);
    this.thumbFrom.createThumb(this.wrapper, 'from');
    this.config.valueTo ? this.thumbTo?.createThumb(this.wrapper, 'to') : false;
    this.config.hasScale ? this.scale.createScale(this.wrapper) : false;

    if (this.config.hasPromp) {
      this.prompThumbFrom.createPromp(this.thumbFrom.getThumb);
      this.thumbTo ? this.prompThumbTo.createPromp(this.thumbTo.getThumb) : false;
      this.prompThumbFrom.renderPrompValue('from');
      this.config.valueTo ? this.prompThumbTo.renderPrompValue('to') : false;
    }

    /* ProgressRange renderDefault */

    if (this.thumbTo) {
      this.progressRange.setHTMLPxValue('start', fromStartPosition);
      toStartPosition && this.progressRange.setHTMLPxValue('end', toStartPosition);
    } else {
      this.progressRange.setHTMLPxValue('end', fromStartPosition);
    }
  }

  protected isTouchEachOther(thumb: string, value: number) {
    let result = false;
    if (thumb === 'from' && this.config.valueTo) {
      result = this.config.valueTo >= value;
    } else if (thumb === 'from') {
      result = true;
    } else {
      result = this.config.valueFrom <= value;
    }
    return result;
  }

  protected subscribeThumbs() {
    this.thumbFrom.subscribe((data) => {
      const [pixelValue, value]: number[] = data.pxValueAndValue;

      if (data.dataName === 'from' && this.isTouchEachOther('from', value)) {
        if (this.thumbTo) {
          this.progressRange.renderProgressRange(data.dataName, pixelValue);
        } else {
          this.progressRange.renderProgressRange('to', pixelValue);
        }

        this.thumbFrom.renderThumb(pixelValue);
        this.config.valueFrom = value;
        this.setConfig(this.config);
        this.config.hasPromp
          ? this.prompThumbFrom.renderPrompValue(data.dataName)
          : false;
        this.broadcast({
          value: { value: this.config, nameState: data.dataName },
          type: 'viewChanged',
        });
      }
    });

    if (!this.thumbTo) {
      return;
    }

    this.thumbTo.subscribe((data) => {
      const [pixelValue, value]: number[] = data.pxValueAndValue;

      if (data.dataName === 'to' && this.isTouchEachOther('to', value)) {
        this.progressRange.renderProgressRange(data.dataName, pixelValue);
        this.thumbTo ? this.thumbTo.renderThumb(pixelValue) : false;
        this.config.valueTo = value;
        this.setConfig(this.config);
        this.config.hasPromp
          ? this.prompThumbTo.renderPrompValue(data.dataName)
          : false;
        this.broadcast({
          value: { value: this.config, nameState: data.dataName },
          type: 'viewChanged',
        });
      }
    });
  }
}
