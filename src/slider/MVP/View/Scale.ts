import { IConfig } from './types';

export default class Scale {
  protected config!: IConfig;

  private wrapperElement!: HTMLElement;
  private scale!: HTMLElement;

  get getScale() {
    return this.scale;
  }

  get getWrapperSize(){
    return this.config.isVertical
    ? this.wrapperElement.offsetHeight
    : this.wrapperElement.offsetWidth;
  }

  get getSeparatorCounts(){
    return Math.ceil((this.config.max - this.config.min)/ this.config.step)
  }

  get getPixelStep(){
    return this.getWrapperSize / this.getSeparatorCounts
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  isFloat() {
    if (
      this.config.min % 1 !== 0 ||
      this.config.max % 1 !== 0 ||
      this.config.isFloatValues
    ) {
      return true;
    }
  }

  createScale(rangeSliderSelector: HTMLElement) {
    this.scale ? this.scale.remove() : false
    this.wrapperElement = rangeSliderSelector;

    const isFloat = this.isFloat();
    
    this.scale = document.createElement('div');
    this.scale.classList.add('scale');

    this.config.isVertical ? this.scale.classList.add('scale--veritcal') : false

    for(let i = 0; i < this.getSeparatorCounts;i++){
      const scalePosition = i * this.getPixelStep;
      const scaleValue = this.config.min + i * this.config.step
      const createEl = document.createElement('div')

      createEl.classList.add('scale__separator')

      this.config.isVertical
      ? createEl.style.top = scalePosition.toString() + 'px'
      : createEl.style.left = scalePosition.toString() + 'px'

      if(isFloat){
        createEl.innerHTML = scaleValue.toFixed(2).toString()
      } else {
        createEl.innerHTML = scaleValue.toString()
      }

      this.scale.append(createEl);
    }
    
    const scalePositionLastEl = this.getSeparatorCounts * this.getPixelStep
    const scaleValueLastEl = this.config.max
    const createEl = document.createElement('div')

    createEl.classList.add('scale__separator')

    this.config.isVertical
    ? createEl.style.top = scalePositionLastEl.toString() + 'px'
    : createEl.style.left = scalePositionLastEl.toString() + 'px'

    if(isFloat){
      createEl.innerHTML = scaleValueLastEl.toFixed(2).toString()
    } else {
      createEl.innerHTML = scaleValueLastEl.toString()
    }

    this.scale.append(createEl);

    this.wrapperElement.append(this.scale);
  }
}
