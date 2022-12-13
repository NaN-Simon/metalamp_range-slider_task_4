import Observer from '../../Observer/Observer';
import defaultConfig from './defaultConfig';
import { IConfig, ObserverModelValues } from './types';

class Model extends Observer<ObserverModelValues> {
  config: IConfig = {
    valueFrom: 0,
    valueTo: 0,
    vertical: false,
  };

  defaultConfig: IConfig;

  // protected config: IConfig | undefined;

  constructor() {
    super();
    this.defaultConfig = defaultConfig;
  }

  /* doesn't work beta start */

  // updateConfig(data: IConfig):void {
  //   this.validateConfig(data);
  //   // this.broadcast(this.config)
  // }

  // validateConfig(data: IConfig): IConfig {
  //   this.config = data;
  //   this.validateValueFrom();
  //   this.validateValueTo();
  //   return this.config;
  // }

  // validateValueFrom(): void {
  //   if (this.config) {
  //     this.config.valueFrom = this.defaultConfig.valueFrom;
  //   }
  // }
  // validateValueTo(): void {
  //   if (this.config) {
  //     this.config.valueTo = this.defaultConfig.valueTo;
  //   }
  // }

  /* doesn't work beta end */

  logValue(data: IConfig) {
    this.config.valueFrom = data.valueFrom;
    this.config.valueTo = data.valueTo;
    console.log(this.config);
  }
}

export default Model;
