import Model from '../Model/Model';
import View from '../View/View';

class Presentor {
  model: Model;
  view: View;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    this.subscribeView();
    this.subscribeModel();
  }

  subscribeView() {
    this.view.subscribe((data) => {
      if (data.flow === 'configValue'){
        this.model.setValue(data.value);
      }
    });
  }

  subscribeModel(){
    this.model.subscribe((data) => {
      this.view.renderThumbValues(data)
    }
    )}
}

export default Presentor;
