angular.module('AsmaApp.Categories', ['ionic'])

.config(function($stateProvider) {
  // Set routes for Spot, new spot and edit spot screens
  // All routes must be inside 'content', as we are using common/template.html as the app template.
  $stateProvider
    .state('app.categories', {
      url: '/categories',
      views: {
        'content': {
          templateUrl: 'categories/index.html',
          controller: 'CategoriesCtrl'
        }
      }
    });

})

/**************************************** SERVICES ******************************************************/

/**************************************** Controllers ******************************************************/

.controller('CategoriesCtrl', function($scope) {
  
});
