
var app = angular.module('translationTableApp', [ 'dataGrid', 'ngMaterial']);



app.controller('AppController', function AppController($log, $scope, $http, $interval, $sce, $mdDialog, $anchorScroll) {
  
  var self = this;
  
  self.getData = function() {
    $http({
      url: 'data/translation_data.json',
  
    }).then(function successCallback(response) {
      $scope.gridOptions.data = response.data;
  
    }, function errorCallback(resp) {
      $log.error("error getting data", resp);
    });

  }

  self.getData();


  // for term display
  function DialogController($scope, $rootScope, $sce, $mdDialog) {
    $scope.term = $rootScope.$$childHead.activeTerm;
    $scope.cancel = function() { $mdDialog.cancel(); }

    self.trust = function(htmlToSanitize) {
      return $sce.trustAsHtml(htmlToSanitize);
      
    }
  
  }

  // set before dialog
  self.setTerm = function(item) {
    $scope.activeTerm = item;
  }

  // show term dialog
  self.showDetail = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'termDialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
  }

  $scope.gridOptions = {
    data: [],
    // default sorting
    sort: {
      predicate: 'term',
      direction: 'asc'
    }
  };

  // for html data to add later
  self.trust = function(htmlToSanitize) {
    $log.info("trust on ", htmlToSanitize);

    return $sce.trustAsHtml(htmlToSanitize);
  }

})
