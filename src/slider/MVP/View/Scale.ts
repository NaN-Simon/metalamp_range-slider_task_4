import { IConfig } from "./types";

//tempConfig удалить после настройки Presenter
const tempConfig = {
  min: -1.9,
  max: 7.2,
  valueFrom: 10,
  valueTo: 50,
  step: 2,
  isVertical: false,
  isFloatValues: true,
  hasRuler: true,
  hasPromp: true,
}
export default class Scale{
  protected config!: IConfig;

  private rangeSliderElement: HTMLElement;
  private scale!: HTMLElement;

  constructor(rangeSliderSelector: HTMLElement) {
    this.rangeSliderElement = rangeSliderSelector;
    this.createScale();
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  createScale(){
    this.scale = document.createElement('div')
    this.scale.classList.add('scale')
    for(let i = tempConfig.min; i <= tempConfig.max; i = i +tempConfig.step){
      const scaleSeparator = document.createElement('div')
      scaleSeparator.classList.add('scale__separator')
      scaleSeparator.innerHTML = i.toFixed(1).toString();
      this.scale.append(scaleSeparator)
    }
    if(tempConfig.max % 1 !== 0){
      const scaleSeparator = document.createElement('div')
      scaleSeparator.classList.add('scale__separator')
      scaleSeparator.innerHTML = tempConfig.max.toString();
      this.scale.append(scaleSeparator)
    }
    this.rangeSliderElement.append(this.scale)
  }
}