//这里声明了一个模块, 名字叫wechat.routes, 等会要在app.js中注入这个模块, 才会生效
angular.module('wechat', ['ionic','ui.router'])
 function config($stateProvider, $urlRouterProvider) {
    //默认状态是tab.message
    $urlRouterProvider.otherwise("/tab/message");
    $stateProvider
        //如果是tab状态被激活, 加载tabs.html模板, 注意这里的abstract: true, 表示tab只有在子状态显示的时候, 它才显示, 它本身是无法主动被激活的
        .state("tab", {
            url: "/tab",
            abstract: true,
            templateUrl: "templates/tabs.html",
        })
        //tab.message状态被激活,会显示tab-message.html模板, tab.message状态是在tabs.html中的ui-sref中设置的. 同时注意views中的tab-message名字, 这个也需要跟tabs.html中的ion-nav-view中的name一致哦
        .state('tab.message', {
            url: '/message',
            views: {
                'tab-message': {
                    templateUrl: 'templates/tab-message.html',
                }
            }
        })
        .state('tab.friends', {
            url: '/friends',
            views: {
                'tab-friends': {
                    templateUrl: 'templates/tab-friends.html',
                }
            }
        })
}
 angular
.module('wechat')
.config(['$stateProvider', '$urlRouterProvider', config]);
