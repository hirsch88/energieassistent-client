import * as moment from 'moment';

import { inject, observable } from 'aurelia-framework';
import { WaterService } from '../../services/water.service';

@inject(WaterService)
export class Water {

  static SwissAverageCosts = 100;
  static SwissAverageWater = 100;
  static Months = [
    'Jan',
    'Feb',
    'Mär',
    'Apr',
    'Mai',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Okt',
    'Nov',
    'Dez'
  ];

  static Quarters = {
    1: [1, 2, 3],
    2: [4, 5, 6],
    3: [7, 8, 9],
    4: [10, 11, 12]
  };

  @observable dataWater;
  @observable chatOptionsTotal;
  @observable selection;

  swissAverage = WaterService.Average;
  extension = WaterService.Extension;

  tipps = [{
    title: 'Achte auf dein Wasserverbrauch',
    text: 'Immer wenn du gerade die Hände einseifst oder die Zähne schrubbst, sollte kein Wasser laufen. Sicher, es ist nicht leicht alte Angewohnheiten zu ändern. In diesem Fall lohnt es sich aber, immerhin kannst du bis zu 50% Wasser sparen.'
  }, {
    title: 'Duschen statt Baden',
    text: 'Bei einem Vollbad verbrauchst du etwas 150-200 Liter Wasser, beim Duschen dagegen kommst du mit 60-80 Litern aus. Wie beim Händewaschen solltest du auch hier das Wasser abstellen, wenn du dich einseifst. Ein Duschkopf mit Wassersparfunktion bringt Extraersparnis, da zum Wasserstrahl Luft gemischt wird und weniger Wasser durchläuft.'
  }];

  constructor(waterService) {
    this.waterService = waterService;
    this.data = {};
  }

  onChange(value, type) {
    this.selection = { value, type };

    if (!value || !type) {
      return;
    }

    this.setTotalChartOptions();
  }

  getDataForAnYear(key) {
    this.dataWater = this.waterService.detail.GetDataYear;
    let data = this.waterService.GetData;
    let now = data.filter(d => {
      return `${d.year}` === this.selection.value
    });
    let past = data.filter(d => {
      return `${(parseInt(d.year) + 1)}` === this.selection.value
    });

    let d1 = ['now'];
    let d2 = ['past'];
    let x = ['x'];
    for (let i = 1; i < 13; i++) {
      d1[i] = 0;
      d2[i] = 0;
      x[i] = Water.Months[i - 1];
    }

    d1 = now.reduce((accumulator, currentValue) => {
      accumulator[currentValue.month] = (accumulator[currentValue.month] || 0) + parseInt(currentValue[key], 10);
      return accumulator;
    }, d1);

    d2 = past.reduce((accumulator, currentValue) => {
      accumulator[currentValue.month] = (accumulator[currentValue.month] || 0) + parseInt(currentValue[key], 10);
      return accumulator;
    }, d2);

    for (let n = 1; n < d1.length; n++) {
      d1[n] = parseFloat(d1[n], 10).toFixed(2);
      d2[n] = parseFloat(d2[n], 10).toFixed(2);
    }

    return [d1, d2, x];
  }

  getDataForAnQuarter(key) {
    this.dataWater = this.waterService.detail.GetDataQuarter;
    let data = this.waterService.GetData;

    let y = parseInt(this.selection.value.split('-')[1], 10);
    let q = parseInt(this.selection.value.split('Q')[1].split('-')[0], 10);
    let ms = Water.Quarters[q];

    let qs = data.filter(d => {
      return ms.indexOf(d.month) >= 0;
    });

    let now = qs.filter(d => d.year === y)
    let past = qs.filter(d => (d.year + 1) === y);

    let d1 = ['now'];
    let d2 = ['past'];
    let x = ['x'];
    let max = (past.length > now.length) ? past.length : now.length;
    for (let i = 1; i < max; i++) {
      d1[i] = 0;
      d2[i] = 0;
    }

    for (let n = 0; n < past.length; n++) {
      d2[n + 1] = past[n][key]
    }

    for (let n = 0; n < now.length; n++) {
      d1[n + 1] = now[n][key]
    }

    x[1] = now[1].week;
    for (let n = 2; n < max; n++) {
      x[n] = (x[n - 1] + 1);
    }

    for (let n = 1; n < x.length; n++) {
      x[n] = `KW${x[n]}`;
    }

    for (let n = 1; n < d1.length; n++) {
      d1[n] = parseFloat(d1[n], 10).toFixed(2);
      d2[n] = parseFloat(d2[n], 10).toFixed(2);
    }

    return [d1, d2, x];
  }

  setTotalChartOptions() {
    let data, dataLow, dataNormal;
    switch (this.selection.type) {
      case 'quarter':
        data = this.getDataForAnQuarter('value');
        dataLow = this.getDataForAnQuarter('valueLow');
        dataNormal = this.getDataForAnQuarter('valueNormal');
        break;
      case 'year':
        data = this.getDataForAnYear('value');
        dataLow = this.getDataForAnYear('valueLow');
        dataNormal = this.getDataForAnYear('valueNormal');
        break;
    }

    this.chartOptionsTotal = {
      color: 'blue',
      data
    };

  }
}
