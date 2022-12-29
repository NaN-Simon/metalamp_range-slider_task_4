import { ObserverModel, IConfig } from './types';
import Observer from '../../Observer/Observer';
import defaultConfig from './defaultConfig';

export default class Model extends Observer<ObserverModel> {
  private config!: IConfig;
  private rect!: DOMRect;

  constructor() {
    super();
    this.config = defaultConfig;
  }

  updateConfig(value: IConfig, position: DOMRect): void {
    // console.log(value);

    this.rect = position;
    this.dataControls();

    this.broadcast({ value: this.config, flow: 'displayValue' });
  }

  dataControls(): void {
    const from = this.config.valueFrom;
    const to = this.config.valueTo;

    const shiftFrom = (Math.min(Math.max(0, from - this.rect.x), this.rect.width) / this.rect.width) * this.rect.width;
    const shiftTo = (Math.min(Math.max(0, to - this.rect.x), this.rect.width) / this.rect.width) * this.rect.width;

    this.config.valueFrom = shiftFrom
    this.config.valueTo = shiftTo
  }

  get getConfig() {
    return this.config;
  }
}
