angular.module('AsmaApp.Guidepisode', ['ionic'])

.config(function($stateProvider) {
  // Set routes for Spot, new spot and edit spot screens
  // All routes must be inside 'content', as we are using common/template.html as the app template.
  $stateProvider
    .state('app.guidepisode', {
      url: '/guidepisode',
      views: {
        'content': {
          templateUrl: 'guidepisode/index.html',
          controller: 'GuidepisodeCtrl'
        }
      }
    });

})

/**************************************** SERVICES ******************************************************/

/**************************************** Controllers ******************************************************/

.controller('MainCtrl', function($scope) {
  console.log("oioioi");
});
