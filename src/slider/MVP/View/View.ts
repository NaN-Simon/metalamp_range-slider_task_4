import Observer from '../../Observer/Observer';
import { IConfig, IViewValue } from './types';

import ProgressBar from './ProgressBar';
import ProgressRange from './ProgressRange';
import Thumb from './Thumb';
import Scale from './Scale';
import Promp from './Promp';

export default class View extends Observer<IViewValue> {
  protected config!: IConfig;

  private wrapperElement: HTMLElement;
  private progressBar!: ProgressBar;
  private progressRange!: ProgressRange;
  private thumbFrom!: Thumb;
  private thumbTo: Thumb | undefined;
  private prompThumbFrom!: Promp;
  private prompThumbTo!: Promp;
  private scale!: Scale;

  constructor(wrapperSelector: HTMLElement) {
    super();
    this.wrapperElement = wrapperSelector;
    this.wrapperElement.classList.add('range-slider-wrapper')


  }

  get getWrapperSize(){
    return this.config.isVertical
    ? this.progressBar.getProgressBar.getBoundingClientRect().height
    : this.progressBar.getProgressBar.getBoundingClientRect().width
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
    // console.log('            !!!IMPORT CFG COMPONENTS');
    this.progressBar.updateConfig(this.config);
    this.scale.updateConfig(this.config);
    this.progressRange.updateConfig(this.config);
    this.thumbFrom.updateConfig(this.config);
    this.thumbTo ? this.thumbTo.updateConfig(this.config) : false

  }

  private initComponents() {
    // console.log('            !!!INIT COMPONENTS');
    this.progressBar = new ProgressBar(this.wrapperElement);
    this.progressRange = new ProgressRange(this.progressBar.getProgressBar)
    this.scale = new Scale(this.wrapperElement, this.config);
    this.thumbFrom = new Thumb(this.wrapperElement, 'from');
    this.config.valueTo ? this.thumbTo = new Thumb(this.wrapperElement, 'to') : false
    this.prompThumbFrom = new Promp(this.thumbFrom.getThumb)
    this.thumbTo ? this.prompThumbTo = new Promp(this.thumbTo.getThumb) : false
  }

  private setStartValues(){
    // console.log('            !!!INIT START VALUES');
    this.thumbFrom.renderDefaultThumbPosition()
    this.thumbTo ? this.thumbTo.renderDefaultThumbPosition() : false
    
    this.prompThumbFrom.renderPrompValue(this.config.valueFrom)
    this.config.valueTo ? this.prompThumbTo.renderPrompValue(this.config.valueTo) : false

    const from = this.thumbFrom.getStartPosition('from') as number

    if(this.thumbTo){
      this.progressRange.renderDefaultProgressRange('start',from)
    } else {
      this.progressRange.renderDefaultProgressRange('end',from)
    }

    if(this.thumbTo){
      const to = this.thumbTo.getStartPosition('to')!
      this.progressRange.renderDefaultProgressRange('end',to)
    }
  }

  private isTouchEachOther(thumb: string,value: number){
    let result = false
    if(thumb === 'from' && this.config.valueTo){
      result = this.config.valueTo >= value
    } else if(thumb === 'from'){
      result = true
    } else {
      result = this.config.valueFrom <= value
    }
    return result
  }

  private subscribeThumbs(){

    this.thumbFrom.subscribe((data) => {
      const [pixelValue,value]: number[] = data.pxValueAndValue

      if(data.dataName === 'from' && this.isTouchEachOther('from', value)){
        if(this.thumbTo){
          this.progressRange.renderProgressRange(data.dataName, pixelValue)
        } else {
          this.progressRange.renderProgressRange('to', pixelValue)
        }

        this.thumbFrom.renderThumb(pixelValue)
        this.config.valueFrom = value;
        this.prompThumbFrom.renderPrompValue(value)
        this.setConfig(this.config)
        this.broadcast({value: {value: this.config, nameState: data.dataName}, type: 'viewChanged'})
      }

      })

      if(!this.thumbTo){ return }

      this.thumbTo.subscribe((data) => {
        const [pixelValue,value]: number[] = data.pxValueAndValue

        if(data.dataName === 'to' && this.isTouchEachOther('to', value)){
          this.progressRange.renderProgressRange(data.dataName, pixelValue)
          this.thumbTo ? this.thumbTo.renderThumb(pixelValue) : false
          this.config.valueTo = value;
          this.prompThumbTo.renderPrompValue(value)
          this.setConfig(this.config)
          this.broadcast({value: {value: this.config, nameState: data.dataName}, type: 'viewChanged'})
        }

    })
  }

}
