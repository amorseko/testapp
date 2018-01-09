(function _AppMainProfileMineController_() {
  'use strict';

   /**
    * @ngdoc controller
    * @name app.main.profile.mine.controller:MainProfileMineController
    *
    * @requires $rootScope
    * @requires $scope
    * @requires app.providers.graphql.service:graphql
    * @requires EVENT
    *
    * @description
    * My profile controller.
    */
  function MainProfileMineController($rootScope, $scope, graphql, EVENT) {
    var $this = $rootScope;
    var vm = this;

    vm.getProfile = getProfile;
    vm.hasProfile = false;
    vm.parseBirthday = parseBirthday;
    vm.profile = {};

    $this.$on(EVENT.PHOTO.CHANGED, function changed(event, args) {
      $scope.$evalAsync(function sync() {
        angular.merge(vm.profile, { photo: args });
      });
    });

    /**
     * @ngdoc function
     * @name app.main.profile.mine.controller#getProfile
     * @methodOf app.main.profile.mine.controller:MainProfileMineController
     *
     * @description
     * Get profile of the user.
     */
    function getProfile() {
      var query = [
        'query Profile {',
        '  profile {',
        '    _id',
        '    birthday',
        '    name',
        '    email',
        '    phone',
        '    id',
        '    photo',
        '    admedika {',
        '      cardNumber',
        '      member {',
        '        bpjsId',
        '      }',
        '    }',
        '  }',
        '}'
      ].join('');

      graphql(query)
        .then(function resolve(res) {
          angular.copy(res.profile, vm.profile);
        })
        .finally(function end() {
          vm.hasProfile = true;
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    /**
     * @ngdoc function
     * @name app.main.profile.mine.controller#parseBirthdate
     * @methodOf app.main.profile.mine.controller:MainProfileMineController
     *
     * @description
     * Parse birthdate.
     *
     * @param {string} date Date of birth.
     *
     * @returns {string} formatted birthdate.
     */
    function parseBirthday(date) {
      if (date && moment(date).isValid()) {
        return moment(date).format('DD MMM YYYY');
      }
      return date;
    }
  }

  angular.module('app.main.profile').controller('MainProfileMineController', MainProfileMineController);
}());
