import { bindable, useView } from 'aurelia-framework';

@useView('./dropdown.element.html')
export class DropdownCustomElement {

  @bindable list;
  @bindable selectedIndex;

  attached() {
    console.log('DropdownCustomElement', this.selectedIndex, this.list);
    this.selectedIndex = this.selectedIndex || 0;
  }

  get Selected() {
    return this.list[this.selectedIndex];
  }

  onSelect(item, index) {
    this.selectedIndex = index;
    if (item.onSelect) {
      item.onSelect(item, index);
    }
  }

}
