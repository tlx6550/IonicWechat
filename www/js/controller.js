angular.module('starter.controller', [])
.controller('Tab1Ctrl', function($scope,$rootScope,$state,Tab1Service,$ionicSlideBoxDelegate,$ionicTabsDelegate) {

  $rootScope.imgUrl = server.imgUrl;

  var classify = Tab1Service.getClassify()
  $scope.slides = classify;
  $scope.tabs = classify;

console.log('$state='+$state)
  $scope.goDetails = function (item) {
    $state.go('tab.tab1-details', { id: item.id,title:item.title });
    $ionicTabsDelegate.showBar(false);
}
  $scope.$on('$ionicView.beforeEnter',function(){
     console.log('已经成为活动视图');
     $ionicTabsDelegate.showBar(true);
  })

  var getData = function (index) {
      var c = classify[index];
      // 安卓平台不会自动触发加载
      if (ionic.Platform.isAndroid()) {
          c.doRefresh();
      }  
      // 初始化数据，和回调函数 
      c.isload = false;
      c.callback = function () {
          $scope.$broadcast('scroll.refreshComplete');
          $scope.$broadcast('scroll.infiniteScrollComplete');
      }
  }
  getData(0);

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
.controller('Tab1DetailsCtrl',function($scope,$stateParams,Tab1Service){
  var id = $stateParams.id;
  $scope.title = $stateParams.title;
  Tab1Service.getDetails(id).success(function(response){
    $scope.item =response;
  })
})
.controller('Tab2Ctrl', function($scope) {})
.controller('Tab3Ctrl', function($scope) {})
.controller('Tab4Ctrl', function($scope) {})
.controller('AccountCtrl', function($scope) {});