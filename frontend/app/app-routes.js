(function() {
  'use strict';

  angular
    .module('frontend')
    .config(config)
    .run(run)
    .controller('AppCtrl', AppCtrl);

  function config($urlRouterProvider, jwtInterceptorProvider, jwtOptionsProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/home');
    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('jwt');
    };

    $httpProvider.defaults.headers.common.Authorization = 'Bearer '
    
    $httpProvider.interceptors.push('jwtInterceptor');
    jwtOptionsProvider.config({ whiteListedDomains: ['*'] });



$httpProvider.interceptors.push(function($q) {
  return {
   'request': function(config) {

       return config;
    }
  };
});





  }








  function run($state) {

          $state.go('home');

  }

  function AppCtrl($scope) {
    $scope.$on('$routeChangeSuccess', function(e, nextRoute) {
      if (nextRoute.$$route && angular.isDefined(nextRoute.$$route.pageTitle)) {
        $scope.pageTitle = nextRoute.$$route.pageTitle + ' | ngEurope Sample';
      }
    });
  }

}());
