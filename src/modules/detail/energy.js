import Chart from 'chart.js';
import { inject } from 'aurelia-framework';
import { EnergyService } from '../../services/energy.service';

@inject(EnergyService)
export class Energy {

  static SwissAverageCosts = 100;
  static SwissAverageEnergy = 100;

  dataEnergy;

  constructor(energyService) {
    this.energyService = energyService;
    this.data = {};
  }

  onChange(value, type) {
    this.dataEnergy = this.energyService.GetDetailDataQuarter;

  }


  //   $("#totalChart").remove();
  //   $("#totalChartFrame").append('<canvas id="totalChart" width="930" height="420"></canvas>');
  //   var ctx_total = $("#totalChart");
  //   var totalChart = new Chart(ctx_total, {
  //     type: 'bar',
  //     data: {
  //       labels: [
  //         dataEnergy[0][12].getDetailLabel(type),
  //         dataEnergy[0][11].getDetailLabel(type),
  //         dataEnergy[0][10].getDetailLabel(type),
  //         dataEnergy[0][9].getDetailLabel(type),
  //         dataEnergy[0][8].getDetailLabel(type),
  //         dataEnergy[0][7].getDetailLabel(type),
  //         dataEnergy[0][6].getDetailLabel(type),
  //         dataEnergy[0][5].getDetailLabel(type),
  //         dataEnergy[0][4].getDetailLabel(type),
  //         dataEnergy[0][3].getDetailLabel(type),
  //         dataEnergy[0][2].getDetailLabel(type),
  //         dataEnergy[0][1].getDetailLabel(type),
  //         dataEnergy[0][0].getDetailLabel(type),
  //       ],
  //       datasets: [{
  //         label: "Aktueller Verbrauch",
  //         data: [
  //           dataEnergy[0][12].value,
  //           dataEnergy[0][11].value,
  //           dataEnergy[0][10].value,
  //           dataEnergy[0][9].value,
  //           dataEnergy[0][8].value,
  //           dataEnergy[0][7].value,
  //           dataEnergy[0][6].value,
  //           dataEnergy[0][5].value,
  //           dataEnergy[0][4].value,
  //           dataEnergy[0][3].value,
  //           dataEnergy[0][2].value,
  //           dataEnergy[0][1].value,
  //           dataEnergy[0][0].value
  //         ],
  //         backgroundColor: 'rgba(255, 224, 102, 0.37)',
  //         borderColor: '#ffe066',
  //         borderWidth: 2
  //       }, {
  //         label: "Verbrauch " + dataEnergy[1][0].year,
  //         data: [
  //           dataEnergy[1][12].value,
  //           dataEnergy[1][11].value,
  //           dataEnergy[1][10].value,
  //           dataEnergy[1][9].value,
  //           dataEnergy[1][8].value,
  //           dataEnergy[1][7].value,
  //           dataEnergy[1][6].value,
  //           dataEnergy[1][5].value,
  //           dataEnergy[1][4].value,
  //           dataEnergy[1][3].value,
  //           dataEnergy[1][2].value,
  //           dataEnergy[1][1].value,
  //           dataEnergy[1][0].value
  //         ],
  //         borderColor: "#e67700",
  //         backgroundColor: "rgba(230, 119, 0, 0.36)",
  //         fill: false,
  //         type: 'line'
  //       }, {
  //         label: "Schweizer Durchschnitt",
  //         data: [swissAverageEnergy, swissAverageEnergy, swissAverageEnergy, swissAverageEnergy, swissAverageEnergy, swissAverageEnergy, swissAverageEnergy, swissAverageEnergy, swissAverageEnergy, swissAverageEnergy, swissAverageEnergy, swissAverageEnergy, swissAverageEnergy],
  //         borderColor: "#adb5bd",
  //         backgroundColor: "rgba(173, 181, 189, 0.36)",
  //         fill: false,
  //         type: 'line'
  //       }]
  //     },
  //     options: {
  //       responsive: false,
  //       title: {
  //         display: true,
  //         fontSize: 12
  //       },
  //       tooltips: {
  //         titleFontSize: 12,
  //         titleFontFamily: 'Arial'
  //       },
  //       legend: {
  //         position: 'bottom'
  //       },
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             min: 0
  //           }
  //         }],
  //         xAxes: [{
  //           ticks: {
  //             fontFamily: 'Arial',

  //           }
  //         }]
  //       }
  //     }
  //   });

