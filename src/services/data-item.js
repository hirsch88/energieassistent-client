import * as moment from 'moment';

export class DataItem {

    constructor(year, month, week, value, valueNormal, valueLow, costNormal, costLow) {
      this.year = year;
      this.month = month;
      this.week = week;
      this.value = value;
      this.valueNormal = valueNormal;
      this.valueLow = valueLow;
      this.costNormal = costNormal;
      this.costLow = costLow;
    }

    getLabel(labelType){
      switch (labelType){
        case "week":
          return "KW"+this.week;
        case "month":
          var pointer = moment(new Date(this.year, this.month-1, 1));
          return pointer.format("MMM");
        case "quarter":
          return "Q"+Math.ceil(this.month / 3)+" ";
      }
    }

    getDetailLabel(labelType){
      switch (labelType){
        case "quarter":
          return "KW"+this.week;
        case "year":
          var pointer = moment(new Date(this.year, this.month-1, 1));
          return pointer.format("MMM");
      }
    }

  }
