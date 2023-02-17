class Observer<T> {
  protected observers: ((data: T) => void)[];

  constructor() {
    this.observers = [];
  }

  subscribe(fn: (data: T) => void): void {
    this.observers.push(fn);
  }

  unsubscribe(fn: (data: T) => void): void {
    this.observers = this.observers.filter((subscriber) => subscriber !== fn);
  }

  broadcast(data: T): void {
    this.observers.forEach((subscriber) => subscriber(data));
  }
}
export default Observer;
