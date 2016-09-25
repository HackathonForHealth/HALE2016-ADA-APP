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

.controller('LoginCtrl', function($scope, $state, $http, AuthService) {
  
  $scope.loginData = {}; // Declares empty object to store login data from the form.
  $scope.login = function() {
    AuthService.login($scope.loginData.email, $scope.loginData.password).then(function(authenticated) {
      $state.go('app.main', {}, {reload: true});
    }, function(err) {
      $scope.showFormMessage(err);
    });
  };
})

.controller('RegisterCtrl', function($scope, $state, $http, AuthService, API_URL) {
  
  $scope.registerData = {};// Declares empty object to store resetPassword data from the form.
  $scope.register = function() {
    var url = API_URL + 'registrations'; // Declares URL to post form to.

    $http.post(url, {
      email: $scope.registerData.email,
      password: $scope.registerData.password,
      password_confirmation: $scope.registerData.passwordConfirmation,
    }).then(function (response){
      if (response.data.status == 200) {
        // If successful, stores authentication data.
        AuthService.storeUserCredentials(response.data.authentication_token, $scope.registerData.email);
        // Redirects user to main screen.
        $state.go('app.main', {}, {reload: true});
      } else {
        // Else, display message received from server.
        $scope.showFormMessage(response.data.message);
      }
    });
  };

});