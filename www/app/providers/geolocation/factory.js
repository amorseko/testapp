(function _AppProvidersGeolocationFactory_() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.providers.geolocation.factory:geolocation
   *
   * @requires $cordovaGeolocation
   * @requires $http
   * @requires $q
   * @requires app.providers.graphql
   *
   * @description
   * Geolocation factory.
   */
  function geolocation($cordovaGeolocation, $http, $q, graphql) {
    var query = [
      'query GoogleConfig {',
      '  config {',
      '    google {',
      '      geolocation {',
      '        apiKey',
      '        endpoint',
      '      }',
      '    }',
      '  }',
      '}'
    ].join('');

    /**
     * @ngdoc method
     * @name app.providers.geolocation.factory#getPosition
     * @methodOf app.providers.geolocation.factory:geolocation
     *
     * @description
     * Get current location.
     *
     * @returns {Object} Object containing coordinates location.
     */
    function getPosition() {
      return $q(function q($resolve, $reject) {
        $cordovaGeolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 20000
        })
        .then(function resolve(res) {
          $resolve(res);
        })
        .catch(function reject(err) {
          switch (err && err.code) {
            case err.TIMEOUT:
              $reject('Timeout');
              break;
            case err.PERMISSION_DENIED:
              if (/only secure origins are allowed/gi.test(err.message)) {
                graphql(query)
                  .then(function resolve(res) {
                    var result = angular.copy(res);
                    return result && result.config && result.config.google;
                  })
                  .then(function resolve(res) {
                    return res && res.geolocation;
                  })
                  .then(function resolve(res) {
                    if (!(res)) throw new Error();
                    return $http.post(res.endpoint + res.apiKey);
                  })
                  .then(function resolve(res) {
                    return res.data && res.data.location;
                  })
                  .then(function resolve(res) {
                    if (!(res)) throw new Error();
                    $resolve({ coords: { latitude: res.lat, longitude: res.lng } });
                  })
                  .catch(function error() {
                    $reject('Cannot get location');
                  });
              } else $reject(err.message);
              break;
            case err.POSITION_UNAVAILABLE:
              $reject('Location unavailable');
              break;
            default:
              $reject(err);
          }
        });
      });
    }

    return {
      getPosition: getPosition
    };
  }

  angular.module('app.providers.geolocation').factory('geolocation', geolocation);
}());
