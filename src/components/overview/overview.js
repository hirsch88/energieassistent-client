//import {computedFrom} from 'aurelia-framework';
import Chart from 'chart.js';
import { inject } from 'aurelia-framework';
import { EnergyService } from '../../services/energy.service';
import { HeatService } from '../../services/heat.service';
import { WaterService } from '../../services/water.service';

@inject(EnergyService, HeatService, WaterService)
export class Overview {

  constructor(energyService, heatService, waterService){
    this.energyService = energyService;
    this.heatService = heatService;
    this.waterService = waterService;
    console.log(energyService);
  }

  attached() {

    var dataEnergy = this.energyService.GetOverviewData;
    var dataHeat = this.heatService.GetOverviewData;
    var dataWater = this.waterService.GetOverviewData;
    //timer für pulse animated
    setTimeout(() => {
      var nodes = document.getElementsByClassName('smile-bad');
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].className += " animated shake";
      }
    },1000);


    var ctx_energy = $("#energyChart");
    var energyChart = new Chart(ctx_energy, {
      type: 'bar',
      data: {
        labels: ["KW"+dataEnergy[0][3].week, "KW"+dataEnergy[0][2].week, "KW"+dataEnergy[0][1].week, "KW"+dataEnergy[0][0].week],
        datasets: [{
          label: "Aktueller Verbrauch",
          data: [dataEnergy[0][3].value, dataEnergy[0][2].value, dataEnergy[0][1].value, dataEnergy[0][0].value],
          backgroundColor: 'rgba(255, 224, 102, 0.37)',
          borderColor: '#ffe066',
          borderWidth: 2
        },{
          label: "Verbrauch 2016",
          data: [dataEnergy[1][3].value, dataEnergy[1][2].value, dataEnergy[1][1].value, dataEnergy[1][0].value],
          borderColor: "#e67700",
          backgroundColor: "rgba(230, 119, 0, 0.36)",
          fill: false,
          type: 'line'
        },{
          label: "Schweizer Durchschnitt",
          data: [1250,1250,1250,1250],
          borderColor: "#adb5bd",
          backgroundColor: "rgba(173, 181, 189, 0.36)",
          fill: false,
          type: 'line'
        }]
      },
      options: {
        title: {
          display: true,
          fontSize: 12
        },
        tooltips: {
          titleFontSize: 12,
          titleFontFamily: 'Arial'
        },
        legend: {
          position: 'bottom',
          fullWidth: false
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }],
          xAxes: [{
            ticks: {
              fontFamily: 'Arial',

            }
          }]
        }
      }
    });

    var ctx_heat = $("#heatChart");
    var heatChart = new Chart(ctx_heat, {
      type: 'bar',
      data: {
        labels: ["KW"+dataHeat[0][3].week, "KW"+dataHeat[0][2].week, "KW"+dataHeat[0][1].week, "KW"+dataHeat[0][0].week],
        datasets: [{
          label: "Aktueller Verbrauch",
          data: [dataHeat[0][3].value, dataHeat[0][2].value, dataHeat[0][1].value, dataHeat[0][0].value],
          backgroundColor: 'rgba(255, 168, 168, 0.37)',
          borderColor: '#ffa8a8',
          borderWidth: 2
        },{
          label: "Verbrauch 2016",
          data: [dataHeat[1][3].value, dataHeat[1][2].value, dataHeat[1][1].value, dataHeat[1][0].value],
          borderColor: "#c92a2a",
          backgroundColor: "rgba(201, 42, 42, 0.36)",
          fill: false,
          type: 'line'
        },{
          label: "Schweizer Durchschnitt",
          data: [2800,2800,2800,2800],
          borderColor: "#adb5bd",
          backgroundColor: "rgba(173, 181, 189, 0.36)",
          fill: false,
          type: 'line'
        }]
      },
      options: {
        title: {
          display: true,
          fontSize: 12
        },
        tooltips: {
          titleFontSize: 12,
          titleFontFamily: 'Arial'
        },
        legend: {
          position: 'bottom',
          fullWidth: false
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }],
          xAxes: [{
            ticks: {
              fontFamily: 'Arial',

            }
          }]
        }
      }
    });

    var ctx_water = $("#waterChart");
    var waterChart = new Chart(ctx_water, {
      type: 'bar',
      data: {
        labels: ["KW"+dataWater[0][3].week, "KW"+dataWater[0][2].week, "KW"+dataWater[0][1].week, "KW"+dataWater[0][0].week],
        datasets: [{
          label: "Aktueller Verbrauch",
          data: [dataWater[0][3].value, dataWater[0][2].value, dataWater[0][1].value, dataWater[0][0].value],
          backgroundColor: 'rgba(114, 195, 252, 0.37)',
          borderColor: '#72c3fc',
          borderWidth: 2
        },{
          label: "Verbrauch 2016",
          data: [dataWater[1][3].value, dataWater[1][2].value, dataWater[1][1].value, dataWater[1][0].value],
          borderColor: "#1862ab",
          backgroundColor: "rgba(24, 98, 171, 0.36)",
          fill: false,
          type: 'line'
        },{
          label: "Schweizer Durchschnitt",
          data: [1800,1800,1800,1800],
          borderColor: "#adb5bd",
          backgroundColor: "rgba(173, 181, 189, 0.36)",
          fill: false,
          type: 'line'
        }]
      },
      options: {
        title: {
          display: true,
          fontSize: 12
        },
        tooltips: {
          titleFontSize: 12,
          titleFontFamily: 'Arial'
        },
        legend: {
          position: 'bottom',
          fullWidth: false
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }],
          xAxes: [{
            ticks: {
              fontFamily: 'Arial',

            }
          }]
        }
      }
    });
  }
}
