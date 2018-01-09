(function _AppMainDirective_() {
  'use strict';

  /**
   * @ngdoc directive
   * @name app.main.toolbar.directive:toolbar
   * @restrict E
   *
   * @description
   * Toolbar (header/footer).
   *
   * @example
     <example module="app">
       <file name="index.html">
         <toolbar type="footer"></toolbar>
       </file>
     </example>
   */
  function toolbar() {
    return {
      restict: 'E',
      replace: true,
      templateUrl: function o(elem, attr) {
        return 'app/main/home/templates/' + attr.type + '.html';
      }
    };
  }

  angular
    .module('app.main')
      .directive('toolbar', toolbar);
}());
