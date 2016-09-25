angular.module('AsmaApp.Guidepisode', ['ionic'])

.config(function($stateProvider) {
  // Set routes for Spot, new spot and edit spot screens
  // All routes must be inside 'content', as we are using common/template.html as the app template.
  $stateProvider
    .state('app.main', {
      url: '/main',
      views: {
        'content': {
          templateUrl: 'main/index.html',
          controller: 'MainCtrl'
        }
      }
    });

})

/**************************************** SERVICES ******************************************************/

/**************************************** Controllers ******************************************************/

.controller('MainCtrl', function($scope) {
  console.log("oioioi");
});
