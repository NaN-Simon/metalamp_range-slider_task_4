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
    // console.log(this.config);

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
    // this.thumbTo = new Thumb(this.wrapperElement, 'to');
    this.scale = new Scale(this.wrapperElement, defaultConfig);
  }

  //TODO переделать под DRY
  subscribeThumbs(){
    console.log('запуск subscribeThumbs во View');
    this.thumbFrom.subscribe((data) => {
      /* test */
      const thumbFromOffsetWTest = this.thumbFrom.getThumb.offsetWidth
      const separatorCounts = Math.ceil((defaultConfig.max - defaultConfig.min)/ defaultConfig.step)
      // console.log(separatorCounts);
      const pixelStep = ((data.rect.width/separatorCounts)) /* - thumbFromOffsetWTest/2 */
                  // console.log(pixelStep, pixelStep*separatorCounts);


      /* INFO TEST */
      let showInner = 'Ключевые точки:'
      for(let i = 0; i <= separatorCounts; i++){
        showInner += `<p>${i+1}  -  ${pixelStep*i}</p>`
      }
      document.querySelector('.v5')!.innerHTML = showInner



      /* test */

      const rectX = data.rect.x
      document.querySelector('.v3')!.innerHTML = `${rectX} - rectX`
      const rectWidth = data.rect.width
      document.querySelector('.v4')!.innerHTML = `${rectWidth} - rectWidth`
      const thumbFromOffsetW = this.thumbFrom.getThumb.offsetWidth

      const shift = (Math.min(Math.max(0, data.position - rectX), rectWidth) / rectWidth) * rectWidth
      this.thumbFrom.getThumb.style.left = `${shift /* - thumbFromOffsetW / 2 */}px`
      document.querySelector('.v1')!.innerHTML = `${shift /* - thumbFromOffsetW / 2 */}px`
      // console.log(shift);

      for(let i = 0; i <= separatorCounts; i++){
        if(shift >= (pixelStep * i) - thumbFromOffsetW / 2) {
          document.querySelector('.v2')!.innerHTML = `i*pixelStep - ${(i*pixelStep).toFixed(1).toString()}`
          this.thumbFrom.getThumb.style.left = `${i*pixelStep /* - thumbFromOffsetW / 2 */}px`
        }

      }
    })

    if(!this.thumbTo){ return }
    this.thumbTo.subscribe((data) => {
      const rectX = data.rect.x
      const rectWidth = data.rect.width
      const thumbToOffsetW = this.thumbTo.getThumb.offsetWidth

      const shift = (Math.min(Math.max(0, data.position - rectX), rectWidth) / rectWidth) * rectWidth
      this.thumbTo.getThumb.style.left = `${shift - thumbToOffsetW / 2}px`
    })
  }

  setConfig(value:IConfig){
    console.log('запуск setConfig во View');

    this.config = value
    this.updateConfig(this.config)
  }

}
