import { ObserverModel, IConfig } from './types';
import Observer from '../../Observer/Observer';
import defaultConfig from './defaultConfig';

export default class Model extends Observer<ObserverModel> {
  private config!: IConfig;

  constructor() {
    super();
    this.config = defaultConfig;
  }

  updateConfig(value: IConfig): void {
    this.config = value;
    this.dataControls(this.config);
    this.broadcast({ value: this.config, flow: 'displayValue' });
  }
  dataControls(value: IConfig): IConfig {
    // возможная проблема в нейминге
    this.config = value;
    return this.config;
  }

  get getConfig() {
    return this.config;
  }
}
