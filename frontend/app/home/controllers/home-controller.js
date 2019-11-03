(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);




  function HomeCtrl($http,  $scope,  HomeApi, growl) {
    $scope.reports = [{
      "labels": $scope.proxEventFecha,
      "type": "bar",
      "title": "API calls",
      "color": ['#949FB1', '#46BFBD', '#4D5360'],
      "data": [
        $scope.proxEventCant
      ],
      "series": ['Eventos', 'Eventos']
    }   ];






  }
}());
