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
    this.data = {};
  }

  attached() {

    var moodWarningThreshold = 10;

    var dataEnergy = this.energyService.GetOverviewDataWeeks;
    var dataHeat = this.heatService.GetOverviewDataWeeks;
    var dataWater = this.waterService.GetOverviewDataWeeks;

    this.data.trendEnergy = Math.round(100/(Number(dataEnergy[1][0].value)+Number(dataEnergy[1][1].value)+Number(dataEnergy[1][2].value)+Number(dataEnergy[1][3].value))*(Number(dataEnergy[0][0].value)+Number(dataEnergy[0][1].value)+Number(dataEnergy[0][2].value)+Number(dataEnergy[0][3].value))-100);
    this.data.trendHeat = Math.round(100/(Number(dataHeat[1][0].value)+Number(dataHeat[1][1].value)+Number(dataHeat[1][2].value)+Number(dataHeat[1][3].value))*(Number(dataHeat[0][0].value)+Number(dataHeat[0][1].value)+Number(dataHeat[0][2].value)+Number(dataHeat[0][3].value))-100);
    this.data.trendWater = Math.round(100/(Number(dataWater[1][0].value)+Number(dataWater[1][1].value)+Number(dataWater[1][2].value)+Number(dataWater[1][3].value))*(Number(dataWater[0][0].value)+Number(dataWater[0][1].value)+Number(dataWater[0][2].value)+Number(dataWater[0][3].value))-100);

    this.data.actualEnergy = Math.round(Number(dataEnergy[0][0].value)*10)/10;
    this.data.actualHeat = Math.round(Number(dataHeat[0][0].value)*10)/10;
    this.data.actualWater = Math.round(Number(dataWater[0][0].value)*10)/10;

    this.data.historyEnergy = Math.round(Number(dataEnergy[1][0].value)*10)/10;
    this.data.historyHeat = Math.round(Number(dataHeat[1][0].value)*10)/10;
    this.data.historyWater = Math.round(Number(dataWater[1][0].value)*10)/10;

    this.data.averageEnergy = 1250;
    this.data.averageHeat = 2800;
    this.data.averageWater = 1800;

    if (this.data.trendEnergy < 0){
      //green
      this.data.moodEnergy = "smile-good";
      this.data.iconEnergy = "fa fa-smile-o";
      this.data.tooltipEnergy = "Sie haben "+Math.abs(this.data.trendEnergy)+"% weniger Strom verbraucht";
    } else if (this.data.trendEnergy < moodWarningThreshold){
      //orange
      this.data.moodEnergy = "smile-neutral";
      this.data.iconEnergy = "fa fa-meh-o";
      this.data.tooltipEnergy = "Sie haben "+this.data.trendEnergy+"% mehr Strom verbraucht";
    } else {
      //red
      this.data.moodEnergy = "smile-bad";
      this.data.iconEnergy = "fa fa-frown-o";
      this.data.tooltipEnergy = "Sie haben "+this.data.trendEnergy+"% mehr Strom verbraucht";
    }

    if (this.data.trendHeat < 0){
      //green
      this.data.moodHeat = "smile-good";
      this.data.iconHeat = "fa fa-smile-o";
      this.data.tooltipHeat = "Sie haben "+Math.abs(this.data.trendHeat)+"% weniger Wärme verbraucht";
    } else if (this.data.trendHeat < moodWarningThreshold){
      //orange
      this.data.moodHeat = "smile-neutral";
      this.data.iconHeat = "fa fa-meh-o";
      this.data.tooltipHeat = "Sie haben "+this.data.trendHeat+"% mehr Wärme verbraucht";
    } else {
      //red
      this.data.moodHeat = "smile-bad";
      this.data.iconHeat = "fa fa-frown-o";
      this.data.tooltipHeat = "Sie haben "+this.data.trendHeat+"% mehr Wärme verbraucht";
    }

    if (this.data.trendWater < 0){
      //green
      this.data.moodWater = "smile-good";
      this.data.iconWater = "fa fa-smile-o";
      this.data.tooltipWater = "Sie haben "+Math.abs(this.data.trendWater)+"% weniger Wasser verbraucht";
    } else if (this.data.trendWater < moodWarningThreshold){
      //orange
      this.data.moodWater = "smile-neutral";
      this.data.iconWater = "fa fa-meh-o";
      this.data.tooltipWater = "Sie haben "+this.data.trendWater+"% mehr Wasser verbraucht";
    } else {
      //red
      this.data.moodWater = "smile-bad";
      this.data.iconWater = "fa fa-frown-o";
      this.data.tooltipWater = "Sie haben "+this.data.trendWater+"% mehr Wasser verbraucht";
    }

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
          label: "Verbrauch "+dataEnergy[1][0].year,
          data: [dataEnergy[1][3].value, dataEnergy[1][2].value, dataEnergy[1][1].value, dataEnergy[1][0].value],
          borderColor: "#e67700",
          backgroundColor: "rgba(230, 119, 0, 0.36)",
          fill: false,
          type: 'line'
        },{
          label: "Schweizer Durchschnitt",
          data: [this.data.averageEnergy,this.data.averageEnergy,this.data.averageEnergy,this.data.averageEnergy],
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
          label: "Verbrauch "+dataHeat[1][0].year,
          data: [dataHeat[1][3].value, dataHeat[1][2].value, dataHeat[1][1].value, dataHeat[1][0].value],
          borderColor: "#c92a2a",
          backgroundColor: "rgba(201, 42, 42, 0.36)",
          fill: false,
          type: 'line'
        },{
          label: "Schweizer Durchschnitt",
          data: [this.data.averageHeat,this.data.averageHeat,this.data.averageHeat,this.data.averageHeat],
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
          label: "Verbrauch "+dataWater[1][0].year,
          data: [dataWater[1][3].value, dataWater[1][2].value, dataWater[1][1].value, dataWater[1][0].value],
          borderColor: "#1862ab",
          backgroundColor: "rgba(24, 98, 171, 0.36)",
          fill: false,
          type: 'line'
        },{
          label: "Schweizer Durchschnitt",
          data: [this.data.averageWater,this.data.averageWater,this.data.averageWater,this.data.averageWater],
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
