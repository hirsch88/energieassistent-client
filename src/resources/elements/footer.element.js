import { useView, inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@useView('./footer.element.html')
@inject(Router)
export class FooterCustomElement {

  router;

  constructor(router) {
    this.router = router;
  }

}
