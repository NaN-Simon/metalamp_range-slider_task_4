import Observer from '../../Observer/Observer';
import { IThumbValue, IConfig } from './types';

export default class Thumb extends Observer<IThumbValue> {
  protected config!: IConfig;

  private rangeSliderElement!: HTMLElement;
  private progressBar!: HTMLElement;
  private progressRange!: HTMLElement;
  private thumb!: HTMLElement;
  private dataName!: string;

  get getThumb() {
    return this.thumb;
  }

  get getThumbSize(){
    return this.config.isVertical
    ? this.thumb.getBoundingClientRect().height
    : this.thumb.getBoundingClientRect().width
  }

  get getWrapperSize(){
    return this.config.isVertical
    ? this.progressBar.getBoundingClientRect().height
    : this.progressBar.getBoundingClientRect().width
  }

  get getSeparatorCounts(){
    return Math.ceil((this.config.max - this.config.min)/ this.config.step)
  }

  get getPixelStep(){
    return this.getWrapperSize / this.getSeparatorCounts
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

  get getRangeSliderRect() {
    const rect = this.rangeSliderElement.getBoundingClientRect()
    return {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      x: rect.x,
      y: rect.y
    };
  }

  private getPxValueAndValue(e: MouseEvent): number[] {
    const rect = this.getRangeSliderRect
    let shift = 0
    if(this.config.isVertical){
      shift = (Math.min(Math.max(0, e.y - rect.y), rect.height) / rect.height) * rect.height;
    } else {
      shift = (Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width) * rect.width;
    }
    let pixelValue = 0;
    let value = 0;

    for(let i = 0; i <= this.getSeparatorCounts; i++){
      if(shift >= (this.getPixelStep * i) - this.getThumbSize / 2) {
        value = Number((i * this.config.step + this.config.min).toFixed(2))
        if(value > this.config.max){value = this.config.max}
        pixelValue = i * this.getPixelStep
      }
    }

    return [pixelValue, value]
  }

  getStartPosition(thumb: string){
    const valuesArray = this.getValuesArray
    let position = 0
    if(thumb === 'from'){
      position = ((valuesArray.indexOf(this.config.valueFrom))*this.getPixelStep)
    } else if (this.config.valueTo){
      position = ((valuesArray.indexOf(this.config.valueTo))*this.getPixelStep)
    }
    return position
  }

  updateConfig(value: IConfig): void {
    /* console.log('            !!!UPDATE CFG THUMB') */
    this.config = Object.assign({},value)
  }

  createThumb(rangeSliderSelector: HTMLElement, dataName: string) {
    this.rangeSliderElement = rangeSliderSelector;
    this.progressBar = this.rangeSliderElement.querySelector('.progress-bar') as HTMLElement
    this.progressRange = this.rangeSliderElement.querySelector('.progress-range') as HTMLElement
    this.dataName = dataName;

    this.thumb ? this.thumb.remove() : false
    this.thumb = document.createElement('div');
    this.thumb.classList.add('thumb');
    this.config.isVertical ? this.thumb.classList.add('thumb--vertical') : false
    this.thumb.setAttribute('data-name', this.dataName);
    this.rangeSliderElement.append(this.thumb);
    this.clickHandlerBar();
    this.clickHandlerThumb();
  }

  private comparePositionOnClick(closestValue:number){
    const compareWithFrom = (Math.abs(this.config.valueFrom - closestValue));
    const compareWithTo = this.config.valueTo ? (Math.abs(this.config.valueTo - closestValue)) : false

    let closestThumb = this.config.valueTo && compareWithFrom >= compareWithTo ? 'to' : 'from'

    if(this.config.valueFrom === this.config.valueTo && closestValue < this.config.valueFrom){
      closestThumb = 'from'
    }
    if(this.config.max === this.config.valueFrom){
      closestThumb = 'from'
    }

    return closestThumb
  }

  private clickHandlerBar(){
    this.onMouseClick = this.onMouseClick.bind(this);
    this.progressBar.addEventListener('mousedown', this.onMouseClick)
  }

  private onMouseClick(e: MouseEvent){
    const [closestPxValue,closestValue] = this.getPxValueAndValue(e)
    const closestThumb = this.comparePositionOnClick(closestValue)

      if(closestThumb === 'from'){
        this.broadcast({pxValueAndValue: [closestPxValue, closestValue], dataName: 'from'})
      } else {
        this.broadcast({pxValueAndValue: [closestPxValue, closestValue], dataName: 'to'})
      }
  }

  private clickHandlerThumb() {
    this.thumb.onmousedown = () => {
      this.onMouseMove = this.onMouseMove.bind(this);
      this.onMouseDown = this.onMouseDown.bind(this);
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseDown);
    };
  }

  private onMouseDown() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseDown);
  }

  private onMouseMove(e: MouseEvent):void {
    e.preventDefault();
    this.thumb.ondragstart = () => false;
    this.getPxValueAndValue(e);

    this.broadcast({pxValueAndValue: this.getPxValueAndValue(e), dataName: this.dataName})
  }

  renderDefaultThumbPosition(){

    if(this.dataName === 'from'){
      this.config.isVertical
      ? this.thumb.style.top = this.getStartPosition('from') +'px'
      : this.thumb.style.left = this.getStartPosition('from') +'px'
    } else {
      this.config.isVertical
      ? this.thumb.style.top = this.getStartPosition('to') +'px'
      : this.thumb.style.left = this.getStartPosition('to') +'px'
    }
  }

  renderThumb(pxValue: number): void{
    this.config.isVertical
    ? this.thumb.style.top = `${pxValue}px`
    : this.thumb.style.left = `${pxValue}px`
  }
}
