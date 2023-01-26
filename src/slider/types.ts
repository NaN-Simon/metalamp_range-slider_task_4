export interface IConfig {
  min: number,
  max: number,
  valueFrom: number,
  valueTo: number | undefined,
  step: number,
  isVertical: boolean,
  isFloatValues: boolean,
  hasScale: boolean,
  hasPromp: boolean,
}