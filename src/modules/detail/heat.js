import * as moment from 'moment';

import { inject, observable } from 'aurelia-framework';
import { HeatService } from '../../services/heat.service';

@inject(HeatService)
export class Heat {

  static SwissAverageCosts = 100;
  static SwissAverageHeat = 100;
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

  @observable dataHeat;
  @observable chatOptionsTotal;
  @observable pieCostsOptions;
  @observable pieMediumOptions;
  @observable selection;

  swissAverage = HeatService.Average;
  extension = HeatService.Extension;

  tipps = [{
    title: 'Kleine Änderungen, große Wirkung',
    text: 'Allein beim Heizen werden 60 bis 70 Prozent der Energie im Haushalt verbraucht. Wo viel verbraucht wird, lässt sich auch viel sparen: Wer die Raumtemperatur um nur 1 Grad Celsius senkt, spart rund 6 Prozent der Heizkosten.'
  }, {
    title: 'Heizung entlüften',
    text: 'Wenn’s gluckert oder die Wärmeverteilung am Heizkörper sehr ungleichmäßig ist, zirkuliert das Wasser nicht mehr richtig und der Heizkörper kann die Wärme nicht optimal abgeben.'
  }];

  constructor(heatService) {
    this.heatService = heatService;
    this.data = {};
  }

  attached() {
    this.pieCostsOptions = {
      color: 'red',
      data: [
        {
          color: '#c92a2a',
          value: 50,
          text: 'Gas'
        },
        {
          color: '#ffa8a8',
          value: 30,
          text: 'Dienstleistung'
        },
        {
          color: '#adb5bd',
          value: 20,
          text: 'Abgaben'
        }
      ]
    };
  }

  onChange(value, type) {
    this.selection = { value, type };

    if (!value || !type) {
      return;
    }

    this.setTotalChartOptions();
  }

  getDataForAnYear(key) {
    this.dataHeat = this.heatService.detail.GetDataYear;
    let data = this.heatService.GetData;
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
      x[i] = Heat.Months[i - 1];
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
    this.dataHeat = this.heatService.detail.GetDataQuarter;
    let data = this.heatService.GetData;

    let y = parseInt(this.selection.value.split('-')[1], 10);
    let q = parseInt(this.selection.value.split('Q')[1].split('-')[0], 10);
    let ms = Heat.Quarters[q];

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
      color: 'red',
      data
    };


  }
}
