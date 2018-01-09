(function _AppProviderGraphqlProvider_() {
  'use strict';

  /** @this */
  function graphql() {
    var config = { url: '/graphql' };

    /**
     * @ngdoc property
     * @name app.providers.graphql.service#set
     * @propertyOf app.providers.graphql.service:graphql
     *
     * @description
     * Object containing default values for graphql configurations.
     * The object has following properties:
     *  - **url** - `{string}` - Host for graphql server. Default value is `/graphql`.
     *
     * @example
       <example module="app">
         <file name="index.html"></file>
         <file name="script.js">
           angular.module('app', ['app.providers.graphql'])
            .config(function (graphqlProvider) {
              graphqlProvider.set({
                url: '/api'
              });
            });
         </file>
       </example>
     */
    this.set = function set(userConfig) {
      angular.merge(config, userConfig);
    };

    /**
     * @ngdoc service
     * @name app.providers.graphql.service:graphql
     *
     * @requires $q
     * @requires $http
     * @requires app.providers.auth
     *
     * @description
     * GraphQL service.
     *
     * @param {string} query GraphQL query.
     * @param {Object} variables Object describing graphql parameters.
     *
     * @returns {HttpPromise} {@link https://docs.angularjs.org/api/ng/service/$q `Promise`} that will be resolved to a response object
     *                        when the request succeeds or fails.
     *
     * @example
       <example module="app">
         <file name="index.html"></file>
         <file name="script.js">
           angular.module('app', ['app.providers.graphql'])
             .controller('Activate', function (graphql) {
               var variables = { code: '12345' };
               var query = [
                 'mutation Activate($code: String!) {',
                 '  activate(code: $code) {',
                 '    auth {',
                 '      isActive',
                 '    }',
                 '  }',
                 '}'
               ].join('');

               graphql(query, variables).then(function (result) {
                 // TODO: something with result
               }).catch(function (error) {
                 // TODO: something with error
               });
             });
         </file>
       </example>
     */
    this.$get = function get($q, $http, auth) {
      return function send(query, variables) {
        return $q(function graphqlRequest(resolve, reject) {
          $http({
            method: 'POST',
            url: config.url,
            headers: {
              Authorization: 'JWT ' + auth.getToken()
            },
            data: {
              query: query,
              variables: variables
            }
          }).then(function success(res) {
            if (res.data.errors) throw res;
            resolve(res.data && res.data.data);
          }).catch(function failed(err) {
            reject(err && err.data && err.data.errors && err.data.errors[0].message);
          });
        });
      };
    };
  }

  angular.module('app.providers.graphql').provider('graphql', graphql);
}());
