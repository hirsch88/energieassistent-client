export class App {
  configureRouter(config, router) {
    config.title = 'Logo';
    config.apiversion = '1.2.13';
    config.map([
      { route: ['', 'overview'], name: 'overview', moduleId: './overview/overview', nav: false, title: 'Übersicht' },
      { route: 'energy', name: 'energy', moduleId: './detail/energy', nav: true, title: 'Strom', icon: 'fa fa-bolt' },
      { route: 'heat', name: 'heat', moduleId: './detail/heat', nav: true, title: 'Wärme', icon: 'fa fa-fire' },
      { route: 'water', name: 'water', moduleId: './detail/water', nav: true, title: 'Wasser', icon: 'fa fa-tint' },
      { route: 'awards', name: 'awards', moduleId: './awards/awards', nav: true, title: 'Auszeichnungen', icon: 'fa fa-trophy' }
    ]);

    this.router = router;
  }
}