  //   $("#normalChart").remove();
  //   $("#normalChartFrame").append('<canvas id="normalChart" width="930" height="420"></canvas>');
  //   var ctx_normal = $("#normalChart");
  //   var normalChart = new Chart(ctx_normal, {
  //     type: 'bar',
  //     data: {
  //       labels: [
  //         "KW" + dataEnergy[0][12].week,
  //         "KW" + dataEnergy[0][11].week,
  //         "KW" + dataEnergy[0][10].week,
  //         "KW" + dataEnergy[0][9].week,
  //         "KW" + dataEnergy[0][8].week,
  //         "KW" + dataEnergy[0][7].week,
  //         "KW" + dataEnergy[0][6].week,
  //         "KW" + dataEnergy[0][5].week,
  //         "KW" + dataEnergy[0][4].week,
  //         "KW" + dataEnergy[0][3].week,
  //         "KW" + dataEnergy[0][2].week,
  //         "KW" + dataEnergy[0][1].week,
  //         "KW" + dataEnergy[0][0].week
  //       ],
  //       datasets: [{
  //         label: "Aktueller Verbrauch",
  //         data: [
  //           dataEnergy[0][12].valueNormal,
  //           dataEnergy[0][11].valueNormal,
  //           dataEnergy[0][10].valueNormal,
  //           dataEnergy[0][9].valueNormal,
  //           dataEnergy[0][8].valueNormal,
  //           dataEnergy[0][7].valueNormal,
  //           dataEnergy[0][6].valueNormal,
  //           dataEnergy[0][5].valueNormal,
  //           dataEnergy[0][4].valueNormal,
  //           dataEnergy[0][3].valueNormal,
  //           dataEnergy[0][2].valueNormal,
  //           dataEnergy[0][1].valueNormal,
  //           dataEnergy[0][0].valueNormal
  //         ],
  //         backgroundColor: 'rgba(255, 224, 102, 0.37)',
  //         borderColor: '#ffe066',
  //         borderWidth: 2
  //       }, {
  //         label: "Verbrauch " + dataEnergy[1][0].year,
  //         data: [
  //           dataEnergy[1][12].valueNormal,
  //           dataEnergy[1][11].valueNormal,
  //           dataEnergy[1][10].valueNormal,
  //           dataEnergy[1][9].valueNormal,
  //           dataEnergy[1][8].valueNormal,
  //           dataEnergy[1][7].valueNormal,
  //           dataEnergy[1][6].valueNormal,
  //           dataEnergy[1][5].valueNormal,
  //           dataEnergy[1][4].valueNormal,
  //           dataEnergy[1][3].valueNormal,
  //           dataEnergy[1][2].valueNormal,
  //           dataEnergy[1][1].valueNormal,
  //           dataEnergy[1][0].valueNormal
  //         ],
  //         borderColor: "#e67700",
  //         backgroundColor: "rgba(230, 119, 0, 0.36)",
  //         fill: false,
  //         type: 'line'
  //       }]
  //     },
  //     options: {
  //       responsive: false,
  //       title: {
  //         display: true,
  //         fontSize: 12
  //       },
  //       tooltips: {
  //         titleFontSize: 12,
  //         titleFontFamily: 'Arial'
  //       },
  //       legend: {
  //         position: 'bottom'
  //       },
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             min: 0
  //           }
  //         }],
  //         xAxes: [{
  //           ticks: {
  //             fontFamily: 'Arial',

  //           }
  //         }]
  //       }
  //     }
  //   });

  //   $("#lowChart").remove();
  //   $("#lowChartFrame").append('<canvas id="lowChart" width="930" height="420"></canvas>');
  //   var ctx_low = $("#lowChart");
  //   var lowChart = new Chart(ctx_low, {
  //     type: 'bar',
  //     data: {
  //       labels: [
  //         "KW" + dataEnergy[0][12].week,
  //         "KW" + dataEnergy[0][11].week,
  //         "KW" + dataEnergy[0][10].week,
  //         "KW" + dataEnergy[0][9].week,
  //         "KW" + dataEnergy[0][8].week,
  //         "KW" + dataEnergy[0][7].week,
  //         "KW" + dataEnergy[0][6].week,
  //         "KW" + dataEnergy[0][5].week,
  //         "KW" + dataEnergy[0][4].week,
  //         "KW" + dataEnergy[0][3].week,
  //         "KW" + dataEnergy[0][2].week,
  //         "KW" + dataEnergy[0][1].week,
  //         "KW" + dataEnergy[0][0].week
  //       ],
  //       datasets: [{
  //         label: "Aktueller Verbrauch",
  //         data: [
  //           dataEnergy[0][12].valueLow,
  //           dataEnergy[0][11].valueLow,
  //           dataEnergy[0][10].valueLow,
  //           dataEnergy[0][9].valueLow,
  //           dataEnergy[0][8].valueLow,
  //           dataEnergy[0][7].valueLow,
  //           dataEnergy[0][6].valueLow,
  //           dataEnergy[0][5].valueLow,
  //           dataEnergy[0][4].valueLow,
  //           dataEnergy[0][3].valueLow,
  //           dataEnergy[0][2].valueLow,
  //           dataEnergy[0][1].valueLow,
  //           dataEnergy[0][0].valueLow
  //         ],
  //         backgroundColor: 'rgba(255, 224, 102, 0.37)',
  //         borderColor: '#ffe066',
  //         borderWidth: 2
  //       }, {
  //         label: "Verbrauch " + dataEnergy[1][0].year,
  //         data: [
  //           dataEnergy[1][12].valueLow,
  //           dataEnergy[1][11].valueLow,
  //           dataEnergy[1][10].valueLow,
  //           dataEnergy[1][9].valueLow,
  //           dataEnergy[1][8].valueLow,
  //           dataEnergy[1][7].valueLow,
  //           dataEnergy[1][6].valueLow,
  //           dataEnergy[1][5].valueLow,
  //           dataEnergy[1][4].valueLow,
  //           dataEnergy[1][3].valueLow,
  //           dataEnergy[1][2].valueLow,
  //           dataEnergy[1][1].valueLow,
  //           dataEnergy[1][0].valueLow
  //         ],
  //         borderColor: "#e67700",
  //         backgroundColor: "rgba(230, 119, 0, 0.36)",
  //         fill: false,
  //         type: 'line'
  //       }]
  //     },
  //     options: {
  //       responsive: false,
  //       title: {
  //         display: true,
  //         fontSize: 12
  //       },
  //       tooltips: {
  //         titleFontSize: 12,
  //         titleFontFamily: 'Arial'
  //       },
  //       legend: {
  //         position: 'bottom'
  //       },
  //       scales: {
  //         yAxes: [{
  //           ticks: {
  //             min: 0
  //           }
  //         }],
  //         xAxes: [{
  //           ticks: {
  //             fontFamily: 'Arial',

  //           }
  //         }]
  //       }
  //     }
  //   });

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

}
