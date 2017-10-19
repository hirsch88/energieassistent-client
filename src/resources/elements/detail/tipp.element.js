import { bindable, useView } from 'aurelia-framework';
import { Energy } from '../../../modules/detail/energy';

@useView('./tipp.element.html')
export class TippCustomElement {

  @bindable options;

  data = {};

  optionsChanged(value) {
    if (value) {
      this.data.costsThisWeek = Math.round((Number(value[0][0].costNormal) + Number(value[0][0].costLow)) * 100) / 100;
      this.data.costsHistoryWeek = Math.round((Number(value[1][0].costNormal) + Number(value[1][0].costLow)) * 100) / 100;
      this.data.actualWeek = value[0][0].week;

      if (this.data.costsThisWeek < this.data.costsHistoryWeek) {
        this.data.comparedToLastYearText = "Sie haben zum Vorjahr gespart.";
        this.data.comparedToLastYearValue = Math.round((this.data.costsHistoryWeek - this.data.costsThisWeek) * 100) / 100;
        this.data.comparedToLastYearClass = "green";
        this.data.tippText = "Bravo, Sie haben zum Vorjahr gespart!";
      } else {
        this.data.comparedToLastYearText = "Sie haben zum Vorjahr mehr benötigt.";
        this.data.comparedToLastYearValue = Math.round((this.data.costsThisWeek - this.data.costsHistoryWeek) * 100) / 100;
        this.data.comparedToLastYearClass = "red";
        this.data.tippText = "Hier einige Tipps um Energie zu sparen."
      }

      if (this.data.costsThisWeek < Energy.SwissAverageCosts) {
        this.data.comparedToSwissText = "Sie sind unter dem Durchschnitt der schweizer Haushalte.";
        this.data.comparedToSwissValue = Math.round((Energy.SwissAverageCosts - this.data.costsThisWeek) * 100) / 100;
        this.data.comparedToSwissClass = "green";
      } else {
        this.data.comparedToSwissText = "Sie sind über dem Durchschnitt der schweizer Haushalte.";
        this.data.comparedToSwissValue = Math.round((this.data.costsThisWeek - Energy.SwissAverageCosts) * 100) / 100;
        this.data.comparedToSwissClass = "red";
      }
    }
  }

}
