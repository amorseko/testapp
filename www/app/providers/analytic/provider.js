(function _AppProvidersanalyticProvider_() {
  'use strict';

  /** @this */
  function analytic() {
    var config = { enable: false };

    /**
     * @ngdoc property
     * @name app.providers.analytic.service#set
     * @propertyOf app.providers.analytic.service:analytic
     *
     * @description
     * Object containing default values for analytic configurations.
     * The object has following properties:
     *  - **enable** - `{Boolean}` - Enable analytic. Default value is `false`.
     *
     * @example
       <example module="app">
         <file name="index.html"></file>
         <file name="script.js">
           angular.module('app', ['app.providers.analytic'])
            .config(function (analyticProvider) {
              analyticProvider.set({
                enable: true
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
     * @name app.providers.analytic.service:analytic
     *
     * @requires $window
     * @requires app.providers.graphql
     *
     * @description
     * AdMedika analytics consist of inquiry analytic, register analytic and session analytic.
     */
    this.$get = function get($window, graphql) {
      /**
       * @ngdoc method
       * @name app.providers.analytic.service#addInquiry
       * @methodOf app.providers.analytic.service:analytic
       *
       * @description
       * Add inquiry analytic.
       */
      function addInquiry() {
        var query = [
          'mutation AddInquiryAnalytic {',
          '  addInquiryAnalytic',
          '}'
        ].join('');

        return request(query);
      }

      /**
       * @ngdoc method
       * @name app.providers.analytic.service#addRegister
       * @methodOf app.providers.analytic.service:analytic
       *
       * @description
       * Add register analytic.
       *
       * @param {Object} variables Object describing the user credentials.
       *  The object has following properties:
       *  - **email** - `{string}` - Email of the user.
       */
      function addRegister(variables) {
        var query = [
          'mutation AddRegisterAnalytic($email: String!) {',
          '  addRegisterAnalytic(email: $email)',
          '}'
        ].join('');

        return request(query, variables);
      }

      /**
       * @ngdoc method
       * @name app.providers.analytic.service#addSession
       * @methodOf app.providers.analytic.service:analytic
       *
       * @description
       * Add session analytic.
       */
      function addSession() {
        var query = [
          'mutation AddSessionAnalytic {',
          '  addSessionAnalytic',
          '}'
        ].join('');

        return request(query);
      }

      /**
       * @ngdoc function
       * @name app.providers.analytic.service#request
       * @methodOf app.providers.analytic.service:analytic
       *
       * @description
       * Shortcut method for send analytics to server.
       * This method only work on real devices.
       *
       * @param {string} query GraphQL query.
       * @param {Object=} variables Object describing query parameters.
       */
      function request(query, variables) {
        if (!(config.enable)) return;

        $window.document.addEventListener('deviceready', function ready() {
          graphql(query, variables).then(function resolve() {
            //
          }).catch(function reject() {
            //
          });
        }, false);
      }

      return {
        addInquiry: addInquiry,
        addRegister: addRegister,
        addSession: addSession
      };
    };
  }

  angular.module('app.providers.analytic').provider('analytic', analytic);
}());
