import { bindable, useView } from 'aurelia-framework';
import Chart from 'chart.js';

@useView('./overview-chart.element.html')
export class OverviewChartCustomElement {

  @bindable options;
  @bindable selection;

  chartElement;
  chart

  optionsChanged(value) {
    console.info('OverviewChartCustomElement', value);
    if (!this.chart) {
      this.buildChart();
    }


  }

  buildChart() {
    if (this.options && this.options.data && this.selection) {
      this.chart = new Chart($(this.chartElement), {
        type: 'bar',
        options: {
          title: {
            display: true,
            fontSize: 12
          },
          tooltips: {
            titleFontSize: 12,
            titleFontFamily: 'Open Sans'
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
                fontFamily: 'Open Sans',
              }
            }]
          }
        },
        data: {
          labels: [this.options.data[0][3].getLabel(this.selection), this.options.data[0][2].getLabel(this.selection), this.options.data[0][1].getLabel(this.selection), this.options.data[0][0].getLabel(this.selection)],
        }
      });
    }
  }

}
