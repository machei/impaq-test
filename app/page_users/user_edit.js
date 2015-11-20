'use strict';

angular.module('app').controller('UserEditCtrl', function($http, $scope, $state, $stateParams, $service, $q) {
  $scope.forms = [];
  var ids = $stateParams.id.split(',');
  if(ids.length == 0) $state.go('dashboard');

  angular.forEach(ids, function(key, value){
    (function(){
      var form = {};
      $scope.forms.push(form);
      form.id = key;
      form.loading = true;
      $service.find.get({id: key}).$promise.then(function(data){
        form.loading = false;
        angular.extend(form, angular.fromJson(data.data));
      });
    })();
  });

  // $scope.forms = [
  //   {"id":0, "name":  "name0", "surname": "surname0", "dateofbirth":"24-8-1981", "mobile":"634523125", "city": "Poznan", "street": "Dluga", "housenumber": "2"},
  //   {"id":0, "name":  "name0", "surname": "surname0", "dateofbirth":"24-8-1981", "mobile":"634523125", "city": "Poznan", "street": "Dluga", "housenumber": "2"}
  // ];

  $scope.submit = function(){
    var _promises = [];
    $scope.submitting = true;
    angular.forEach($scope.forms, function(data, key){
      var _q = $q.defer();
      _promises.push()
      $service.edit.save({id: data['id'], data: data}).$promise.then(function(){
        _q.resolve();
      });
    });

    $q.all(_promises).then(function(){
      $state.go('dashboard');
    });
  };

});
