/**
 * http://usejsdoc.org/
 */
dashboard.controller("previousTripsController", function($scope,$http ,$state,isLoggedIn,auth){



console.log("reached previousTripsController controller");

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

    //$scope.paymentButton=[];

    $scope.billButton=[];


   $http({

        method : "POST",
        url: '/getPreviousTrips',
        data: {


            "userEmail": $scope.userName



        }
    }).success(function(data)

    {
        console.log("Status Code " + data.statusCode);
        if(data.statusCode==200)
        {
            console.log("Fetched Pending Trips ");
            console.log(data);
            $scope.previousTrips = data.pendingTrips;

            for(var i=0;i< $scope.previousTrips.length;i++)
            {

                if($scope.previousTrips[i].tripStatus=="tripCancelledbyUser")

                {
                    console.log("button:"+$scope.previousTrips[i].tripStatus);
                    $scope.billButton.push(true);

                }
            }
        }

        else
            {
            alert("No Trips Found for this user");
                $scope.noTripsfound = true;
                $scope.noTrips = "No Trips Found"
        }


    })


    $scope.viewBill= function(tripId)
    {
        console.log("fetching bill for "+tripId);

        console.log($scope.previousTrips);

        for(var i=0;i<$scope.previousTrips.length;i++)
        {
            console.log(i);
            if($scope.previousTrips[i].tripId == tripId)
            {

                $scope.billUserName = $scope.previousTrips[i].userName;
                console.log("Username:"+$scope.billUserName);
                $scope.tripId = $scope.previousTrips[i].tripId;
                $scope.listingCity=$scope.previousTrips[i].listingCity;
                $scope.listingTitle = $scope.previousTrips[i].listingTitle;
                $scope.streetAddress = $scope.previousTrips[i].streetAddress;
                var checkindate = new Date($scope.previousTrips[i].checkInDate);
                $scope.checkInDate = checkindate.toISOString().split('T')[0];
                console.log("checkIn date:"+$scope.checkInDate);
                var checkoutdate = new Date($scope.previousTrips[i].checkOutDate);
                $scope.checkOutDate = checkoutdate.toISOString().split('T')[0];
                $scope.fixedPrice = $scope.previousTrips[i].fixedPrice;
                $scope.guestsSelected = $scope.previousTrips[i].guestsSelected;
                $scope.cardNumber = $scope.previousTrips[i].cardNumber.substring(12,16);
                $scope.hostEmail = $scope.previousTrips[i].hostEmail;

                var timeDiff = Math.abs(checkindate.getTime() - checkoutdate.getTime());
                $scope.diffDays1 = Math.ceil(timeDiff / (1000 * 3600 * 24));



            }


        }

    }



    $scope.viewHostProfile = function(hostEmail)

    {
        console.log("HostEmail for getting profile:"+hostEmail);

        $http({

            method: "GET",
            url: '/userProfile',
            params: {

                "userEmail": hostEmail
            }
        }).success(function (data) {
            console.log("Status Code " + data.statusCode);
            if (data.statusCode == 200) {
                console.log("Fetched profile details");
                console.log(data);
                $scope.fname = data.profile.firstname;
                $scope.lname = data.profile.lastname;
                $scope.gender = data.profile.gender;
                $scope.dob = data.profile.birthday;
                $scope.email = data.profile.email;
                $scope.pNumber = data.profile.phoneNumber;
                $scope.language = data.profile.preferLang;
                $scope.currency = data.profile.preferCurr;
                $scope.stAddress = data.profile.streetAddress;
                $scope.city = data.profile.city;
                $scope.state = data.profile.state;
                $scope.country = data.profile.country;
                $scope.zipCode = data.profile.zipcode;
                $scope.aboutme = data.profile.aboutMe;
                $scope.workEmail = data.profile.workEmail;
                $scope.hostProfilePic = data.profile.profileImages;

            }

            else{
                alert("cannot fetch profile for user");
            }

        })

    }







});