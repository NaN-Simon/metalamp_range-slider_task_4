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

export interface IViewPositionValue {
  position: DOMRect,
  value: IConfig,
  flow: string,
}

export interface IThumbPositionValue {
  position: DOMRect,
  value: number,
  type: string,
}

export interface IObserverConfig {
  value: IConfig,
  flow: string,
}
