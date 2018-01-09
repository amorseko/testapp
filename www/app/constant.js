(function _AppConstant_() {
  'use strict';

  var ANALYTIC = {
    ENABLE: true
  };

  var EVENT = {
    LOGIN: {
      SUCCESS: 'EventLoginSuccess'
    },
    LOGOUT: {
      SUCCESS: 'EventLogoutSuccess'
    },
    PHOTO: {
      CHANGED: 'EventPhotoChanged'
    }
  };

  var GRAPHQL = {
    URL: 'https://api.mypersona.id/graphql'
  };

  var IMAGE = {
    AVATAR: 'img/default.png'
  };

  angular
    .module('app')
      .constant('ANALYTIC', ANALYTIC)
      .constant('EVENT', EVENT)
      .constant('GRAPHQL', GRAPHQL)
      .constant('IMAGE', IMAGE);
}());
