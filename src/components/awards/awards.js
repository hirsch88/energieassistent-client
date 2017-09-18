import { Router } from 'aurelia-router';
import { useView, inject } from 'aurelia-framework';

@inject(Router)
@useView('./awards.html')
export class Awards {

  constructor(router) {
    this.router = router;
  }

  attached() {
    console.log(this.router)
  }

  goBack() {
    this.router.navigateBack()
  }

}
