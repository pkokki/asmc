angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
	
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/index.html',
		})
		.state('spaceList', {
			url: '/spaces',
			templateUrl: '/spaceList.html',
			controller: 'SpaceListController'
		})
		.state('spaceItem', {
			url: '/spaces/:id',
			templateUrl: '/spaceItem.html',
			controller: 'SpaceItemController'
		})
	;
}]);