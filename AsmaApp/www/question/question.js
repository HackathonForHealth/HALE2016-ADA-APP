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

.factory('QuestionsService', function($http) {

  // Defines and prefix for the assets url in Android.
  var url = "";
  if(ionic.Platform.isAndroid()){
    url = "/android_asset/www/";
  }


  var question = [];
  return {
    getList: function() {
      // Reads external JSON to get list of supermarkets.
      return $http.get(url + "json/supermarkets.json").then(function(response){
        // Returns list of Supermarket objects.
        supermarkets = response.data;
        return supermarkets;
      });
    },
    find: function(id) {
      // Finds one supermarket by id.
      for(i=0;i<supermarkets.length;i++){
        if(supermarkets[i].id == parseInt(id)){
          return supermarkets[i];
        }
      }
      return null;
    }
  };
})


/**************************************** CONTROLLERS ******************************************************/

.controller('QuestionCtrl', function($scope) {
});
