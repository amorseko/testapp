(function _AppProvidersStringFilter_() {
  'use strict';

  /**
   * @ngdoc filter
   * @name app.providers.string.filter:titleize
   *
   * @description
   * Converts first letter of the string to uppercase.
   */
  function titleize() {
    return function set(text) {
      return text && text.toLowerCase().replace(/\s\s+/g, ' ').replace(/(?:^|\s|-)\S/g, function each(word) {
        return word.toUpperCase();
      });
    };
  }

  angular.module('app.providers.string').filter('titleize', titleize);
}());
