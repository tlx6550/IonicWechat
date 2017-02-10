angular.module('starter.controller', [])
// .controller('Tab1Ctrl', function($scope,$rootScope,$state,Tab1Service,$ionicSlideBoxDelegate,$ionicTabsDelegate) {

//   $rootScope.imgUrl = server.imgUrl;

//   var classify = Tab1Service.getClassify()
//   $scope.slides = classify;
//   $scope.tabs = classify;

// console.log('$state='+$state)
//   $scope.goDetails = function (item) {
//     $state.go('tab.tab1-details', { id: item.id,title:item.title });
//     $ionicTabsDelegate.showBar(false);
// }
//   $scope.$on('$ionicView.beforeEnter',function(){
//      console.log('已经成为活动视图');
//      $ionicTabsDelegate.showBar(true);
//   })

//   var getData = function (index) {
//       var c = classify[index];
//       // 安卓平台不会自动触发加载
//       if (ionic.Platform.isAndroid()) {
//           c.doRefresh();
//       }  
//       // 初始化数据，和回调函数 
//       c.isload = false;
//       c.callback = function () {
//           $scope.$broadcast('scroll.refreshComplete');
//           $scope.$broadcast('scroll.infiniteScrollComplete');
//       }
//   }
//   getData(0);

//   //当中间页签slidebox改变的时候，让顶部tabs也改变
//   $scope.slideChanged =  function(index){
//      $ionicTabsDelegate._instances[1].select(index);
//   }
//   $scope.$on('$ionicView.afterEnter', function () {
//        // tab1.html 和 tabs共生成了两个$ionicTabsDelegate实例
//        // $ionicTabsDelegate._instances[1]表示选中第二个个 即tab1.html生成的实例
//         $ionicTabsDelegate._instances[1].select($ionicSlideBoxDelegate.currentIndex());
//     });
//     //当tabs选中的时候,调用滑动框的api方法，让滑动框和tabs联动改变
//     $scope.selectedTab = function (index) {
//         //滑动的索引和速度，此处省略了速度配置
//         $ionicSlideBoxDelegate.slide(index)
//     }
// })
.controller('BaseCtrl', function ($scope, $rootScope, $ionicSlideBoxDelegate, $ionicTabsDelegate) {
    $rootScope.imgUrl = server.imgUrl;
    //slide集合
    $scope.slides = $scope.classify;
    //顶部菜单
    $scope.tabs = $scope.classify;

    $scope.getData = function (c) {
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
    // 初始化第一个tab的数据
    $scope.getData($scope.classify[0]);


    //重要：因为页面中用了n个tabs组建，所以这里通过每个controller对应的currentTabId来判断哪个tabs来做选中操作。
    var selectTab = function (index) {
      console.log('$ionicTabsDelegate._instances='+$ionicTabsDelegate._instances)
        angular.forEach($ionicTabsDelegate._instances, function (tabs) {
          console.log('tabs.$element='+tabs.$element)
            if ($scope.currentTabId == tabs.$element[0].id) {
                tabs.select(index);
            }
        })
    }

    $scope.slideChanged = function (index) {
        var c = $scope.classify[index]
        $scope.getData(c);
        //选中tabs
        selectTab(index);
    };

    $scope.$on('$ionicView.afterEnter', function () {
        //选中tabs
        selectTab($ionicSlideBoxDelegate.currentIndex());
    });

    $scope.selectedTab = function (index) {
        //滑动的索引和速度
        $ionicSlideBoxDelegate.slide(index)
    }
    $scope.$on('$ionicView.beforeEnter', function () {
        console.log('已经成为活动视图');
        $ionicTabsDelegate.showBar(true);
    });
})
.controller('Tab1Ctrl',function($scope,$state,$controller,Tab1Service,$ionicTabsDelegate){
  $scope.classify = Tab1Service.getClassify();
  $scope.currentTabId = "tab1";
  //调用父级控制器之前先初始化需要的数据 这里要准备的就是分类 和 tab的索
  $controller('BaseCtrl',{$scope:$scope});
  $scope.goDetails = function(item,type){
    $state.go('tab.tab1-details',{id:item.id,title:item.title,type:type})
    $ionicTabsDelegate.showBar(false);
  }
})
.controller('Tab1DetailsCtrl',function($scope,$stateParams,Tab1Service){
  var id = $stateParams.id;
  $scope.title = $stateParams.title;
  Tab1Service.getDetails(id).success(function(response){
    $scope.item =response;
  })
})
.controller('Tab2Ctrl', function ($scope, $state, Tab2Service, $controller, $ionicTabsDelegate) {
        $scope.classify = Tab2Service.getTab2Menu()
        $scope.currentTabId = "tab2";
        $controller('BaseCtrl', { $scope: $scope });
        $scope.goDetails = function (item, type) {
            var title = "", name = "";
            if (item.title) {
                title += item.title;
            }
            if (item.name) {
                title += item.name;
            }
            $state.go('tab.tab2-details', { id: item.id, title: title, type: type })
            $ionicTabsDelegate.showBar(false);
        }
})
.controller('Tab3Ctrl', function($scope) {})
.controller('Tab4Ctrl', function($scope) {})
.controller('AccountCtrl', function($scope) {});