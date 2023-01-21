import { IConfig } from './types';

export default class Promp{
  protected config!: IConfig;
  
  private promp!: HTMLElement
  private thumbElement!: HTMLElement;

  get getPromp(){
    return this.promp
  }

  updateConfig(value: IConfig): void {
    this.config = value;
  }

  createPromp(thumbSelector: HTMLElement){
    this.promp ? this.promp.remove() : false
    this.thumbElement = thumbSelector;
    this.promp = document.createElement('div')
    this.promp.classList.add('promp')
    this.thumbElement.append(this.promp)
  }

  renderPrompValue(thumb: string){
    if(thumb === 'from'){
      this.promp.innerHTML = this.config.valueFrom.toString()
    } else {
      this.promp.innerHTML = this.config.valueTo!.toString()
    }
  }

}