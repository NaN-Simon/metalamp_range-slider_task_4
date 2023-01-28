import RangeSlider from '../init/RangeSlider'

((jQuery) => {
  jQuery.fn.rangeSlider = function(userConfig){
    const rangeSlider = new RangeSlider(this[0], userConfig)
    return rangeSlider
  };
})(jQuery)

