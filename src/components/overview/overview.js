//import {computedFrom} from 'aurelia-framework';
import Chart from 'chart.js';

export class Overview {

  attached() {
    var ctx = $("#myChart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["\uf007", "\uf073", "\uf0fe"],
        datasets: [{
          data: [4, 8, 12],
          backgroundColor: [
            '#fcc419',
            '#f59f00',
            '#e67700'
          ]
        }]
      },
      options: {
        tooltips: {
          titleFontSize: 24,
          titleFontFamily: 'FontAwesome'
        },
        legend: {
          display: false
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
              fontFamily: 'FontAwesome',

            }
          }]
        }
      }
    });

  }
}
