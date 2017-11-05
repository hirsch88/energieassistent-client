import { PLATFORM } from 'aurelia-pal';

export class App {

  classToDisableNotSupported = '';

  goOn() {
    this.classToDisableNotSupported = 'disable-not-support-page';
  }

  configureRouter(config, router) {
    config.title = 'Energie Assistent';
    config.map([
      { route: ['', 'overview'], name: 'overview', moduleId: PLATFORM.moduleName('./overview/overview'), nav: false, title: 'Übersicht' },
      { route: ['energy'], name: 'energy', moduleId: PLATFORM.moduleName('./detail/energy'), nav: true, title: 'Strom', icon: 'fa fa-bolt' },
      { route: ['heat'], name: 'heat', moduleId: PLATFORM.moduleName('./detail/heat'), nav: true, title: 'Wärme', icon: 'fa fa-fire' },
      { route: ['water'], name: 'water', moduleId: PLATFORM.moduleName('./detail/water'), nav: true, title: 'Wasser', icon: 'fa fa-tint' },
      { route: ['awards'], name: 'awards', moduleId: PLATFORM.moduleName('./awards/awards'), nav: true, title: 'Auszeichnungen', icon: 'fa fa-trophy' }
    ]);

    this.router = router;
  }
}
