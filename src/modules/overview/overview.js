//import {computedFrom} from 'aurelia-framework';
import { inject, observable } from 'aurelia-framework';
import { EnergyService } from '../../services/energy.service';
import { HeatService } from '../../services/heat.service';
import { WaterService } from '../../services/water.service';


@inject(EnergyService, HeatService, WaterService)
export class Overview {

  @observable
  selection;

  @observable
  energyOptions;

  @observable
  heatOptions;

  @observable
  waterOptions;

  constructor(energyService, heatService, waterService) {
    this.energyService = energyService;
    this.heatService = heatService;
    this.waterService = waterService;
    this.data = {};
  }

  onChange(selection) {
    this.selection = selection;

    if (!selection) {
      return;
    }

    this.energyOptions = {
      title: 'Strom',
      color: 'yellow',
      icon: 'fa-bolt',
      data: {}
    };

    this.heatOptions = {
      title: 'Wärme',
      color: 'red',
      icon: 'fa-fire',
      data: {}
    };

    this.waterOptions = {
      title: 'Wasser',
      color: 'blue',
      icon: 'fa-tint',
      data: {}
    };

    switch (selection) {
      case "week":
        this.energyOptions.data = this.energyService.GetOverviewDataWeeks;
        this.heatOptions.data = this.heatService.GetOverviewDataWeeks;
        this.waterOptions.data = this.waterService.GetOverviewDataWeeks;
        this.energyOptions.average = 1250;
        this.heatOptions.average = 2800;
        this.waterOptions.average = 1800;
        break;
      case "month":
        this.energyOptions.data = this.energyService.GetOverviewDataMonth;
        this.heatOptions.data = this.heatService.GetOverviewDataMonth;
        this.waterOptions.data = this.waterService.GetOverviewDataMonth;
        this.energyOptions.average = 1250 * 4;
        this.heatOptions.average = 2800 * 4;
        this.waterOptions.average = 1800 * 4;
        break;
      case "quarter":
        this.energyOptions.data = this.energyService.GetOverviewDataQuarter;
        this.heatOptions.data = this.heatService.GetOverviewDataQuarter;
        this.waterOptions.data = this.waterService.GetOverviewDataQuarter;
        this.energyOptions.average = 1250 * 12;
        this.heatOptions.average = 2800 * 12;
        this.waterOptions.average = 1800 * 12;
        break;
      default:
        this.energyOptions.data = this.energyService.GetOverviewDataWeeks;
        this.heatOptions.data = this.heatService.GetOverviewDataWeeks;
        this.waterOptions.data = this.waterService.GetOverviewDataWeeks;
        this.energyOptions.average = 1250;
        this.heatOptions.average = 2800;
        this.waterOptions.average = 1800;
    }

    var moodWarningThreshold = 10;

    var getTrend = (d) => Math.round(100 / (Number(d[1][0].value) + Number(d[1][1].value) + Number(d[1][2].value) + Number(d[1][3].value)) * (Number(d[0][0].value) + Number(d[0][1].value) + Number(d[0][2].value) + Number(d[0][3].value)) - 100);
    this.energyOptions.trend = getTrend(this.energyOptions.data)
    this.heatOptions.trend = getTrend(this.heatOptions.data)
    this.waterOptions.trend = getTrend(this.waterOptions.data)

    var getActual = (d) => Math.round(Number(d[0][0].value) * 10) / 10;
    this.energyOptions.actual = getActual(this.energyOptions.data)
    this.heatOptions.actual = getActual(this.heatOptions.data)
    this.waterOptions.actual = getActual(this.waterOptions.data)

    var getHistory = (d) => Math.round(Number(d[1][0].value) * 10) / 10;
    this.energyOptions.history = getHistory(this.energyOptions.data)
    this.heatOptions.history = getHistory(this.heatOptions.data)
    this.waterOptions.history = getHistory(this.waterOptions.data)

    var getStatus = (o, name) => {
      var data = {};
      if (o.trend < 0) {
        //green
        data.mood = `smile-good`;
        data.icon = `fa fa-smile-o`;
        data.tooltip = `Sie haben ` + Math.abs(o.trend) + `% weniger ${name} verbraucht`;
      } else if (o.trend < moodWarningThreshold) {
        //orange
        data.mood = `smile-neutral`;
        data.icon = `fa fa-meh-o`;
        data.tooltip = `Sie haben ` + o.trend + `% mehr ${name} verbraucht`;
      } else {
        //red
        data.mood = `smile-bad`;
        data.icon = `fa fa-frown-o`;
        data.tooltip = `Sie haben ` + o.trend + `% mehr ${name} verbraucht`;
      }
      return data;
    };
    this.energyOptions.status = getStatus(this.energyOptions, 'Strom');
    this.heatOptions.status = getStatus(this.heatOptions, 'Wärme');
    this.waterOptions.status = getStatus(this.waterOptions, 'Wasser');

    //timer für pulse animated
    var nodes = document.getElementsByClassName('smile-bad');
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].className = 'smile-bad tipp';
    }
    setTimeout(() => {
      var nodes = document.getElementsByClassName('smile-bad');
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].className += ' animated shake';
      }
    }, 1000);

  }

}
