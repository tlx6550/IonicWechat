angular.module('starter.services', [])
//name：菜单名
// isload：是否加载
// url：接口
// page：页数
// row：每页请求的条数(暂时没用到，这里做为备用参数)，现在的页数都是用的全局配置config.js中的settings.rows
// items:数据列表
// loadMore：上拉加载更多 。
// doRefresh：下拉刷新。
// callback：回掉函数，在loadMore和doRefresh操作完成都会调用该函数。
// //提取公共服务层BaseService
.service('BaseService', function ($http) {
    this.loadMore = function ($this) {
      console.log("正在加载更多数据..." + $this.page);
      $http.get($this.url + "?page=" + $this.page + "&rows=" + settings.rows).success(function (response) {
        console.log(response);
        if (response.tngou.length > 0) {
          $this.items = $this.items.concat(response.tngou);
          $this.page++;
        } else {
          console.log("没有数据了...")
          $this.isload = true;
        }
        $this.callback();
      });
    }
    this.doRefresh = function ($this) {
      console.log("正在执行refresh操作(提取公共服务)...");
       $http.get($this.url + "?page=1&rows=" + settings.rows).success(function (response) {
         console.log(response);
         $this.page = 2;
         $this.items = response.tngou;
         $this.callback();
         $this.isload = false;
       });
    }
  })
    .service('Tab1Service', function ($http,BaseService) {
     this.getDetails = function(id){
        return $http.get(urls.info_show + id);
    }
    this.getClassify = function () {
      return [
        {
          name: '健康资讯', isload: true, url: server.domain + '/info/list',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '健康知识', isload: true, url: server.domain + '/lore/list',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '健康问答', isload: true, url: server.domain + '/ask/list',
          page: 1, rows: 20,
          items: [],
           loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        } 
      ]
    } 
  })
.service('Tab2Service', function ($http) {
var loadMore = function ($this) {
  console.log("正在加载更多数据..." + $this.page);
  $http.get($this.url + "?page=" + $this.page + "&rows=" + settings.rows).success(function (response) {
    console.log(response);
    if (response.list) {
      $this.items = $this.items.concat(response.list);
      $this.page++;
    } else {
      console.log("没有数据了...")
      $this.isload = true;
    }
    $this.callback();
  });
}

var doRefresh = function ($this) {
  console.log("正在执行refresh操作...");
  $http.get($this.url + "?page=1&rows=" + settings.rows).success(function (response) {
    console.log(response);
    if (response.list) {
      $this.page = 2;
      $this.items = response.list;
    }
    $this.callback();
    $this.isload = true;
  });
}
this.getTab2Menu = function () {
  return [
    {
      name: '疾病查询', isload: true, url: server.domain + '/disease/list', type: 'disease',
      page: 1, rows: 20,
      items: [],
      loadMore: function () {
        loadMore(this);
      },
      doRefresh: function () {
        doRefresh(this);
      },
      callback: function () {
        //回掉函数
      }
    },
    {
      name: '病状查询', isload: true, url: server.domain + '/symptom/list', type: 'symptom',
      page: 1, rows: 20,
      items: [],
      loadMore: function () {
        loadMore(this);
      },
      doRefresh: function () {
        doRefresh(this);
      },
      callback: function () {
        //回掉函数
      }
    },
    {
      name: '检查项目', isload: true, url: server.domain + '/check/list', type: 'check',
      page: 1, rows: 20,
      items: [],
      loadMore: function () {
        loadMore(this);
      },
      doRefresh: function () {
        doRefresh(this);
      },
      callback: function () {
        //回掉函数
      }
    },
    {
      name: '手术项目', isload: true, url: server.domain + '/operation/list', type: 'operation',
      page: 1, rows: 20,
      items: [],
      loadMore: function () {
        loadMore(this);
      },
      doRefresh: function () {
        doRefresh(this);
      },
      callback: function () {
        //回掉函数
      }
    }
  ]
}
})
.service('Tab3Service', function (BaseService) {
this.getTab3Menu = function () {
  return [
    {
      name: '社会热点', isload: true, url: server.domain + '/top/list', type: 'top',
      page: 1, rows: 20,
      items: [],
      loadMore: function () {
        BaseService.loadMore(this);
      },
      doRefresh: function () {
        BaseService.doRefresh(this);
      },
      callback: function () {
        //回掉函数
      }
    },
    {
      name: '健康菜谱', isload: true, url: server.domain + '/cook/list', type: 'cook',
      page: 1, rows: 20,
      items: [],
      loadMore: function () {
        BaseService.loadMore(this);
      },
      doRefresh: function () {
        BaseService.doRefresh(this);
      },
      callback: function () {
        //回掉函数
      }
    },
    {
      name: '健康食品', isload: true, url: server.domain + '/food/list', type: 'food',
      page: 1, rows: 20,
      items: [],
      loadMore: function () {
        BaseService.loadMore(this);
      },
      doRefresh: function () {
        BaseService.doRefresh(this);
      },
      callback: function () {
        //回掉函数
      }
    }
  ]
}
})
.service('Tab4Service', function ($http, BaseService) { 
    this.getTab4Menu = function () {
      return [
        {
          name: '农业新闻', isload: true, url: server.domain + '/news/list', type: 'news',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        },
        {
          name: '农业技术', isload: true, url: server.domain + '/tech/list', type: 'tech',
          page: 1, rows: 20,
          items: [],
          loadMore: function () {
            BaseService.loadMore(this);
          },
          doRefresh: function () {
            BaseService.doRefresh(this);
          },
          callback: function () {
            //回掉函数
          }
        }
      ]
    } 
    this.getDetails = function (type, id) {
      var url = server.domain + "/" + type + "/show?id=" + id + "&callback=JSON_CALLBACK";
      return $http.jsonp(url);
    }
})