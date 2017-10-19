import * as moment from 'moment';

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

  @observable selection;

  constructor(energyService) {
    this.energyService = energyService;
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
    this.dataEnergy = this.energyService.GetDetailDataYear;
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

    return [d1, d2, x];
  }

  getDataForAnQuarter(key) {
    this.dataEnergy = this.energyService.GetDetailDataQuarter;
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
    let max = (past.length > now.length) ? past.length : now.length;
    for (let i = 1; i < max; i++) {
      d1[i] = 0;
      d2[i] = 0;
      x[i] = past[i].week;
    }

    for (let n = 0; n < now.length; n++) {
      d1[n + 1] = now[n][key]
      x[n + 1] = now[n].week;
    }

    for (let n = 0; n < past.length; n++) {
      d2[n + 1] = past[n][key]
      x[n + 1] = past[n].week;
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


  //   var nne_normal = Number(dataEnergy[0][0].valueNormal) * 0.13;
  //   var nne_low = Number(dataEnergy[0][0].valueLow) * 0.042;
  //   var la_normal = Number(dataEnergy[0][0].valueNormal) * 0.052;
  //   var la_low = Number(dataEnergy[0][0].valueLow) * 0.04;
  //   var abgaben = Number(dataEnergy[0][0].value) * 0.011 + Number(dataEnergy[0][0].value) * 0.013 + la_normal + la_low + ((nne_normal + nne_low + la_low + la_normal) / 100 * 9);
  //   var strom = Number(dataEnergy[0][0].valueNormal) * 0.09 + Number(dataEnergy[0][0].valueLow) * 0.0735;
  //   var netz = Number(dataEnergy[0][0].value) * 0.0054 + nne_normal + nne_low;

  //   $("#costsChart").remove();
  //   $("#costsChartFrame").append('<canvas id="costsChart" width="320" height="220"></canvas>');
  //   var ctx_costs = $("#costsChart");
  //   var costsChart = new Chart(ctx_costs, {
  //     type: 'pie',
  //     data: {
  //       datasets: [{
  //         label: ["Stromkosten", "Netzkosten", "Abgaben"],
  //         data: [Math.round(strom * 100) / 100, Math.round(netz * 100) / 100, Math.round(abgaben * 100) / 100],
  //         backgroundColor: ['#ffe066', '#f59f00', '#dee2e6'],
  //         borderColor: '#495057'
  //       }],
  //       labels: ["Stromkosten", "Netzkosten", "Abgaben"],
  //     },
  //     options: {
  //       responsive: false,
  //       tooltips: {
  //         titleFontSize: 12,
  //         titleFontFamily: 'Arial'
  //       },
  //       legend: {
  //         position: 'bottom',
  //         labels: {
  //           fontColor: '#adb5bd'
  //         }
  //       }
  //     }
  //   });


  //   var aqua = 123;
  //   var pure = 234;
  //   var solar = 432;

  //   $("#typesChart").remove();
  //   $("#typesChartFrame").append('<canvas id="typesChart" width="320" height="220"></canvas>');
  //   var ctx_types = $("#typesChart");
  //   var typesChart = new Chart(ctx_types, {
  //     type: 'pie',
  //     data: {
  //       datasets: [{
  //         label: ["Aqua", "Pure", "Solar"],
  //         data: [aqua, pure, solar],
  //         backgroundColor: ['#ffe066', '#f59f00', '#dee2e6'],
  //         borderColor: '#f8f9fa'
  //       }],
  //       labels: ["Aqua", "Pure", "Solar"],
  //     },
  //     options: {
  //       responsive: false,
  //       tooltips: {
  //         titleFontSize: 12,
  //         titleFontFamily: 'Arial'
  //       },
  //       legend: {
  //         position: 'bottom',
  //         labels: {
  //           fontColor: '#495057'
  //         }
  //       }
  //     }
  //   });
  // }
