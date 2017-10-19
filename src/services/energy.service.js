import * as moment from 'moment';
import { DataItem } from './data-item';

export class EnergyService {

  constructor() {
    this.data = [];

    const pointer = moment();
    const start = moment().subtract(5, 'years');
    while (!(pointer.year() === start.year() && pointer.week() === start.week())) {
      var valueNormal = (Math.random() * (1000 - 300) + 0.05).toFixed(2);
      var valueLow = (Math.random() * (1500 - 300) + 0.05).toFixed(2);
      this.data.push(new DataItem(
        pointer.year(),
        pointer.month() + 1,
        pointer.week(),
        Number(valueNormal) + Number(valueLow),
        valueNormal,
        valueLow,
        valueNormal * 0.09,
        valueLow * 0.0735
      ));
      pointer.subtract(1, 'week');
    }
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

  getSumTotal(total, ele) {
    return total + Number(ele.value);
  }
  getSumNormal(total, ele) {
    return total + Number(ele.valueNormal);
  }
  getSumLow(total, ele) {
    return total + Number(ele.valueLow);
  }

  get GetOverviewDataWeeks() {
    var a = [];
    a.push(this.data.filter((_, index) => index < 4));
    a.push(this.data.filter((_, index) => index < 4 + this.getISOWeeks && index >= this.getISOWeeks));
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
    pointer2.subtract(1, 'year');
    for (let i = 0; i <= 3; i++) {
      var dataThisYear = this.data.filter((e, i) => {
        var d = new Date(e.year, e.month, 1);
        return d.getTime() == pointer1.valueOf();
      });
      var totalNormal = dataThisYear.reduce(this.getSumNormal, 0);
      var totalLow = dataThisYear.reduce(this.getSumLow, 0);
      thisYear.push(new DataItem(
        pointer1.year(),
        pointer1.month() + 1,
        pointer1.week(),
        dataThisYear.reduce(this.getSumTotal, 0),
        totalNormal,
        totalLow,
        totalNormal * 0.09,
        totalLow * 0.0735
      ));
      var dataLastYear = this.data.filter((e, i) => {
        var d = new Date(e.year, e.month, 1);
        return d.getTime() == pointer2.valueOf();
      });
      var totalNormalLastYear = dataLastYear.reduce(this.getSumNormal, 0);
      var totalLowLastYear = dataLastYear.reduce(this.getSumLow, 0);
      lastYear.push(new DataItem(
        pointer2.year(),
        pointer2.month() + 1,
        pointer2.week(),
        dataLastYear.reduce(this.getSumTotal, 0),
        totalNormalLastYear,
        totalLowLastYear,
        totalNormalLastYear * 0.09,
        totalLowLastYear * 0.0735
      ));
      pointer1.subtract(1, 'month');
      pointer2.subtract(1, 'month');
    }
    a.push(thisYear);
    a.push(lastYear);
    return a;
  }

  get GetOverviewDataQuarter() {
    var a = [];
    var thisYear = [];
    var lastYear = [];
    var pointer1 = moment();
    var pointer2 = moment();
    pointer2.subtract(1, 'year');
    for (let i = 0; i <= 3; i++) {
      var dataThisYear = this.data.filter((e, i) => {
        var d = new Date(e.year, e.month, 1);
        return d.getTime() >= pointer1.startOf('quarter').valueOf() && d.getTime() <= pointer1.endOf('quarter').valueOf();
      });
      var totalNormal = dataThisYear.reduce(this.getSumNormal, 0);
      var totalLow = dataThisYear.reduce(this.getSumLow, 0);
      thisYear.push(new DataItem(
        pointer1.year(),
        pointer1.month() + 1,
        pointer1.week(),
        dataThisYear.reduce(this.getSumTotal, 0),
        totalNormal,
        totalLow,
        totalNormal * 0.09,
        totalLow * 0.0735
      ));
      var dataLastYear = this.data.filter((e, i) => {
        var d = new Date(e.year, e.month, 1);
        return d.getTime() >= pointer2.startOf('quarter').valueOf() && d.getTime() <= pointer2.endOf('quarter').valueOf();
      });
      var totalNormalLastYear = dataLastYear.reduce(this.getSumNormal, 0);
      var totalLowLastYear = dataLastYear.reduce(this.getSumLow, 0);
      lastYear.push(new DataItem(
        pointer2.year(),
        pointer2.month() + 1,
        pointer2.week(),
        dataLastYear.reduce(this.getSumTotal, 0),
        totalNormalLastYear,
        totalLowLastYear,
        totalNormalLastYear * 0.09,
        totalLowLastYear * 0.0735
      ));
      pointer1.subtract(1, 'quarter');
      pointer2.subtract(1, 'quarter');
    }
    a.push(thisYear);
    a.push(lastYear);
    return a;
  }

  get GetDetailDataQuarter() {
    var a = [];
    a.push(this.data.filter((_, index) => index < 13));
    a.push(this.data.filter((_, index) => index < 13 + this.getISOWeeks && index >= this.getISOWeeks));
    return a;
  }

  get GetDetailDataYear() {
    var a = [];
    a.push(this.data.filter((_, index) => index < 52));
    a.push(this.data.filter((_, index) => index < 52 + this.getISOWeeks && index >= this.getISOWeeks));
    return a;
  }

  get GetData() {
    return this.data.reverse();
  }

  GetDetailDataQuarter(quarter) {
    var a = [];
    a.push(this.data.filter((_, index) => index < 13));
    a.push(this.data.filter((_, index) => index < 13 + this.getISOWeeks && index >= this.getISOWeeks));
    return a;
  }
}


