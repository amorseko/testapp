(function _AppMainAdmedikaDirective_() {
  'use strict';

  /**
   * @ngdoc directive
   * @name app.main.admedika.toolbar.directive:admedikaToolbar
   * @restrict E
   *
   * @description
   * AdMedika toolbar (header/footer).
   *
   * @example
     <example module="app">
       <file name="index.html">
         <admedika-toolbar type="header"></admedika-toolbar>
       </file>
     </example>
   */
  function admedikaToolbar() {
    return {
      restict: 'E',
      replace: true,
      templateUrl: function o(elem, attr) {
        return 'app/main/admedika/member/templates/' + attr.type + '.html';
      }
    };
  }

  angular
    .module('app.main.admedika')
      .directive('admedikaToolbar', admedikaToolbar);
}());
