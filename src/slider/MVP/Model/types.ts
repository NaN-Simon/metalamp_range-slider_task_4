export interface IConfig {
  valueFrom: number;
  valueTo: number;
  gap: number,
  vertical: boolean;
  floatValues: boolean;
}

export interface ObserverModelValues{
   value: IConfig;
   flow: string;
  }
