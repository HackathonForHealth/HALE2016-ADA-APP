angular.module('AsmaApp.Sessions', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  // Set routes for Spot, new spot and edit spot screens
  // All routes must be inside 'content', as we are using common/template.html as the app template.
  $stateProvider
    .state('app.login', {
      url: '/login',
      views: {
        'content': {
          templateUrl: 'sessions/login.html',
          controller: 'LoginCtrl'
        }
      }
    })

    .state('app.register', {
      url: '/register',
      views: {
        'content': {
          templateUrl: 'sessions/register.html',
          controller: 'RegisterCtrl'
        }
      }
    })

})

/**************************************** SERVICES ******************************************************/

/**************************************** Controllers ******************************************************/

.controller('LoginCtrl', function($scope) {
  
})

.controller('RegisterCtrl', function($scope) {
  
})
