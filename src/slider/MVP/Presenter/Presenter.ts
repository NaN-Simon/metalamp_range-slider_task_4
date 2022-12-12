import Model from '../Model/Model';
import View from '../View/View';

class Presentor {
  model: Model;

  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.subscribeView();
  }

  subscribeView() {
    this.view.subscribe((data: {thumbFrom: number, thumbTo: number}) => {
      this.model.logValue(data);
    });
  }
}

export default Presentor;
