class Ruler {
  private rangeSliderElement: HTMLElement;

  private newRulerElement: HTMLElement | undefined;

  private progressBarElement: HTMLElement | undefined;

  constructor(rangeSliderSelector: HTMLElement) {
    this.rangeSliderElement = rangeSliderSelector;
    this.progressBarElement = this.rangeSliderElement.querySelector('.progress-bar') as HTMLElement;

    this.createRulerElement(100);
  }

  private createRulerElement(separatorCount: number): void {
    this.newRulerElement = document.createElement('div');
    this.newRulerElement.classList.add('ruler');
    Ruler.createSeparators(this.newRulerElement, separatorCount);
    if (this.rangeSliderElement) {
      this.rangeSliderElement.append(this.newRulerElement);
    }
  }

  static createSeparators(appendingClass: HTMLElement, count: number) {
    for (let i = 0; i < count; i++) {
      const singleSeparator = document.createElement('div');
      singleSeparator.classList.add('ruler-separator');
      appendingClass.append(singleSeparator);
    }
  }
}

export default Ruler;
