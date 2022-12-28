import Model from '../Model/Model';
import View from '../View/View';

export default class Presenter {
  model: Model;
  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.view.initConfig(this.model.getConfig);
    this.subscribeView();
    this.subscribeModel();
  }

  subscribeView() {
    this.view.subscribe((data) => {
      this.model.updateConfig(data.value);
    });
  }
  subscribeModel() {
    this.model.subscribe((data) => {
      this.view.thumbRenderTest(data);
    });
  }
}
