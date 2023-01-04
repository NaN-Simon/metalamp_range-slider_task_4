//+
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
//+
export interface ModelValues {
  value: IConfig,
  type: 'configChanged';
}
//+
export interface IPositionValues {
  value: IConfig;
  nameState: string;
}