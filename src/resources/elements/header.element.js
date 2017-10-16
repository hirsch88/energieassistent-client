import { bindable, useView } from 'aurelia-framework';

@useView('./header.element.html')
export class HeaderCustomElement {

  @bindable router;

}
