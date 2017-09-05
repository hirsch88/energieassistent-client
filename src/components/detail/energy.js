import Chart from 'chart.js';
import { inject } from 'aurelia-framework';
import { EnergyService } from '../../services/energy.service';

@inject(EnergyService)
export class Energy {
  constructor(energyService){
    this.energyService = energyService;
    this.data = {};
  }

  attached() {
    var swissAverageCosts = 100;

    var dataEnergy = this.energyService.GetDetailDataQuarter;
    this.data.costsThisWeek = Math.round((Number(dataEnergy[0][0].costNormal) + Number(dataEnergy[0][0].costLow))*100)/100;
    this.data.costsHistoryWeek = Math.round((Number(dataEnergy[1][0].costNormal) + Number(dataEnergy[1][0].costLow))*100)/100;
    this.data.actualWeek = dataEnergy[0][0].week;
    

    if (this.data.costsThisWeek < this.data.costsHistoryWeek) {
      this.data.comparedToLastYearText = "Sie haben zum Vorjahr gespart.";
      this.data.comparedToLastYearValue = Math.round((this.data.costsHistoryWeek - this.data.costsThisWeek)*100)/100;
      this.data.comparedToLastYearClass = "green";
      this.data.tippText = "Bravo, Sie haben zum Vorjahr gespart!";
    } else {
      this.data.comparedToLastYearText = "Sie haben zum Vorjahr mehr benötigt.";
      this.data.comparedToLastYearValue = Math.round((this.data.costsThisWeek - this.data.costsHistoryWeek)*100)/100;
      this.data.comparedToLastYearClass = "red";
      this.data.tippText = "Hier einige Tipps um Energie zu sparen."
    }

    if (this.data.costsThisWeek < swissAverageCosts){
      this.data.comparedToSwissText = "Sie sind unter dem Durchschnitt der schweizer Haushalte.";
      this.data.comparedToSwissValue = Math.round((swissAverageCosts - this.data.costsThisWeek)*100)/100;
      this.data.comparedToSwissClass = "green";
    } else {
      this.data.comparedToSwissText = "Sie sind über dem Durchschnitt der schweizer Haushalte.";
      this.data.comparedToSwissValue = Math.round((this.data.costsThisWeek - swissAverageCosts)*100)/100;
      this.data.comparedToSwissClass = "red";
    }
  }

}
