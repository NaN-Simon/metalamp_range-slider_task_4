import Observer from '../../Observer/Observer';
import defaultConfig from './defaultConfig';
import { IConfig } from './types';

class Model extends Observer<number> {
  thumbFrom = 0;
  thumbTo = 0;
  defaultConfig: IConfig;
  protected config: IConfig | undefined;

  constructor() {
    super();
    this.defaultConfig = defaultConfig;
  }

  updateConfig(data: IConfig):void {
    this.validateConfig(data);
    // this.broadcast(this.config)
  }

  validateConfig(data: IConfig): IConfig {
    this.config = data;
    this.validateValueFrom();
    this.validateValueTo();
    return this.config;
  }

  validateValueFrom(): void {
    if (this.config) {
      this.config.valueFrom = this.defaultConfig.valueFrom;
    }
  }
  validateValueTo(): void {
    if (this.config) {
      this.config.valueTo = this.defaultConfig.valueTo;
    }
  }

  logValue(data: {thumbFrom: number, thumbTo: number}) {
    this.thumbFrom = data.thumbFrom;
    this.thumbTo = data.thumbTo;
  }
}

export default Model;
