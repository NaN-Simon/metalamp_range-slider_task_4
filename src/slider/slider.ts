import './slider.scss';
import './MVP/View/View.ts';

$(() => {
  console.log('The DOM is now loaded.');
});

declare global {
  interface JQuery {
    myPlugin(): void;
  }
}
(function ($) {
  jQuery.fn.myPlugin = function () {

    // функционал

  };
}(jQuery));
