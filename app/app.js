'use strict';

angular.module('app', ['ui.router', 'ngResource', 'ngMockE2E']).config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('dashboard', {
      url: '/dashboard',
      views:{"":{
        templateUrl: 'page_dashboard/dashboard.html',
        controller: "DashboardCtrl"
      }}
    })
    .state('user',{url: '/user', views: {"":{}}})
    .state('user.edit',{
      url: '/edit/:id',
      views:{"@":{
        templateUrl: 'page_users/user_edit.html',
        controller: 'UserEditCtrl'
      }}
    })

  $urlRouterProvider.otherwise("/dashboard");

});
