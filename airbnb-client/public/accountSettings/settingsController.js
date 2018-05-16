dashboard.controller("settingsController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){

	$scope.loggedIn = isLoggedIn.data.user.firstname;
	$scope.profielpic = isLoggedIn.data.user.profilePic;
	$scope.host = isLoggedIn.data.user.host;
	
	$scope.deleteHost = function(){
		$http({
			method : 'POST',
			url : '/deleteHost'
		}).success(function(data){
			if(data.statusCode == '200'){
				auth.login().then(function(result)
                 {
					$state.reload();
                 });
			}
		});
	};
	
	$scope.deleteAccount = function()


	{

		$http({
			method : 'POST',
			url : '/deleteAccount'
		}).success(function(data)
		{
			if(data.statusCode == '200')
			{

				auth.logout();
			}
			else{
				alert("Cannot cancel the account.Please try again after sometime");
			}

		});


		
	};
	

	$scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";

}]);
