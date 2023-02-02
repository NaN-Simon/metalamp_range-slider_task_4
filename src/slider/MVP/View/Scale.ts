import { IConfig } from './types';

export default class Scale {
  protected config!: IConfig;

  private wrapperElement!: HTMLElement;
  private scale!: HTMLElement;

  get getScale() {
    return this.scale;
  }

  getSize(element: HTMLElement){
    return this.config.isVertical ? element.offsetHeight : element.offsetWidth;
  }

  get getSeparatorCounts(){
    return Math.ceil((this.config.max - this.config.min)/ this.config.step)
  }

  get getPixelStep(){
    return this.getSize(this.wrapperElement) / this.getSeparatorCounts
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

  get getValuesArray(){
    const valuesArray: number[] = []
    const valuesPositionArray: number[] = []

    for(let i = 0; i < this.getSeparatorCounts; i++){
      const value = Number((this.config.min + this.config.step * i).toFixed(2))
      const valuePosition = i * this.getPixelStep
      valuesArray.push(value)
      valuesPositionArray.push(valuePosition)
    }

    if(valuesArray[valuesArray.length-1] !== this.config.max){
      valuesArray.push(this.config.max)
      valuesPositionArray.push(this.getSeparatorCounts * this.getPixelStep)
    };

    return [valuesArray, valuesPositionArray]
  }

  get getPositionArray(){
    const positionsArray: number[] = []
    for(let i = 0; i <= this.getSeparatorCounts; i++){
      const value = i * this.getPixelStep
      positionsArray.push(value)
    }
    if(positionsArray[positionsArray.length-1] !== this.config.max){
      positionsArray.push(this.getSeparatorCounts * this.getPixelStep)
    };
    console.log(positionsArray);

    return positionsArray
  }

  createScale(rangeSliderSelector: HTMLElement) {
    this.scale ? this.scale.remove() : false
    this.wrapperElement = rangeSliderSelector;

    this.scale = document.createElement('div');
    this.scale.classList.add('scale');

    this.config.isVertical ? this.scale.classList.add('scale--veritcal') : false


    const [valuesArray, valuesPositionArray] = this.getValuesArray
    for(let i = 0; i <= this.getSeparatorCounts;i++){
      const createEl = document.createElement('div')
      createEl.classList.add('scale__separator')

      this.config.isVertical ? createEl.classList.add('scale__separator--vertical') : false

      this.config.isVertical
      ? createEl.style.top = valuesPositionArray[i].toString() + 'px'
      : createEl.style.left = valuesPositionArray[i].toString() + 'px'

      this.isFloat()
      ?createEl.innerHTML = valuesArray[i].toFixed(2).toString()
      : createEl.innerHTML = valuesArray[i].toString()
      this.scale.append(createEl);

    }

    this.wrapperElement.append(this.scale);
  }
}
