import './styles/reset.scss';
import './styles/fonts.scss';
import './styles/index.scss';

import './slider/init/RangeSlider'
import './slider/initJquery/slider'

// $('.js-slider-one').rangeSlider({
//   min: -4,
//   max: 4,
//   valueFrom: 0,
//   valueTo: 4,
//   step: 1,
//   isVertical: false,
//   isFloatValues: false,
//   hasScale: true,
//   hasPromp: true,
// });

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
  min: -50.26,
  max: 50.2,
  valueFrom: -10.26,
  valueTo: 10.2,
  step: 10,
  isVertical: false,
  isFloatValues: true,
  hasScale: true,
  hasPromp: true,
});