angular.module('AsmaApp.Experiences', ['ionic'])

.config(function($stateProvider) {
  // Set routes for Spot, new spot and edit spot screens
  // All routes must be inside 'content', as we are using common/template.html as the app template.
  $stateProvider
    .state('app.experiences', {
      url: '/experiences',
      views: {
        'content': {
          templateUrl: 'experiences/index.html',
          controller: 'ExperiencesCtrl'
        }
      }
    });

})

/**************************************** SERVICES ******************************************************/

/**************************************** Controllers ******************************************************/

.controller('ExperiencesCtrl', function($scope) {
  
});
