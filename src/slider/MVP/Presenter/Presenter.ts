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
      if(data.flow === 'configValue'){
        // console.log(data);

        this.model.updateConfig(data.value, data.position);
      }
    });
  }

  subscribeModel() {
    this.model.subscribe((data) => {
      if(data.flow === 'displayValue'){
        this.view.thumbRenderTest(data);
      }
    });
  }
}
