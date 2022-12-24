export interface IConfig {
  min: number,
  max: number,
  valueFrom: number;
  valueTo: number;
  gap: number,
  vertical: boolean;
  isFloatValues: boolean;
  rectWidth: number;
}

export interface ObserverModelValues{
   value: IConfig;
   flow: string;
  }
