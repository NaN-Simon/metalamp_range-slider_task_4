import './slider.scss';
import './MVP/View/View.ts';

import Model from './MVP/Model/Model';
import View from './MVP/View/View';
import Presentor from './MVP/Presenter/Presenter';

const appRangeSlider = Array.from(document.querySelectorAll('.slider-js')) as Array<HTMLElement>;

if (appRangeSlider) {
  appRangeSlider
    .forEach((sliderSelector: HTMLElement) => new Presentor(new Model(), new View(sliderSelector)));
}
