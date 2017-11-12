import * as moment from 'moment';

export class DataItem {

  constructor(year, month, week, quarter, value, cost, valueNormal, valueLow, costNormal, costLow) {
    this.year = year;
    this.month = month;
    this.week = week;
    this.quarter = quarter;

    this.value = parseFloat(parseFloat(value).toFixed(2));
    this.cost = parseFloat(parseFloat(cost).toFixed(2));

    if (valueNormal) {
      this.valueNormal = parseFloat(parseFloat(valueNormal).toFixed(2));
    }
    if (valueLow) {
      this.valueLow = parseFloat(parseFloat(valueLow).toFixed(2));
    }
    if (costNormal) {
      this.costNormal = parseFloat(parseFloat(costNormal).toFixed(2));
    }
    if (costLow) {
      this.costLow = parseFloat(parseFloat(costLow).toFixed(2));
    }
  }

  getLabel(labelType) {
    switch (labelType) {
      case "week":
        return "KW" + this.week;
      case "month":
        var pointer = moment(new Date(this.year, this.month - 1, 1));
        return pointer.format("MMM");
      case "quarter":
        return "Q" + Math.ceil(this.month / 3) + " ";
    }
  }

  getDetailLabel(labelType) {
    switch (labelType) {
      case "quarter":
        return "KW" + this.week;
      case "year":
        var pointer = moment(new Date(this.year, this.month - 1, 1));
        return pointer.format("MMM");
    }
  }

}
