import { bindable, useView } from 'aurelia-framework';
import { Energy } from '../../../modules/detail/energy';

@useView('./tipp.element.html')
export class TippCustomElement {

  @bindable options;
  @bindable tipps;

  cssClass;
  text;

  index = 0;

  optionsChanged(value) {
    if (value) {
      let now = this.options[0][0];
      this.costNow = now.cost;
      this.weekNow = now.week;

      let past = _.find(this.options[1], (o) => o.week === now.week)
      this.costPast = past.cost;
      this.weekPast = past.week;

      this.comparePastAndNowValue = this.costNow - this.costPast;
      this.text = (this.comparePastAndNowValue < 0)
        ? 'Bravo, Sie haben zum Vorjahr gespart!'
        : 'Hier einige Tipps um Energie zu sparen.';
      this.cssClass = (this.comparePastAndNowValue < 0)
        ? 'green'
        : 'red';
    }
  }

  onNext() {
    this.index++;

    if (this.index === this.tipps.length) {
      this.index = 0;
    }
  }

}
