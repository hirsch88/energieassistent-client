import { bindable, useView, observable } from 'aurelia-framework';
import * as moment from 'moment';

@useView('./water-nav.element.html')
export class WaterNavCustomElement {

  @bindable router;
  @bindable onChange;
  @observable selectedNav;
  @observable selectedType;
  @observable selectedCal;

  constructor() {
    var scope = this;
    this.selectedNav = 1;
    this.selectedType = 0;
    this.selectedCal = 0;
    this.calList = [];
    this.navList = [
      {
        text: 'Gesamtverbrauch',
        key: 'all',
        style: 'all',
        actions: [],
        onSelect: (item, index) => {
          this.router.navigateToRoute('overview');
        }
      }, {
        text: 'Wasserverbrauch',
        icon: 'fa fa-tint',
        key: 'water',
        style: 'water',
        actions: [
          {
            text: 'des Quartals',
            key: 'quarter',
            actions: this.getQuarterList('water', scope),
            onSelect: (item, index) => {
              scope.selectedType = index;
              scope.selectedCal = 0;
              scope.changeCal(item);
              item.actions[0].onSelect(item.actions[0], scope.selectedCal);
            }
          },
          {
            text: 'des Jahres',
            key: 'year',
            actions: this.getYearList('water', scope),
            onSelect: (item, index) => {
              scope.selectedType = index;
              scope.selectedCal = 0;
              scope.changeCal(item);
              item.actions[0].onSelect(item.actions[0], scope.selectedCal);
            }
          }
        ],
        onSelect: (item, index) => {
          item.actions[0].onSelect(item.actions[0], scope.selectedCal);
        }
      }, {
        text: 'Stromverbrauch',
        icon: 'fa fa-bolt',
        key: 'energy',
        style: 'energy',
        actions: [],
        onSelect: (item) => {
          this.router.navigateToRoute('energy');
        }
      }, {
        text: 'Wärmeverbrauch',
        icon: 'fa fa-fire',
        key: 'heat',
        style: 'heat',
        actions: [],
        onSelect: (item) => {
          this.router.navigateToRoute('heat');
        }
      }
    ];
    this.typeList = this.navList[1].actions;
  }

  attached() {
    this.navList[1].onSelect(this.navList[1]);
  }

  fireChangeEvent(t, v) {
    this.onChange({
      value: v,
      type: t
    });
  }

  changeType(item) {
    this.typeList = item.actions;
  }

  changeCal(item) {
    this.calList = item.actions;
  }

  getQuarterList(route, scope) {
    const pointer = moment().utc();
    const list = [];
    for (let i = 0; i < 8; i++) {
      list.push({
        text: `Q${pointer.quarter()} ${pointer.year()}`,
        key: `Q${pointer.quarter()}-${pointer.year()}`,
        onSelect: (item, index) => {
          scope.selectedCal = index;
          scope.fireChangeEvent('quarter', item.key);
        }
      });
      pointer.quarter(pointer.quarter() - 1);
    }
    return list;
  }

  getYearList(route, scope) {
    const pointer = moment().utc();
    const list = [];
    for (let i = 0; i < 5; i++) {
      list.push({
        text: `${pointer.year()}`,
        key: `${pointer.year()}`,
        onSelect: (item, index) => {
          scope.selectedCal = index;
          scope.fireChangeEvent('year', item.key);
        }
      });
      pointer.year(pointer.year() - 1);
    }
    return list;
  }

}
