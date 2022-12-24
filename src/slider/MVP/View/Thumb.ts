import Observer from '../../Observer/Observer';
import { ObserverThumbValues } from './types';

class Thumb extends Observer<ObserverThumbValues> {
  private rangeSliderElement: HTMLElement;
  private progressBarElement: HTMLElement | undefined;
  private newThumbElement: HTMLElement | undefined;

  constructor(rangeSliderSelector: HTMLElement, HTMLclassName: string, dataName: string) {
    super();
    this.rangeSliderElement = rangeSliderSelector;
    this.progressBarElement = this.rangeSliderElement.querySelector('.progress-bar') as HTMLElement;
    this.createThumbElement(HTMLclassName, dataName);

    this.init();
  }

  init() {
    if (this.newThumbElement) {
      this.newThumbElement.onmousedown = () => {
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseDown);
      };
    }
  }

  onMouseDown() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseDown);
  }

  onMouseMove(e: MouseEvent):void {
    if (this.newThumbElement) {
      e.preventDefault();
      this.newThumbElement.ondragstart = () => false;
      const thumbPosition = this.getThumbPosition(e);
      // console.log(thumbPosition.rectWidth);

      this.broadcast({
        value: thumbPosition.percent,
        rectWidth: thumbPosition.rectWidth,
        flow: 'postitionThumb',
      });
    }
  }

  get thumbElement() {
    return this.newThumbElement;
  }

  private getThumbPosition(e: MouseEvent): any {
    const rect = this.rangeSliderElement.getBoundingClientRect() as DOMRect;
    const rectWidth = rect.width;
    // console.log(rect);

    const percent = (Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width) * rect.width;
    // console.log((percent * 100 * rect.width) / 100)

    return { percent, rectWidth };
    return percent * 100;
  }

  private createThumbElement(HTMLclassName: string, dataName: string): void {
    this.newThumbElement = document.createElement('div');
    this.newThumbElement.classList.add('thumb-js');
    this.newThumbElement.classList.add('thumb');
    // this.newThumbElement.classList.add(HTMLclassName);
    this.newThumbElement.setAttribute('data-name', dataName);
    if (this.progressBarElement) {
      this.progressBarElement.append(this.newThumbElement);
    }
  }

  firstThumbLoad(value: number) {
    if (this.newThumbElement) {
      this.newThumbElement.style.left = `${value}%`;
    }
  }
}

export default Thumb;
