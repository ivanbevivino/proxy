
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
    $scope.apiCalls = 0
$scope.apiCallsSuccess = 0
$scope.apiCallsError = 0
$scope.apiCallsRateExceded = 0
$scope.pathcant = []
$scope.path = []
    $scope.reports = [{
      "labels": $scope.path,
      "type": "bar",
      "title": "Top Path API calls",
      "color": ['#949FB1', '#46BFBD', '#4D5360'],
      "data": [
        $scope.pathcant
      ],
      "series": ['PATH', 'PATH']
    }   ];


HomeApi.homeReports().then(function(res){
  growl.success ('se obtubieron metricas')
  console.log(res.aggregations.group_by_status.buckets)
  if(res.aggregations&&res.aggregations.group_by_status&&res.aggregations.group_by_status.buckets){
    for (let index = 0; index < res.aggregations.group_by_status.buckets.length; index++) {
      const element = res.aggregations.group_by_status.buckets[index];
      
      if (Number(element.key)== 200){
        $scope.apiCallsSuccess = element.doc_count
        }
        if (Number(element.key)>= 400){
          $scope.apiCallsError = $scope.apiCallsError+ element.doc_count
        }       
        if (Number(element.key)== 403){
          $scope.apiCallsRateExceded=element.doc_count
        }
        $scope.apiCalls=$scope.apiCalls+element.doc_count
    }
  }
}).catch(function(){
  growl.error ('no se pudieron obtener las metricas')
})

HomeApi.homeReports2().then(function(res){
  growl.success ('se obtubieron metricas')
  console.log(res.aggregations.group_by_path.buckets)
  if(res.aggregations&&res.aggregations.group_by_path&&res.aggregations.group_by_path.buckets){
    for (let index = 0; index < res.aggregations.group_by_path.buckets.length; index++) {
      const element = res.aggregations.group_by_path.buckets[index];
      $scope.pathcant.push(element.doc_count)
$scope.path.push(element.key)
      
    }
  }
}).catch(function(){
  growl.error ('no se pudieron obtener las metricas')
})




  }
}());
