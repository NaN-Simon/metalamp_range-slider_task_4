import Model from './MVP/Model/Model';
import View from './MVP/View/View';
import Presenter from './MVP/Presenter/Presenter';

const app = Array.from(document.querySelectorAll('.range-slider-js')) as Array<HTMLElement>;

if (app) {
  app.forEach((wrapperSelector) => new Presenter(new Model(), new View(wrapperSelector)));
}
