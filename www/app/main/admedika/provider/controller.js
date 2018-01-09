(function _AppMainAdmedikaProviderController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.main.admedika.provider.controller:MainAdmedikaProviderController
   *
   * @requires $ionicPopup
   * @requires $q
   * @requires $scope
   * @requires $timeout
   * @requires $window
   * @requires app.providers.geolocation.factory:geolocation
   * @requires app.providers.graphql.service:graphql
   * @requires app.providers.toast.factory:toast
   *
   * @description
   * AdMedika provider controller.
   */
  function MainAdmedikaProviderController(
    $ionicPopup, $q, $scope, $timeout, $window,
    geolocation, graphql, provider, toast
  ) {
    var vm = this;
    var param = {};
    var maps = {};

    vm.alertLoading = alertLoading;
    vm.getProviders = getProviders;
    vm.groupProviders = [];
    vm.hasProviders = false;
    vm.hasData = false;
    vm.nearMe = nearMe;
    vm.isLoading = false;
    vm.profile = {};
    vm.reset = reset;
    vm.search = search;
    vm.submit = submit;
    vm.sort = sort;
    vm.show = show;

    param.sort = 'providerName';
    param.skip = 0;
    param.limit = 10;
    param.data = [];
    param.providerCity = '';
    param.planId = '*';
    param.match = '';
    param.nearMe = '';

    getMapKey();
    getCityAndPlans();

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#getCityAndPlans
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Get cities and plans of the member.
     */
    function getCityAndPlans() {
      provider.getCityAndPlans().then(function resolve(res) {
        if (!(res && res.profile) && !(provider.hasCityPlans)) {
          $timeout(getCityAndPlans, 2345);
        } else {
          angular.copy(res.profile, vm.profile);
        }
      });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#alertLoading
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Invoke alert on user actions (filter, sort, etc...) when the page still loading.
     */
    function alertLoading() {
      $ionicPopup.alert({
        templateUrl: 'app/main/admedika/provider/modal/loading.html',
        cssClass: 'mp-popup-style',
        okText: 'Tutup'
      });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#alertGpsError
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Invoke alert when gps or location of user not found.
     */
    function alertGpsError() {
      $ionicPopup.alert({
        templateUrl: 'app/main/admedika/provider/modal/gps-error.html',
        cssClass: 'mp-popup-style',
        okText: 'Tutup'
      });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#alertSearchError
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Invoke alert when filtering data is not found.
     */
    function alertSearchError() {
      $ionicPopup.alert({
        templateUrl: 'app/main/admedika/provider/modal/search-error.html',
        cssClass: 'mp-popup-style',
        okText: 'Tutup'
      });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#call
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Invoke phone dialer with filled phone number.
     *
     * @param {string} number Phone number to be dialed.
     */
    function call(number) {
      var location = $window.location;

      location.href = 'tel:'.concat(number);
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#getMapKey
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Get google maps api key.
     */
    function getMapKey() {
      var query = [
        'query GoogleConfig {',
        '  config {',
        '    google {',
        '      geolocation {',
        '        apiKey',
        '      }',
        '    }',
        '  }',
        '}'
      ].join('');

      graphql(query)
        .then(function success(res) {
          angular.copy(res.config.google.geolocation, maps);
        })
        .catch(function reject() {
          getMapKey();
        });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#getProviders
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Get providers of the member.
     */
    function getProviders() {
      $q.resolve(true)
        .then(function resolve() {
          vm.isLoading = true;
          return provider.getData(_.omit(param, 'data'));
        })
        .then(function resolve(res) {
          return res && res.length ? res : [];
        })
        .then(function resolve(res) {
          if (!(res.length) && !(provider.hasData) && !(param.match)) {
            return;
          }

          param.data = param.data.concat(_.filter(res, 'providerName'));
          param.skip += param.limit;

          vm.hasProviders = param.limit > res.length;
          vm.groupProviders = groupByAlpha(param.data);
          vm.isLoading = false;
          vm.hasData = true;

          if (param.match && !(param.data.length && res.length)) alertSearchError();
        })
        .finally(function done() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#getProviderName
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Get first name of the provider.
     *
     * @param {string} value Name of the provider.
     *
     * @returns {string} first name.
     */
    function getProviderName(value) {
      var name = value && value.replace(/\s\s+/g, ' ').split(' ');

      if (param.nearMe) {
        if (_.first(param.sort) === '-') return 'Furthest...';
        return 'Nearest...';
      }

      if (name && name.length > 1) {
        if (_.contains(['&', '-'], name[1]) && name[2] && name[3]) return name[3].toLowerCase();
        return name[1].toLowerCase();
      }

      return value && value.toLowerCase();
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#groupByAlpha
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Group providers data by first characters name.
     *
     * @param {Array} data Providers data.
     *
     * @returns {Array} grouped providers.
     */
    function groupByAlpha(data) {
      return _.groupBy(data, function each(val) {
        var name = getProviderName(val.providerName.replace(/[^a-z& ]/gi, '').trim());

        if (param.nearMe) return name;
        return name && _.first(name.toUpperCase());
      });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#nearMe
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Get near providers of the member based on current location.
     */
    function nearMe() {
      $q.resolve(true)
        .then(function resolve() {
          toast.longBottom('Getting location...');
          return geolocation.getPosition();
        })
        .then(function resolve(res) {
          param.nearMe = [res.coords.latitude, res.coords.longitude].join(',');
          param.data = [];
          param.skip = 0;

          vm.groupProviders = [];
          vm.hasProviders = false;
          vm.latlong = param.nearMe;

          $scope.$broadcast('scroll.infiniteScrollComplete');
        })
        .catch(function reject(err) {
          if (/timeout/i.test(err)) alertGpsError();
          else toast.shortBottom(err);
        });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#reset
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Reset filtering providers data.
     *
     * @param {Object} variables Object describing the filtering data.
     */
    function reset(filter) {
      if (filter.providerCity === '' && filter.planId === '*' && !(filter.match) && !(param.nearMe)) return;

      param.skip = 0;
      param.providerCity = '';
      param.planId = '*';
      param.data = [];
      param.match = '';
      param.nearMe = '';

      vm.groupProviders = [];
      vm.hasProviders = false;

      angular.copy({ providerCity: '', planId: '*', match: '' }, filter);

      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#search
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Search providers of the member by name.
     *
     * @param {string} match Name of the provider.
     */
    function search(match) {
      param.data = [];
      param.skip = 0;
      param.match = match;

      vm.groupProviders = [];
      vm.hasProviders = false;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#submit
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Get providers of the member with filtering.
     *
     * @param {Object} data Object describing the filtering data.
     *  The object has following properties:
     *  - **providerCity** - `{string}` - City of the provider.
     *  - **planId** - `{string}` - ID of the plan.
     *  - **match** - `{string}` - Keyword of the provider.
     */
    function submit(data) {
      if (data.providerCity === '' && data.planId === '*' && !(data.match)) return;

      param.data = [];
      param.skip = 0;

      vm.groupProviders = [];
      vm.hasProviders = false;

      angular.merge(param, data);

      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#sort
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Get providers of the member with sorting by name.
     */
    function sort() {
      param.sort = _.first(param.sort) === '-' ? 'providerName' : '-providerName';
      param.skip = 0;
      param.data = [];

      vm.groupProviders = [];
      vm.hasProviders = false;

      $scope.$broadcast('scroll.infiniteScrollComplete');
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#show
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Display details of provider based on selected item.
     *
     * @param {Object} item Object describing the provider details.
     */
    function show(item) {
      var scope = $scope;

      scope.data = item;
      scope.data.call = call;
      scope.data.openMaps = openMaps;
      scope.data.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js';

      if (maps && maps.apiKey) {
        scope.data.googleMapsUrl = scope.data.googleMapsUrl.concat('?key=' + maps.apiKey);
      }

      $ionicPopup.alert({
        scope: scope,
        templateUrl: 'app/main/admedika/provider/modal/show.html',
        cssClass: 'popup-primary provider-popup',
        okText: 'Tutup',
        okType: 'button-positive'
      });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.provider.controller#openMaps
     * @methodOf app.main.admedika.provider.controller:MainAdmedikaProviderController
     *
     * @description
     * Invoke maps apps with pin based on selected location.
     *
     * @param {string} lat Latitute of the location.
     * @param {string} lng longitude of the location.
     */
    function openMaps(lat, lng) {
      var position = [lat, lng].join(',');
      var location = $window.location;
      var Platform = $window.ionic && $window.ionic.Platform;
      var href = 'http://maps.google.com/maps?&z=15&q=' + lat + '+' + lng;

      if (Platform.isAndroid()) {
        href = 'geo://?q='.concat(position);
      } else if (Platform.isIOS() || Platform.isIPad()) {
        href = 'maps://maps.apple.com/?q='.concat(position);
      }

      location.href = href;
    }
  }

  angular.module('app.main.admedika.provider').controller('MainAdmedikaProviderController', MainAdmedikaProviderController);
}());
