import { IConfig } from './types';
import Model from './MVP/Model/Model';
import View from './MVP/View/View';
import Presenter from './MVP/Presenter/Presenter';

const app = Array.from(document.querySelectorAll('.range-slider-js')) as Array<HTMLElement>;

const tempConfig = {
  min: -15,
  max: 15,
  valueFrom: 5,
  valueTo: 10,
  step: 5,
  isVertical: false,
  isFloatValues: false,
  hasScale: true,
  hasPromp: true,
};

class RangeSlider{
  private wrapperSelector!: HTMLElement;
  private model!: Model;
  private view!: View;
  private userConfig: IConfig;

  constructor(wrapperSelector: HTMLElement, userConfig: IConfig) {
    this.userConfig = userConfig;
    this.wrapperSelector = wrapperSelector;
    this.initModelView();
    this.setConfig(tempConfig);
    this.initPresenter();
  }

  setConfig(userConfig: IConfig){
    this.model.updateConfig(userConfig)
  }

  initModelView(){
    this.model = new Model()
    this.view = new View(this.wrapperSelector);
  }

  initPresenter(){
    new Presenter(this.model,this.view)
  }
}

app.forEach((wrapperSelector) => new RangeSlider(wrapperSelector, tempConfig))