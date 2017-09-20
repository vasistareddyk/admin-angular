// controller.js
angular
.module('app')
.controller('blogEdit',blogEdit)
.controller('EditBlog',EditBlog)
.controller('AddBlogs',addBlog)

//errors handlers
angular
.module('app').config(['$qProvider', function ($qProvider) {
	$qProvider.errorOnUnhandledRejections(false);
}]);
//errors handlers

//token
var Token = 'e2ec03ced50da04f2e095fdb1e8c63a2';
//token

//blog table
blogEdit.$inject = ['$scope','$http','$compile','$stateParams'];
function blogEdit($scope,$http,$compile,$stateParams) {
	setTimeout(function(){
		var mySpan = $('.page-link');
		$compile(mySpan)($scope);
	}, 500);

	var pageNo = $stateParams.pageno;
	if(pageNo < 0){
		pageNo =0
	}else{
		pageNo = pageNo -1
	}
	var defaultOpts = {
		totalPages: 20
	};
	$('#pagination-demo').twbsPagination(defaultOpts);
	$scope.pagination_click=function(){
		var currentPage = $('#pagination-demo').twbsPagination('getCurrentPage');
		$('#pagination-demo').twbsPagination('destroy');
		$('#pagination-demo').twbsPagination($.extend({}, defaultOpts, {
			startPage: currentPage
		}))
	}

	$http.get('http://localhost/prepo-server/v1/blogs/?limit=10&offset='+pageNo+'',{
		headers: {
			'P-Auth-Token': ''+Token+''
		}
	}).then(function(response) {   
		console.log(response)
		$scope.blogedits = response.data.result;
		;   
	})


	$http.get('http://localhost/prepo-server/v1/blogs/',{
		headers: {
			'P-Auth-Token': ''+Token+''
		}
	}).then(function(response) {   
		$scope.bloges = response.data.result.length;
		alert($scope.bloges)   
	})
}



//addBlogs
addBlog.$inject = ['$scope','$http'];
function addBlog($scope,$http) {
// obj
//blog-categories
$http.get('http://api.prepo.co.in/v1/blog_categories/',{
	headers: {
		'P-Auth-Token': ''+Token+''
	}
}).then(function(response) {   
	$scope.blogCategories = response.data.result;
});

$http.get('http://api.prepo.co.in/v1/authors/',{
	headers: {
		'P-Auth-Token': ''+Token+''
	}
}).then(function(response) {   
	$scope.blogAuthors = response.data.result;
});


$scope.changedValue = function(item){ 
	$scope.changed_category = item;
}

$scope.changedAuthor = function(item){ 
	$scope.changed_author = item;
}

$scope.SendData = function () {
	var name = angular.element('#bannerimage').val()
           // use $.param jQuery function to serialize data from JSON 
           var data = {
           	'title': $scope.title,
           	'slug': $scope.slug,
           	'content':$scope.description,
           	'no_of_likes': $scope.likes,
           	'banner_image':name,
           	'no_of_comments': $scope.comments,
           	'no_of_views': $scope.views,
           	'h1name':$scope.h1name,
           	'meta_title':$scope.metatitle,
           	'meta_description':$scope.metadescription,
           	'trainer_id':$scope.changed_author,
           	'blog_category_id':$scope.changed_category,
           	'status':"0",
           	'attachment':"",
           	'popular':"0",
           	'hide_banner_image':"0",
           	'review_status':"2",
           	'category_id':"0",
           	'course_id':"0",
           };
           console.log(data)

           var config = {
           	headers : {
           		'Content-Type': 'application/json',
           		'P-Auth-Token': ''+Token+''
           	}
           }

           $http.post('http://api.prepo.co.in/v1/blogs',data,config)
           .then(function(response){
           	console.log(response)
           })

       }

   }


//blog-edit id
EditBlog.$inject = ['$scope','$http','$stateParams','$location'];
function EditBlog($scope,$http,$stateParams,$location) {
	Id = $stateParams.id;
	$scope.SendData = function () {
           // use $.param jQuery function to serialize data from JSON 
           var data = {
           	'title': $scope.EditBlogS.title
           };

           var config = {
           	headers : {
           		'Content-Type': 'application/json',
           		'P-Auth-Token': ''+Token+''
           	}
           }

           $http.put('http://api.prepo.co.in/v1/blogs/?id='+Id+'',data,config)
           .then(function(response){
           	$location.path('/blogs');
           })

       }




       $http.get('http://api.prepo.co.in/v1/blogs/?id='+Id+'',{
       	headers: {
       		'P-Auth-Token': ''+Token+''
       	}
       }).then(function(response) {   
       	$scope.EditBlogS = response.data.result[0];
       	$scope.EditBlogsTitle =  response.data.result[0].title;
       	$scope.blogCategory = response.data.result.blog_category;
       });

       $http.get('http://api.prepo.co.in/v1/blog_categories/',{
       	headers: {
       		'P-Auth-Token': ''+Token+''
       	}
       }).then(function(response) {   
       	$scope.blogCategories = response.data.result;
       });
       $http.get('http://api.prepo.co.in/v1/authors/',{
       	headers:{
       		'P-Auth-Token':''+Token+''
       	}
       }).then(function(response){
       	$scope.blogAuthors = response.data.result;
       })



   }