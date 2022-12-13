interface IConfig {
  valueFrom: number;
  valueTo: number;
  vertical: boolean;
}

interface ObserverDataValues{
 value: IConfig;
// value: number;
}

interface ObserverThumbValues{
value: number;
}

export type {
  IConfig,
  ObserverDataValues,
  ObserverThumbValues,
};
