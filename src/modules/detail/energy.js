import * as moment from 'moment';
import * as _ from 'lodash';

import { inject, observable } from 'aurelia-framework';
import { EnergyService } from '../../services/energy.service';

@inject(EnergyService)
export class Energy {

  static SwissAverageCosts = 100;
  static SwissAverageEnergy = 100;
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

  @observable dataEnergy;
  @observable chatOptionsTotal;
  @observable chatOptionsNormal;
  @observable chatOptionsLow;
  @observable pieCostsOptions;
  @observable pieMediumOptions;
  @observable selection;

  swissAverage = EnergyService.Average;
  extension = EnergyService.Extension;

  tipps = [{
    title: 'Niedrige Waschtemperatur wählen',
    text: 'Moderne Waschmittel erlauben deutlich geringere Waschtemperaturen als früher. Kochwaschprogramme bei 90 Grad sind nicht mehr notwendig. Selbst bei stark verschmutzter Wäsche reichen 60 Grad, um die Wäsche hygienisch sauber zu bekommen.'
  }, {
    title: 'Achten Sie auf die Füllmenge des Wasserkochers',
    text: 'Ein Wasserkocher ist für das Erhitzen von Wasser effizienter als der Elektroherd. Kochen Sie jedoch mehr Wasser als nötig, steigen nicht nur der Energiebedarf, sondern auch Ihr CO2-Ausstoß unnötig. Bei einem nicht verwendeten Liter Wasser pro Tag summiert sich das auf 25 kg CO2 im Jahr. Über zehn Franken können Sie im Jahr einsparen, wenn Sie nur so viel Wasser kochen, wie Sie benötigen.'
  }];

  constructor(energyService) {
    this.energyService = energyService;
    this.data = {};
  }

  attached() {
    this.pieCostsOptions = {
      color: 'yellow',
      data: [
        {
          color: '#f59f00',
          value: 35,
          text: 'Netznutzung (IWB)'
        },
        {
          color: '#ffe066',
          value: 30,
          text: 'Energie (IWB)'
        },
        {
          color: '#adb5bd',
          value: 35,
          text: 'Abgaben'
        }
      ]
    };

    this.pieMediumOptions = {
      color: 'yellow',
      data: [
        {
          color: '#f59f00',
          value: 50,
          text: 'IWB Strom'
        },
        {
          color: '#ffe066',
          value: 40,
          text: 'IWB Strom Regio'
        },
        {
          color: '#adb5bd',
          value: 10,
          text: 'IWB Storm Solar'
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
    let data = this.energyService.GetData;
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
      x[i] = Energy.Months[i - 1];
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
    let data = this.energyService.GetData;

    let y = parseInt(this.selection.value.split('-')[1], 10);
    let q = parseInt(this.selection.value.split('Q')[1].split('-')[0], 10);
    let ms = Energy.Quarters[q];

    let qs = data.filter(d => {
      return ms.indexOf(d.month) >= 0;
    });

    let now = qs.filter(d => d.year === y)
    let past = qs.filter(d => (d.year + 1) === y);

    let d1 = ['now'];
    let d2 = ['past'];
    let x = ['x'];
    let max = ((past.length > now.length) ? past.length : now.length) + 1;
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

    x[1] = _.min(now.map(n => n.week));
    for (let n = 2; n < max; n++) {
      x[n] = x[n - 1] + 1;
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
        this.dataEnergy = this.energyService.detail.getDataQuarter(this.selection);
        data = this.getDataForAnQuarter('value');
        dataLow = this.getDataForAnQuarter('valueLow');
        dataNormal = this.getDataForAnQuarter('valueNormal');
        break;
      case 'year':
        this.dataEnergy = this.energyService.detail.getDataYear(this.selection);
        data = this.getDataForAnYear('value');
        dataLow = this.getDataForAnYear('valueLow');
        dataNormal = this.getDataForAnYear('valueNormal');
        break;
    }

    this.chartOptionsTotal = {
      color: 'yellow',
      data
    };

    this.chartOptionsLow = {
      color: 'yellow',
      data: dataLow
    };

    this.chartOptionsNormal = {
      color: 'yellow',
      data: dataNormal
    };
  }

}
