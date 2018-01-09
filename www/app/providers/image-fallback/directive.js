(function _AppProvidersImageFallbackDirective_() {
  'use strict';

  /**
   * @ngdoc directive
   * @name app.providers.image-fallback.directive:imgFallback
   * @restrict A
   *
   * @description
   * Create fallback or default image.
   *
   * @example
     <example module="app">
       <file name="index.html">
         <img ng-src="{{ scope.avatar }}" image-fallback />
       </file>
     </example>
   */
  function imgFallback(imageFallback) {
    function link(scope, element, attrs) {
      var defaultSrc = imageFallback.config.image;
      var fallback = attrs.imgFallback || defaultSrc;

      angular.element(new Image()).attr('src', fallback).on('error', function error() {
        fallback = defaultSrc;
        angular.element(this).remove();
      });

      // if sources are empty set the error source
      if (!(attrs.ngSrc && attrs.src)) {
        onError();
      }

      element.on('error', onError);

      /**
      * Unbind the error event
      * to prevent memory leaks
      */
      scope.$on('destroy', function destroy() {
        element.off('error', onError);
      });

      function onError() {
        if (element.attr('src') !== fallback) attrs.$set('src', fallback);
      }
    }

    return {
      restict: 'A',
      priority: 100,
      link: link
    };
  }

  angular.module('app.providers.image-fallback').directive('imageFallback', imgFallback);
}());
