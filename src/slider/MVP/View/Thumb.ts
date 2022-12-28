import Observer from '../../Observer/Observer';
import { IThumbPositionValue, IConfig } from './types';

export default class Thumb extends Observer<IThumbPositionValue> {
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
  private onMouseMove(e: MouseEvent):void {
    e.preventDefault();
    this.thumb.ondragstart = () => false;
    this.broadcast({ position: this.getThumbPosition(e), value: e.x, type: 'movingThumb' });
  }

  private getThumbPosition(e: MouseEvent) {
    const rect = this.rangeSliderElement.getBoundingClientRect() as DOMRect;
    const shift = (Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width) * rect.width;

    return shift;
  }

  private onMouseDown() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseDown);
  }
}
