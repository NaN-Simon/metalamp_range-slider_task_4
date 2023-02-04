import Observer from '../../Observer/Observer';
import { IConfig, IViewValue } from './types';

import ProgressBar from './ProgressBar';
import ProgressRange from './ProgressRange';
import Thumb from './Thumb';
import Scale from './Scale';
import Promp from './Promp';

export default class View extends Observer<IViewValue> {
  protected config!: IConfig;

  private rangeSlider: HTMLElement;
  private progressBar!: ProgressBar;
  private progressRange!: ProgressRange;
  private thumbFrom!: Thumb;
  private thumbTo: Thumb | undefined;
  private prompThumbFrom!: Promp;
  private prompThumbTo!: Promp;
  private scale!: Scale;
  private wrapper! : HTMLElement;

  constructor(wrapperSelector: HTMLElement) {
    super();
    this.rangeSlider = wrapperSelector;
    this.rangeSlider.classList.add('range-slider');
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('range-slider__wrapper');
    this.rangeSlider.append(this.wrapper);
  }

  get getWrapperSize() {
    return this.config.isVertical
      ? this.progressBar.getProgressBar.getBoundingClientRect().height
      : this.progressBar.getProgressBar.getBoundingClientRect().width;
  }

  init(value: IConfig) {
    this.config = { ...value };
    this.initComponents();
    this.setConfig(this.config);
    this.setStartValues();
    this.resizeEvent();
    this.subscribeThumbs();
  }

  private resizeEvent() {
    window.addEventListener('resize', () => {
      this.setStartValues();
      this.config.hasScale ? this.scale.createScale(this.wrapper) : false;
    });
  }

  setConfig(value: IConfig): void {
    /* console.log('            !!!IMPORT CFG COMPONENTS') */
    this.progressBar.updateConfig(this.config);
    this.progressRange.updateConfig(this.config);
    this.thumbFrom.updateConfig(this.config);
    this.thumbTo ? this.thumbTo.updateConfig(this.config) : false;
    if (this.config.hasScale) {
      this.scale.updateConfig(this.config);
    }
    if (this.config.hasPromp) {
      this.prompThumbFrom.updateConfig(this.config);
      this.thumbTo ? this.prompThumbTo.updateConfig(this.config) : false;
    }
  }

  private initComponents() {
    /* console.log('            !!!INIT COMPONENTS') */
    /* init ProgressBar */
    this.config.isVertical ? this.rangeSlider.classList.add('range-slider--vertical') : false;
    this.progressBar = new ProgressBar();
    /* init ProgressRange */
    this.progressRange = new ProgressRange();
    /* init Thumb */
    this.thumbFrom = new Thumb();
    this.config.valueTo ? this.thumbTo = new Thumb() : false;
    /* init Scale */
    if (this.config.hasScale) {
      this.scale = new Scale();
    }
    /* init Promp */
    if (this.config.hasPromp) {
      this.prompThumbFrom = new Promp();
      this.thumbTo ? this.prompThumbTo = new Promp() : false;
    }
  }

  private setStartValues() {
    /* console.log('            !!!INIT START VALUES') */
    this.progressBar.createBar(this.wrapper);
    /* Thumb creating */this.thumbFrom.createThumb(this.wrapper, 'from');
    /* Thumb creating */this.config.valueTo ? this.thumbTo?.createThumb(this.wrapper, 'to') : false;
    /* ProgressRange creatnig */this.progressRange.createRange(this.progressBar.getProgressBar);
    /* Thumb renderDefault */ this.thumbFrom.renderDefaultThumbPosition();
    /* Thumb renderDefault */ this.thumbTo ? this.thumbTo.renderDefaultThumbPosition() : false;
    if (this.config.hasScale) {
      /* Scale creating */this.scale.createScale(this.wrapper);
    }
    if (this.config.hasPromp) {
      /* Promp creating */ this.prompThumbFrom.createPromp(this.thumbFrom.getThumb);
      /* Promp creating */ this.thumbTo ? this.prompThumbTo.createPromp(this.thumbTo.getThumb) : false;
      /* Promp renderDefault */ this.prompThumbFrom.renderPrompValue('from');
      /* Promp renderDefault */ this.config.valueTo ? this.prompThumbTo.renderPrompValue('to') : false;
    }

    /* ProgressRange renderDefault */
    const from = this.thumbFrom.getStartPosition('from') as number;

    const to = this.thumbTo ? this.thumbTo.getStartPosition('to') as number : undefined;

    if (this.thumbTo) {
      this.progressRange.renderDefaultProgressRange('start', from);
      to && this.progressRange.renderDefaultProgressRange('end', to);
    } else {
      this.progressRange.renderDefaultProgressRange('end', from);
    }
  }

  private isTouchEachOther(thumb: string, value: number) {
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

  private subscribeThumbs() {
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
        this.config.hasPromp ? this.prompThumbFrom.renderPrompValue(data.dataName) : false;
        this.broadcast({ value: { value: this.config, nameState: data.dataName }, type: 'viewChanged' });
      }
    });

    if (!this.thumbTo) { return; }

    this.thumbTo.subscribe((data) => {
      const [pixelValue, value]: number[] = data.pxValueAndValue;

      if (data.dataName === 'to' && this.isTouchEachOther('to', value)) {
        this.progressRange.renderProgressRange(data.dataName, pixelValue);
        this.thumbTo ? this.thumbTo.renderThumb(pixelValue) : false;
        this.config.valueTo = value;
        this.setConfig(this.config);
        this.config.hasPromp ? this.prompThumbTo.renderPrompValue(data.dataName) : false;
        this.broadcast({ value: { value: this.config, nameState: data.dataName }, type: 'viewChanged' });
      }
    });
  }
}
