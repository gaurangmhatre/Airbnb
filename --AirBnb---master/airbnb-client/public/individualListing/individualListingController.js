/**
 * http://usejsdoc.org/
 */
dashboard.controller("individualListingController", function($scope,$http ,$state,$stateParams,isLoggedIn,auth,logger){

    console.log("reached trips controller");

    $scope.propertyClicked= function(property){
        logger.write('individualListing',property.title,property.city);
    };


    $scope.showBill = false;

    $scope.loggedIn=true;
    console.log(isLoggedIn);

    $scope.profilePic=isLoggedIn.data.user.profilePic;

    $scope.host=isLoggedIn.data.user.host;
    console.log(auth.getUserInfo());

    $scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";


    $scope.userName = isLoggedIn.data.user.email;

    //$scope.listingDetails = $stateParams.listing;

	/*$scope.x = { "eachListing" : $cookieStore.get('eachListing')};
	console.log("Cookies eachListing:"+$scope.x);*/


	//$scope.listingDetails = $scope.x.eachListing;

	if (typeof(Storage) !== "undefined") {
		$scope.listingDetails=JSON.parse(localStorage.eachListing);
		console.log("$scope.listingDetails"+ $scope.listingDetails);

	} else {
		$scope.listingDetails = $stateParams.listing;
	}



    $scope.availableFrom = new Date($scope.listingDetails.fromDate).toISOString().split('T')[0];
    $scope.availableTo = new Date($scope.listingDetails.toDate).toISOString().split('T')[0];

    $scope.listingUrl = $scope.listingDetails.listingImages[0][0];

    $scope.hostProfilePic = $scope.listingDetails.hostProfilePic;

    $scope.listingReviewsNumber = $scope.listingDetails.review.length;

    $scope.hostName = $scope.listingDetails.hostName;

    $scope.noOfBedroom = 2;

    $scope.listId = $scope.listingDetails.listId;

    console.log("List iD: " + $scope.listId);

    $scope.noOfBedroom = 2;

    $scope.noOfGuests = $scope.listingDetails.guestAllowed;

    $scope.noOfReviews = $scope.listingDetails.review.length;

    $scope.clientProfilePic = '/individualListing/2.jpg';

    $scope.clientName = "Denis";

    $scope.clientComment = "A great apartment in a great location. The metro was very close and you were not far from Romes major attractions. The apartment was spacious, wifi worked perfectly and there were plenty of places to eat and shop nearby. Claudio was helpfull and reliable.";

    $scope.noGuests = [];

    for(var i = 1 ; i <= $scope.noOfGuests ; i++ ){
        $scope.noGuests.push(i);
    }

    $scope.ratings =
        {
            current: $scope.listingDetails.overAllRating,
            max: 5
        };

    $scope.myInterval = 4000;
    $scope.noWrapSlides = false;
    $scope.active = 0;

    $scope.slides = [];
    //Fetching URL for Images
    var image = {};
    for(var j=0;j<$scope.listingDetails.listingImages[0].length;j++)
    {
        console.log("Images for prop"+$scope.listingDetails.listingImages[0][j]);
        image = {
            image: $scope.listingDetails.listingImages[0][j],
            id:j
        };
        $scope.slides.push(image);
    }


///////////////////////////////////
    // Reviews Average Calculation
    //
//////////////////////////////////

    var accuracy = 0;
    var comm = 0;
    var loc = 0;
    var clean = 0;
    var val = 0;
    var checkIn = 0;
    $scope.userReviews = [];
    var eachUser = {};
    var listReviewImages = [];

    for(var j=0;j<$scope.listingDetails.review.length;j++)
    {
        accuracy += (($scope.listingDetails.review[j].ratings.accuracy*1)==null) ? 0 : $scope.listingDetails.review[j].ratings.accuracy*1;
        comm += (($scope.listingDetails.review[j].ratings.communication*1)==null) ? 0 : $scope.listingDetails.review[j].ratings.communication*1;
        loc += (($scope.listingDetails.review[j].ratings.location*1)==null) ? 0 : $scope.listingDetails.review[j].ratings.location*1;
        clean += (($scope.listingDetails.review[j].ratings.clean*1)==null) ? 0 : $scope.listingDetails.review[j].ratings.clean*1;
        val += (($scope.listingDetails.review[j].ratings.value*1)==null) ? 0 : $scope.listingDetails.review[j].ratings.value*1;
        checkIn += (($scope.listingDetails.review[j].ratings.checkIn*1)==null) ? 0 : $scope.listingDetails.review[j].ratings.checkIn*1;

        if($scope.listingDetails.review[j].feedback != null){
            eachUser.userName = $scope.listingDetails.review[j].userName;
            eachUser.userEmail = $scope.listingDetails.review[j].userEmail;
            eachUser.profilePic = $scope.listingDetails.review[j].profilePic;
            eachUser.feedback = $scope.listingDetails.review[j].feedback.overall;
            if($scope.listingDetails.review[j].listReviewImages == null){
                eachUser.listReviewImages = $scope.listingDetails.review[j].listReviewImages;
                eachUser.imageFlag = false;
            }
            else{
                eachUser.imageFlag = true;
                for(var k=0;k<$scope.listingDetails.review[j].listReviewImages.length;k++){
                    listReviewImages.push($scope.listingDetails.review[j].listReviewImages[k]);
                }
                eachUser.listReviewImages = listReviewImages;
            }
            $scope.userReviews.push(eachUser);
            eachUser = {};
            listReviewImages = [];
        }
    }
    console.log("$scope.userReviews: "+$scope.userReviews);
    $scope.accuracyRatings =
        {
            current: (accuracy/$scope.listingDetails.review.length),
            max: 5
        };
    $scope.communicationRatings =
        {
            current: (comm/$scope.listingDetails.review.length),
            max: 5
        };
    $scope.cleanRatings =
        {
            current: (clean/$scope.listingDetails.review.length),
            max: 5
        };
    $scope.locationRatings =
        {
            current: (loc/$scope.listingDetails.review.length),
            max: 5
        };
    $scope.checkInRatings =
        {
            current: (checkIn/$scope.listingDetails.review.length),
            max: 5
        };
    $scope.valueRatings =
        {
            current: (val/$scope.listingDetails.review.length),
            max: 5
        };



///////////////////////////////////
    // Reviews Average Calculation
    // END
//////////////////////////////////

    $scope.calcBill = function () {
        $(".bookTripDiv").css({"height":"200px"});
        var currentDate = new Date().toISOString().split('T')[0];
        if($scope.checkInDate == undefined || $scope.checkOutDate == undefined){
            $scope.showBill = false;
            return;
        }
        else{
            if($scope.checkInDate > $scope.checkOutDate){
                $scope.datesNotAvailable = true;
                $scope.showBill = false;
                $scope.msgdates = "CheckIn date should be before CheckOut date";
                return;
            }

            var indate = $scope.checkInDate;
            $scope.checkindate = indate.toISOString().split('T')[0];

            var outdate = $scope.checkOutDate;
            $scope.checkoutdate= outdate.toISOString().split('T')[0];
            if($scope.checkindate === $scope.checkoutdate){
                $scope.datesNotAvailable = true;
                $scope.showBill = false;
                $scope.msgdates = "CheckIn date and CheckOut date cannot be same";
                return;
            }

            else if($scope.checkindate < currentDate){
                $scope.datesNotAvailable = true;
                $scope.showBill = false;
                $scope.msgdates = "Please select a date after current date";
                return;
            }

            else if($scope.checkindate < new Date($scope.listingDetails.fromDate).toISOString().split(' ')[0]){
                $scope.datesNotAvailable = true;
                $scope.showBill = false;
                $scope.msgdates = "CheckIn date should be after "+new Date($scope.listingDetails.fromDate).toISOString().split('T')[0];
                return;
            }

            else if($scope.checkoutdate > new Date($scope.listingDetails.toDate).toISOString().split(' ')[0]){
                $scope.datesNotAvailable = true;
                $scope.showBill = false;
                $scope.msgdates = "CheckOut date should be before "+new Date($scope.listingDetails.toDate).toISOString().split('T')[0];
                return;
            }
            else{
                $(".bookTripDiv").css({"height":"300px"});
                var timeDiff = Math.abs($scope.checkOutDate.getTime() - $scope.checkInDate.getTime());
                $scope.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                $scope.totalPrice =  ($scope.listingDetails.fixedPrice * $scope.diffDays);
                $scope.datesNotAvailable = false;
                $scope.showBill = true;
            }
        }
    }

    $scope.bookListing = function(){

        //Removing Time Stamp From CheckIn/Out Dates
        var currentDate = new Date().toISOString().split('T')[0];

        if($scope.checkInDate == undefined || $scope.checkOutDate == undefined){
            $scope.datesNotAvailable = true;
            $scope.msgdates = "Please select both CheckIn and CheckOut Date";
            return;
        }

        if($scope.guestsSelected  == undefined){
            $scope.datesNotAvailable = true;
            $scope.msgdates = "Please select number of Guests";
            return;
        }

        if($scope.checkInDate > $scope.checkOutDate){
            $scope.datesNotAvailable = true;
            $scope.msgdates = "CheckIn date should be before CheckOut date";
            return;
        }

        else{

            var indate = $scope.checkInDate;
            $scope.checkindate = indate.toISOString().split('T')[0];

            var outdate = $scope.checkOutDate;
            $scope.checkoutdate= outdate.toISOString().split('T')[0];
            if($scope.checkindate === $scope.checkoutdate){
                $scope.datesNotAvailable = true;
                $scope.msgdates = "CheckIn date and CheckOut date cannot be same";
                return;
            }

            else if($scope.checkindate < currentDate){
                $scope.datesNotAvailable = true;
                $scope.msgdates = "Please select a date after current date";
                return;
            }

            else if($scope.checkindate < new Date($scope.listingDetails.fromDate).toISOString().split(' ')[0]){
                $scope.datesNotAvailable = true;
                $scope.msgdates = "CheckIn date should be after "+new Date($scope.listingDetails.fromDate).toISOString().split('T')[0];
            }

            else if($scope.checkoutdate > new Date($scope.listingDetails.toDate).toISOString().split(' ')[0]){
                $scope.datesNotAvailable = true;
                $scope.msgdates = "CheckOut date should be before "+new Date($scope.listingDetails.toDate).toISOString().split('T')[0];
                return;
            }
            else{
                $http({

                    method : "POST",
                    url: '/checkDates',
                    data: {


                        "listId": $scope.listId,
                        "checkInDate":$scope.checkindate,
                        "checkOutDate": $scope.checkoutdate


                    }
                }).success(function(data)

                {
                    console.log("Status Code " + data.statusCode);
                    if(data.statusCode==200)
                    {
                        console.log("Dates Available");
                        console.log(data);

                        localStorage.setItem("listing", JSON.stringify($scope.listingDetails));
                        localStorage.setItem("checkInDate", JSON.stringify($scope.checkInDate));
                        localStorage.setItem("checkOutDate", JSON.stringify($scope.checkOutDate));
                        localStorage.setItem("guestsSelected", JSON.stringify($scope.guestsSelected));
                        localStorage.setItem("totalPrice", JSON.stringify($scope.totalPrice));
                        localStorage.setItem("hostProfilePic", JSON.stringify($scope.hostProfilePic));




                        $state.go("bookTrip", {"listing" : $scope.listingDetails, "checkInDate" : $scope.checkInDate, "checkOutDate" : $scope.checkOutDate, "guestsSelected" : $scope.guestsSelected, "totalPrice" :  $scope.totalPrice });



                    }
                    else if(data.statusCode==401)
                    {

                        console.log("Dates Not Available");
                        var bookedDates = data.bookedDates;
                        console.log(bookedDates);
                        $scope.datesNotAvailable = true;
                        $scope.msgdates = "Property already booked for the selected dates";

                    }
                    else{

                        $scope.datesNotAvailable = true;
                        $scope.msgdates = "You already have booked this property for the selected dates";

                    }


                })
            }
        }
    }
});