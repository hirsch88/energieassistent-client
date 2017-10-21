import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
import { DataItem } from './data-item';

const moment = extendMoment(Moment);

export class OverviewCalc {

  data;

  constructor(data) {
    this.data = data;
  }

  get getISOWeeks() {
    var y = new Date().getFullYear() - 1;
    var d,
      isLeap;

    d = new Date(y, 0, 1);
    isLeap = new Date(y, 1, 29).getMonth() === 1;

    //check for a Jan 1 that's a Thursday or a leap year that has a
    //Wednesday jan 1. Otherwise it's 52
    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
  }

  get GetDataWeeks() {
    var a = [];
    a.push(this.data.filter((_, index) => index < 4).reverse());
    a.push(this.data.filter((_, index) => index < 4 + this.getISOWeeks && index >= this.getISOWeeks).reverse());
    return a;
  }

  get GetDataMonth() {
    const end = moment().endOf('month');
    const start = moment().endOf('month').subtract(4, 'month');
    const range = moment.range(start, end);
    let now = this.data.filter((e) => range.contains(moment().year(e.year).week(e.week)));

    const endPast = moment().endOf('month').subtract(1, 'year');
    const startPast = moment().endOf('month').subtract(4, 'month').subtract(1, 'year');
    const rangePast = moment.range(startPast, endPast);
    let past = this.data.filter((e) => rangePast.contains(moment().year(e.year).week(e.week)));

    now = this.sumUpMonths(now);
    past = this.sumUpMonths(past);

    return [now, past];
  }

  get GetDataQuarter() {
    const end = moment().endOf('quarter');
    const start = moment().endOf('quarter').subtract(4, 'quarter');
    const range = moment.range(start, end);
    let now = this.data.filter((e) => range.contains(moment().year(e.year).week(e.week)));

    const endPast = moment().endOf('quarter').subtract(1, 'year');
    const startPast = moment().endOf('quarter').subtract(4, 'quarter').subtract(1, 'year');
    const rangePast = moment.range(startPast, endPast);
    let past = this.data.filter((e) => rangePast.contains(moment().year(e.year).week(e.week)));

    now = this.sumUpQuarter(now);
    past = this.sumUpQuarter(past);

    return [now, past];
  }

  sumUpMonths(arr) {
    arr = _.groupBy(arr, (e) => e.month);
    for (var key in arr) {
      if (arr.hasOwnProperty(key)) {
        arr[key] = arr[key].reduce((acc, val) => {
          acc.year = val.year;
          acc.month = val.month;
          acc.quarter = val.quarter;

          acc.value += val.value;
          acc.cost += val.cost;

          return acc;
        }, new DataItem(0, 0, 0, 0, 0));
      }
    }
    return _.values(arr).map((e) => {
      e.value = parseFloat(e.value.toFixed(2));
      e.cost = parseFloat(e.cost.toFixed(2));
      return e;
    });
  }

  sumUpQuarter(arr) {
    arr = _.groupBy(arr, (e) => e.quarter);
    for (var key in arr) {
      if (arr.hasOwnProperty(key)) {
        arr[key] = arr[key].reduce((acc, val) => {
          acc.year = val.year;
          acc.month = val.month;
          acc.quarter = val.quarter;

          acc.value += val.value;
          acc.cost += val.cost;

          return acc;
        }, new DataItem(0, 0, 0, 0, 0));
      }
    }
    return _.values(arr).map((e) => {
      e.value = parseFloat(e.value.toFixed(2));
      e.cost = parseFloat(e.cost.toFixed(2));
      return e;
    });
  }

}
