import { bindable, useView } from 'aurelia-framework';
import { Energy } from '../../../modules/detail/energy';

@useView('./tipp.element.html')
export class TippCustomElement {

  @bindable options;
  @bindable tipps;

  index = 0;

  optionsChanged(value) {
    
  }

  onNext() {
    this.index++;

    if (this.index === this.tipps.length) {
      this.index = 0;
    }
  }

}
