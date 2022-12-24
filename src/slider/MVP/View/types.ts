interface IConfig {
  min: number,
  max: number,
  valueFrom: number;
  valueTo: number;
  gap: number,
  vertical: boolean;
  isFloatValues: boolean;
  rectWidth: number;
}

interface ObserverViewValues{
 value: IConfig;
 flow: string;
}

interface ObserverThumbValues{
  value: number;
  rectWidth: number;
  flow: string;
}

interface ObserverRulerValues{
  value: number;
  flow: string;
}

export type {
  IConfig,
  ObserverViewValues,
  ObserverThumbValues,
  ObserverRulerValues,
};
