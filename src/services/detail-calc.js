export class DetailCalc {

  data;

  constructor(data) {
    this.data = data;
  }

  getDataQuarter(selection) {
    let y = parseInt(selection.value.split('-')[1], 10);
    let q = parseInt(selection.value.split('Q')[1].split('-')[0], 10);
    var a = [];
    a.push(this.data.filter((item) => item.quarter === q && item.year === y));
    a.push(this.data.filter((item) => item.quarter === q && item.year === (y - 1)));
    return a;
  }

  getDataYear(selection) {
    let y = parseInt(selection.value, 10);
    var a = [];
    a.push(this.data.filter((item) => item.year === y));
    a.push(this.data.filter((item) => item.year === (y - 1)));
    return a;
  }

}
