import './styles/reset.scss';
import './styles/fonts.scss';
import './styles/index.scss';

import './slider/init/RangeSlider'
import './slider/initJquery/slider'

$('.js-slider-one').rangeSlider({
  min: -1.9,
  max: 12.2,
  valueFrom: -1.9,
  valueTo: 5.1,
  step: 4,
  isVertical: false,
  isFloatValues: true,
  hasScale: true,
  hasPromp: true,
});

$('.js-slider-two').rangeSlider({
  min: 10,
  max: 70,
  valueFrom: 30,
  valueTo: 60,
  step: 10,
  isVertical: false,
  isFloatValues: false,
  hasScale: true,
  hasPromp: true,
});

$('.js-slider-three').rangeSlider({
  min: -100.26,
  max: 10.2,
  valueFrom: -85.2,
  valueTo: -0.2,
  step: 23.43,
  isVertical: false,
  isFloatValues: true,
  hasScale: false,
  hasPromp: true,
});