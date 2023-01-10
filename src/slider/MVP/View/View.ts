import Observer from '../../Observer/Observer';
import defaultConfig from '../../defaultConfig';
import { IConfig, IViewValue, IRect } from './types';

import ProgressBar from './ProgressBar';
import Thumb from './Thumb';
import Scale from './Scale';
import Promp from './Promp';

export default class View extends Observer<IViewValue> {
  protected config!: IConfig;

  private wrapperElement: HTMLElement;
  private progressBar!: ProgressBar;
  private thumbFrom!: Thumb;
  private thumbTo!: Thumb;
  private prompThumbFrom!: Promp;
  private prompThumbTo!: Promp;
  private scale!: Scale;

  constructor(wrapperSelector: HTMLElement) {
    super();
    this.wrapperElement = wrapperSelector;
    this.wrapperElement.classList.add('range-slider-wrapper')
    this.initComponents();
    this.setConfig(defaultConfig)
    this.resizeEvent()
    this.renderDefaultThumbPosition();
    this.subscribeThumbs();
  }


  private resizeEvent(){
    window.addEventListener('resize',()=>{
      this.renderDefaultThumbPosition()
      this.scale.removeScale()
      this.scale.createScale()
    })
  }

  setConfig(value: IConfig): void {
    console.log('запуск updateConfig во View');
    this.config = value;
    this.progressBar.updateConfig(this.config);
    this.scale.updateConfig(this.config);
    this.thumbFrom.updateConfig(this.config);
    if(!this.thumbTo){ return }
    this.thumbTo.updateConfig(this.config);
  }

  private initComponents() {
    this.progressBar = new ProgressBar(this.wrapperElement);
    this.scale = new Scale(this.wrapperElement, defaultConfig);
    this.thumbFrom = new Thumb(this.wrapperElement, 'from');
    this.thumbTo = new Thumb(this.wrapperElement, 'to');

    this.prompThumbFrom = new Promp(this.thumbFrom.getThumb)
    this.prompThumbFrom.renderPrompValue(defaultConfig.valueFrom)
    this.prompThumbTo = new Promp(this.thumbTo.getThumb)
    this.prompThumbTo.renderPrompValue(defaultConfig.valueTo)
  }

  private renderDefaultThumbPosition(){
    const offset = this.progressBar.getProgressBar.offsetWidth
    const separatorCounts = Math.ceil((defaultConfig.max - defaultConfig.min)/ defaultConfig.step)
    const pixelStep = ((offset/separatorCounts))

    // console.log('separatorCounts',separatorCounts)
    // console.log('pixelStep',pixelStep);
    // console.log('offset',offset);

    let startPositionPxThumbFrom = 0
    let startPositionPxThumbTo = 0

    //TODO переделать под DRY
    if (Math.abs(defaultConfig.max) > Math.abs(defaultConfig.min)){
      startPositionPxThumbFrom = Math.floor(Math.abs(separatorCounts * defaultConfig.valueFrom / defaultConfig.max))* pixelStep
      startPositionPxThumbTo = Math.floor(Math.abs(separatorCounts * defaultConfig.valueTo / defaultConfig.max))* pixelStep
    } else {
      const reversFirstThumbTo = (Math.abs(defaultConfig.min) - defaultConfig.step)
      const reversFirstPxThumbTo = defaultConfig.valueTo*(offset - pixelStep)/reversFirstThumbTo
      const separatorNumberThumbTo = separatorCounts - Math.abs(reversFirstPxThumbTo / pixelStep)
      startPositionPxThumbTo = separatorNumberThumbTo*pixelStep

      const reversFirstThumbFrom = (Math.abs(defaultConfig.min) - defaultConfig.step)
      const reversFirstPxThumbFrom = defaultConfig.valueFrom*(offset - pixelStep)/reversFirstThumbFrom
      const separatorNumberThumbFrom = separatorCounts - Math.abs(reversFirstPxThumbFrom / pixelStep)
      startPositionPxThumbFrom = separatorNumberThumbFrom*pixelStep

    }

    this.thumbFrom.getThumb.style.left = startPositionPxThumbFrom +'px'
    if(!this.thumbTo){ return }
    this.thumbTo.getThumb.style.left = startPositionPxThumbTo +'px'
  }

  private getValueThroughEvent(isFristRender: boolean, thumbHTML: HTMLElement, rectWidth: number, rectX: number, eventPosition: number){
    if(isFristRender){

    } else {
      const separatorCounts = Math.ceil((defaultConfig.max - defaultConfig.min)/ defaultConfig.step)
      const pixelStep = ((rectWidth/separatorCounts))
      const offset = thumbHTML.offsetWidth
      const shift = (Math.min(Math.max(0, eventPosition - rectX), rectWidth) / rectWidth) * rectWidth;
      let pixelValue = 0;
      let value = 0;

      for(let i = 0; i <= separatorCounts; i++){
        if(shift >= (pixelStep * i) - offset / 2) {
          value = i * defaultConfig.step + defaultConfig.min;
          pixelValue = i * pixelStep
        }
      }
      return [pixelValue, value]
    }
  }

  private subscribeThumbs(){

    this.thumbFrom.subscribe((data) => {
      const [pixelValue,value]: number[] = this.getValueThroughEvent(
        false,
        this.thumbFrom.getThumb,
        data.rect.width,
        data.rect.x,
        data.eventPosition)!;

        if(this.config.valueTo >= value){
          this.thumbFrom.getThumb.style.left = `${pixelValue}px`
          this.config.valueFrom = value;
          this.prompThumbFrom.renderPrompValue(value)
          this.broadcast({value: {value: this.config, nameState: 'from'},type: 'viewChanged'})
        }

    })

    if(!this.thumbTo){ return }

    this.thumbTo.subscribe((data) => {
      const [pixelValue,value]: number[] = this.getValueThroughEvent(
        false,
        this.thumbTo.getThumb,
        data.rect.width,
        data.rect.x,
        data.eventPosition)!;

        if(this.config.valueFrom <= value){
          this.thumbTo.getThumb.style.left = `${pixelValue}px`
          this.config.valueTo = value;
          this.prompThumbTo.renderPrompValue(value)
          this.broadcast({value: {value: this.config, nameState: 'to'},type: 'viewChanged'})
        }

    })
  }

}
