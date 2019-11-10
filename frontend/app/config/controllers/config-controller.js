(function () {
  'use strict';
  /**
   * @ngdoc object
   * @name config.controller:configCtrl
   *
   * @description
   *
   */
  angular
    .module('config')
    .controller('configCtrl', configCtrl);

  function configCtrl($scope, configApi, growl, $rootScope, $uibModal) {
    console.log($scope.config)



    $scope.getConfig = function () {
      configApi.getConfig()
        .then(function (response) {
          console.log(response)
          $scope.config = response
        })
        .catch(function () {
          growl.error("No se pudieron obtener las configuranciones")
        })
    }
    $scope.getConfig()
    $scope.itemsByPage = 15;
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.newCtl = {
      "key": "/",
      "value": 0,
      "ttl": 0,
      "enable": false
    }
    // // -- Instance variables
    var modal;



    $scope.createControl = function () {
      $scope.newCtl = {
        "key": "/",
        "value": 0,
        "ttl": 0,
        "enable": false
      }
      modal = $uibModal.open({
        scope: $scope,
        title: 'Create user',
        templateUrl: 'config/views/addControl.html'
      });
    };



    $scope.createNewControl = function () {
      if (!$scope.newCtl) {
        $scope.newCtl.ttl = null
      }
      configApi.setConfig($scope.newCtl)
        .then(function (res) {
          growl.success("Se grabo un nuevo control")
          $scope.getConfig()
        })
        .catch(function () {
          growl.error("No se pudo grabar")
        })
      console.log($scope.newCtl)
    }



    $scope.editControl = function (editControl) {
      console.log(editControl)
      $scope.newCtl = {
        "key": editControl.key,
        "value": Number(editControl.value),
        "ttl": 0,
        "enable": false
      }
      modal = $uibModal.open({
        scope: $scope,
        title: 'Edit Control',
        templateUrl: 'config/views/addControl.html'
      });
    }

    $scope.removeControl = function (editControl) {
      console.log(editControl)
      $scope.newCtl = {
        "key": editControl.key,
        "value": Number(editControl.value),
        "ttl": 0,
        "enable": false
      }
      modal = $uibModal.open({
        scope: $scope,
        title: 'Create user',
        templateUrl: 'constants/areyousure-modal.html'
      });

      $scope.yes = function() {
        console.log("YES")
        configApi.deleteConfig($scope.newCtl)
        .then(function(){
          growl.success("configuracion actualizada")
          $scope.getConfig()
        })
        .catch(function(){
          growl.error("error al borrar la configuracion")
        })
      }
    }

  }
}());