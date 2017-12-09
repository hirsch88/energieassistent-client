import { bindable, useView, observable } from 'aurelia-framework';

@useView('./overview-nav.element.html')
export class OverviewNavCustomElement {

  @bindable router;
  @bindable onChange;
  @observable selectedNav;
  @observable selectedType;

  constructor() {
    var scope = this;
    this.selectedNav = 0;
    this.selectedType = 0;
    this.navList = [
      {
        text: 'Gesamtverbrauch',
        key: 'all',
        style: 'all',
        actions: [
          {
            text: 'Wochen',
            key: 'week',
            style: 'week',
            onSelect: (item, index) => {
              scope.selectedType = index;
              this.fireChangeEvent();
            }
          }, {
            text: 'Monaten',
            key: 'month',
            style: 'month',
            onSelect: (item, index) => {
              scope.selectedType = index;
              this.fireChangeEvent();
            }
          }, {
            text: 'Quartale',
            key: 'quarter',
            style: 'quarter',
            onSelect: (item, index) => {
              scope.selectedType = index;
              this.fireChangeEvent();
            }
          }
        ],
        onSelect: (item, index) => {
          scope.selectedNav = index;
          scope.selectedType = 0;
          this.changeType(item);
          item.actions[0].onSelect(item.actions[0], scope.selectedType);
        }
      }, {
        text: 'Stromverbrauch',
        icon: 'fa fa-bolt',
        key: 'energy',
        style: 'energy',
        actions: [
        ],
        onSelect: (item, index) => {
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
      }, {
        text: 'Wasserverbrauch',
        icon: 'fa fa-tint',
        key: 'water',
        style: 'water',
        actions: [],
        onSelect: (item) => {
          this.router.navigateToRoute('water');
        }
      }
    ];
    this.typeList = this.navList[0].actions;
  }

  attached() {
    this.fireChangeEvent();
  }

  fireChangeEvent() {
    this.onChange({
      value: this.navList[this.selectedNav].actions[this.selectedType].key
    });
  }

  changeType(item) {
    this.typeList = item.actions;
  }

}
