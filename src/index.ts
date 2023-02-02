import './styles/reset.scss';
import './styles/fonts.scss';
import './styles/index.scss';

import './slider/init/RangeSlider'
import './slider/initJquery/slider'

$('.js-slider-one').rangeSlider({
  min: -5,
  max: 5,
  valueFrom: -2,
  valueTo: 2,
  step: 2,
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
  min: -50000,
  max: 8000,
  valueFrom: -10000,
  valueTo: 2000,
  step: 1,
  isVertical: false,
  isFloatValues: true,
  hasScale: false,
  hasPromp: true,
});