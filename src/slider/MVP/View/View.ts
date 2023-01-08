import Observer from '../../Observer/Observer';
import defaultConfig from '../../defaultConfig';
import { IConfig, IViewValue, IRect } from './types';

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
    this.renderDefaultValues();
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

  renderDefaultValues(){
    const offset = this.progressBar.getProgressBar.offsetWidth
    const separatorCounts = Math.ceil((defaultConfig.max - defaultConfig.min)/ defaultConfig.step)
    const pixelStep = ((offset/separatorCounts))

    // console.log('separatorCounts',separatorCounts)
    // console.log('pixelStep',pixelStep);
    // console.log('offset',offset);

    let startPositionPxThumbFrom = 0
    let startPositionPxThumbTo = 0

    //TODO переделать под DRY
    if(Math.abs(defaultConfig.max) > Math.abs(defaultConfig.min)){
      startPositionPxThumbFrom = Math.floor(Math.abs(separatorCounts * defaultConfig.valueFrom / defaultConfig.max))* pixelStep
      startPositionPxThumbTo = Math.floor(Math.abs(separatorCounts * defaultConfig.valueTo / defaultConfig.max))* pixelStep
    } else {
      const reversFirstThumbTo = (Math.abs(defaultConfig.min) - defaultConfig.step)
      const reversFirstPxThumbTo = defaultConfig.valueTo*(offset - pixelStep)/reversFirstThumbTo
      const startPositionValueThumbTo = separatorCounts - Math.abs(reversFirstPxThumbTo / pixelStep)
      startPositionPxThumbTo = startPositionValueThumbTo*pixelStep

      const reversFirstThumbFrom = (Math.abs(defaultConfig.min) - defaultConfig.step)
      const reversFirstPxThumbFrom = defaultConfig.valueFrom*(offset - pixelStep)/reversFirstThumbFrom
      const startPositionValueThumbFrom = separatorCounts - Math.abs(reversFirstPxThumbFrom / pixelStep)
      startPositionPxThumbFrom = startPositionValueThumbFrom*pixelStep
    }

    this.thumbFrom.getThumb.style.left = startPositionPxThumbFrom +'px'
    this.thumbTo.getThumb.style.left = startPositionPxThumbTo +'px'
  }

  //TODO переделать под DRY
  private subscribeThumbs(){
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
          // console.log(i * pixelStep);

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
