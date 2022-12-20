import Observer from '../../Observer/Observer';
import { IConfig, ObserverPrompValues } from './types';

class Promp extends Observer<ObserverPrompValues> {
  private rangeSliderElement: HTMLElement;
  private newPrompElement: HTMLElement | undefined;
  config: IConfig | undefined;
  valueFrom: HTMLElement | null;

  constructor(rangeSliderSelector: HTMLElement) {
    super();
    this.rangeSliderElement = rangeSliderSelector;
    this.valueFrom = rangeSliderSelector;
  }

  get prompElement() {
    return this.newPrompElement;
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  createPrompElement() {
    this.newPrompElement = document.createElement('div');
    this.newPrompElement.classList.add('promp');
    this.newPrompElement.innerHTML = '10000';
    this.valueFrom?.append(this.newPrompElement);
  }

  firstPrompLoad(value: number) {
    if (this.newPrompElement) {
      this.newPrompElement.innerHTML = value.toString();
    }
  }
}
export default Promp;
