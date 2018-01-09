(function _AppProvidersPhoneCallDirective_() {
  'use strict';

  /**
   * @ngdoc directive
   * @name app.providers.phone-call.directive:phone-call
   * @restrict A
   *
   * @description
   * Call phone number.
   */
  function phoneCall($window, graphql, toast) {
    var apps = {};
    var query = [
      'query AppsConfig {',
      '  config {',
      '    apps {',
      '      support',
      '    }',
      '  }',
      '}'
    ].join('');

    graphql(query)
      .then(function resolve(res) {
        var result = angular.copy(res);
        return result && result.config && result.config.apps;
      })
      .then(function resolve(res) {
        angular.copy(res, apps);
      })
      .catch(function reject() {
        //
      });

    function link(scope, element, attrs) {
      element.on('click', function click(event) {
        var CallNumber = $window.plugins && $window.plugins.CallNumber;

        event.preventDefault();

        if (CallNumber && CallNumber.callNumber && (attrs.phoneCall || apps.support)) {
          CallNumber.callNumber(_.noop, onError, attrs.phoneCall || apps.support, true);
        } else {
          onError();
        }
      });

      function onError(error) {
        toast.shortBottom(error || 'Tidak bisa melakukan panggilan telepon');
      }
    }

    return {
      restict: 'A',
      link: link
    };
  }

  angular.module('app.providers.phone-call').directive('phoneCall', phoneCall);
}());
