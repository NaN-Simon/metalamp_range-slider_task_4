import { IConfig } from '../slider/MVP/View/types';
import Promp from '../slider/MVP/View/Promp';

class TestingPromp extends Promp {
  public config?: IConfig;
  public promp?: HTMLElement;
  public thumbElement?: HTMLElement;
}

document.body.innerHTML = '<div class="testing"></div>';

const testThumbSelector = document.querySelector('.testing');
const testValue: IConfig = {
  min: 100,
  max: 700,
  valueFrom: 300,
  valueTo: 600,
  step: 100,
  isVertical: false,
  isFloatValues: false,
  hasScale: true,
  hasPromp: true,
};
const testingPromp = new TestingPromp();
const testingPrompUndefinded = new TestingPromp();

describe('Promp tests', () => {
  test('class should be defined', () => {
    expect(testingPromp).toBeDefined();
  });

  test('function updateConfig should assign testValue', () => {
    const mockUpdateConfig = jest.fn().mockImplementation((value) => {
      testingPromp.updateConfig(value);
    });

    mockUpdateConfig(testValue);

    expect(testingPromp.config).toBe(testValue);
  });

  test('function createPromp should make Promp and has class promp', () => {
    const mockCreatePromp = jest.fn().mockImplementation((thumbSelector) => {
      testingPromp.createPromp(thumbSelector);
    });

    mockCreatePromp(testThumbSelector);
    const testingClassList = testingPromp.promp ? Array.from(testingPromp.promp.classList) : false;

    expect(testingClassList).toContain('promp');
  });

  test('function createPromp should make Promp and has class promp--vertical', () => {
    testingPromp.config ? (testingPromp.config.isVertical = true) : false;
    const mockCreatePromp = jest.fn().mockImplementation((thumbSelector) => {
      testingPromp.createPromp(thumbSelector);
    });

    mockCreatePromp(testThumbSelector);
    const testingClassList = testingPromp.promp ? Array.from(testingPromp.promp.classList) : false;

    expect(testingClassList).toContain('promp--vertical');
  });

  test('function createPromp should make Promp and not add class promp--vertical', () => {
    testingPrompUndefinded.config = undefined;
    const mockCreatePromp = jest.fn().mockImplementation((thumbSelector) => {
      testingPrompUndefinded.createPromp(thumbSelector);
    });

    mockCreatePromp(testThumbSelector);

    expect(mockCreatePromp).toBeCalled();
    expect(mockCreatePromp).not.toContain('promp--vertical');
  });

  test('function renderPrompValue should set a value from testValue', () => {
    const mockRenderPrompValue = jest.fn().mockImplementation((thumb) => {
      testingPromp.renderPrompValue(thumb);
    });
    const valueFromResult = testValue.valueFrom.toString();
    const valueToResult = testValue.valueTo ? testValue.valueTo.toString() : false;

    let thumb = 'from';

    mockRenderPrompValue(thumb);
    expect(testingPromp.promp?.innerHTML).toEqual(valueFromResult);

    thumb = 'to';

    mockRenderPrompValue(thumb);
    expect(testingPromp.promp?.innerHTML).toEqual(valueToResult);
  });
});
