import { IConfig } from './types';
import Model from '../MVP/Model/Model';
import View from '../MVP/View/View';
import Presenter from '../MVP/Presenter/Presenter';

export default class RangeSlider {
  protected wrapperSelector!: HTMLElement;
  protected model: Model | undefined;
  protected view: View | undefined;
  protected userConfig: IConfig;

  constructor(wrapperSelector: HTMLElement, userConfig: IConfig) {
    this.userConfig = userConfig;
    this.wrapperSelector = wrapperSelector;
    this.initModelView();
    this.setConfig(userConfig);
    this.initPresenter();
  }

  setConfig(userConfig: IConfig) {
    (this.model as Model).updateConfig(userConfig);
  }

  initModelView() {
    this.model = new Model();
    this.view = new View(this.wrapperSelector);
  }

  initPresenter() {
    new Presenter(
      this.model as Model,
      this.view as View,
    );
  }
}
