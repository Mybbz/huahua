var todoApp = angular.module('todoApp', ['ngRoute']);

todoApp.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/timeline', {
    templateUrl: '/partials/timeline.html'
  })
  .when('/todo', {
    templateUrl: '/partials/todo.html',
    controller: 'TodoCtrl'
  })
  .when('/about', {
    templateUrl: '/partials/about.html',
    controller: 'AboutCtrl'
  })
  .when('/gallery', {
    templateUrl: '/partials/gallery.html'
  })
  .when('/shop', {
    templateUrl: '/partials/shop.html'
  })
  .otherwise({
    redirectTo: '/home'
  });

  $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
});