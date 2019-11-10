(function () {
  'use strict';
  angular
    .module('config')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('config', {
        url: '/config',
        templateUrl: 'config/views/config.tpl.html',
        controller: 'configCtrl',
        controllerAs: 'config',
        resolve: {},
        data: {
          requiresLogin: true
        }
      })
  }
}());