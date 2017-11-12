import { PLATFORM } from 'aurelia-framework';

export function configure(aurelia) {
  aurelia
		.globalResources([
      PLATFORM.moduleName('./currency.converter'),
      PLATFORM.moduleName('./number.converter')
    ]);
}
