import Observer from '../../Observer/Observer';
import { ObserverView, IConfig } from './types';

import ProgressBar from './ProgressBar';
import Thumb from './Thumb';
import Scale from './Scale';

export default class View extends Observer<ObserverView> {
  protected config!: IConfig;

  private wrapperElement: HTMLElement;
  private progressBar!: ProgressBar;
  private thumb!: Thumb;
  private scale!: Scale;

  constructor(wrapperSelector: HTMLElement) {
    super();
    this.wrapperElement = wrapperSelector;
    this.initComponents();
  }

  updateConfig(value: IConfig): void {
    this.config = value;
    this.scale.updateConfig(this.config);
  }

  initComponents() {
    this.progressBar = new ProgressBar(this.wrapperElement);
    this.thumb = new Thumb(this.wrapperElement);
    this.scale = new Scale(this.wrapperElement);
  }
}
