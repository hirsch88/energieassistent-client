import { PLATFORM } from 'aurelia-framework';

export function configure(aurelia) {
  aurelia
		.globalResources([
      PLATFORM.moduleName('./header.element'),
      PLATFORM.moduleName('./footer.element'),
      PLATFORM.moduleName('./dropdown.element'),
      PLATFORM.moduleName('./navs/overview-nav.element'),
      PLATFORM.moduleName('./navs/energy-nav.element')
    ]);
}
