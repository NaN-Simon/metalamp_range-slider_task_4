import Observer from '../../Observer/Observer';

class Model extends Observer<number> {
  thumbFrom = 0;

  thumbTo = 0;

  logValue(data: {thumbFrom: number, thumbTo: number}) {
    this.thumbFrom = data.thumbFrom;
    this.thumbTo = data.thumbTo;
  }
}

export default Model;
