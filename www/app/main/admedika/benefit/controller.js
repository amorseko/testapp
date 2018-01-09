(function _AppMainAdmedikaBenefitController_() {
  'use strict';

  /**
   * @ngdoc controller
   * @name app.main.admedika.benefit.controller:MainAdmedikaBenefitController
   *
   * @requires $scope
   * @requires app.providers.graphql.service:graphql
   * @requires app.providers.toast.factory:toast
   *
   * @description
   * AdMedika benefit controller.
   */
  function MainAdmedikaBenefitController($scope, graphql, toast) {
    var vm = this;
    var plan = {};

    vm.getPlans = getPlans;
    vm.hasPlans = false;
    vm.isGroupShown = isGroupShown;
    vm.parseDate = parseDate;
    vm.parseFrequencyDesc = parseFrequencyDesc;
    vm.plans = [];
    vm.shownGroup = null;
    vm.toggleGroup = toggleGroup;

    plan.skip = 0;
    plan.limit = 10;
    plan.sort = 'planType';

    /**
     * @ngdoc function
     * @name app.main.admedika.benefit.controller#getBenefits
     * @methodOf app.main.admedika.benefit.controller:MainAdmedikaBenefitController
     *
     * @description
     * Get benefits of the member based on selected plan.
     *
     * @param {string} planId ID of the plan.
     */
    function getBenefits(planId) {
      var index = _.findIndex(vm.plans, { planId: planId });
      var item = vm.plans[index];
      var query = [
        'query Benefit($planId: String) {',
        '  profile {',
        '    admedika {',
        '      benefits(planId: $planId) {',
        '        benefitName',
        '        maxIdr',
        '        frequencyDesc',
        '      }',
        '    }',
        '  }',
        '}'
      ].join('');
      var variables = {
        planId: planId
      };

      if (item && item.benefits && item.benefits.length) return;

      graphql(query, variables)
        .then(function resolve(res) {
          var data = angular.copy(res);
          return data && data.profile && data.profile.admedika && data.profile.admedika.benefits;
        })
        .then(function resolve(res) {
          return res && res.length ? res : [];
        })
        .then(function resolve(res) {
          return _.filter(res, 'benefitName');
        })
        .then(function resolve(res) {
          angular.merge(vm.plans[index], { benefits: res, hasBenefits: true });
        });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.benefit.controller#getPlans
     * @methodOf app.main.admedika.benefit.controller:MainAdmedikaBenefitController
     *
     * @description
     * Get plans of the member.
     */
    function getPlans() {
      var query = [
        'query Plan($skip: Int, $limit: Int, $sort: String) {',
        '  profile {',
        '    admedika {',
        '      plans(skip: $skip, limit: $limit, sort: $sort) {',
        '        planId',
        '        planType',
        '        policyStartDate',
        '        policyEndDate',
        '        recordStatus',
        '        maxIdr',
        '        frequencyDesc',
        '        currentLimit',
        '      }',
        '    }',
        '  }',
        '}'
      ].join('');

      graphql(query, plan)
        .then(function resolve(res) {
          var data = angular.copy(res);
          return data && data.profile && data.profile.admedika && data.profile.admedika.plans;
        })
        .then(function resolve(res) {
          return res && res.length ? res : [];
        })
        .then(function resolve(res) {
          vm.plans = vm.plans.concat(_.filter(res, 'planId'));
          vm.hasPlans = plan.limit > res.length;

          plan.skip += plan.limit;
        })
        .catch(function reject() {
          toast.shortBottom('Failed to get benefit info');
        })
        .finally(function done() {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.benefit.controller#isGroupShown
     * @methodOf app.main.admedika.benefit.controller:MainAdmedikaBenefitController
     *
     * @description
     * Check wheter plan is selected or not.
     *
     * @param {integer} index Index of plan.
     *
     * @returns {Boolean} status of selected plan.
     */
    function isGroupShown(index) {
      return vm.shownGroup === index;
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.benefit.controller#parseDate
     * @methodOf app.main.admedika.benefit.controller:MainAdmedikaBenefitController
     *
     * @description
     * Replace `-` with `/` on benefit date.
     *
     * @param {string} date Date of benefit.
     *
     * @returns {string} formatted date.
     */
    function parseDate(date) {
      return date.replace(/-/g, '/');
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.benefit.controller#parseFrequencyDesc
     * @methodOf app.main.admedika.benefit.controller:MainAdmedikaBenefitController
     *
     * @description
     * Replace (existing) and append `per` on frequency description benefit.
     *
     * @param {string} desc Frequency description of benefit.
     *
     * @returns {string} formatted frequency description.
     */
    function parseFrequencyDesc(desc) {
      return 'per '.concat(desc.replace(/per\s+/gi, ''));
    }

    /**
     * @ngdoc function
     * @name app.main.admedika.benefit.controller#toggleGroup
     * @methodOf app.main.admedika.benefit.controller:MainAdmedikaBenefitController
     *
     * @description
     * Toggle group of benefits based on selected plan.
     *
     * @param {string} planId ID of the plan.
     */
    function toggleGroup(planId) {
      vm.shownGroup = vm.isGroupShown(planId) ? null : planId;
      if (!(vm.shownGroup === null)) getBenefits(planId);
    }
  }

  angular.module('app.main.admedika.benefit').controller('MainAdmedikaBenefitController', MainAdmedikaBenefitController);
}());
