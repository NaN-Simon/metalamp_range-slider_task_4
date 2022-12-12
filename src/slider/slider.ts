/* eslint-disable @typescript-eslint/no-unused-vars */
import './slider.scss';
import './MVP/View/View.ts';

import Model from './MVP/Model/Model'
import View from './MVP/View/View';
import Presentor from './MVP/Presenter/Presenter';

const app = new Presentor(new Model(), new View())