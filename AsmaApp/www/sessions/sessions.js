angular.module('AsmaApp.Sessions', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
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

/**************************************** CONTROLLERS ******************************************************/

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

.controller('RegisterCtrl', function($scope, $state, $http, $cordovaCamera, AuthService, API_URL) {
  
  $scope.getImage = function() {
    // Set $cordovaCamera options.
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      encodingType: Camera.EncodingType.JPEG,
      saveToPhotoAlbum: true,
      correctOrientation:true
    };

    // Define options to be presented to user on a popup (taking pictures or getting image from gallery)
    var cameraPopupOptions = {
      'buttonLabels': ['Take Picture', 'Select From Gallery'],
      'addCancelButtonWithLabel': 'Cancel'
    };

    // Displays popup to user.
    window.plugins.actionsheet.show(cameraPopupOptions, function (_btnIndex) {
      if (_btnIndex === 1) {
          // If option 1 is selected, take a picture.
          options.sourceType = Camera.PictureSourceType.CAMERA;
      } else if (_btnIndex === 2) {
          // If option 2 is selected, get image from gallery.
          options.sourceType = navigator.camera.PictureSourceType.SAVEDPHOTOALBUM;
      }
      $cordovaCamera.getPicture(options).then(function(imageData) {
        // Saves image to $scope.picturedata.
        $scope.registerData.avatar = "data:image/jpeg;base64," + imageData;
        
      }, function(err) {
        // error
      });
    });
  };

  $scope.registerData = {};// Declares empty object to store resetPassword data from the form.
  $scope.register = function() {
    var url = API_URL + 'registrations'; // Declares URL to post form to.
    $http.post(url, {
      email: $scope.registerData.email,
      name: $scope.registerData.name,
      password: $scope.registerData.password,
      password_confirmation: $scope.registerData.passwordConfirmation,
      avatar: $scope.registerData.avatar
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