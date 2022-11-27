class Thumb {
  private rangeSliderElement: HTMLElement;

  private vertical: boolean;

  private progressBarElement: HTMLElement | undefined;

  private newThumbElement: HTMLElement | undefined;

  constructor(selector: HTMLElement, HTMLclassName: string) {
    this.vertical = false;

    this.rangeSliderElement = selector;

    this.progressBarElement = document.querySelector('.progress-bar') as HTMLElement;
    // this.$info = document.querySelector('.info');

    this.createThumbElement(HTMLclassName);

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
      const rect = this.rangeSliderElement.getBoundingClientRect();
      const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
      // this.$info.innerHTML = `${percent * 100}%`;
      this.newThumbElement.style.left = `${percent * 100}%`;
    }
  }

  private createThumbElement(name: string): void {
    this.newThumbElement = document.createElement('div');
    this.newThumbElement.classList.add('thumb-js');
    this.newThumbElement.classList.add('thumb');
    this.newThumbElement.classList.add(name);
    if (this.progressBarElement) {
      this.progressBarElement.append(this.newThumbElement);
    }
  }
}

export default Thumb;
