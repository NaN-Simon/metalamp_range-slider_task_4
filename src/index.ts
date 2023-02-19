import './styles/reset.scss';
import './styles/fonts.scss';
import './styles/index.scss';

import './slider/initJquery/slider';

$('.js-slider-one').rangeSlider({
  min: -5,
  max: 5,
  valueFrom: -1,
  valueTo: 5,
  step: 4,
  isVertical: false,
  isFloatValues: false,
  hasScale: true,
  hasPromp: true,
});

$('.js-slider-two').rangeSlider({
  min: -1.9,
  max: 12.2,
  valueFrom: 7,
  valueTo: undefined,
  step: 4,
  isVertical: true,
  isFloatValues: true,
  hasScale: true,
  hasPromp: true,
});

$('.js-slider-three').rangeSlider({
  min: -500,
  max: 80,
  valueFrom: -100,
  valueTo: 20,
  step: 1,
  isVertical: false,
  isFloatValues: false,
  hasScale: true,
  hasPromp: true,
});
