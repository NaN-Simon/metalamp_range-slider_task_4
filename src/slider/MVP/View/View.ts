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
    this.thumbFrom.renderDefaultThumbPosition()
    this.thumbTo.renderDefaultThumbPosition()
    this.prompThumbFrom.renderPrompValue(this.config.valueFrom)
    this.prompThumbTo.renderPrompValue(this.config.valueTo)

  }

  private subscribeThumbs(){

    this.thumbFrom.subscribe((data) => {
      const [pixelValue,value]: number[] = data.pxValueAndValue
      // console.log('triger LEFT');
      

        if(data.dataName === 'from' && this.config.valueTo >= value){
          this.progressRange.getProgressRange.style.left = `${pixelValue}px`
          
          this.thumbFrom.getThumb.style.left = `${pixelValue}px`
          this.config.valueFrom = value;
          this.prompThumbFrom.renderPrompValue(value)
          this.setConfig(this.config)
          this.broadcast({value: {value: this.config, nameState: 'from'},type: 'viewChanged'})
        }

      })

      if(!this.thumbTo){ return }

      this.thumbTo.subscribe((data) => {
        const [pixelValue,value]: number[] = data.pxValueAndValue
        // console.log('triger RIGHT');

        if(data.dataName === 'to' && this.config.valueFrom <= value){
          this.progressRange.getProgressRange.style.right = `${this.progressBar.getProgressBar.offsetWidth - pixelValue}px`
          this.thumbTo.getThumb.style.left = `${pixelValue}px`
          this.config.valueTo = value;
          this.prompThumbTo.renderPrompValue(value)
          this.setConfig(this.config)
          this.broadcast({value: {value: this.config, nameState: 'to'},type: 'viewChanged'})
        }

    })
  }

}
