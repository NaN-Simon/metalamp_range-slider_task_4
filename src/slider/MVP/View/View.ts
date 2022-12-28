import Observer from '../../Observer/Observer';
import { IViewPositionValue, IConfig, IObserverConfig } from './types';

import ProgressBar from './ProgressBar';
import Thumb from './Thumb';
import Scale from './Scale';

export default class View extends Observer<IViewPositionValue> {
  protected config!: IConfig;

  private wrapperElement: HTMLElement;
  private progressBar!: ProgressBar;
  private thumbFrom!: Thumb;
  private thumbTo!: Thumb;
  private scale!: Scale;

  constructor(wrapperSelector: HTMLElement) {
    super();
    this.wrapperElement = wrapperSelector;
    this.initComponents();
    this.subscribeThumbs();
  }

  initConfig(data: IConfig) {
    this.config = data;
  }

  updateConfig(value: IConfig): void {
    this.config = value;
    this.scale.updateConfig(this.config);
    this.thumbFrom.updateConfig(this.config);
    this.thumbTo.updateConfig(this.config);
  }

  initComponents() {
    this.progressBar = new ProgressBar(this.wrapperElement);
    this.thumbFrom = new Thumb(this.wrapperElement, 'from');
    this.thumbTo = new Thumb(this.wrapperElement, 'to');
    this.scale = new Scale(this.wrapperElement);
  }

  subscribeThumbs() {
    this.thumbFrom.subscribe((data) => {
      if (data.type === 'movingThumb') {
        // console.log(data.value);
        this.config.valueFrom = data.value;
        this.broadcast({ position: data.position, value: this.config, flow: 'configValue' });
      }
    });
    this.thumbTo.subscribe((data) => {
      if (data.type === 'movingThumb') {
        // console.log(data.value);
        this.config.valueTo = data.value;
        this.broadcast({ position: data.position, value: this.config, flow: 'configValue' });
      }
    });
  }
  // перенести отрисовку в thumb позднее
  thumbRenderTest(data: IObserverConfig) {
    if (data.flow === 'displayValue') {
      console.log(data.value);
      this.thumbFrom.getThumb.style.left = `${data.value.valueFrom}px`;
      this.thumbTo.getThumb.style.left = `${data.value.valueTo}px`;
    }
  }
}
