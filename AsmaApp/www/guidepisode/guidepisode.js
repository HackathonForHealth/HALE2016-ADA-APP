angular.module('AsmaApp.Guidepisode', ['ionic'])

.config(function($stateProvider) {
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

.controller('GuidepisodeCtrl', function($scope) {
  
});
