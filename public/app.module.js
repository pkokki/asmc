angular.module('app', [
		'ui.router', 
		'ngResource', 
		'ngMaterial',
		'ngMessages',
	])
	.controller('AppController', ['$scope', '$mdSidenav', '$mdMedia', '$log', function($scope, $mdSidenav, $mdMedia, $log) {
		$scope.toggleSidebar = function() {
			$mdSidenav('left').toggle()
				.then(function(){
					$log.debug("toggle left is done");
				});
		};
		$scope.closeSidebar = function() {
			$mdSidenav('left').close()
				.then(function(){
					$log.debug("close LEFT is done");
				});
		};
		
		$scope.isSidebarLocked = function() {
			return $mdMedia('gt-md');
		}
		$log.info('App started');
	}])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
		
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/components/index.html',
			})
		;
	}]);