/**
 * http://usejsdoc.org/
 */
dashboard.controller("individualAuctionableListingController", function($scope,$filter,$http ,$state,$stateParams, isLoggedIn,auth){

    console.log("reached trips controller");
    $scope.disableDates = true;
    $scope.showBill = false;

    $scope.loggedIn=true;
    console.log(isLoggedIn);

    $scope.profilePic=isLoggedIn.data.user.profilePic;
    $scope.userName=isLoggedIn.data.user.firstname;

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
        $scope.listingDetails=JSON.parse(localStorage.eachListingauction);
        console.log("$scope.listingDetails"+ $scope.listingDetails);

    } else {
        $scope.listingDetails = $stateParams.listing;
    }



    $scope.availableFrom = new Date($scope.listingDetails.fromDate).toISOString().split('T')[0];
    $scope.availableTo = new Date($scope.listingDetails.toDate).toISOString().split('T')[0];

    $scope.listingUrl = $scope.listingDetails.listingImages[0][0];

    $scope.hostProfilePic = $scope.listingDetails.hostProfilePic;

    $scope.listingReviewsNumber = 10;

    $scope.hostName = $scope.listingDetails.hostName;

    $scope.noOfBedroom = 2;

    $scope.listId = $scope.listingDetails.listId;

    console.log("List iD: " + $scope.listId);

    $scope.noOfBedroom = 2;

    $scope.noOfGuests = $scope.listingDetails.guestAllowed;

    $scope.noOfReviews = 3;

    $scope.clientProfilePic = '/individualListing/2.jpg';

    $scope.clientName = "Denis";

    $scope.clientComment = "A great apartment in a great location. The metro was very close and you were not far from Romes major attractions. The apartment was spacious, wifi worked perfectly and there were plenty of places to eat and shop nearby. Claudio was helpfull and reliable.";

    $scope.noGuests = [];

    for(var i = 1 ; i <= $scope.noOfGuests ; i++ ){
        $scope.noGuests.push(i);
    }

    $scope.ratings =
        {
            current: 3,
            max: 5
        };

    $scope.myInterval = 4000;
    $scope.noWrapSlides = false;
    $scope.active = 0;

    $scope.slides = [];
    //Fetching URL for Images
    var image = {};
    for(j=0;j<$scope.listingDetails.listingImages[0].length;j++)
    {
        console.log("Images for prop"+$scope.listingDetails.listingImages[0][j]);
        image = {
            image: $scope.listingDetails.listingImages[0][j],
            id:j
        };
        $scope.slides.push(image);
    }

    $scope.checkOutDate = new Date($scope.listingDetails.toDate);
    $scope.checkInDate = new Date($scope.listingDetails.fromDate);

    $scope.calcBill = function () {

        if($scope.guestsSelected  == undefined){
            $(".bookTripDiv").css({"height":"200px"});
        }

        else{
            $(".bookTripDiv").css({"height":"375px"});
            var timeDiff = Math.abs($scope.checkOutDate.getTime() - $scope.checkInDate.getTime());
            $scope.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            $scope.totalPrice =  ($scope.listingDetails.auctionPrice * $scope.diffDays);
            $scope.datesNotAvailable = false;
            $scope.showBill = true;
        }
    };

    $scope.bidForListing = function(){

        //Removing Time Stamp From CheckIn/Out Dates
        if($scope.guestsSelected  == undefined){
            $scope.datesNotAvailable = true;
            $scope.msgdates = "Please select number of Guests";
            return;
        }

        else if($scope.bidAmount  == undefined){
            $scope.datesNotAvailable = true;
            $scope.msgdates = "Please Enter your Bid";
            return;
        }

        else if($scope.bidAmount  < $scope.totalPrice){
            $scope.datesNotAvailable = true;
            $scope.msgdates = "Bid should be more than Minimum Bid Amount";
            return;
        }

        else{

            $http({

                method : "POST",
                url: '/placeBid',
                data: {

                    "userEmail" : $scope.userName,
                    "hostEmail":$scope.listingDetails.hostId,
                    "listId": $scope.listingDetails.listId,
                    "listingDetails": $scope.listingDetails,
                    "bidAmount": $scope.bidAmount,
                    "totalPrice": $scope.totalPrice,
                    "guestsSelected" : $scope.guestsSelected,
                    "userName" : $scope.userName,
                    "hostName" : $scope.listingDetails.hostName


                }
            }).success(function(data)

            {
                console.log("Status Code " + data.statusCode);
                if(data.statusCode==200)
                {
                    alert("Bid Placed Successfully");
                }
                else
                {
                    alert("Error Occured Please try again");
                }


            })

        }
    }
});