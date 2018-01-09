(function _AppMainAdmedikaShowModule_() {
  'use strict';

  var modules = [
    'barcode',
    'monospaced.qrcode'
  ];

  /**
   * @ngdoc overview
   * @name app.main.admedika.show
   *
   * @description
   * AdMedika show module.
   *
   * ### Route
   * `/admedika/show`
   *
   * ### Dependencies
   * - {@link https://github.com/ryanmc2033/angular-barcode barcode}
   * - {@link https://github.com/monospaced/angular-qrcode monospaced.qrcode}
   */
  angular.module('app.main.admedika.show', modules);
}());
