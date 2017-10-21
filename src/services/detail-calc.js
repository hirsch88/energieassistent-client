export class DetailCalc {

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

  get GetDataQuarter() {
    var a = [];
    a.push(this.data.filter((_, index) => index < 13));
    a.push(this.data.filter((_, index) => index < 13 + this.getISOWeeks && index >= this.getISOWeeks));
    return a;
  }

  get GetDataYear() {
    var a = [];
    a.push(this.data.filter((_, index) => index < 52));
    a.push(this.data.filter((_, index) => index < 52 + this.getISOWeeks && index >= this.getISOWeeks));
    return a;
  }

}
