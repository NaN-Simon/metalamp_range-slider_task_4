import './styles/reset.scss';
import './styles/fonts.scss';
import './styles/index.scss';

import './slider/init/RangeSlider'
import './slider/initJquery/slider'

$('.js-slider-one').rangeSlider({
  min: -100,
  max: 100,
  valueFrom: -90,
  valueTo: 90,
  step: 1,
  isVertical: false,
  isFloatValues: true,
  hasScale: false,
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
  min: -10.26,
  max: 10.2,
  valueFrom: -85.2,
  valueTo: 10.2,
  step: 4,
  isVertical: false,
  isFloatValues: true,
  hasScale: true,
  hasPromp: true,
});