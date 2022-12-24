import { IConfig } from './types';

class Promp {
  private newPrompElement: HTMLElement | undefined;
  private config: IConfig | undefined;
  private thumbElement: HTMLElement | null;

  constructor(thumbSelector: HTMLElement) {
    this.thumbElement = thumbSelector;
    this.createPrompElement()
  }

  get prompElement() {
    return this.newPrompElement;
  }

  private createPrompElement() {
    this.newPrompElement = document.createElement('div');
    this.newPrompElement.classList.add('promp');
    this.newPrompElement.innerHTML = '10000';
    this.thumbElement?.append(this.newPrompElement);
  }

  firstPrompLoad(value: number) {
    if (this.newPrompElement) {
      this.newPrompElement.innerHTML = value.toString();
    }
  }
}
export default Promp;
