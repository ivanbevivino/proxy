;(function() {
  'use strict'

  /* @ngdoc object
   * @name frontend
   * @description
   *
   */
  angular
    .module('frontend', [
      'ui.router',
      'ui.bootstrap',
      'angular-storage',
      'angular-jwt',
      'home',
      'statistics',
      'config',
      'smart-table',
    
      'ngTagsInput',
      'angularjs-datetime-picker',
      'angular-growl',
    
      'ngAside',
     
      'chart.js',
      'ui.sortable',
      'ngProgress',
     
      'googlechart',
    ])

    .config([
      'growlProvider',
      function(growlProvider) {
        growlProvider.globalTimeToLive(4000)
      },
    ])

    // .config(['ChartJsProvider', function (ChartJsProvider) {
    //   // Configure all charts
    //   ChartJsProvider.setOptions({
    //     chartColors: ['#FF5252', '#FF8A80'],
    //     responsive: false
    //   });
    //   // Configure all line charts
    //   ChartJsProvider.setOptions('line', {
    //     showLines: false
    //   });
    // }])

    .controller('frontendCtrl', frontendCtrl)

  function frontendCtrl($scope, $aside,  $rootScope,  ngProgressFactory, VERSION) {
    $scope.front_version = VERSION.FRONT


    // $rootScope.decodedJwt = $rootScope.jwt && jwtHelper.decodeToken($rootScope.jwt);

    // if ($rootScope.decodedJwt) {

    //   $rootScope.username = $rootScope.decodedJwt.email;

    //   // $rootScope.roles operators

    // }

    // if (!$rootScope.roles || !$rootScope.permisos || !$rootScope.userid) {
    //   $rootScope.roles = [] ;
    //   $rootScope.permisos = [];

    //   $rootScope.userid = -1;

    // }

    $scope.hasPrivilege = function(priv) {
  
        return true
  
    }

    if (!$rootScope.progressbar) {
      $rootScope.progressbar = ngProgressFactory.createInstance()
      $rootScope.progressbar.setColor('#3782CB')
      $rootScope.progressbar.setHeight('0.23vw')

      $rootScope.progressbar.start()
      $rootScope.progressbar.complete()
    }

    $scope.logout = function() {

    
    }

    $scope.openasidemenu = function() {
      $aside.open({
        templateUrl: 'constants/sidebar.html',
        controller: 'frontendCtrl',
        placement: 'left',
        size: 'sm',
      })
    }
  }
})()
