(function _AppMainSupportModule_() {
  'use strict';

  var modules = [
    'app.main.support.about',
    'app.main.support.contact-us',
    'app.main.support.faq',
    'app.main.support.terms-condition'
  ];

  /**
   * @ngdoc overview
   * @name app.main.support
   *
   * @description
   * Support module
   *
   * ### Route
   * - `/support`
   *
   * ### Modules
   * - {@link app.main.support.about}
   * - {@link app.main.support.contact-us}
   * - {@link app.main.support.faq}
   * - {@link app.main.support.terms-condition}
   */
  angular.module('app.main.support', modules);
}());
