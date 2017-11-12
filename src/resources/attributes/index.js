import { PLATFORM } from 'aurelia-framework';

export function configure(aurelia) {
  aurelia
		.globalResources([
      PLATFORM.moduleName('./tooltip.attribute'),
      PLATFORM.moduleName('./dropdown.attribute')
    ]);
}
