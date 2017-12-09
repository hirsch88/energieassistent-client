import { bindable, useView, inject } from 'aurelia-framework';
import { NumberValueConverter } from '../../converters/number.converter';
import $ from 'jquery';
import d3 from 'd3';
import c3 from 'c3';

@inject(NumberValueConverter)
@useView('./bar-line-chart.element.html')
export class BarLineChartCustomElement {

  LABEL_NOW = () => `Ausgewählter Verbrauch`;
  LABEL_HISTORY = (y) => `Verbrauch des Vorjahres`;

  @bindable options;
  @bindable selection;
  @bindable extension;

  isAttached = false;
  chartContainer;
  chart;

  constructor(numberValueConverter) {
    this.numberValueConverter = numberValueConverter;
  }

  build() {
    let colors = {
      blue: {
        [this.LABEL_NOW()]: '#72c3fc',
        [this.LABEL_HISTORY(this.selection.value)]: '#1862ab'
      },
      red: {
        [this.LABEL_NOW()]: '#ffa8a8',
        [this.LABEL_HISTORY(this.selection.value)]: '#c92a2a'
      },
      yellow: {
        [this.LABEL_NOW()]: '#ffe066',
        [this.LABEL_HISTORY(this.selection.value)]: '#e67700'
      }
    };

    var config = {
      bindto: this.chartContainer,
      axis: {
        x: {
          type: 'category'
        },
        y: {
          tick: {
            format: (d) => this.numberValueConverter.toChart(d)
          }
        }
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
        order: null,
        format: {
          value: (value, ratio, id) => {
            return this.numberValueConverter.toView(value) + ' ' + this.extension;
          }
        }
      }
    };

    config.data.types[this.LABEL_HISTORY(this.selection.value)] = 'line';

    this.chart = c3.generate(config);
    this.isAttached = true;
  }

  selectionChanged(value) {
    if (value && this.options) {
      this.render();
    }
  }

  optionsChanged(value) {
    if (value && this.selection) {
      this.render();
    }
  }

  render() {
    if (!this.isAttached) {
      this.build();
    }

    try {
      this.options.data[0][0] = this.LABEL_NOW();
      this.options.data[1][0] = this.LABEL_HISTORY(this.selection.value);
      this.chart.load({ columns: this.options.data });
    } catch (e) {
      // Error Handling
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
