import Observer from '../../Observer/Observer';
import { IThumbValue, IConfig } from './types';

export default class Thumb extends Observer<IThumbValue> {
  protected config!: IConfig;

  private rangeSliderElement!: HTMLElement;
  private progressBar!: HTMLElement;
  private thumb!: HTMLElement;
  private dataName: string;

  constructor(rangeSliderSelector: HTMLElement, dataName: string) {
    super();
    this.rangeSliderElement = rangeSliderSelector;
    this.progressBar = this.rangeSliderElement.querySelector('.progress-bar') as HTMLElement

    this.dataName = dataName;
    this.createThumb();

    this.clickHandlerBar();
    this.clickHandlerThumb();
  }

  get getThumb() {
    return this.thumb;
  }

  updateConfig(value: IConfig): void {
    console.log('            !!!UPDATE CFG THUMB');

    this.config = Object.assign({},value)
  }

  createThumb() {
    this.thumb = document.createElement('div');
    this.thumb.classList.add('thumb');
    this.thumb.setAttribute('data-name', this.dataName);
    this.rangeSliderElement.append(this.thumb);
  }

  private clickHandlerBar(){
    this.progressBar.onclick = () => {
      console.log('test bar');

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
    this.broadcast({eventPosition: e.x, rect: this.getThumbPosition(e), dataName: this.dataName})
  }

  private getThumbPosition(e: MouseEvent) {
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

  private getOffset(HTMLElement: HTMLElement){
    return this.config.isVertical
    ? HTMLElement.offsetHeight
    : HTMLElement.offsetWidth;
  }

  renderDefaultThumbPosition(progressRange: HTMLElement){
    const progressBarOffset = this.getOffset(this.progressBar)
    const rectWidth = this.progressBar.getBoundingClientRect().width
    const separatorCounts = Math.ceil((this.config.max - this.config.min)/ this.config.step)

    const pixelStep = ((rectWidth/separatorCounts))
    const arr: number[] = []

    for(let i = 0; i < separatorCounts; i++){
      const value = Number((this.config.min + this.config.step * i).toFixed(1))
      arr.push(value)
    }

    if(arr[arr.length-1] !== this.config.max){arr.push(this.config.max)};

    if(this.dataName === 'from'){
      const startPositionPxThumbFrom = ((arr.indexOf(this.config.valueFrom))*pixelStep);
      progressRange.style.left = startPositionPxThumbFrom + 'px'
      this.thumb.style.left = startPositionPxThumbFrom +'px'
    } else {
      const startPositionPxThumbTo = ((arr.indexOf(this.config.valueTo))*pixelStep);
      progressRange.style.right = progressBarOffset - startPositionPxThumbTo + 'px'
      this.thumb.style.left = startPositionPxThumbTo +'px'
    }
  }

}
