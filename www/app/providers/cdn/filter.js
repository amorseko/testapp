(function _AppProvidersCdnFilter_() {
  'use strict';

  /**
   * @ngdoc filter
   * @name app.providers.cdn.filter:cdn
   *
   * @requires app.providers.cdn
   *
   * @description
   * Return full url of file.
   *
   * @example
     <example module="app">
       <file name="index.html">
         <img ng-src="{{ scope.profile.photo | cdn }}" />
       </file>
     </example>
   */
  function filter(cdn) {
    return function get(file) {
      var host = cdn.config.host;
      if (!(file)) return undefined;
      return [host, 'picture', file].join('/');
    };
  }

  angular.module('app.providers.cdn').filter('cdn', filter);
}());
