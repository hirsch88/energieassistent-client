import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { DataItem } from './data-item';
import { OverviewCalc } from './overview-calc';
import { DetailCalc } from './detail-calc';

const moment = extendMoment(Moment);

export class EnergyService {

  static FakeRangeMaxLow = 75;
  static FakeRangeMinLow = 5;
  static FakeRangeMaxNormal = 100;
  static FakeRangeMinNormal = 10;
  static Average = 50;

  static FactorLow = 0.0735;
  static FactorNormal = 0.09;
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
      let valueNormal = (Math.random() * (EnergyService.FakeRangeMaxNormal - EnergyService.FakeRangeMinNormal + 1) + EnergyService.FakeRangeMinNormal).toFixed(2);
      let valueLow = (Math.random() * (EnergyService.FakeRangeMaxLow - EnergyService.FakeRangeMinLow + 1) + EnergyService.FakeRangeMinLow).toFixed(2);


      let costNormal = (valueNormal * EnergyService.FactorNormal).toFixed(2);
      let costLow = (valueLow * EnergyService.FactorNormal).toFixed(2);

      this.data.push(new DataItem(
        pointer.year(),
        pointer.month() + 1,
        pointer.week(),
        pointer.quarter(),
        Number(valueNormal) + Number(valueLow),
        Number(costNormal) + Number(costLow),
        valueNormal,
        valueLow,
        costNormal,
        costLow
      ));
      pointer.subtract(1, 'week');
    }
  }

}
