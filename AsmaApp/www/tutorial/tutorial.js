angular.module('AsmaApp.Tutorial', ['ionic'])

.config(function($stateProvider) {
  // Set routes for Spot, new spot and edit spot screens
  // All routes must be inside 'content', as we are using common/template.html as the app template.
  $stateProvider
    .state('app.tutorial', {
      url: '/tutorial',
      views: {
        'content': {
          templateUrl: 'tutorial/index.html',
          controller: 'TutorialCtrl'
        }
      }
    });

})

/**************************************** SERVICES ******************************************************/

/**************************************** Controllers ******************************************************/

.controller('TutorialCtrl', function($scope) {
  $scope.data = {};
  $scope.data.bgColors = [];
  $scope.data.currentPage = 0;

  var setupSlider = function() {
    //some options to pass to our slider
    $scope.data.sliderOptions = {
      initialSlide: 0,
      direction: 'horizontal', //or vertical
      speed: 300 //0.3s transition
    };

    //create delegate reference to link with slider
    $scope.data.sliderDelegate = null;

    //watch our sliderDelegate reference, and use it when it becomes available
    $scope.$watch('data.sliderDelegate', function(newVal, oldVal) {
      if (newVal != null) {
        $scope.data.sliderDelegate.on('slideChangeEnd', function() {
          $scope.data.currentPage = $scope.data.sliderDelegate.activeIndex;
          //use $scope.$apply() to refresh any content external to the slider
          $scope.$apply();
        });
      }
    });
  };

  setupSlider();

  function dataChangeHandler(){
  // call this function when data changes, such as an HTTP request, etc
  if ( $scope.slider ){
    $scope.data.currentPage = 0;
  }
}


});
