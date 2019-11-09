(function () {
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
  function statisticsCtrl($scope, ev, statisticsApi, $uibModal, $q, growl, $interval, $rootScope, googleChartApiPromise) {
    var vm = this;
    vm.ctrlName = 'StatisticsCtrl';
    Promise.all([googleChartApiPromise]).then(() => {
      $scope.getstats();
      // $scope.getuser();
    })
    $scope.reportSelected = 0
    $scope.idEvent = 0;
    $scope.from = "";
    $scope.to = "";
    $scope.from = moment().subtract(1, 'h').format('YYYY-MM-DD HH:mm')
    $scope.to = moment().hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm')
    let defaultColors = ['#46BFBD', '#56789f', '#949FB1', '#4D5360', '#3f5268', '#3071a9']
    $scope.userstime = [];
    $scope.reportfront = [{
      "id": 1,
      "name": "Request por path"
    }, {
      "id": 2,
      "name": "Request por status"
    }]
    $scope.report = {
        chart: {
          type: "ColumnChart",
          data: {},
          options: {
            title: 'Usuarios Conectados',
            legend: {
              position: "none"
            },
            colors: _.shuffle(defaultColors),
          }
        }
      },
      $scope.chartoptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0
            }
          }]
        }
      };
    $scope.initgraph = function () {}
    $scope.getstats = function () {
      if ($scope.reportSelected) {
        let array2table = []
        $rootScope.progressbar.start();
        var req = {
          "id": Number($scope.reportSelected),
          "from": Number(moment($scope.from).format('x')),
          "to": Number(moment($scope.to).format('x'))
        }
        statisticsApi.getstatistics(req)
          .then(function (res) {
            switch (req.id) {
              case 1:
                $scope.report.chart.options.title = "Request por path"
                array2table.push(['Path', 'Cantidad'])
                if (res.aggregations && res.aggregations.group_by_path && res.aggregations.group_by_path.buckets) {
                  for (let i = 0; i < res.aggregations.group_by_path.buckets.length; i++) {
                    const element = res.aggregations.group_by_path.buckets[i];
                    array2table.push([element.key, element.doc_count])
                    $scope.report.chart.data = google.visualization.arrayToDataTable(array2table)
                  }
                }
                break;
              case 2:
                $scope.report.chart.options.title = "Request por status"
                array2table.push(['Code', 'Cantidad'])
                if (res.aggregations && res.aggregations.group_by_status && res.aggregations.group_by_status.buckets) {
                  for (let i = 0; i < res.aggregations.group_by_status.buckets.length; i++) {
                    const element = res.aggregations.group_by_status.buckets[i];
                    array2table.push([element.key, element.doc_count])
                    $scope.report.chart.data = google.visualization.arrayToDataTable(array2table)
                  }
                }
                break;
            }
          }).catch(function () {
            growl.error("no se pudieron obtener las metricas")
          })
        $rootScope.progressbar.complete();
      }
    }
    $scope.getstats();
    var refreshTimer = $interval(function () {
      $scope.getstats()
    }, 60 * 1000)
    $scope.$on('$destroy', function () {
      $interval.cancel(refreshTimer);
    });
  }
}());