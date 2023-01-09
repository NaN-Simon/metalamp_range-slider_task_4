export default class Promp{
  private promp!: HTMLElement
  private thumbElement!: HTMLElement;

  constructor(thumbSelector: HTMLElement) {
    this.thumbElement = thumbSelector;
    this.createPromp()
  }

  get getPromp(){
    return this.promp
  }

  private createPromp(){
    this.promp = document.createElement('div')
    this.promp.classList.add('promp')
    this.thumbElement.append(this.promp)
  }

  renderPrompValue(value: number){
    this.promp.innerHTML = value.toString()
  }

}