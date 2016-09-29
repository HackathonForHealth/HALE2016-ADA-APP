angular.module('AsmaApp.Question', ['ionic'])

.config(function($stateProvider) {
  // Set routes for Spot, new spot and edit spot screens
  // All routes must be inside 'content', as we are using common/template.html as the app template.
  $stateProvider
    .state('app.question', {
      url: '/question',
      views: {
        'content': {
          templateUrl: 'question/index.html',
          controller: 'QuestionCtrl'
        }
      }
    })

    .state('app.question2', {
      url: '/question2',
      views: {
        'content': {
          templateUrl: 'question/index2.html',
          controller: 'QuestionCtrl2'
        }
      }
    });

})

/**************************************** SERVICES ******************************************************/

/**************************************** CONTROLLERS ******************************************************/

.controller('QuestionCtrl', function($scope, $state) {

  $scope.move = function() {
    $state.go('app.question2');
  }

})

.controller('QuestionCtrl2', function($scope) {
});
