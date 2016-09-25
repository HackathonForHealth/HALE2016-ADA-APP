// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('AsmaApp', ['ionic', /*'http-auth-interceptor',*/ 'AsmaApp.Main', 'AsmaApp.Sessions', 'AsmaApp.Categories', 'AsmaApp.Question'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

})

// Every time the app changes state (when a new screen starts), check if user is autheticated. 
// If not, logout and redirect the user to login page.
.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      // Check if user is already on login page to avoid an infinite loop.
      // User also don't need to be authenticated on Register and Forgot password screens.
      if (next.name !== 'app.login' && next.name !== 'app.forgotPassword' && next.name !== 'app.register') {
        event.preventDefault();
        $state.go('app.login');
      }
    }
  });
})

// Defines authentication events. May be incremented if roles are add in the future.
.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})
 
 // Defines API url as a constant
.constant('API_URL', 'http://192.168.100.45:3000/api/')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'common/menu.html',
      controller: 'AppCtrl'
    })
  
    $urlRouterProvider.otherwise('/app/main');
})


/**************************************** SERVICES ******************************************************/

// Authentication service. Defines every function used in the authentication proccess.
.service('AuthService', function($q, $http, API_URL) {
  var LOCAL_TOKEN_KEY = 'userToken'; // Key to store auth token in LocalStorage.
  var LOCAL_EMAIL_KEY = 'userEmail'; // Key to store email in LocalStorage.
  var isAuthenticated = false;
  var authToken;

  /* 
   * NOTICE: The attributes names (X_AUTH_TOKEN and X-USER-EMAIL) must match the ones defined in the server API.
   * Take care no to change them unless you know what you're doing.
   */
  var HTTP_HEADER_TOKEN_ATTR = 'X-Auth-Token';
  var HTTP_HEADER_EMAIL_ATTR = 'X-User-Email';
  
  // Gets auth credentials from localStorage.
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    var email = window.localStorage.getItem(LOCAL_EMAIL_KEY);
    if (token) {
      useCredentials(token, email);
    }
  }

  // Saves auth credentials to LocalStorage.
  function storeUserCredentials(token, email) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    window.localStorage.setItem(LOCAL_EMAIL_KEY, email);
    useCredentials(token, email);
  }
  
  // Saves auth token and changes authenticated state to true.
  function useCredentials(token, email) {
    isAuthenticated = true;
    authToken = token;
    // Set the token as header for your requests!
    $http.defaults.headers.common[HTTP_HEADER_TOKEN_ATTR] = token;
    $http.defaults.headers.common[HTTP_HEADER_EMAIL_ATTR] = email;
  }
  
  // Remove credentials from LocalStorage and from HTTP header.
  function destroyUserCredentials() {
    authToken = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common[HTTP_HEADER_TOKEN_ATTR] = undefined;
    $http.defaults.headers.common[HTTP_HEADER_EMAIL_ATTR] = undefined;
    
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    window.localStorage.removeItem(LOCAL_EMAIL_KEY);
  }
  
  // Posts email and password to server to check for authentication.
  var login = function(email, password) {
    var url = API_URL + 'sessions'; // Defines URL to post form to.
    return $q(function(resolve, reject) {
      $http.post(url, {email: email, password: password}).then(function (response) {
        if (response.data.status == 200) {
          // If post request is successful, saves the user id received in the LocalStorage and resolve promisse.
          storeUserCredentials(response.data.authentication_token, email);
          resolve('Login success.');
        } else {
          // Else, reject promisse.
          reject(response.data.message);
        }
      })
    });
  };
  
  // Logs user out.
  var logout = function() {
    destroyUserCredentials();
  };
  
  loadUserCredentials();
  
  // Gives acces to some of the functions.
  return {
    login: login,
    logout: logout,
    storeUserCredentials: storeUserCredentials,
    isAuthenticated: function() {return isAuthenticated;}
  };
})

// Intercept server response errors. In case of a 401 status, broadcast "Not authenticated" message to app.
.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response);
      return $q.reject(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
})

/**************************************** Controllers ******************************************************/

.controller('AppCtrl', function($scope, $ionicPlatform, $state, AuthService, AUTH_EVENTS) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Checks if user is authenticated. If not, redirects to login screen.
  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('app.login');
  });

  // Logs user out and redirects to login screen.
  $scope.logout = function() {
    AuthService.logout();
    $state.go('app.login');
  };

  // Displays an error message on forms. Receives message to be displayed as parameter.
  $scope.showFormMessage = function(message) {
    var errorMessage = document.getElementById("form-message");
    errorMessage.innerHTML = message;
    errorMessage.style.visibility = "visible";
  }
});

