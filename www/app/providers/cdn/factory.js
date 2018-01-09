(function _AppProvidersCdnFactory_() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.providers.cdn.factory:cdn
   *
   * @requires $base64
   * @requires $cordovaFileTransfer
   * @requires app.providers.graphql
   *
   * @description
   * CDN factory.
   */
  function cdn($base64, $cordovaFileTransfer, graphql) {
    var config = {};
    var query = [
      'query CdnConfig {',
      '  config {',
      '    cdn {',
      '      host',
      '      username',
      '      password',
      '    }',
      '  }',
      '}'
    ].join('');

    graphql(query)
      .then(function resolve(res) {
        var result = angular.copy(res);
        return result && result.config && result.config.cdn;
      })
      .then(function resolve(res) {
        angular.merge(config, res);
      })
      .catch(function reject() {
        //
      });

    /**
     * @ngdoc method
     * @name app.providers.cdn.factory#upload
     * @methodOf app.providers.cdn.factory:cdn
     *
     * @description
     * Upload file to cdn server.
     *
     * @param {file} file File to be uploaded.
     */
    function upload(file) {
      var opts = {
        httpMethod: 'POST',
        headers: {
          Authorization: 'Basic ' + $base64.encode(config.username + ':' + config.password)
        }
      };

      return $cordovaFileTransfer.upload([config.host, 'picture'].join('/'), file, opts, true);
    }

    return {
      config: config,
      upload: upload
    };
  }

  angular.module('app.providers.cdn').factory('cdn', cdn);
}());
