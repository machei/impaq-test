'use strict';

angular.module('app')
  .factory("$service",function($resource){
    var _url = "users.impaqgroup.com";
    return {
      url: _url,
      remove: $resource(_url + '/remove/:id', {id:'@id'}, {
        method: 'POST'
      }),
      edit: $resource(_url + '/edit/:id', {id:'@id'}, {
        method: 'POST'
      }),
      findAll: $resource(_url + '/findAll'),
      find: $resource(_url + '/find/:id',{},{})
    }
  })
  .run(function($httpBackend, $service, $http){

    var _users = [];

    $http({
      method:'get',
      url: './users.json'
    }).then(function(response){
      _users = response.data;
    })

    window.u =_users;
    // Get all users
   $httpBackend.whenGET($service.url+'/findAll').respond(function(method, url, data){
     return [200, {data:angular.toJson(_users)}, {}];
   });

   // Find user by param id
   $httpBackend.whenGET(/\/find\/\d+/).respond(function(method, url, data){
     var user = null;
     var user_id = parseInt(url.split('/')[2]);
     angular.forEach(_users, function(_user, key){
        if(_user.id == user_id){
          user = _user;
          return;
        }
     });
     if(user == null) return [400, {data: "Not found user"}];
     return [200, {data:angular.toJson(user)},{}];
   });

   // Delete user by param id
   $httpBackend.whenPOST(/\/remove\/\d+/).respond(function(method, url, data){
     var deleted = false;
     var user_id = parseInt(url.split('/')[2]);
     angular.forEach(_users, function(_user, key){
        if(_user.id == user_id){
          _users.splice(key, 1);
          deleted = true;
          return;
        }
     });
     if(!deleted) return [400, {data: "Not found user"}];
     return [200, {status: "ok"}];
   });

   // Edit user by param id
   $httpBackend.whenPOST(/\/edit\/\d+/).respond(function(method, url, data){
     var edited = false;
     var user_id = parseInt(url.split('/')[2]);
     angular.forEach(_users, function(_user, key){
        if(_user.id == user_id){
          angular.extend(_user, angular.fromJson(data).data);
          edited = true;
          return;
        }
     });
     if(!edited) return [400, {data: "Not found user"}];
     return [200, {status: "ok"}];
   });

   // Allow templates and file json
   $httpBackend.whenGET(/page_([a-zA-Z0-9_]*)\//).passThrough();
   $httpBackend.whenGET(/users.json/).passThrough();

  })
