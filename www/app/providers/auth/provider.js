(function _AppProviderAuthProvider_() {
  'use strict';

  /** @this */
  function auth() {
    var config = { key: 'token' };

    /**
     * @ngdoc property
     * @name app.providers.auth.service#set
     * @propertyOf app.providers.auth.service:auth
     *
     * @description
     * Object containing default values for auth configurations.
     * The object has following properties:
     *  - **key** - `{string}` - Key for saving token on local storage. Default value is `token`.
     *
     * @example
       <example module="app">
         <file name="index.html"></file>
         <file name="script.js">
           angular.module('app', ['app.providers.auth'])
            .config(function (authProvider) {
              authProvider.set({
                key: 'nekot'
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
     * @name app.providers.auth.service:auth
     *
     * @requires $window
     * @requires jwtHelper
     *
     * @description
     * Authentication service.
     */
    this.$get = function get($rootScope, $window, jwtHelper, EVENT) {
      var isAuthenticated = getSession();

      /**
       * @ngdoc method
       * @name app.providers.auth.service#logout
       * @methodOf app.providers.auth.service:auth
       *
       * @description
       * Unauthenticated user with remove token on local storage.
       */
      function logout() {
        $window.localStorage.removeItem(config.key);
        $rootScope.$emit(EVENT.LOGOUT.SUCCESS);
      }

      /**
       * @ngdoc method
       * @name app.providers.auth.service#getSession
       * @methodOf app.providers.auth.service:auth
       *
       * @description
       * Get current session.
       *
       * @returns {Object} Object describing the session.
       */
      function getSession() {
        var payload;
        try {
          payload = jwtHelper.decodeToken(getToken());
        } catch (e) {
          //
        }
        return payload;
      }

      /**
       * @ngdoc method
       * @name app.providers.auth.service#getToken
       * @methodOf app.providers.auth.service:auth
       *
       * @description
       * Get token on local storage.
       *
       * @returns {string} Token containing session information.
       */
      function getToken() {
        return $window.localStorage.getItem(config.key);
      }

      /**
       * @ngdoc method
       * @name app.providers.auth.service#setToken
       * @methodOf app.providers.auth.service:auth
       *
       * @description
       * Save token on local storage.
       *
       * @param {string} token Token to be saved.
       */
      function setToken(token) {
        return $window.localStorage.setItem(config.key, token);
      }

      return {
        isAuthenticated: isAuthenticated,
        logout: logout,
        getSession: getSession,
        getToken: getToken,
        setToken: setToken
      };
    };
  }

  angular.module('app.providers.auth').provider('auth', auth);
}());
