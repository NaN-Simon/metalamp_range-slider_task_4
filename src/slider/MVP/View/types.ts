export interface IConfig {
  min: number,
  max: number,
  valueFrom: number,
  valueTo: number,
  step: number,
  isVertical: boolean,
  isFloatValues: boolean,
  hasRuler: boolean,
  hasPromp: boolean,
}

export interface ObserverView {
  value: IConfig,
  flow: string,
}
