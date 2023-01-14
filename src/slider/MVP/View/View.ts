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

  init(value: IConfig){
    this.config = Object.assign({},value)
    this.initComponents();
    this.setConfig(this.config)
    this.setStartValues()
    this.resizeEvent();
    this.subscribeThumbs();

  }

  private resizeEvent(){
    window.addEventListener('resize',()=>{
      this.setStartValues()
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
    console.log('            !!!IMPORT CFG COMPONENTS');
    this.progressBar.updateConfig(this.config);
    this.scale.updateConfig(this.config);
    this.progressRange.updateConfig(this.config);
    this.thumbFrom.updateConfig(this.config);
    this.thumbTo.updateConfig(this.config);

  }

  private initComponents() {
    console.log('            !!!INIT COMPONENTS');
    this.progressBar = new ProgressBar(this.wrapperElement);
    this.progressRange = new ProgressRange(this.progressBar.getProgressBar)
    this.scale = new Scale(this.wrapperElement, this.config);
    this.thumbFrom = new Thumb(this.wrapperElement, 'from');
    this.thumbTo = new Thumb(this.wrapperElement, 'to');
    this.prompThumbFrom = new Promp(this.thumbFrom.getThumb)
    this.prompThumbTo = new Promp(this.thumbTo.getThumb)
  }

  private setStartValues(){
    console.log('            !!!INIT START VALUES');
    this.thumbFrom.renderDefaultThumbPosition(this.progressRange.getProgressRange)
    this.thumbTo.renderDefaultThumbPosition(this.progressRange.getProgressRange)
    this.prompThumbFrom.renderPrompValue(this.config.valueFrom)
    this.prompThumbTo.renderPrompValue(this.config.valueTo)

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
        }

    })
  }

}
