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
        pointer.month()+1,
        pointer.week(),
        (Math.random() * (3000 - 100) + 0.05).toFixed(2)
      ));
      pointer.subtract(1, 'week');
    }
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

  getSumTotal(total, ele) {
    return total +  Number(ele.value);
  }

  get GetOverviewDataWeeks() {
    var a = [];
    a.push(this.data.filter((_, index) => index < 4));
    a.push(this.data.filter((_,index) => index < 4+this.getISOWeeks && index >= this.getISOWeeks));
    console.log(this.data);
    return a;
  }

  get GetOverviewDataMonth() {
    var a = [];
    var thisYear = [];
    var lastYear = [];
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var pointer1 = moment(firstDay);
    var pointer2 = moment(firstDay);
    pointer2.subtract(1,'year');
    for(let i = 0; i<=3 ;i++) {
      var dataMonthThisYear = this.data.filter((e, i) => {
        var d = new Date(e.year, e.month, 1);
        return d.getTime() == pointer1.valueOf();
      });
      thisYear.push(new DataItem(
        pointer1.year(),
        pointer1.month()+1,
        pointer1.week(),
        dataMonthThisYear.reduce(this.getSumTotal, 0)
      ));
      var dataMonthLastYear = this.data.filter((e, i) => {
        var d = new Date(e.year, e.month, 1);
        return d.getTime() == pointer2.valueOf();
      });
      lastYear.push(new DataItem(
        pointer2.year(),
        pointer2.month()+1,
        pointer2.week(),
        dataMonthLastYear.reduce(this.getSumTotal, 0)
      ));
      pointer1.subtract(1,'month');
      pointer2.subtract(1,'month');
    }
    a.push(thisYear);
    a.push(lastYear);
    return a;
  }

  get GetOverviewDataQuarter(){
    var a = [];
    var thisYear = [];
    var lastYear = [];
    var pointer1 = moment();
    var pointer2 = moment();
    pointer2.subtract(1,'year');
    for(let i = 0; i<=3 ;i++) {
      var dataThisYear = this.data.filter((e, i) => {
        var d = new Date(e.year, e.month, 1);
        return d.getTime() >= pointer1.startOf('quarter').valueOf() && d.getTime() <= pointer1.endOf('quarter').valueOf();
      });
      thisYear.push(new DataItem(
        pointer1.year(),
        pointer1.month()+1,
        pointer1.week(),
        dataThisYear.reduce(this.getSumTotal, 0)
      ));
      var dataLastYear = this.data.filter((e, i) => {
        var d = new Date(e.year, e.month, 1);
        return d.getTime() >= pointer2.startOf('quarter').valueOf() && d.getTime() <= pointer2.endOf('quarter').valueOf();
      });
      lastYear.push(new DataItem(
        pointer2.year(),
        pointer2.month()+1,
        pointer2.week(),
        dataLastYear.reduce(this.getSumTotal, 0)
      ));
      pointer1.subtract(1,'quarter');
      pointer2.subtract(1,'quarter');
    }
    a.push(thisYear);
    a.push(lastYear);
    return a;
  }

}


