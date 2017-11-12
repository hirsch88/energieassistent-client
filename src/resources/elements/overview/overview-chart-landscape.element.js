import { bindable, useView, inject } from 'aurelia-framework';
import { NumberValueConverter } from '../../converters/number.converter';
import $ from 'jquery';
import d3 from 'd3';
import c3 from 'c3';


@inject(NumberValueConverter)
@useView('./overview-chart-landscape.element.html')
export class OverviewChartLandscapeCustomElement {

  LABEL_CH = () => `Schweizer Durchschnitt`;
  LABEL_NOW = () => `Aktueller Verbrauch`;
  LABEL_HISTORY = (y) => `Verbrauch ${y}`;

  @bindable options;
  @bindable selection;
  @bindable extension;

  isAttached = false;
  chartContainer;
  chart;
  numberValueConverter;
  tooltipElement;

  constructor(numberValueConverter) {
    this.numberValueConverter = numberValueConverter;
  }

  build() {
    var colors = {
      blue: {
        [this.LABEL_NOW()]: '#72c3fc', //rgba(114, 195, 252, 0.37)',
        [this.LABEL_HISTORY(this.options.data[1][0].year)]: '#1862ab',
        [this.LABEL_CH()]: '#adb5bd'
      },
      red: {
        [this.LABEL_NOW()]: '#ffa8a8', //rgba(255, 168, 168, 0.37)',
        [this.LABEL_HISTORY(this.options.data[1][0].year)]: '#c92a2a',
        [this.LABEL_CH()]: '#adb5bd'
      },
      yellow: {
        [this.LABEL_NOW()]: '#ffe066', //rgba(255, 224, 102, 0.37)',
        [this.LABEL_HISTORY(this.options.data[1][0].year)]: '#e67700',
        [this.LABEL_CH()]: '#adb5bd'
      }
    }

    var config = {
      bindto: this.chartContainer,
      legend: {
        show: false
      },
      axis: {
        x: {
          type: 'category'
        },
        y: {
          tick: {
            format: (d) => this.numberValueConverter.toChart(d)
          }
        }
        // y: {
        //   label: {
        //     text: this.extension,
        //     position: 'outer-top'
        //   }
        // }
      },
      padding: {
        bottom: 5
      },
      point: {
        show: false
      },
      data: {
        type: 'bar',
        x: 'x',
        columns: [],
        types: {},
        colors: colors[this.options.color] || {}
      },
      tooltip: {
        format: {
          value: (value, ratio, id) => {
            return this.numberValueConverter.toView(value) + ' ' + this.extension;
          }
        }
      }
    };

    config.data.types[this.LABEL_CH()] = 'line';
    config.data.types[this.LABEL_HISTORY(this.options.data[1][0].year)] = 'line';

    this.chart = c3.generate(config);
  }

  optionsChanged(value) {
    if (value && this.selection) {

      if (!this.isAttached) {
        this.build();
      }

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
      });

      $(this.tooltipElement)
        .tooltip({ placement: 'bottom' })
        .attr('data-original-title', this.options.status.tooltip)
        .tooltip('fixTitle');

    }
  }

  detached() {
    if (this.chart) {
      try {
        this.chart.destroy();
      } catch (e) {
        console.error('Could not destroy the chart', e);
      }
    }
  }

}
