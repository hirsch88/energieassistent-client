import { bindable, useView } from 'aurelia-framework';
import $ from 'jquery';
import d3 from 'd3';
import c3 from 'c3';

@useView('./pie-chart.element.html')
export class PieChartCustomElement {

  @bindable options;

  isAttached = false;
  chartContainer;
  chart;

  optionsChanged(value) {
    if (value) {
      this.render();
    }
  }

  render() {
    if (!this.isAttached && this.options) {
      this.build();
    }
  }

  build() {
    let columns = this.options.data.map(d => [d.text, d.value]);
    let colors = this.options.data.reduce((accumulator, currentValue) => {
      accumulator[currentValue.text] = currentValue.color;
      return accumulator;
    }, {});

    let config = {
      bindto: this.chartContainer,
      data: {
        type: 'pie',
        columns,
        colors
      }
    };

    this.chart = c3.generate(config);
    this.isAttached = true;
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
