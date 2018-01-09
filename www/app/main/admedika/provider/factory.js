(function _AppMainAdmedikaProviderFactory_() {
  'use strict';

  /**
   * @ngdoc service
   * @name app.main.admedika.providers.factory:provider
   *
   * @requires $q
   * @requires $window
   * @requires app.providers.graphql
   *
   * @description
   * Provider factory.
   */
  function provider($q, $window, graphql) {
    var hasCityPlans = false;
    var hasData = false;
    var keys = {
      cityPlans: 'cityPlans',
      providers: 'providers'
    };
    var variables = {
      sort: 'providerName',
      providerCity: '',
      planId: '*',
      match: '',
      nearMe: '',
      skip: 0,
      limit: 10
    };

    /**
     * @ngdoc method
     * @name app.main.admedika.providers.factory#initCityAndPlans
     * @methodOf app.main.admedika.providers.factory:provider
     *
     * @description
     * Init cities and plans of the member, save to localStorage.
     */
    function initCityAndPlans() {
      var query = [
        'query Cities($sortCity: String, $sortPlan: String) {',
        '  profile {',
        '    admedika {',
        '      cities(sort: $sortCity) {',
        '        name',
        '      }',
        '      plans(sort: $sortPlan) {',
        '        planId',
        '        planType',
        '      }',
        '    }',
        '  }',
        '}'
      ].join('');

      graphql(query, { sortCity: 'name', sortPlan: 'planType' })
        .then(function resolve(res) {
          return $q.when(setData(angular.copy(res), keys.cityPlans));
        })
        .catch(function reject() {
          return initCityAndPlans();
        });
    }

    /**
     * @ngdoc method
     * @name app.main.admedika.providers.factory#getCityAndPlans
     * @methodOf app.main.admedika.providers.factory:provider
     *
     * @description
     * Get cities and plans of the member from localStorage.
     */
    function getCityAndPlans() {
      return $q.when($window.localStorage.getItem(keys.cityPlans))
        .then(function resolve(res) {
          return angular.fromJson(res) || {};
        })
        .then(function resolve(res) {
          hasCityPlans = true;
          return $q.resolve(res);
        });
    }

    /**
     * @ngdoc method
     * @name app.main.admedika.providers.factory#initData
     * @methodOf app.main.admedika.providers.factory:provider
     *
     * @description
     * Init providers of the member, save to localStorage.
     */
    function initData() {
      var query = [
        'query Provider($planId: String, $providerCity: String, $match: String, $nearMe: String, $sort: String, $skip: Int, $limit: Int) {',
        '  profile {',
        '    admedika {',
        '      providers(planId: $planId, providerCity: $providerCity, match: $match, nearMe: $nearMe, sort: $sort, skip: $skip, limit: $limit) {',
        '        providerId',
        '        providerName',
        '        providerCity',
        '        providerAddress',
        '        providerPhoneNum',
        '        longitude',
        '        latitude',
        '        distance {',
        '          text',
        '          value',
        '        }',
        '        plans {',
        '          planId',
        '          planType',
        '        }',
        '      }',
        '    }',
        '  }',
        '}'
      ].join('');

      graphql(query, _.omit(variables, ['sort', 'skip', 'limit']))
        .then(function resolve(res) {
          var data = angular.copy(res);
          return data && data.profile && data.profile.admedika && data.profile.admedika.providers;
        })
        .then(function resolve(res) {
          hasData = true;
          return $q.when(setData(angular.copy(res), keys.providers));
        })
        .catch(function reject() {
          return initData();
        });
    }

    /**
     * @ngdoc method
     * @name app.main.admedika.providers.factory#getData
     * @methodOf app.main.admedika.providers.factory:provider
     *
     * @description
     * Get providers of the member from localStorage.
     *
     * @param {Object} params Object describing parameters.
     *
     * @returns {HttpPromise} {@link https://docs.angularjs.org/api/ng/service/$q `Promise`} that will be resolved to a response object
     *                        when the request succeeds or fails.
     */
    function getData(params) {
      return $q.when($window.localStorage.getItem(keys.providers))
        .then(function resolve(res) {
          angular.merge(variables, params);
          return angular.fromJson(res) || [];
        })
        .then(function resolve(res) {
          return _.reject(res, function c(o) {
            return o.providerName === '-' || /error/gi.test(o.providerName);
          });
        })
        .then(function resolve(res) {
          var desc = _.first(variables.sort) === '-';
          var sort = desc ? variables.sort.slice(1) : variables.sort.slice(0);
          var data = _.sortBy(angular.copy(res), function c(o) {
            return parseSortProvider(o[sort].replace(/[^a-z& ]/gi, '').trim());
          });
          if (desc) return data.reverse();
          return data;
        })
        .then(function resolve(res) {
          if (variables.providerCity && !(variables.providerCity === '')) {
            return _.filter(res, function c(o) {
              return (new RegExp('^' + variables.providerCity + '$', 'gi')).test(o.providerCity);
            });
          }
          return $q.resolve(res);
        })
        .then(function resolve(res) {
          var pattern;
          if (variables.match) {
            pattern = new RegExp(variables.match, 'gi');
            return _.filter(res, function c(o) {
              return pattern.test(o.providerId) || pattern.test(o.providerName) ||
                pattern.test(o.providerPhoneNum);
            });
          }
          return $q.resolve(res);
        })
        .then(function resolve(res) {
          if (variables.planId && !(variables.planId === '*')) {
            return _.filter(res, function c(o) {
              return o.plans.length && _.findWhere(o.plans, { planId: variables.planId });
            });
          }
          return $q.resolve(res);
        })
        .then(function resolve(res) {
          var position;
          var collections;
          var geolib = window.geolib; // eslint-disable-line
          if (variables.nearMe) {
            position = variables.nearMe.split(',');
            collections = _.filter(res, function c(o) {
              return o.latitude && o.longitude &&
                !(Number.parseFloat(o.latitude) === 0 && Number.parseFloat(o.longitude) === 0);
            });

            angular.forEach(collections, function c(o, e) {
              angular.merge(collections[e], { distance: {} });
              angular.merge(collections[e].distance, {
                value: geolib.convertUnit('km', geolib.getDistance({
                  latitude: position[0], longitude: position[1]
                }, {
                  latitude: o.latitude, longitude: o.longitude
                }), 2)
              });
            });

            collections = _.filter(collections, function c(o) {
              return o.distance && o.distance.value;
            });

            collections = _.sortBy(collections, function c(o) {
              return Number.parseFloat(o.distance.value);
            });

            if (_.first(variables.sort) === '-') return collections.reverse();
            return collections;
          }
          return $q.resolve(res);
        })
        .then(function resolve(res) {
          return $q.resolve(res.splice(variables.skip, variables.limit));
        })
        .catch(function reject(err) {
          return $q.reject(err);
        });
    }

    /**
     * @ngdoc method
     * @name app.main.admedika.providers.factory#setData
     * @methodOf app.main.admedika.providers.factory:provider
     *
     * @description
     * Save data to localStorage based on selected key.
     *
     * @param {Object} params Object describing data.
     * @param {string} key Key identifying data.
     *
     * @returns {HttpPromise} {@link https://docs.angularjs.org/api/ng/service/$q `Promise`} that will be resolved to a response object
     *                        when the request succeeds or fails.
     */
    function setData(data, key) {
      return $q.when($window.localStorage.setItem(key, angular.toJson(data)));
    }

    /**
     * @ngdoc method
     * @name app.main.admedika.providers.factory#clearData
     * @methodOf app.main.admedika.providers.factory:provider
     *
     * @description
     * Clear data from localStorage based on selected key.
     *
     * @param {string} key Key identifying data.
     *
     * @returns {HttpPromise} {@link https://docs.angularjs.org/api/ng/service/$q `Promise`} that will be resolved to a response object
     *                        when the request succeeds or fails.
     */
    function clearData(key) {
      return $q.when($window.localStorage.removeItem(key));
    }

    /**
     * @ngdoc method
     * @name app.main.admedika.providers.factory#parseSortProvider
     * @methodOf app.main.admedika.providers.factory:provider
     *
     * @description
     * Parse sort of providers, get name of provider that will be used to sort.
     *
     * @param {string} value Name of the provider.
     *
     * @returns {string} value of sort.
     */
    function parseSortProvider(value) {
      var name = value && value.replace(/\s\s+/g, ' ').split(' ');

      if (name && name.length > 1) {
        if ((name[1] === '&' || name[1] === '-') && name[2] && name[3]) return name[3].toLowerCase();
        return name[1].toLowerCase();
      }

      return value && value.toLowerCase();
    }

    return {
      keys: keys,
      hasCityPlans: hasCityPlans,
      hasData: hasData,
      initCityAndPlans: initCityAndPlans,
      initData: initData,
      getCityAndPlans: getCityAndPlans,
      getData: getData,
      clearData: clearData
    };
  }

  angular
    .module('app.main.admedika.provider')
      .factory('provider', provider);
}());
