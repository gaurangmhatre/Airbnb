dashboard.controller("manageListingsController",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){
	$scope.loggedIn = isLoggedIn.data.user.firstname;
	$scope.profilepic = isLoggedIn.data.user.profilePic;
	$scope.host = isLoggedIn.data.user.host;
	$scope.listings = [];
	$scope.id ='';
	
	$http({
			method : 'POST',
			url : '/yourListings',
			data: {
				'username' : isLoggedIn.data.user.email,
			}
		}).success(function(data){
			console.log("Data Returned"+data);

			if(data.statusCode == '200'){
				$scope.message = '';
				$scope.total_count = data.listings.length;
				console.log("count "+$scope.total_count);
				for(var i =0;i<data.listings.length;i++){
					var pushedList = {};
					console.log(data.listings[i].status);
					if(data.listings[i].status === "newListing"){
						pushedList.id = data.listings[i]._id;
						pushedList.listId = data.listings[i].listId;
						pushedList.name = data.listings[i].title +" at "+data.listings[i].address[0].city + ", " + data.listings[i].address[0].state + ", " + data.listings[i].address[0].country;
						pushedList.title = data.listings[i].title;
						pushedList.description = data.listings[i].description;
						pushedList.fixedPrice = data.listings[i].fixedPrice;
						pushedList.auctionPrice = data.listings[i].auctionPrice;
						pushedList.guestNumber = data.listings[i].guestAllowed;
						pushedList.fromDate = data.listings[i].fromDate;
						pushedList.toDate = data.listings[i].toDate;
						pushedList.images = data.listings[i].listingImages[0][0];
						$scope.listings.push(pushedList);
					}
				}
			}else{
				$scope.message = data.message;
			}
		});
		
	$scope.removeListing = function(list_id){
		console.log(list_id);
		$http({
			method: "POST",
			url: "/deleteListing",
			data: {
				'id': list_id,
				'status': 'Unlisted'
			}
		}).success(function(data){
			//checking the response data for statusCode
			console.log(data);
			console.log("When deleted pressed"+data.statusCode);
			if(data.statusCode === '200'){
				$state.reload();
			}
		});
	};
	
	$scope.getList = function(id){
		$scope.id = id;
		console.log("Inside get list "+$scope.listings);
		for(var i=0;i<$scope.listings.length;i++){
			if($scope.listings[i].id == id){
				$scope.title = $scope.listings[i].title;
				$scope.fixedPrice = $scope.listings[i].fixedPrice;
				$scope.auctionPrice = $scope.listings[i].auctionPrice;
				$scope.noOfGuests = $scope.listings[i].guestNumber;
				var formatToDate = new Date($scope.listings[i].toDate.toString());
				var formatFromDate = new Date($scope.listings[i].fromDate.toString());
				$scope.toDate = formatToDate;
				$scope.fromDate = formatFromDate;
			} 	
		}
	};

	$scope.editList=function(title,fromDate,toDate,fixedPrice,auctionPrice,noOfGuests){
		console.log("Date "+fromDate);
		$http({
			method: "POST",
			url: "/editListing",
			data: {
				'title': title,
				'fromDate': fromDate,
				'toDate': toDate,
				'fixedPrice': fixedPrice,
				'auctionPrice': auctionPrice,
				'noOfGuests': noOfGuests,
				'id': $scope.id
			}
		}).success(function(data){
			//checking the response data for statusCode
			console.log(data);
			console.log("When edit pressed"+data.statusCode);
			if(data.statusCode == '200'){
				$scope.message = "Changes saved successfully!";
				$("#myModal").on("hidden.bs.modal",function(){
					$state.reload();
				});
			}else{
				$scope.message = "Oops!Something went wrong.";
			}
		});
	};

    $scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";

}]);