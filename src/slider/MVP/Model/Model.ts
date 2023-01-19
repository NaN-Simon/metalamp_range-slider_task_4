import { IPositionValues, ModelValues, IConfig } from './types';
import Observer from '../../Observer/Observer';
import defaultConfig from './defaultConfig'

export default class Model extends Observer<ModelValues> {
  private config!: IConfig;

  constructor() {
    super();
    this.config = Object.assign({},defaultConfig);
    // console.log(this.config.valueTo);

    this.configValidation()
  }

  get getDefaultConfig(){
    return this.config
  }

  get getSeparatorCounts(){
    return Math.ceil((this.config.max - this.config.min)/ this.config.step)
  }

  get getValuesArray(){
    const valuesArray: number[] = []

    for(let i = 0; i < this.getSeparatorCounts; i++){
      const value = Number((this.config.min + this.config.step * i).toFixed(2))
      valuesArray.push(value)
    }

    if(valuesArray[valuesArray.length-1] !== this.config.max){valuesArray.push(this.config.max)};

    return valuesArray
  }

  configValidation(){
    this.config.min > this.config.max
    ? this.config.max = this.config.min
    : false

    this.config.max < this.config.min
    ? this.config.min = this.config.max
    : false

    if(this.config.valueTo !== undefined){
      this.config.valueFrom > this.config.valueTo
      ? [this.config.valueFrom, this.config.valueTo] = [this.config.valueTo,this.config.valueFrom]
      : false
    }

    this.config.valueFrom < this.config.min
    ? this.config.valueFrom = this.config.min
    : false

    if(this.config.valueTo !== undefined){
    this.config.valueTo > this.config.max
    ? this.config.valueTo = this.config.max
    : false
    }

    this.config.step > (this.config.max-this.config.min)
    ? this.config.step = this.config.max-this.config.min
    : false

    this.validationMultiplicity(this.config.valueFrom)
    if(this.config.valueTo !== undefined){
    this.validationMultiplicity(this.config.valueTo)
    }
  }

  validationMultiplicity(thumbValue: number){
    const valuesArray = this.getValuesArray
    if(!valuesArray.includes(thumbValue)){
      valuesArray.every((item, i) => {
        if (item > thumbValue) {
          if(thumbValue === this.config.valueTo) { this.config.valueTo = valuesArray[i] }
          if(thumbValue === this.config.valueFrom) { this.config.valueFrom = valuesArray[i-1] }
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
