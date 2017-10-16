//import {computedFrom} from 'aurelia-framework';
import Chart from 'chart.js';
import { inject, observable } from 'aurelia-framework';
import { EnergyService } from '../../services/energy.service';
import { HeatService } from '../../services/heat.service';
import { WaterService } from '../../services/water.service';


@inject(EnergyService, HeatService, WaterService)
export class Overview {

  @observable
  selection;

  @observable
  energyOptions;

  @observable
  heatOptions;

  @observable
  waterOptions;

  constructor(energyService, heatService, waterService) {
    this.energyService = energyService;
    this.heatService = heatService;
    this.waterService = waterService;
    this.data = {};
  }

  onChange(selection) {
    console.info('Overview->onChange', selection, this);
    this.selection = selection;

    this.energyOptions = {
      title: 'Strom',
      color: 'yellow',
      icon: 'fa-bolt',
      data: {}
    };

    this.heatOptions = {
      title: 'Wärme',
      color: 'red',
      icon: 'fa-fire',
      data: {}
    };

    this.waterOptions = {
      title: 'Wasser',
      color: 'blue',
      icon: 'fa-tint',
      data: {}
    };

    switch (selection) {
      case "week":
        this.energyOptions.data = this.energyService.GetOverviewDataWeeks;
        this.heatOptions.data = this.heatService.GetOverviewDataWeeks;
        this.waterOptions.data = this.waterService.GetOverviewDataWeeks;
        this.data.averageEnergy = 1250;
        this.data.averageHeat = 2800;
        this.data.averageWater = 1800;
        break;
      case "month":
        this.energyOptions.data = this.energyService.GetOverviewDataMonth;
        this.heatOptions.data = this.heatService.GetOverviewDataMonth;
        this.waterOptions.data = this.waterService.GetOverviewDataMonth;
        this.data.averageEnergy = 1250 * 4;
        this.data.averageHeat = 2800 * 4;
        this.data.averageWater = 1800 * 4;
        break;
      case "quarter":
        this.energyOptions.data = this.energyService.GetOverviewDataQuarter;
        this.heatOptions.data = this.heatService.GetOverviewDataQuarter;
        this.waterOptions.data = this.waterService.GetOverviewDataQuarter;
        this.data.averageEnergy = 1250 * 12;
        this.data.averageHeat = 2800 * 12;
        this.data.averageWater = 1800 * 12;
        break;
      default:
        this.energyOptions.data = this.energyService.GetOverviewDataWeeks;
        this.heatOptions.data = this.heatService.GetOverviewDataWeeks;
        this.waterOptions.data = this.waterService.GetOverviewDataWeeks;
        this.data.averageEnergy = 1250;
        this.data.averageHeat = 2800;
        this.data.averageWater = 1800;
    }

    var moodWarningThreshold = 10;

    var getTrend = (d) => Math.round(100 / (Number(d[1][0].value) + Number(d[1][1].value) + Number(d[1][2].value) + Number(d[1][3].value)) * (Number(d[0][0].value) + Number(d[0][1].value) + Number(d[0][2].value) + Number(d[0][3].value)) - 100);
    this.energyOptions.trend = getTrend(this.energyOptions.data)
    this.heatOptions.trend = getTrend(this.heatOptions.data)
    this.waterOptions.trend = getTrend(this.waterOptions.data)

    var getActual = (d) => Math.round(Number(d[0][0].value) * 10) / 10;
    this.energyOptions.actual = getActual(this.energyOptions.data)
    this.heatOptions.actual = getActual(this.heatOptions.data)
    this.waterOptions.actual = getActual(this.waterOptions.data)

    var getHistory = (d) => Math.round(Number(d[1][0].value) * 10) / 10;
    this.energyOptions.actual = getHistory(this.energyOptions.data)
    this.heatOptions.actual = getHistory(this.heatOptions.data)
    this.waterOptions.actual = getHistory(this.waterOptions.data)

    var getStatus = (o) => {
      var data = {};
      if (o.trend < 0) {
        //green
        data.mood = "smile-good";
        data.icon = "fa fa-smile-o";
        data.tooltip = "Sie haben " + Math.abs(o.trend) + "% weniger Strom verbraucht";
      } else if (o.trend < moodWarningThreshold) {
        //orange
        data.mood = "smile-neutral";
        data.icon = "fa fa-meh-o";
        data.tooltip = "Sie haben " + o.trend + "% mehr Strom verbraucht";
      } else {
        //red
        data.mood = "smile-bad";
        data.icon = "fa fa-frown-o";
        data.tooltip = "Sie haben " + o.trend + "% mehr Strom verbraucht";
      }
      return data;
    };
    this.energyOptions.status = getStatus(this.energyOptions);
    this.heatOptions.status = getStatus(this.heatOptions);
    this.waterOptions.status = getStatus(this.waterOptions);

    // if (this.data.trendEnergy < 0) {
    //   //green
    //   this.data.moodEnergy = "smile-good";
    //   this.data.iconEnergy = "fa fa-smile-o";
    //   this.data.tooltipEnergy = "Sie haben " + Math.abs(this.data.trendEnergy) + "% weniger Strom verbraucht";
    // } else if (this.data.trendEnergy < moodWarningThreshold) {
    //   //orange
    //   this.data.moodEnergy = "smile-neutral";
    //   this.data.iconEnergy = "fa fa-meh-o";
    //   this.data.tooltipEnergy = "Sie haben " + this.data.trendEnergy + "% mehr Strom verbraucht";
    // } else {
    //   //red
    //   this.data.moodEnergy = "smile-bad";
    //   this.data.iconEnergy = "fa fa-frown-o";
    //   this.data.tooltipEnergy = "Sie haben " + this.data.trendEnergy + "% mehr Strom verbraucht";
    // }

    // if (this.data.trendHeat < 0) {
    //   //green
    //   this.data.moodHeat = "smile-good";
    //   this.data.iconHeat = "fa fa-smile-o";
    //   this.data.tooltipHeat = "Sie haben " + Math.abs(this.data.trendHeat) + "% weniger Wärme verbraucht";
    // } else if (this.data.trendHeat < moodWarningThreshold) {
    //   //orange
    //   this.data.moodHeat = "smile-neutral";
    //   this.data.iconHeat = "fa fa-meh-o";
    //   this.data.tooltipHeat = "Sie haben " + this.data.trendHeat + "% mehr Wärme verbraucht";
    // } else {
    //   //red
    //   this.data.moodHeat = "smile-bad";
    //   this.data.iconHeat = "fa fa-frown-o";
    //   this.data.tooltipHeat = "Sie haben " + this.data.trendHeat + "% mehr Wärme verbraucht";
    // }

    // if (this.data.trendWater < 0) {
    //   //green
    //   this.data.moodWater = "smile-good";
    //   this.data.iconWater = "fa fa-smile-o";
    //   this.data.tooltipWater = "Sie haben " + Math.abs(this.data.trendWater) + "% weniger Wasser verbraucht";
    // } else if (this.data.trendWater < moodWarningThreshold) {
    //   //orange
    //   this.data.moodWater = "smile-neutral";
    //   this.data.iconWater = "fa fa-meh-o";
    //   this.data.tooltipWater = "Sie haben " + this.data.trendWater + "% mehr Wasser verbraucht";
    // } else {
    //   //red
    //   this.data.moodWater = "smile-bad";
    //   this.data.iconWater = "fa fa-frown-o";
    //   this.data.tooltipWater = "Sie haben " + this.data.trendWater + "% mehr Wasser verbraucht";
    // }

    // //timer für pulse animated
    // var nodes = document.getElementsByClassName('smile-bad');
    // for (let i = 0; i < nodes.length; i++) {
    //   nodes[i].className = "smile-bad tipp";
    // }
    // setTimeout(() => {
    //   var nodes = document.getElementsByClassName('smile-bad');
    //   for (let i = 0; i < nodes.length; i++) {
    //     nodes[i].className += " animated shake";
    //   }
    // }, 1000);

    // $("#energyChart").remove();
    // $("#energyChartFrame").append('<canvas id="energyChart" width="250" height="320"></canvas>');
    // var ctx_energy = $("#energyChart");
    // var energyChart = new Chart(ctx_energy, {
    //   type: 'bar',
    //   data: {
    //     labels: [dataEnergy[0][3].getLabel(selection), dataEnergy[0][2].getLabel(selection), dataEnergy[0][1].getLabel(selection), dataEnergy[0][0].getLabel(selection)],
    //     datasets: [{
    //       label: "Aktueller Verbrauch",
    //       data: [Math.round(100*dataEnergy[0][3].value)/100, Math.round(100*dataEnergy[0][2].value)/100, Math.round(100*dataEnergy[0][1].value)/100, Math.round(100*dataEnergy[0][0].value)/100],
    //       backgroundColor: 'rgba(255, 224, 102, 0.37)',
    //       borderColor: '#ffe066',
    //       borderWidth: 2
    //     }, {
    //       label: "Verbrauch " + dataEnergy[1][0].year,
    //       data: [Math.round(100*dataEnergy[1][3].value)/100, Math.round(100*dataEnergy[1][2].value)/100, Math.round(100*dataEnergy[1][1].value)/100, Math.round(100*dataEnergy[1][0].value)/100],
    //       borderColor: "#e67700",
    //       backgroundColor: "rgba(230, 119, 0, 0.36)",
    //       fill: false,
    //       type: 'line'
    //     }, {
    //       label: "Schweizer Durchschnitt",
    //       data: [this.data.averageEnergy, this.data.averageEnergy, this.data.averageEnergy, this.data.averageEnergy],
    //       borderColor: "#adb5bd",
    //       backgroundColor: "rgba(173, 181, 189, 0.36)",
    //       fill: false,
    //       type: 'line'
    //     }]
    //   },
    //   options: {
    //     title: {
    //       display: true,
    //       fontSize: 12
    //     },
    //     tooltips: {
    //       titleFontSize: 12,
    //       titleFontFamily: 'Arial'
    //     },
    //     legend: {
    //       position: 'bottom',
    //       fullWidth: false
    //     },
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           min: 0
    //         }
    //       }],
    //       xAxes: [{
    //         ticks: {
    //           fontFamily: 'Arial',

    //         }
    //       }]
    //     }
    //   }
    // });

    // $("#heatChart").remove();
    // $("#heatChartFrame").append('<canvas id="heatChart" width="250" height="320"></canvas>');
    // var ctx_heat = $("#heatChart");
    // var heatChart = new Chart(ctx_heat, {
    //   type: 'bar',
    //   data: {
    //     labels: [dataHeat[0][3].getLabel(selection), dataHeat[0][2].getLabel(selection), dataHeat[0][1].getLabel(selection), dataHeat[0][0].getLabel(selection)],
    //     datasets: [{
    //       label: "Aktueller Verbrauch",
    //       data: [Math.round(100*dataHeat[0][3].value)/100, Math.round(100*dataHeat[0][2].value)/100, Math.round(100*dataHeat[0][1].value)/100, Math.round(100*dataHeat[0][0].value)/100],
    //       backgroundColor: 'rgba(255, 168, 168, 0.37)',
    //       borderColor: '#ffa8a8',
    //       borderWidth: 2
    //     }, {
    //       label: "Verbrauch " + dataHeat[1][0].year,
    //       data: [Math.round(100*dataHeat[1][3].value)/100, Math.round(100*dataHeat[1][2].value)/100, Math.round(100*dataHeat[1][1].value)/100, Math.round(100*dataHeat[1][0].value)/100],
    //       borderColor: "#c92a2a",
    //       backgroundColor: "rgba(201, 42, 42, 0.36)",
    //       fill: false,
    //       type: 'line'
    //     }, {
    //       label: "Schweizer Durchschnitt",
    //       data: [this.data.averageHeat, this.data.averageHeat, this.data.averageHeat, this.data.averageHeat],
    //       borderColor: "#adb5bd",
    //       backgroundColor: "rgba(173, 181, 189, 0.36)",
    //       fill: false,
    //       type: 'line'
    //     }]
    //   },
    //   options: {
    //     title: {
    //       display: true,
    //       fontSize: 12
    //     },
    //     tooltips: {
    //       titleFontSize: 12,
    //       titleFontFamily: 'Arial'
    //     },
    //     legend: {
    //       position: 'bottom',
    //       fullWidth: false
    //     },
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           min: 0
    //         }
    //       }],
    //       xAxes: [{
    //         ticks: {
    //           fontFamily: 'Arial',

    //         }
    //       }]
    //     }
    //   }
    // });

    // $("#waterChart").remove();
    // $("#waterChartFrame").append('<canvas id="waterChart" width="250" height="320"></canvas>');
    // var ctx_water = $("#waterChart");
    // var waterChart = new Chart(ctx_water, {
    //   type: 'bar',
    //   data: {
    //     labels: [dataWater[0][3].getLabel(selection), dataWater[0][2].getLabel(selection), dataWater[0][1].getLabel(selection), dataWater[0][0].getLabel(selection)],
    //     datasets: [{
    //       label: "Aktueller Verbrauch",
    //       data: [Math.round(100*dataWater[0][3].value)/100, Math.round(100*dataWater[0][2].value)/100, Math.round(100*dataWater[0][1].value)/100, Math.round(100*dataWater[0][0].value)/100],
    //       backgroundColor: 'rgba(114, 195, 252, 0.37)',
    //       borderColor: '#72c3fc',
    //       borderWidth: 2
    //     }, {
    //       label: "Verbrauch " + dataWater[1][0].year,
    //       data: [Math.round(100*dataWater[1][3].value)/100, Math.round(100*dataWater[1][2].value)/100, Math.round(100*dataWater[1][1].value)/100, Math.round(100*dataWater[1][0].value)/100],
    //       borderColor: "#1862ab",
    //       backgroundColor: "rgba(24, 98, 171, 0.36)",
    //       fill: false,
    //       type: 'line'
    //     }, {
    //       label: "Schweizer Durchschnitt",
    //       data: [this.data.averageWater, this.data.averageWater, this.data.averageWater, this.data.averageWater],
    //       borderColor: "#adb5bd",
    //       backgroundColor: "rgba(173, 181, 189, 0.36)",
    //       fill: false,
    //       type: 'line'
    //     }]
    //   },
    //   options: {
    //     title: {
    //       display: true,
    //       fontSize: 12
    //     },
    //     tooltips: {
    //       titleFontSize: 12,
    //       titleFontFamily: 'Arial'
    //     },
    //     legend: {
    //       position: 'bottom',
    //       fullWidth: false
    //     },
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           min: 0
    //         }
    //       }],
    //       xAxes: [{
    //         ticks: {
    //           fontFamily: 'Arial',

    //         }
    //       }]
    //     }
    //   }
    // });
  }

  attached() {
  }
}
