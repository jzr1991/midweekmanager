var app=angular.module("app",["ngRoute"]);angular.module("app").controller("PostsCtrl",["$scope","PostsService",function(t,e){t.user="jackroberts",t.addPost=function(){t.postBody&&e.create({username:t.user,body:t.postBody}).success(function(e){t.posts.unshift(e),t.postBody=null})},e.fetch().success(function(e){t.posts=e})}]),angular.module("app").service("PostsService",["$http",function(t){this.fetch=function(){return t.get("/api/posts")},this.create=function(e){return t.post("/api/posts",e)}}]),angular.module("app").config(["$routeProvider",function(t){t.when("/",{controller:"PostsCtrl",templateUrl:"posts.html"}).when("/register",{controller:"RegisterCtrl",templateUrl:"register.html"}).when("/login",{controller:"LoginCtrl",templateUrl:"login.html"})}]);