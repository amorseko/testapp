(function _AppMainAdmedikaModule_() {
  'use strict';

  var modules = [
    'app.main.admedika.benefit',
    'app.main.admedika.claim',
    'app.main.admedika.connect',
    'app.main.admedika.member',
    'app.main.admedika.provider',
    'app.main.admedika.show',
    'app.main.admedika.status'
  ];

  /**
   * @ngdoc overview
   * @name app.main.admedika
   *
   * @description
   * Admedika module
   *
   * ### Route
   * - `/admedika`
   *
   * ### Modules
   * - {@link app.main.admedika.benefit}
   * - {@link app.main.admedika.claim}
   * - {@link app.main.admedika.connect}
   * - {@link app.main.admedika.member}
   * - {@link app.main.admedika.provider}
   * - {@link app.main.admedika.show}
   * - {@link app.main.admedika.status}
   */
  angular.module('app.main.admedika', modules);
}());
