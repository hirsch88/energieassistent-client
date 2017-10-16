import { bindable, useView } from 'aurelia-framework';
import $ from 'jquery';
import d3 from 'd3';
import c3 from 'c3';

@useView('./overview-chart.element.html')
export class OverviewChartCustomElement {

  LABEL_CH = () => `Schweizer Durchschnitt`;
  LABEL_NOW = () => `Aktueller Verbrauch`;
  LABEL_HISTORY = (y) => `Verbrauch ${y}`;

  @bindable options;
  @bindable selection;

  templateElement;

  isAttached = false;

  chartContainer;
  chart;

  build() {
    var colors = {
      blue: {
        [this.LABEL_NOW()]: 'rgba(114, 195, 252, 0.37)',
        [this.LABEL_HISTORY(this.options.data[1][0].year)]: '#1862ab',
        [this.LABEL_CH()]: '#adb5bd'
      },
      red: {
        [this.LABEL_NOW()]: 'rgba(255, 168, 168, 0.37)',
        [this.LABEL_HISTORY(this.options.data[1][0].year)]: '#c92a2a',
        [this.LABEL_CH()]: '#adb5bd'
      },
      yellow: {
        [this.LABEL_NOW()]: 'rgba(255, 224, 102, 0.37)',
        [this.LABEL_HISTORY(this.options.data[1][0].year)]: '#e67700',
        [this.LABEL_CH()]: '#adb5bd'
      }
    }

    var config = {
      bindto: this.chartContainer,
      axis: {
        x: {
          type: 'category'
        }
      },
      data: {
        type: 'bar',
        x: 'x',
        columns: [],
        types: {},
        //   data2: 'line',
        //   data3: 'line'
        // },
        colors: colors[this.options.color] || {}
      }
    };

    config.data.types[this.LABEL_CH()] = 'line';
    config.data.types[this.LABEL_HISTORY(this.options.data[1][0].year)] = 'line';

    this.chart = c3.generate(config);
  }

  optionsChanged(value) {
    if (value) {
      if (!this.isAttached) {
        this.build();
      }

      console.info('optionsChanged', value.data);
      var x = ['x'];
      var d1 = ['Aktueller Verbrauch'];
      var d2 = [`Verbrauch ${this.options.data[1][0].year}`];
      var d3 = ['Schweizer Durchschnitt', this.options.average, this.options.average, this.options.average, this.options.average];

      value.data[0].forEach(e => d1.push(e.value));
      value.data[1].forEach(e => d2.push(e.value));
      value.data[0].forEach((e) => x.push(e.getLabel(this.selection)));

      this.chart.load({
        columns: [
          d1, d2, d3, x
        ]
      })

    }
  }


  // buildChart() {
  //   if (this.options && this.options.data && this.selection) {
  //     setTimeout(() => {
  //       this.chart = new Chart($(this.chartContainer).find('canvas'), {
  //         type: 'bar',
  //         options: {
  //           title: {
  //             display: true,
  //             fontSize: 12
  //           },
  //           tooltips: {
  //             titleFontSize: 12,
  //             titleFontFamily: 'Open Sans'
  //           },
  //           legend: {
  //             position: 'bottom',
  //             fullWidth: true
  //           },
  //           scales: {
  //             yAxes: [{
  //               ticks: {
  //                 min: 0
  //               }
  //             }],
  //             xAxes: [{
  //               ticks: {
  //                 fontFamily: 'Open Sans',
  //               }
  //             }]
  //           }
  //         },
  //         data: {
  //           labels: [this.options.data[0][3].getLabel(this.selection), this.options.data[0][2].getLabel(this.selection), this.options.data[0][1].getLabel(this.selection), this.options.data[0][0].getLabel(this.selection)],
  //           datasets: [{
  //             label: "Aktueller Verbrauch",
  //             data: [Math.round(100 * this.options.data[0][3].value) / 100, Math.round(100 * this.options.data[0][2].value) / 100, Math.round(100 * this.options.data[0][1].value) / 100, Math.round(100 * this.options.data[0][0].value) / 100],
  //             backgroundColor: 'rgba(255, 224, 102, 0.37)',
  //             borderColor: '#ffe066',
  //             borderWidth: 2
  //           }, {
  //             label: "Verbrauch " + this.options.data[1][0].year,
  //             data: [Math.round(100 * this.options.data[1][3].value) / 100, Math.round(100 * this.options.data[1][2].value) / 100, Math.round(100 * this.options.data[1][1].value) / 100, Math.round(100 * this.options.data[1][0].value) / 100],
  //             borderColor: "#e67700",
  //             backgroundColor: "rgba(230, 119, 0, 0.36)",
  //             fill: false,
  //             type: 'line'
  //           }, {
  //             label: "Schweizer Durchschnitt",
  //             data: [this.options.average, this.options.average, this.options.average, this.options.average],
  //             borderColor: "#adb5bd",
  //             backgroundColor: "rgba(173, 181, 189, 0.36)",
  //             fill: false,
  //             type: 'line'
  //           }]
  //         }
  //       });
  //     }, 500);
  //   }
  // }

}
