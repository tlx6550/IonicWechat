angular.module('starter.controller', [])
.controller('Tab1Ctrl', function($scope,$rootScope,Tab1Service,$ionicSlideBoxDelegate,$ionicTabsDelegate) {
  console.log('ok')
  // var imgUrl = "";
  $rootScope.imgUrl = imgUrl;
  var classify = Tab1Service.getClassify();
  $scope.slides = classify;
  $scope.tabs = classify;

  var slideIndex = 0;
  Tab1Service.getList(classify[0].url,1,20).then(function(response){
    if (response.data.status) {
      $scope.items = response.data.tngou;
      console.log(response.data)
    }
  },function(error){
    console.log(error)
  })


  //当中间页签slidebox改变的时候，让顶部tabs也改变
  $scope.slideChanged =  function(index){
     $ionicTabsDelegate._instances[1].select(index);
  }
  $scope.$on('$ionicView.afterEnter', function () {
       // tab1.html 和 tabs共生成了两个$ionicTabsDelegate实例
       // $ionicTabsDelegate._instances[1]表示选中第二个个 即tab1.html生成的实例
        $ionicTabsDelegate._instances[1].select($ionicSlideBoxDelegate.currentIndex());
    });
    //当tabs选中的时候,调用滑动框的api方法，让滑动框和tabs联动改变
    $scope.selectedTab = function (index) {
        //滑动的索引和速度，此处省略了速度配置
        $ionicSlideBoxDelegate.slide(index)
    }
})
.controller('Tab2Ctrl', function($scope) {})
.controller('Tab3Ctrl', function($scope) {})
.controller('Tab4Ctrl', function($scope) {})
.controller('AccountCtrl', function($scope) {});