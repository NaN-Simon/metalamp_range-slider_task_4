import Model from '../Model/Model';
import View from '../View/View';

export default class Presenter {
  model: Model;
  view: View;

  constructor(model: Model, view: View) {

    this.model = model;
    this.view = view;
    this.view.initStartConfig(this.model.getDefaultConfig)


    this.subscribeModel();
    this.subscribeView();
  }

  private subscribeView(): void {
    this.view.subscribe((data) => {
          if(data.type === 'viewChanged'){
            this.model.checkPositionValues(data.value);
          }
    });
  }

  private subscribeModel(): void {
    this.model.subscribe((data) => {
          if(data.type === 'configChanged'){
            this.view.setConfig(data.value);
          }
    });
  }

}
