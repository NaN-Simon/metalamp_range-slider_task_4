import { IPositionValues, ModelValues, IConfig } from './types';
import Observer from '../../Observer/Observer';
import defaultConfig from './defaultConfig'

export default class Model extends Observer<ModelValues> {
  private config!: IConfig;

  constructor() {
    super();
    this.config = Object.assign({},defaultConfig);
    this.configValidation()
  }

  get getDefaultConfig(){
    return this.config
  }

  configValidation(){
    this.config.min > this.config.max
    ? this.config.max = this.config.min
    : false

    this.config.max < this.config.min
    ? this.config.min = this.config.max
    : false

    this.config.valueFrom > this.config.valueTo
    ? [this.config.valueFrom, this.config.valueTo] = [this.config.valueTo,this.config.valueFrom]
    : false

    this.config.valueFrom < this.config.min
    ? this.config.valueFrom = this.config.min
    : false

    this.config.valueTo > this.config.max
    ? this.config.valueTo = this.config.max
    : false

    this.config.step > (this.config.max-this.config.min)
    ? this.config.step = this.config.max-this.config.min
    : false

    const separatorCounts = Math.ceil((this.config.max-this.config.min) / this.config.step);

    const arr: number[] = []

    for(let i = 0; i < separatorCounts; i++){
      const value = Number((this.config.min + this.config.step * i).toFixed(2))
      arr.push(value)
    }
    if(arr[arr.length-1] !== this.config.max){arr.push(this.config.max)};

    if(!arr.includes(this.config.valueFrom)){
      arr.every((item, i) => {
        if (item > this.config.valueFrom) {
          this.config.valueFrom = arr[i-1]
          return false;
        } else {
          return true;
        }
      });
    }

    if(!arr.includes(this.config.valueTo)){
      arr.every((item, i) => {
        if (item > this.config.valueTo) {
          this.config.valueTo = arr[i]
          return false;
        } else {
          return true;
        }
      });
    }

  }
  checkPositionValues(value: IPositionValues): void {
    // console.log(this.getDefaultConfig);

  }
}
