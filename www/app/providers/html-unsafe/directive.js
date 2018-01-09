(function _AppProvidersHtmlUnsafeDirective_() {
  'use strict';

  /**
   * @ngdoc directive
   * @name app.providers.html-unsafe.directive:ngBindHtmlUnsafe
   *
   * @description
   * Bind html content.
   *
   * @example
     <example module="app">
       <file name="index.html">
         <div ng-bind-html-unsafe="scope.content"></div>
       </file>
     </example>
   */
  function ngBindHtmlUnsafe($sce) {
    return {
      scope: {
        ngBindHtmlUnsafe: '='
      },
      template: "<div ng-bind-html='trustedHtml'></div>",
      link: function link($scope) {
        var scope = $scope;

        scope.updateView = function updateView() {
          scope.trustedHtml = $sce.trustAsHtml(scope.ngBindHtmlUnsafe);
        };

        scope.$watch('ngBindHtmlUnsafe', function watch(newVal) {
          scope.updateView(newVal);
        });
      }
    };
  }

  angular.module('app.providers.html-unsafe')
    .directive('ngBindHtmlUnsafe', ngBindHtmlUnsafe);
}());
