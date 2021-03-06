'use strict';

angular.module('bitCrowdFundsApp')
 .controller('EditprojectCtrl', function ($scope, $routeParams, $http, $location, ProjectRes, Auth)
 {
	$scope.message = '';
	$scope.nameProject = $routeParams.name;
	var currentUser = Auth.getCurrentUser();
	$scope.currentProject = ProjectRes.get({name: $scope.nameProject});

  $scope.isAdmin = function ()
  {
    if (currentUser.role === 'admin')
    {
      return true;
    }
    return false;
  };

	//var $scope.asAccess = false;
	if ((currentUser.role !== 'admin') && (currentUser.name !== $scope.currentProject.Owner))
  {
		$location.path('/projects');
  }

	$scope.editProject = function ()
	{
		/*var res = ProjectRes.update($scope.nameProject, $scope.currentProject);
		if (!res)
			return $scope.message = "Fail to update";
		$scope.message = "Project updated";*/

		var obj =
		{
			user: {
				name: currentUser.name,
				id: currentUser._id,
				role: currentUser.role
			},
			project: $scope.currentProject
		};
		$http.put('api/projects/'+$scope.currentProject.slug, obj)
		.success(function()
		{
			$scope.message = 'Project updated';
		})
		.error(function()
		{
			$scope.message = 'Fail to update';
		});
	};

  $scope.returnFunds = function ()
  {
    if (currentUser.role === 'admin')
    {
      $http.put('api/projects/'+$scope.currentProject.slug+'/returnFunds', {})
      .success(function()
      {
        $scope.message = 'Funds returned';
      })
      .error(function()
      {
        $scope.message = 'Fail to return Funds';
      });
    }
  };
 });
