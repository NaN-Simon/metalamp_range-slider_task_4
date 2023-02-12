import { IConfig } from './types';

export default class Promp {
  protected config?: IConfig;
  protected promp?: HTMLElement;
  protected thumbElement?: HTMLElement;

  public updateConfig(value: IConfig): void {
    this.config = value;
  }

  public createPromp(thumbSelector: HTMLElement): void {
    this.thumbElement = thumbSelector;
    this.promp = document.createElement('div');
    this.promp.classList.add('promp');
    this.config?.isVertical
      ? this.promp.classList.add('promp--vertical')
      : false;
    this.thumbElement.append(this.promp);
  }

  public renderPrompValue(thumb: string) {
    if (this.config && this.promp && thumb === 'from') {
      this.promp.innerHTML = this.config.valueFrom.toString();
    } else if (this.config && this.promp && this.config.valueTo) {
      this.promp.innerHTML = this.config.valueTo.toString();
    }
  }
}
