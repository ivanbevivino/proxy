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

  function configCtrl($scope, configApi, growl, $rootScope,$uibModal) {

    
    console.log($scope.config)
    $scope.getConfig = function () {
      configApi.getConfig()
      .then(function (response) {
        console.log(response)
        $scope.config=response
      })
      .catch(function () {
        growl.error("No se pudieron obtener las configuranciones")
      })
    }
    
    $scope.getConfig()
    
    
    
    
    $scope.itemsByPage = 15;
    $scope.currentPage = 0;
    $scope.pageSize = 10;



    // // -- Instance variables
    var modal;


    $scope.createControl = function() {

      modal = $uibModal.open({
        scope: $scope,
        title: 'Create user',
        templateUrl: 'config/views/addControl.html'
      });
    };

    // // -- Scope variables



    // $scope.tab = 'Categorias';


    // $scope.activateTab = function(tabName) {
    //   $scope.tab = tabName;
    // };

    // $scope.syncTags = function() {
    //    $rootScope.progressbar.start();
    //   configApi.syncTags().then(function() {
    //     growl.success('Tags sincronizadas correctamente');
    //     $rootScope.progressbar.complete();

    //   }).catch(function(err) {
    //     growl.error('No se pudieron actualizar las tags, por favor reintente ');
    //  $rootScope.progressbar.complete();
    //   })
    // };

    // $scope.syncCategories = function() {
    //    $rootScope.progressbar.start();

    //   configApi.newsyncCategories().then(function() {
    //     growl.success('Categorias sincronizadas correctamente');
    //     $rootScope.progressbar.complete();
    //   }).catch(function(err) {
    //     growl.error('No se pudieron actualizar las categorias, por favor reintente ');
    //     $rootScope.progressbar.complete();
    //   })
    // };



    // $scope.$on('customer-settings:tabChange', function(evt, tab) {
    //   $scope.tab = tab;
    // });












  }
}());