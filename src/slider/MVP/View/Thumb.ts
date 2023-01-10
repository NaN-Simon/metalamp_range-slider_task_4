import Observer from '../../Observer/Observer';
import { IThumbValue, IConfig } from './types';

export default class Thumb extends Observer<IThumbValue> {
  protected config!: IConfig;

  private rangeSliderElement: HTMLElement;
  private thumb!: HTMLElement;
  private dataName: string;

  constructor(rangeSliderSelector: HTMLElement, dataName: string) {
    super();
    this.rangeSliderElement = rangeSliderSelector;
    this.dataName = dataName;
    this.createThumb();

    this.clickHandlerThumb();
  }

  get getThumb() {
    return this.thumb;
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  createThumb() {
    this.thumb = document.createElement('div');
    this.thumb.classList.add('thumb');
    this.thumb.setAttribute('data-name', this.dataName);
    this.rangeSliderElement.append(this.thumb);
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
    // return this.rangeSliderElement.getBoundingClientRect() as DOMRect;
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
    // return (Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width) * rect.width;
  }


}
