import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { DataItem } from './data-item';
import { OverviewCalc } from './overview-calc';
import { DetailCalc } from './detail-calc';

const moment = extendMoment(Moment);

export class HeatService {

  static FakeRangeMin = 100;
  static FakeRangeMax = 1000;
  static Average = 450;

  static Factor = 0.0735;
  static Extension = 'kWh';

  constructor() {
    this.data = [];

    this.fakeData();

    this.overview = new OverviewCalc(this.data);
    this.detail = new DetailCalc(this.data);
  }

  get GetData() {
    return this.data.reverse();
  }

  fakeData() {
    const pointer = moment();
    const start = moment().subtract(5, 'years');
    while (!(pointer.year() === start.year() && pointer.week() === start.week())) {
      let value = (Math.random() * (HeatService.FakeRangeMax - HeatService.FakeRangeMin + 1) + HeatService.FakeRangeMin).toFixed(2);
      let cost = (value * HeatService.Factor).toFixed(2);

      this.data.push(new DataItem(
        pointer.year(),
        pointer.month() + 1,
        pointer.week(),
        pointer.quarter(),
        value,
        cost
      ));
      pointer.subtract(1, 'week');
    }
  }

}
