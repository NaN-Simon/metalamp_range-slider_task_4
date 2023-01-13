import Observer from '../../Observer/Observer';
import { IConfig, IViewValue, IRect } from './types';

import ProgressBar from './ProgressBar';
import ProgressRange from './ProgressRange';
import Thumb from './Thumb';
import Scale from './Scale';
import Promp from './Promp';

export default class View extends Observer<IViewValue> {
  protected config!: IConfig;

  private wrapperElement: HTMLElement;
  private startConfig!: IConfig;
  private progressBar!: ProgressBar;
  private progressRange!: ProgressRange;
  private thumbFrom!: Thumb;
  private thumbTo!: Thumb;
  private prompThumbFrom!: Promp;
  private prompThumbTo!: Promp;
  private scale!: Scale;

  constructor(wrapperSelector: HTMLElement) {
    super();
    this.wrapperElement = wrapperSelector;
    this.wrapperElement.classList.add('range-slider-wrapper')
  }

  initStartConfig(cfgValue: IConfig){
    this.config = cfgValue
    this.initComponents();
    this.setConfig(cfgValue)
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

  private getOffset(HTMLElement: HTMLElement){
    return this.config.isVertical
    ? HTMLElement.offsetHeight
    : HTMLElement.offsetWidth;
  }

  setConfig(value: IConfig): void {
    console.log('запуск updateConfig во View');
    this.progressBar.updateConfig(this.config);
    this.scale.updateConfig(this.config);
    this.progressRange.updateConfig(this.config)
    this.thumbFrom.updateConfig(this.config);
    if(!this.thumbTo){ return }
    this.thumbTo.updateConfig(this.config);
  }

  private initComponents() {
    this.progressBar = new ProgressBar(this.wrapperElement);
    if(this.config.isVertical){this.progressBar.rotateBar()}
    this.scale = new Scale(this.wrapperElement, this.config);
    this.thumbFrom = new Thumb(this.wrapperElement, 'from');
    this.thumbTo = new Thumb(this.wrapperElement, 'to');

    this.progressRange = new ProgressRange(this.progressBar.getProgressBar)

    this.prompThumbFrom = new Promp(this.thumbFrom.getThumb)
    this.prompThumbFrom.renderPrompValue(this.config.valueFrom)
    this.prompThumbTo = new Promp(this.thumbTo.getThumb)
    this.prompThumbTo.renderPrompValue(this.config.valueTo)

  }

  private renderDefaultThumbPosition(){
    const progressBarOffset = this.getOffset(this.wrapperElement)
    const rectWidth = this.wrapperElement.getBoundingClientRect().width
    const separatorCounts = Math.ceil((this.config.max - this.config.min)/ this.config.step)

    const pixelStep = ((rectWidth/separatorCounts))
    const arr: number[] = []

    for(let i = 0; i < separatorCounts; i++){
      const value = Number((this.config.min + this.config.step * i).toFixed(1))
      arr.push(value)
    }

    if(arr[arr.length-1] !== this.config.max){arr.push(this.config.max)};

    const startPositionPxThumbFrom = ((arr.indexOf(this.config.valueFrom))*pixelStep);
    this.progressRange.getProgressRange.style.left = startPositionPxThumbFrom + 'px'
    this.thumbFrom.getThumb.style.left = startPositionPxThumbFrom +'px'


    if(!this.thumbTo){ return }

    const startPositionPxThumbTo = ((arr.indexOf(this.config.valueTo))*pixelStep);
    this.progressRange.getProgressRange.style.right = progressBarOffset - startPositionPxThumbTo + 'px'
    this.thumbTo.getThumb.style.left = startPositionPxThumbTo +'px'
  }

  private getValueThroughEvent(isFristRender: boolean, thumbHTML: HTMLElement, rectWidth: number, rectX: number, eventPosition: number){
    if(isFristRender){

    } else {
      const separatorCounts = Math.ceil((this.config.max - this.config.min)/ this.config.step)
      const pixelStep = ((rectWidth/separatorCounts))
      const progressBarOffset = this.getOffset(thumbHTML)


      const shift = (Math.min(Math.max(0, eventPosition - rectX), rectWidth) / rectWidth) * rectWidth;

      let pixelValue = 0;
      let value = 0; console.log();


      for(let i = 0; i <= separatorCounts; i++){
        if(shift >= (pixelStep * i) - progressBarOffset / 2) {
          value = Number((i * this.config.step + this.config.min).toFixed(1))
          if(value > this.config.max){value = this.config.max}
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
          this.progressRange.getProgressRange.style.left = `${pixelValue}px`
          this.thumbFrom.getThumb.style.left = `${pixelValue}px`
          this.config.valueFrom = value;
          this.prompThumbFrom.renderPrompValue(value)
          this.broadcast({value: {value: this.config, nameState: 'from'},type: 'viewChanged'})
          // console.log(this.config);
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
          this.progressRange.getProgressRange.style.right = `${this.progressBar.getProgressBar.offsetWidth - pixelValue}px`
          this.thumbTo.getThumb.style.left = `${pixelValue}px`
          this.config.valueTo = value;
          this.prompThumbTo.renderPrompValue(value)
          this.broadcast({value: {value: this.config, nameState: 'to'},type: 'viewChanged'})
          // console.log(this.config);
        }

    })
  }

}
