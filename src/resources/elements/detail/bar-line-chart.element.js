import { bindable, useView } from 'aurelia-framework';
import $ from 'jquery';
import d3 from 'd3';
import c3 from 'c3';

@useView('./bar-line-chart.element.html')
export class BarLineChartCustomElement {

  LABEL_NOW = () => `Ausgewählter Verbrauch`;
  LABEL_HISTORY = (y) => `Verbrauch des Vorjahres`;

  @bindable options;
  @bindable selection;

  isAttached = false;
  chartContainer;
  chart;

  build() {
    let colors = {
      blue: {
        [this.LABEL_NOW()]: 'rgba(114, 195, 252, 0.37)',
        [this.LABEL_HISTORY(this.selection.value)]: '#1862ab'
      },
      red: {
        [this.LABEL_NOW()]: 'rgba(255, 168, 168, 0.37)',
        [this.LABEL_HISTORY(this.selection.value)]: '#c92a2a'
      },
      yellow: {
        [this.LABEL_NOW()]: 'rgba(255, 224, 102, 0.37)',
        [this.LABEL_HISTORY(this.selection.value)]: '#e67700'
      }
    };

    var config = {
      bindto: this.chartContainer,
      axis: {
        x: {
          type: 'category'
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
