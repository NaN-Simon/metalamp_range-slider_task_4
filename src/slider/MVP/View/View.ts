import Observer from '../../Observer/Observer';
import { ObserverView } from './types';

import ProgressBar from './ProgressBar';

export default class View extends Observer<ObserverView> {
  private wrapperElement: HTMLElement;
  private progressBar!: ProgressBar;

  constructor(wrapperSelector: HTMLElement) {
    super();
    this.wrapperElement = wrapperSelector;
    this.initComponents();
  }

  initComponents() {
    this.progressBar = new ProgressBar(this.wrapperElement);
  }
}
