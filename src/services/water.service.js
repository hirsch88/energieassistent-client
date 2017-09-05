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
    console.log(this.GetOverviewDataWeeks);
  }

  get getISOWeeks() {
    var y = new Date().getFullYear()-1;
    var d,
        isLeap;

    d = new Date(y, 0, 1);
    isLeap = new Date(y, 1, 29).getMonth() === 1;

    //check for a Jan 1 that's a Thursday or a leap year that has a 
    //Wednesday jan 1. Otherwise it's 52
    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
  }

  get GetOverviewDataWeeks() {
    var a = [];
    a.push(this.data.filter((_, index) => index < 4));
    a.push(this.data.filter((_,index) => index < 4+this.getISOWeeks && index >= this.getISOWeeks));
    return a;
  }

}


