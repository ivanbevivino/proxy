(function () {
  'use strict';
  /**
   * @ngdoc object
   * @name prueba.controller:pruebaCtrl
   *
   * @description
   *
   */
  angular
    .module('prueba')
    .controller('pruebaCtrl', pruebaCtrl);
  function pruebaCtrl($scope,  pruebaApi,  growl,  $rootScope) {
    var vm = this;
    vm.ctrlName = 'pruebaCtrl';

    $scope.user = 1
    $scope.calls = 1;
    $scope.path = "";
    $scope.response = "";
 

    $scope.test = function(){
      $scope.response = "";

      for (let i = 0; i < $scope.user; i++) {
        var prom = []
        for (let ii = 0; ii < $scope.calls; ii++) {
        prom.push(pruebaApi.getprueba($scope.path))
        }
        Promise.all(prom) 
        .then(function(res){
            $scope.response = res
            growl.success("ok")
          })
          .catch(function(e){
            $scope.response = e
            growl.error("error")
          })
      }
      // pruebaApi.getprueba($scope.path)
      // .then(function(res){
      //   $scope.response = res
      //   growl.success("ok")
      // })
      // .catch(function(e){
      //   $scope.response = e
      //   growl.error("error")
      // })
    }
    
  }
}());