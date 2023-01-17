import { IConfig } from './types';

export default class Scale {
  protected config!: IConfig;

  private rangeSliderElement: HTMLElement;
  private scale!: HTMLElement;

  constructor(rangeSliderSelector: HTMLElement, defaultConfig: IConfig) {
    this.config = defaultConfig;
    this.rangeSliderElement = rangeSliderSelector;
    this.createScale();
  }

  get getScale() {
    return this.scale;
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
  removeScale(){
    this.scale.remove()
  }
  createScale() {
    const isFloat = this.isFloat();
    const scaleOffsetW = this.rangeSliderElement.offsetWidth
    const gapCount = Math.ceil((this.config.max - this.config.min)/ this.config.step)
    const pixelStep = scaleOffsetW / gapCount;
    
    this.scale = document.createElement('div');
    this.scale.classList.add('scale');

    for(let i = 0; i < gapCount;i++){
      const scalePosition = i * pixelStep;
      const scaleValue = this.config.min + i * this.config.step
      const createEl = document.createElement('div')

      createEl.classList.add('scale__separator')
      createEl.style.left = scalePosition.toString() + 'px'

      if(isFloat){
        createEl.innerHTML = scaleValue.toFixed(2).toString()
      } else {
        createEl.innerHTML = scaleValue.toString()
      }

      this.scale.append(createEl);
    }
    const scalePositionLastEl = gapCount * pixelStep
    const scaleValueLastEl = this.config.max
    const createEl = document.createElement('div')

    createEl.classList.add('scale__separator')
    createEl.style.left = scalePositionLastEl.toString() + 'px'

    if(isFloat){
      createEl.innerHTML = scaleValueLastEl.toFixed(2).toString()
    } else {
      createEl.innerHTML = scaleValueLastEl.toString()
    }

    this.scale.append(createEl);

    this.rangeSliderElement.append(this.scale);
  }
}
