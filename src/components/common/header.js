import { bindable, useView } from 'aurelia-framework';

@useView('./header.html')
export class HeaderCustomElement {

  @bindable router;

}
