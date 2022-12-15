import Observer from '../../Observer/Observer';
import { IConfig, ObserverModelValues } from './types';
import defaultConfig from './defaultConfig'
class Model extends Observer<ObserverModelValues> {
  config: IConfig = {
    min: defaultConfig.min,
    max: defaultConfig.max,
    valueFrom: defaultConfig.valueFrom,
    valueTo: defaultConfig.valueTo,
    gap: defaultConfig.gap,
    vertical: defaultConfig.vertical,
    floatValues: defaultConfig.floatValues,
  };

  setValue(data: IConfig) {
    if(this.config.floatValues === false){
      this.config.valueFrom = Math.floor(data.valueFrom);
      this.config.valueTo = Math.floor(data.valueTo);
    } else {
      this.config.valueFrom = data.valueFrom;
      this.config.valueTo = data.valueTo;
    }
    console.log(this.config);

    this.broadcast({value: this.config, flow: 'displayValue'})
  }
}

export default Model;
