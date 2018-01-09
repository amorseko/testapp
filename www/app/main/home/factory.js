(function _AppMainHomeFactory_() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.main.home.factory:member
   *
   * @requires $q
   * @requires $window
   * @requires app.providers.graphql
   *
   * @description
   * Home member factory.
   */
  function member($q, $window, graphql) {
    var hasData = false;
    var key = 'member';

    /**
     * @ngdoc method
     * @name app.main.home.factory#initData
     * @methodOf app.main.home.factory:member
     *
     * @description
     * Init data of the member, save to localStorage.
     */
    function initData() {
      var query = [
        'query Profile {',
        '  profile {',
        '    admedika {',
        '      cardNumber',
        '    }',
        '  }',
        '}'
      ].join('');

      graphql(query)
        .then(function resolve(res) {
          return $q.when(setData(angular.copy(res), key));
        })
        .catch(function reject() {
          return initData();
        });
    }

    /**
     * @ngdoc method
     * @name app.main.home.factory#getData
     * @methodOf app.main.home.factory:member
     *
     * @description
     * Get data of the member from localStorage.
     *
     * @returns {HttpPromise} {@link https://docs.angularjs.org/api/ng/service/$q `Promise`} that will be resolved to a response object
     *                        when the request succeeds or fails.
     */
    function getData() {
      return $q.when($window.localStorage.getItem(key))
        .then(function resolve(res) {
          return angular.fromJson(res) || {};
        })
        .then(function resolve(res) {
          return $q.resolve(res);
        })
        .catch(function reject(err) {
          return $q.reject(err);
        });
    }

    /**
     * @ngdoc method
     * @name app.main.main.home.factory#setData
     * @methodOf app.main.home.factory:member
     *
     * @description
     * Save data to localStorage based on selected key.
     *
     * @param {Object} params Object describing data.
     *
     * @returns {HttpPromise} {@link https://docs.angularjs.org/api/ng/service/$q `Promise`} that will be resolved to a response object
     *                        when the request succeeds or fails.
     */
    function setData(data) {
      hasData = true;
      return $q.when($window.localStorage.setItem(key, angular.toJson(data)));
    }

    /**
     * @ngdoc method
     * @name app.main.home.factory#clearData
     * @methodOf app.main.home.factory:member
     *
     * @description
     * Clear data from localStorage based on selected key.
     *
     * @returns {HttpPromise} {@link https://docs.angularjs.org/api/ng/service/$q `Promise`} that will be resolved to a response object
     *                        when the request succeeds or fails.
     */
    function clearData() {
      return $q.when($window.localStorage.removeItem(key));
    }

    return {
      key: key,
      getData: getData,
      setData: setData,
      hasData: hasData,
      initData: initData,
      clearData: clearData
    };
  }

  angular
    .module('app.main.home')
      .factory('member', member);
}());
