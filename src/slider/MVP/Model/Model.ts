import { ObserverModel, IConfig } from './types';
import Observer from '../../Observer/Observer';
import defaultConfig from './defaultConfig';

export default class Model extends Observer<ObserverModel> {
  private defaultConfig!: IConfig;

  constructor() {
    super();
    this.defaultConfig = defaultConfig;
  }
}
