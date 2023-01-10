import { IPositionValues, ModelValues, IConfig } from './types';
import Observer from '../../Observer/Observer';
import defaultConfig from '../../defaultConfig';

export default class Model extends Observer<ModelValues> {
  private config!: IConfig;

  constructor() {
    super();
    this.config = defaultConfig;
  }

  get getConfig() {
    return this.config;
  }

  checkPositionValues(value: IPositionValues): void {
    // console.log(value);
    
  }
}
