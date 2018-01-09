(function _AppMainAdmedikaConnectController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.main.admedika.connect.controller:MainAdmedikaConnectController
   *
   * @requires $ionicHistory
   * @requires $ionicPopup
   * @requires $scope
   * @requires app.providers.graphql.service:graphql
   *
   * @description
   * AdMedika connect controller.
   */
  function MainAdmedikaConnectController($ionicHistory, $ionicPopup, $scope, graphql) {
    var vm = this;
    var scope = $scope;

    vm.submit = submit;

    /**
     * @ngdoc function
     * @name app.main.admedika.connect.controller#submit
     * @methodOf app.main.admedika.connect.controller:MainAdmedikaConnectController
     *
     * @description
     * Processing connect admedika card number.
     *  If success, a success popup will be shown.
     *  Otherwise, an error popup will be shown.
     *
     * @param {Object} variables Object describing the member credentials.
     *  The object has following properties:
     *  - **cardNumber** - `{string}` - AdMedika card number of the member.
     */
    function submit(variables) {
      var query = [
        'mutation ConnectAdmedika($cardNumber: String!) {',
        '  connectAdmedika(cardNumber: $cardNumber)',
        '}'
      ].join('');

      graphql(query, variables)
        .then(function resolve(res) {
          var result = angular.copy(res);
          return result && result.connectAdmedika;
        })
        .then(function resolve(res) {
          if (!(res)) throw new Error();
          return $ionicPopup.alert({
            templateUrl: 'app/main/admedika/connect/modal/success.html',
            cssClass: 'mp-popup-style',
            okText: 'Tutup',
            okType: 'button-default'
          });
        })
        .then(function resolve() {
          $ionicHistory.goBack();
        })
        .catch(function reject(err) {
          scope.data = {};
          scope.data.message = err.toString().replace('Error:', '');
          $ionicPopup.alert({
            scope: scope,
            templateUrl: 'app/auth/register/modal/register-error.html',
            cssClass: 'mp-popup-style',
            okText: 'OK',
            okType: 'button-default'
          });
        });
    }
  }

  angular.module('app.main.admedika.connect').controller('MainAdmedikaConnectController', MainAdmedikaConnectController);
}());
