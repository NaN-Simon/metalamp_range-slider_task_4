//+
export interface IConfig {
  min: number;
  max: number;
  valueFrom: number;
  valueTo: number;
  step: number;
  isVertical: boolean;
  isFloatValues: boolean;
  hasRuler: boolean;
  hasPromp: boolean;
}
//+
export interface IPositionValues {
  value: IConfig;
  nameState: string;
}
//+
export interface IViewValue {
  value: IPositionValues;
  type: 'viewChanged';
}
//+
//TODO убрать лишние
export interface IThumbValue {
  pxValueAndValue: number[];
  dataName: string;
}

export interface IRect{
  top: number,
  right: number,
  bottom: number,
  left: number,
  width: number,
  height: number,
  x: number,
  y: number,
}




