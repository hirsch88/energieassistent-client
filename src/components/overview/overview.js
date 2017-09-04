//import {computedFrom} from 'aurelia-framework';
import Chart from 'chart.js';

export class Overview {

  attached() {
    var ctx_energy = $("#energyChart");
    var energyChart = new Chart(ctx_energy, {
      type: 'bar',
      data: {
        labels: ["KW44", "KW45", "KW46", "KW47"],
        datasets: [{
          label: "Aktueller Verbrauch",
          data: [4, 8, 12, 13],
          backgroundColor: 'rgba(255, 224, 102, 0.37)',
          borderColor: '#ffe066',
          borderWidth: 2
        },{
          label: "Verbrauch 2016",
          data: [5,7,11,14],
          borderColor: "#e67700",
          backgroundColor: "rgba(230, 119, 0, 0.36)",
          fill: false,
          type: 'line'
        },{
          label: "Schweizer Durchschnitt",
          data: [10,10,10,10],
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
              min: 0,
              max: 16
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
        labels: ["KW44", "KW45", "KW46", "KW47"],
        datasets: [{
          label: "Aktueller Verbrauch",
          data: [12, 9, 8, 10],
          backgroundColor: 'rgba(255, 168, 168, 0.37)',
          borderColor: '#ffa8a8',
          borderWidth: 2
        },{
          label: "Verbrauch 2016",
          data: [14,7,11,12],
          borderColor: "#c92a2a",
          backgroundColor: "rgba(201, 42, 42, 0.36)",
          fill: false,
          type: 'line'
        },{
          label: "Schweizer Durchschnitt",
          data: [7,7,7,7],
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
              min: 0,
              max: 16
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
    var heatChart = new Chart(ctx_water, {
      type: 'bar',
      data: {
        labels: ["KW44", "KW45", "KW46", "KW47"],
        datasets: [{
          label: "Aktueller Verbrauch",
          data: [103, 107, 120, 110],
          backgroundColor: 'rgba(114, 195, 252, 0.37)',
          borderColor: '#72c3fc',
          borderWidth: 2
        },{
          label: "Verbrauch 2016",
          data: [105,107,111,112],
          borderColor: "#1862ab",
          backgroundColor: "rgba(24, 98, 171, 0.36)",
          fill: false,
          type: 'line'
        },{
          label: "Schweizer Durchschnitt",
          data: [105,105,105,105],
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
              min: 80,
              max: 140
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
