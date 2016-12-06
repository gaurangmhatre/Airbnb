/**
 * Created by Gaurang on 15-11-2016.
 */
dashboard.controller('pendingListings',function($scope, $filter,$http){

    $scope.invalid_login = true;
    $scope.unexpected_error = true;
    
    $scope.previousBtn = false;
	$scope.nextButton = false;
    
	console.log("Admin: inside getNewListings controller.");
    var pageNo = 1;
    $scope.usersPerPage = 25;
    
    initialize(1);
    
    $scope.clickNext = function(){
    	pageNo = Number(pageNo) + 1;
    	$scope.previousBtn = true;
    	console.log("Page Number Next " + pageNo);
    	initialize(pageNo);
    };
    
    $scope.clickPrevious = function(){
    	pageNo = Number(pageNo) - 1;
    	console.log("Page Number Previous " + pageNo);
    	initialize(pageNo);
    };
    
    function initialize(pageNumber) {
    	console.log("Page Clicked "+pageNumber);
        $http({
            method: "POST",
            url: '/adminGetAllNewListing',
            data: {
            	'pageNumber': pageNumber,
            	'usersPerPage': $scope.usersPerPage
            }
        }).success(function (data) {
            console.log("inside success");
            console.log(data);

            $scope.pendingListings = data;
            if(data.length == '25'){
            	$scope.nextButton = true;
            }

        }).error(function (error) {
            console.log("inside error");
            console.log(error);

        });
    }


    $scope.setStatusForPendingListing = function(pendingListing,status){
        console.log("Inside setStatusForPendingListing.");

          $http({
                method: "POST",
                url: '/setStatusForPendingListing',
                data: {
                    pendingListing: pendingListing,
                    status: status
                }
            }).success(function (data) {
                console.log("inside success");
                initialize();
                window.location.assign("#/pendingListings");
                //set all variables.

            }).error(function (error) {
                console.log("inside error");
                console.log(error);

                initialize();
            });

    }

});