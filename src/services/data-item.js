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
          return this.month;
        case "quarter":
          return "Q"+Math.round(Number(this.month)/4+0.5);
      }
    }

  }
