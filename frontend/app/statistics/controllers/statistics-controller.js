(function() {
  'use strict';

  /**
   * @ngdoc object
   * @name statistics.controller:statisticsCtrl
   *
   * @description
   *
   */
  angular
    .module('statistics')
    .controller('statisticsCtrl', statisticsCtrl);

  function statisticsCtrl($scope, ev, statisticsApi, $uibModal, $q, growl) {
    var vm = this;
    vm.ctrlName = 'statisticsCtrl';

    //-------- parametro--------------

    $scope.rowCollection = ev;
    $scope.rowCollection.forEach(function (x) {
      x.start_datetime= moment(x.start_datetime).format('YYYY-MM-DD HH:mm');
      x.end_datetime= moment(x.end_datetime).format('YYYY-MM-DD HH:mm');
    })



    // -------- variables ------------
    $scope.itemsByPage = 15;
    $scope.currentPage = 0;
    $scope.pageSize = 15;
    // $scope.tab = 'list';
    $scope.tab = 'statistics';
    $scope.search = { "title": "" };



    // -------- funciones ------------


    $scope.activateTab = function(tabName) {
      $scope.tab = tabName;
    };


    $scope.hidePagination = function() {
      $('.pager').addClass('hidden')
    }
    $scope.showPagination = function() {
      $('.pager').removeClass('hidden')
    }

    $scope.buscarstatisticso = function() {
      if ($scope.search.title && $scope.search.title != "") {


        statisticsApi.buscarstatisticso($scope.search.title).then(function(response) {

          if (response.length > 0) {
            $scope.rowCollection = response
            $scope.rowCollection.forEach(function (x) {
      x.start_datetime= moment(x.start_datetime).format('YYYY-MM-DD HH:mm');
      x.end_datetime= moment(x.end_datetime).format('YYYY-MM-DD HH:mm');
    })
            $scope.hidePagination();
          } else {
            growl.info('statisticso no encontrado')
          }
          if (response.length == 100) {
            growl.info('Busqueda Limitada a 100 statisticsos')
          }
          // $scope.statisticsearch = response;
        }).catch(function(err) {
          growl.error(err);
        })
      } else {
        growl.info('Complete el campo de busqueda')
      }
      
    };

    $scope.limpiarBusqueda = function() {
      // $scope.statisticsearch = [];
      $scope.search.title = "";
      statisticsApi.getstatisticsLimitOffset(15, 0).then(function(res) {
        $scope.currentPage = 0
        $scope.rowCollection = res;
              $scope.showPagination();
      }).catch(function(err) {
        growl.error(err);
      })


    };




    $scope.goNext = function() {

      $scope.currentPage = $scope.currentPage + 1;
      statisticsApi.getstatisticsLimitOffset($scope.itemsByPage, $scope.itemsByPage * $scope.currentPage).then(function(response) { //?limit=100&offset=0
        $scope.rowCollection = JSON.parse(JSON.stringify(response));
        $scope.rowCollection.forEach(function (x) {
      x.start_datetime= moment(x.start_datetime).format('YYYY-MM-DD HH:mm');
      x.end_datetime= moment(x.end_datetime).format('YYYY-MM-DD HH:mm');
    })


      });

    }





    $scope.goFoward = function() {
      if ($scope.currentPage > 0) {

        $scope.currentPage = $scope.currentPage - 1;
        statisticsApi.getstatisticsLimitOffset($scope.itemsByPage, $scope.itemsByPage * $scope.currentPage).then(function(response) { //?limit=100&offset=0
          $scope.rowCollection = JSON.parse(JSON.stringify(response));
          $scope.rowCollection.forEach(function (x) {
      x.start_datetime= moment(x.start_datetime).format('YYYY-MM-DD HH:mm');
      x.end_datetime= moment(x.end_datetime).format('YYYY-MM-DD HH:mm');
    })

        });
      }
    }


    $scope.copyLink = function (statisticso) { 
  if(statisticso.m3u8){

  var el = document.createElement('textarea');
  el.value = statisticso.m3u8;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  growl.success('Link copiado al portapapeles')
  }
  else{
    growl.error('No se encontro el link')
  }
};


    //  -----  modal  -------

    $scope.removeItem = function(statistics) {
      var innerScope = $scope.$new();


      $scope.modal = $uibModal.open({
        scope: innerScope,
        templateUrl: 'constants/areyousure-modal.html'

      });

      innerScope.yes = function() {
        $scope.modal.close();
        statisticsApi.deletestatisticsbyId(statistics.id).then(function() {
          growl.success('statisticso eliminado')


          statisticsApi.getstatisticsLimitOffset($scope.itemsByPage, $scope.itemsByPage * $scope.currentPage).then(function(response) { //?limit=100&offset=0
            $scope.rowCollection = JSON.parse(JSON.stringify(response));

          })



        }).catch(function(err) {
          console.error(err)
        });
      }


      // $scope.initialize();
    };






    //  ----- ejecuciones -------






  }
}());
