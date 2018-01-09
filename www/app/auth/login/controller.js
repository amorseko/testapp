(function _AppAuthLoginController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.auth.login.controller:AuthLoginController
   *
   * @requires $ionicHistory
   * @requires $ionicPopup
   * @requires $log
   * @requires $rootScope
   * @requires $scope
   * @requires $state
   * @requires $timeout
   * @requires $window
   * @requires EVENT
   * @requires app.providers.auth.service:auth
   * @requires app.providers.graphql.service:graphql
   *
   * @description
   * Login controller.
   */
  function AuthLoginController(
    $ionicHistory, $ionicPopup, $log, $rootScope, $scope, $state, $timeout, $window,
    EVENT, auth, graphql
  ) {
    var vm = this;
    var widthPage = $window.innerWidth;
    var heightPage = $window.innerHeight;

    vm.widthPage = widthPage;
    vm.heightPage = heightPage;
    vm.isLoading = false;
    vm.submit = submit;

    $timeout(calcHeight, 1000);

    function calcHeight() {
      var element2 = angular.element($window.document.querySelector('#formLogin'));
      var heightImage = $window.innerHeight - element2[0].clientHeight;

      vm.heightImage = heightImage + 'px';
    }

    /**
     * @ngdoc function
     * @name app.auth.login.controller#submit
     * @methodOf app.auth.login.controller:AuthLoginController
     *
     * @description
     * Processing login authentication.
     *  If success, user will be redirected to home page.
     *  Otherwise, an error popup will be shown.
     *
     * @param {Object} variables Object describing the user credentials.
     *  The object has following properties:
     *  - **username** - `{string}` - Username or email of the user.
     *  - **password** - `{string}` - Password of the user.
     */
    function submit(variables) {
      var query = [
        'mutation Login($username: String!, $password: String!) {',
        '  login(username: $username, password: $password) {',
        '    token',
        '  }',
        '}'
      ].join('');

      vm.isLoading = true;

      if (!(variables && variables.username && variables.password)) {
        $ionicPopup.alert({
          templateUrl: 'app/auth/login/modal/no-credential.html',
          cssClass: 'mp-popup-style',
          okText: 'Tutup'
        });

        vm.isLoading = false;

        return;
      }

      graphql(query, variables)
        .then(function resolve(res) {
          var result = angular.copy(res);
          return result && result.login && result.login.token;
        })
        .then(function resolve(res) {
          if (!(res)) throw new Error('No token available');
          return auth.setToken(res);
        })
        .then(function resolve() {
          return $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true,
            historyRoot: true
          });
        })
        .then(function resolve() {
          $rootScope.$emit(EVENT.LOGIN.SUCCESS);
          $state.go('app.main.home');
        })
        .catch(function reject(err) {
          var scope = $scope;

          scope.data = err;

          $log.debug(err);
          $ionicPopup.alert({
            scope: scope,
            templateUrl: 'app/auth/login/modal/login-error.html',
            cssClass: 'mp-popup-style',
            okText: 'Tutup'
          });
        })
        .finally(function end() {
          vm.isLoading = false;
        });
    }
  }

  angular.module('app.auth.login').controller('AuthLoginController', AuthLoginController);
}());
