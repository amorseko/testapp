(function _AppRun_() {
  'use strict';

  function run(
    $ionicHistory, $ionicPlatform, $q, $rootScope, $state, $timeout, $window,
    analytic, auth, EVENT
  ) {
    $ionicPlatform.ready(ready);

    function ready() {
      var cordova = $window.cordova;
      var navigator = $window.navigator;
      var StatusBar = $window.StatusBar;
      var screen = $window.screen;
      var widthPage = $window.innerWidth;
      var heightPage = $window.innerHeight;
      var isLoading = false;
      var $this = $rootScope;

      $this.$root.widthPage = widthPage;
      $this.$root.heightPage = heightPage;

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (cordova && cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      // org.apache.cordova.statusbar required
      if (StatusBar) {
        StatusBar.backgroundColorByHexString('#cc0000');
      }
      // lock orientation
      if (screen && screen.unlockOrientation) {
        screen.lockOrientation('portrait');
      }
      // hide splashscreen
      if (navigator && navigator.splashscreen && navigator.splashscreen.hide) {
        $timeout(navigator.splashscreen.hide, 1500);
      }
      // eslint-disable-next-line
      window.handleOpenURL = function handleOpenURL(url) {
        isLoading = true;
        // eslint-disable-next-line
        setTimeout(openUrl(url), 0);
      };
      // init state
      $timeout(init(isLoading), 500);
    }

    function init(isLoading) {
      if (isLoading) return;
      $q.when(auth.getSession()).then(function resolve(session) {
        if (session) {
          $rootScope.$emit(EVENT.LOGIN.SUCCESS);
          $state.go('app.main.home');
        } else {
          $state.go('app.auth.login');
        }
      });
    }

    function openUrl(url) {
      var login = /mypersona:\/\/login\?token=/;
      var register = /mypersona:\/\/register\?/;
      $q.when(auth.logout())
        .then(function resolve() {
          if (login.test(url)) return openHome(url.replace(login, ''));
          if (register.test(url)) return openRegister(url.replace(register, '').split('&'));
          return init(false);
        });
    }

    function openHome(token) {
      $q.when(auth.setToken(token))
        .then(function resolve() {
          return $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true,
            historyRoot: true
          });
        })
        .then(function resolve() {
          return init(false);
        });
    }

    function openRegister(token) {
      var params = {};
      angular.forEach(token, function c(o) {
        if (/name=/i.test(o)) angular.merge(params, { name: o.replace(/name=/i, '') });
        if (/birthday=/i.test(o)) angular.merge(params, { birthday: o.replace(/birthday=/i, '') });
        if (/gender=/i.test(o)) angular.merge(params, { gender: o.replace(/gender=/i, '') });
        if (/phone=/i.test(o)) angular.merge(params, { phone: o.replace(/phone=/i, '') });
        if (/email=/i.test(o)) angular.merge(params, { email: o.replace(/email=/i, '') });
        if (/cardNumber=/i.test(o)) angular.merge(params, { cardNumber: o.replace(/cardNumber=/i, '') });
        if (/password=/i.test(o)) angular.merge(params, { password: o.replace(/password=/i, '') });
        if (/passwordConfirmation=/i.test(o)) angular.merge(params, { passwordConfirmation: o.replace(/passwordConfirmation=/i, '') });
      });
      $q.when($ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true,
        historyRoot: true
      })).then(function resolve() {
        $state.go('app.auth.register', params);
      });
    }
  }

  angular.module('app').run(run);
}());
