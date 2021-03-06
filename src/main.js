// we want font-awesome to load as soon as possible to show the fa-spinner
import '../styles/styles.scss';

import '../static/styles.css';


// we want font-awesome to load as soon as possible to show the fa-spinner
import 'babel-polyfill';
import * as Bluebird from 'bluebird';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()

    .feature(PLATFORM.moduleName('resources/attributes/index'))
    .feature(PLATFORM.moduleName('resources/elements/index'))
    .feature(PLATFORM.moduleName('resources/templates/index'))
    .feature(PLATFORM.moduleName('resources/converters/index'))
    ;

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-animator-css'));
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin(PLATFORM.moduleName('aurelia-html-import-template-loader'));

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('modules/app'));
}
