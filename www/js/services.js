angular.module('starter.services', [])
    .service('Tab1Service',function($http){
        // var domain =  "http://10.1.28.125:8100";
        this.getClassify = function(){
            return [
            { name: '健康资讯', viewable: true, url: domain + '/info/list', page: 1, rows: 20 },
            { name: '健康知识', viewable: false, url: domain + '/lore/list', page: 1, rows: 20 },
            { name: '健康问答', viewable: false, url: domain + '/ask/list', page: 1, rows: 20 },
            { name: '健康图书', viewable: false, url: domain + '/book/list', page: 1, rows: 20 }
          ]
        }

        this.getList = function (url,page,rows){
            return $http.post(url,{page:page,rows:rows})
        }
    })