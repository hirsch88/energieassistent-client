import * as _ from 'lodash';
import * as moment from 'moment';
import { bindable, useView } from 'aurelia-framework';
import { Energy } from '../../../modules/detail/energy';

@useView('./costs-table.element.html')
export class CostsTableCustomElement {

  @bindable options;
  @bindable average = 0;

  optionsChanged(value) {
    if (value) {

      let now = this.options[0][0];
      this.costNow = 0;
      this.options[0].forEach((item) => {
        this.costNow = this.costNow += item.cost;
        this.weekNow = item.week;
        this.yearNow = item.year;
      });


      let past = _.find(this.options[1], (o) => o.week === now.week)
      this.costPast = 0;
      this.options[1].forEach((item) => {
        this.costPast = this.costPast += item.cost;
        this.weekPast = item.week;
        this.yearPast = item.year;
      });


      this.comparePastAndNowValue = this.costNow - this.costPast;
      this.comparePastAndNowText = (this.comparePastAndNowValue < 0)
        ? 'Sie haben zum Vorjahr gespart.'
        : 'Sie haben zum Vorjahr mehr benötigt.';
      this.comparePastAndNowClass = (this.comparePastAndNowValue < 0)
        ? 'green'
        : 'red';

      this.compareSwissAndNowValue = this.costNow - this.average;
      this.compareSwissAndNowText = (this.comparePastAndNowValue < 0)
        ? 'Sie sind über dem Durchschnitt der schweizer Haushalte.'
        : 'Sie sind unter dem Durchschnitt der schweizer Haushalte.';
      this.compareSwissAndNowClass = (this.compareSwissAndNowValue < 0)
        ? 'green'
        : 'red';

      this.feedbackText = (this.comparePastAndNowValue < 0)
        ? 'Bravo, Sie haben zum Vorjahr gespart!'
        : 'Hier einige Tipps um Energie zu sparen.';
      this.feedbackClass = (this.comparePastAndNowValue < 0)
        ? 'green'
        : 'red';
    }
  }

}
