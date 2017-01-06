var app = angular.module('wechat', ['ionic']);
//这个地方的config不能少哦, 不然安卓平台的tabs会跑到顶部的
app.config(['$ionicConfigProvider', function($ionicConfigProvider) {
    console.log(9999)
    $ionicConfigProvider.tabs.position('bottom'); // other values: top

}])
// app.run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     if(window.cordova && window.cordova.plugins.Keyboard) {
//       // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//       // for form inputs)
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

//       // Don't remove this line unless you know what you are doing. It stops the viewport
//       // from snapping when text inputs are focused. Ionic handles this internally for
//       // a much nicer keyboard experience.
//       cordova.plugins.Keyboard.disableScroll(true);
//     }
//     if(window.StatusBar) {
//       StatusBar.styleDefault();
//     }
//   });
// })