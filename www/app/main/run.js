(function _AppMainRun_() {
  'use strict';

  function run(
    $ionicHistory, $ionicPlatform, $q, $rootScope, $state, $window,
    EVENT, analytic, auth, member, provider
  ) {
    var $this = $rootScope;
    var widthPage = $window.innerWidth;

    $this.$root = {};
    $this.$root.logout = logout;
    $this.$root.widthPage = widthPage;
    $this.$on('$stateChangeStart', stateChangeStart);
    $this.$on(EVENT.LOGIN.SUCCESS, loginSuccess);
    $this.$on(EVENT.LOGOUT.SUCCESS, logoutSuccess);

    function loginSuccess() {
      analytic.addSession();
      member.initData();
      provider.initData();
      provider.initCityAndPlans();
    }

    function logoutSuccess() {
      member.clearData(member.key);
      provider.clearData(provider.keys.cityPlans);
      provider.clearData(provider.keys.providers);
    }

    function stateChangeStart(event, toState, toParams, fromState) {
      var screen = $window.screen;
      var Platform = $window.ionic && $window.ionic.Platform;

      if (toState.name === 'app.main.admedika.show') {
        if (screen && screen.lockOrientation) {
          screen.lockOrientation('landscape');
        }
        if (Platform && Platform.fullScreen) {
          Platform.fullScreen(true, false);
        }
      }

      if (fromState.name === 'app.main.admedika.show') {
        if (screen && screen.unlockOrientation) {
          screen.lockOrientation('portrait');
        }
        if (Platform && Platform.fullScreen) {
          Platform.fullScreen(false, true);
        }
      }

      if (toState.name === 'app.main.home') {
        clearHistory();
      }
    }

    function clearHistory() {
      $ionicHistory.nextViewOptions({
        disableBack: true,
        historyRoot: true
      });
    }

    function logout() {
      $q.resolve(auth.logout())
        .then(function resolve() {
          clearHistory();
          $state.go('app.auth.login');
        });
    }
  }

  angular.module('app.main').run(run);
}());
