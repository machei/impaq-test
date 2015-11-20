'use strict';

angular.module('app').controller('DashboardCtrl', function($http, $scope, $service, $state) {

  $scope.rows = [];
  $scope.users = {selected: []};

  $scope.change = function(checked, id){
    if(checked) $scope.users.selected.push(id);
    else $scope.users.selected.splice($scope.users.selected.indexOf(id),1);
  }

  // Button clickable to edit user
  $scope.editRows = function(){
    $state.go('user.edit',{id: $scope.users.selected.join(',')});
  };

  // Remove user
  $scope.removeRow = function($id, $row){
    // I pref: $service.remove.remove() with using method DELETE,
    // but somebody wrote POST from documentation for deleting object user.
    $service.remove.save({id: $id}).$promise.then(function(data){
      $scope.rows.splice($scope.rows.indexOf($row),1);
    });
  };

  // Get all users
  $service.findAll.get().$promise.then(function(response){
    $scope.rows = angular.fromJson(response.data);
  });

});
