import Observer from '../../Observer/Observer';
import { IConfig, ObserverModelValues } from './types';
import defaultConfig from './defaultConfig'
class Model extends Observer<ObserverModelValues> {
  config: IConfig = {
    valueFrom: defaultConfig.valueFrom,
    valueTo: defaultConfig.valueTo,
    gap: defaultConfig.gap,
    vertical: defaultConfig.vertical,
    floatValues: defaultConfig.floatValues,
  };

  constructor() {
    super();
    // this.updateConfig(this.config)
    // console.log(this.config)
    this.beta()
  }

  beta(){

  }

  /* doesn't work beta start */

  // updateConfig(data: IConfig):void {
  //   this.validateConfig(data);
  //   this.broadcast({ value: this.config, flow: 'default' });
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

  setValue(data: IConfig) {
    if(this.config.floatValues === false){
      this.config.valueFrom = Math.floor(data.valueFrom);
      this.config.valueTo = Math.floor(data.valueTo);
    } else {
      this.config.valueFrom = data.valueFrom;
      this.config.valueTo = data.valueTo;
    }
    // console.log(data.valueFrom, data.valueTo);
    // console.log(data);
    console.log(this.config);

    this.broadcast({value: this.config, flow: 'displayValue'})
  }
}

export default Model;
