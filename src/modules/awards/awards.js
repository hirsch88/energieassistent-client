import { Router } from 'aurelia-router';
import { useView, inject } from 'aurelia-framework';

@inject(Router)
@useView('./awards.html')
export class Awards {

  constructor(router) {
    this.router = router;
  }

  goBack() {
    this.router.navigateBack()
  }

}
