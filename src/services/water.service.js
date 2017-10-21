import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { DataItem } from './data-item';
import { OverviewCalc } from './overview-calc';
import { DetailCalc } from './detail-calc';

const moment = extendMoment(Moment);

export class WaterService {

  static FakeRangeMin = 500;
  static FakeRangeMax = 4000;
  static Average = 2000;

  static Factor = 0.0735;
  static Extension = 'liter';

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
      let value = (Math.random() * (WaterService.FakeRangeMax - WaterService.FakeRangeMin + 1) + WaterService.FakeRangeMin).toFixed(2);
      let cost = (value * WaterService.Factor).toFixed(2);

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
