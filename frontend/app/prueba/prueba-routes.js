(function() {
  'use strict';

  angular
    .module('prueba')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('prueba', {
        url: '/prueba',
        templateUrl: 'prueba/views/prueba.tpl.html',
        controller: 'pruebaCtrl',
        controllerAs: 'prueba',
             resolve: {
  
        },
        data: {
          requiresLogin: true
        }
      });
  }
}());
