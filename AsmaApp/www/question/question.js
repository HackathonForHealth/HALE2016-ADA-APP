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
    });

})

/**************************************** SERVICES ******************************************************/

/**************************************** Controllers ******************************************************/

.controller('QuestionCtrl', function($scope) {
});
