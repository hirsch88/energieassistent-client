export class App {
  configureRouter(config, router) {
    config.title = 'Logo';
    config.map([
      { route: ['', 'overview'], name: 'overview', moduleId: './overview/overview', nav: false, title: 'Übersicht' },
      { route: 'energy', name: 'energy', moduleId: './detail/energy', nav: true, title: 'Strom' },
      { route: 'heat', name: 'heat', moduleId: './detail/heat', nav: true, title: 'Wärme' },
      { route: 'water', name: 'water', moduleId: './detail/water', nav: true, title: 'Wasser' }
    ]);

    console.log(router.navigation);

    this.router = router;
  }
}
