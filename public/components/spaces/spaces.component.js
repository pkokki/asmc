angular.module('app')
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
		
		$stateProvider
			.state('spaceList', {
				url: '/spaces',
				templateUrl: '/components/spaces/spaceList.html',
				controller: 'SpaceListController'
			})
			.state('spaceItem', {
				url: '/spaces/:id',
				templateUrl: '/components/spaces/spaceItem.html',
				controller: 'SpaceItemController'
			})
		;
	}])
	
	.factory('Spaces', ['$resource', function($resource){
		return $resource('/api/spaces/:id', null, {
			'update': { method:'PUT' }
		});
    }])
	
	.controller('SpaceListController', ['$scope', 'Spaces', function ($scope, Spaces) {
		$scope.spaces = Spaces.query();
		$scope.editing = [];
		$scope.save = function(){
			if(!$scope.newSpace.name || $scope.newSpace.name.length < 1) 
				return;
			var space = new Spaces($scope.newSpace);
			space.$save(function(){
				$scope.spaces.push(space);
				$scope.newSpace = {}; // clear values
			});
		}
		
		$scope.update = function(index){
			var space = $scope.spaces[index];
			Spaces.update({id: space._id}, space);
			$scope.editing[index] = false;
		}
		
		$scope.edit = function(index){
			$scope.editing[index] = angular.copy($scope.spaces[index]);
		}
		
		$scope.cancel = function(index){
			$scope.spaces[index] = angular.copy($scope.editing[index]);
			$scope.editing[index] = false;
		}
    }])
	
	.controller('SpaceItemController', ['$scope', '$location', '$stateParams', 'Spaces', function ($scope, $location, $stateParams, Spaces) {
		$scope.space = Spaces.get({id: $stateParams.id });
		$scope.update = function(){
			Spaces.update({id: $scope.space._id}, $scope.space, function(){
				$location.url('/spaces');
			});
		}
    }])