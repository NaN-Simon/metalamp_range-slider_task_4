import './screenboard.scss';

class Screenboard {
  screenboardElement: HTMLElement;

  rangeSliderElement: HTMLElement;

  constructor(selector: HTMLElement) {
    this.screenboardElement = selector;
    this.rangeSliderElement = this.screenboardElement
      .parentElement?.querySelector('.slider-js') as HTMLElement;
    setTimeout(() => {
      // console.log(View);
    }, 2000);
  }
}

const screenboard = Array.from(document.querySelectorAll('.screenboard-js')) as Array<HTMLElement>;

if (screenboard) {
  screenboard.forEach((selector: HTMLElement) => new Screenboard(selector));
}
