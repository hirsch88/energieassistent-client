import * as moment from 'moment';
import { DataItem } from './data-item';

export class WaterService {

  constructor() {
    this.data = [];

    const pointer = moment();
    const start = moment().subtract(2, 'years');
    while (!(pointer.year() === start.year() && pointer.week() === start.week())) {
      this.data.push(new DataItem(
        pointer.year(),
        pointer.month(),
        pointer.week(),
        (Math.random() * (3000 - 100) + 0.05).toFixed(2)
      ));
      pointer.subtract(1, 'week');
    }
    console.log(this.GetOverviewData);
  }

  get GetOverviewData() {
    return this.data.filter((_, index) => index < 4);
  }

}


