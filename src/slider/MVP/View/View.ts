import Observer from '../../Observer/Observer';
import defaultConfig from '../../defaultConfig';
import { IConfig, IViewValue } from './types';

import ProgressBar from './ProgressBar';
import Thumb from './Thumb';
import Scale from './Scale';

export default class View extends Observer<IViewValue> {
  protected config!: IConfig;

  private wrapperElement: HTMLElement;
  private progressBar!: ProgressBar;
  private thumbFrom!: Thumb;
  private thumbTo!: Thumb;
  private scale!: Scale;

  constructor(wrapperSelector: HTMLElement) {
    super();
    this.wrapperElement = wrapperSelector;
    this.wrapperElement.classList.add('range-slider-wrapper')
    this.initComponents();
    this.subscribeThumbs();
  }

  updateConfig(value: IConfig): void {
    console.log('запуск updateConfig во View');
    this.config = value;
    this.progressBar.updateConfig(this.config);
    this.scale.updateConfig(this.config);
    this.thumbFrom.updateConfig(this.config);
    this.thumbTo.updateConfig(this.config);
  }

  initComponents() {
    this.progressBar = new ProgressBar(this.wrapperElement);
    this.thumbFrom = new Thumb(this.wrapperElement, 'from');
    this.thumbTo = new Thumb(this.wrapperElement, 'to');
    this.scale = new Scale(this.wrapperElement, defaultConfig);
  }

  //TODO переделать под DRY
  subscribeThumbs(){
    console.log('запуск subscribeThumbs во View');
    this.thumbFrom.subscribe((data) => {
      const separatorCounts = Math.ceil((defaultConfig.max - defaultConfig.min)/ defaultConfig.step)
      const pixelStep = ((data.rect.width/separatorCounts))
      const rectX = data.rect.x
      const rectWidth = data.rect.width
      const thumbFromOffsetW = this.thumbFrom.getThumb.offsetWidth

      const shift = (Math.min(Math.max(0, data.position - rectX), rectWidth) / rectWidth) * rectWidth

      for(let i = 0; i <= separatorCounts; i++){
        if(shift >= (pixelStep * i) - thumbFromOffsetW / 2) {
          this.thumbFrom.getThumb.style.left = `${i * pixelStep}px`
        }
      }
    })

    if(!this.thumbTo){ return }

    this.thumbTo.subscribe((data) => {
      const separatorCounts = Math.ceil((defaultConfig.max - defaultConfig.min)/ defaultConfig.step)
      const pixelStep = ((data.rect.width/separatorCounts))
      const rectX = data.rect.x
      const rectWidth = data.rect.width
      const thumbToOffsetW = this.thumbTo.getThumb.offsetWidth

      const shift = (Math.min(Math.max(0, data.position - rectX), rectWidth) / rectWidth) * rectWidth

      for(let i = 0; i <= separatorCounts; i++){
        if(shift >= (pixelStep * i) - thumbToOffsetW / 2) {
          this.thumbTo.getThumb.style.left = `${i * pixelStep}px`
        }
      }
    })
  }



  setConfig(value:IConfig){
    console.log('запуск setConfig во View');

    this.config = value
    this.updateConfig(this.config)
  }

}
