import Observer from '../../Observer/Observer';
import { ObserverRulerValues } from './types'

class Ruler extends Observer<ObserverRulerValues>  {
  private rangeSliderElement: HTMLElement;

  private createableRulerElement: HTMLElement | undefined;

  private progressBarElement: HTMLElement | undefined;

  constructor(rangeSliderSelector: HTMLElement) {
    super();
    this.rangeSliderElement = rangeSliderSelector;
    this.progressBarElement = this.rangeSliderElement.querySelector('.progress-bar') as HTMLElement;
  }

  createRulerElement(min: number, max: number): void {
    this.createableRulerElement = document.createElement('div');
    this.createableRulerElement.classList.add('ruler');
    this.createSeparators(this.createableRulerElement, min, max);
    if (this.rangeSliderElement) {
      this.rangeSliderElement.append(this.createableRulerElement);
    }
  }

  createSeparators(element:HTMLElement, min: number, max: number) {
    for (let i = min; i <= max; i++) {
      const singleSeparator = document.createElement('div');
      singleSeparator.classList.add('ruler-separator');
      singleSeparator.innerHTML = i.toString()
      element.append(singleSeparator);
    }
  }

}

export default Ruler;
