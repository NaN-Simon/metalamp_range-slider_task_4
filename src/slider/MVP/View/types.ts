interface IConfig {
  valueFrom: number;
  valueTo: number;
  vertical: boolean;
}

interface ObserverDataValues{
 value: IConfig;
}
export type {
  IConfig,
  ObserverDataValues,
};
