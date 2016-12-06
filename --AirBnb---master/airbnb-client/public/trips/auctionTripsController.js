/**
 * http://usejsdoc.org/
 */
dashboard.controller("auctionTripsController", function($scope,$http ,$state,isLoggedIn,auth){

    console.log("reached auctionTripsController controller");

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


    $scope.paymentButton = [];
    $scope.billButton = [];

   $http({

        method : "POST",
        url: '/getAuctionTrips',
        data: {
            "userEmail": $scope.userName
        }
    }).success(function(data)

    {
        console.log("Status Code " + data.statusCode);
        if(data.statusCode==200)
        {
            console.log("Fetched Auction Trips");
            console.log(data);
            $scope.auctionTrips = data.auctionTrips;

            for(var i=0;i< $scope.auctionTrips.length;i++)
            {
                console.log("button:"+$scope.auctionTrips[i].bidStatus);

                if($scope.auctionTrips[i].paymentStatus == "paid")
                {
                    $scope.billButton.push(false);
                    $scope.paymentButton.push(true);
                    $scope.paymentButton.push(false);

                }
                else{
                    $scope.billButton.push(true);
                }
/*

                if($scope.auctionTrips[i].bidStatus == "bidWon")
                {
                    $scope.paymentButton.push(false);
                }
                else{
                    $scope.paymentButton.push(true);
                }
*/



            }
        }

        else
            {

                $scope.noTripsfound = true;
                $scope.noTrips = "No Trips Found"
        }


    })




    //Function for paying the amount

    $scope.pay = function (tripId, totalPrice) {
        console.log(tripId);
        console.log(totalPrice);
        $http({

            method: "POST",
            url: '/getCardDetails',

        }).success(function (data) {
            console.log("Status Code " + data.statusCode);
            if (data.statusCode == 200) {
                console.log("Fetched card details");
                console.log(data);
                console.log("Length Card:" + data.cardDetails.paymentMethod.length);
                $scope.cardDetails = {};

                if (data.cardDetails.paymentMethod.length > 0) {

                    $scope.cardDetails.cardNumber = data.cardDetails.paymentMethod[0].cardNumber;
                    console.log("$scope.cardNumber" + $scope.cardNumber);
                    $scope.cardDetails.cvv = data.cardDetails.paymentMethod[0].cvv;
                    $scope.cardDetails.expiryMonth = data.cardDetails.paymentMethod[0].expiryMonth;
                    $scope.cardDetails.expiryYear = data.cardDetails.paymentMethod[0].expiryYear;
                    console.log("expirty year:"+$scope.cardDetails.expiryYear);
                    $scope.cardDetails.billingCountry = data.cardDetails.paymentMethod[0].billingCountry;
                    $scope.cardDetails.billingFirstName = data.cardDetails.paymentMethod[0].billingFirstName;
                    $scope.cardDetails.billingLastName = data.cardDetails.paymentMethod[0].billingLastName;
                    $scope.cardDetails.tripId = tripId;
                    $scope.cardDetails.totalPrice = totalPrice;


                }
                else {
                    console.log("no card found");
                    $scope.cardDetails.tripId = tripId;
                    $scope.cardDetails.totalPrice = totalPrice;

                }


            }

            else {

                $scope.noTripsfound = true;
                $scope.noTrips = "No Trips Found"
                // $('#myModal').modal('show');
            }


        })


    }


    $scope.makePayment = function (cardNumber, expiryMonth, expiryYear, cvv, billingCountry, billingFirstName, billingLastName) {

        console.log("expiryMonth:"+expiryMonth);

        console.log("expiryYear:"+expiryYear);
        console.log("trip id:" + $scope.cardDetails.tripId);
        var enteredDate = new Date();
        var currDate = new Date();
        var month = Number(expiryMonth)-1;
        var year = Number(expiryYear);
        var enteredSeconds = enteredDate.setFullYear(year, month, 1);
        console.log("enterd seds"+enteredSeconds);
        var currSeconds = currDate.setFullYear(currDate.getFullYear(), currDate.getMonth(), 1);
        console.log("currSeconds "+currSeconds);

        if(cardNumber.length != "16"){
            console.log("invalid card number");
            $scope.errormsgpayment = false;
            $scope.errormsgpayment = true;
            $scope.message = 'Card Number should be of 16 digits!';
        }
        else if(enteredSeconds < currSeconds){
            $scope.errormsgpayment = false;
            $scope.errormsgpayment = true;
            $scope.message = 'Please choose an expiry date greater than or equal to today!';
        }
        else if(cvv.length < 3)
            {
            $scope.errormsgpayment = false;
            $scope.errormsgpayment = true;
            $scope.message = 'CVV should be 3 digits!!!';
        }

        else{
            $http({
                method: "POST",
                url: '/makePayment',
                data: {
                    "cardNumber": cardNumber,
                    "expiryMonth": expiryMonth,
                    "expiryYear": expiryYear,
                    "cvv": cvv,
                    "tripId": $scope.cardDetails.tripId
                }

            }).success(function (data) {
                console.log("data" + data);
                if (data.statusCode == "200") {
                    console.log("Payment Successfull");

                    $scope.paysuc = true;
                    $scope.paysuccess = "Payment Successful";

                    $scope.disablepayment = true;
                    $("#myModal").on("hidden.bs.modal", function () {
                        $state.reload();
                    });

                }

                else {
                    console.log("Payment cannot be made.Please try again later");
                }

            })
        }

    }


    $scope.viewBill= function(tripId)
    {
        console.log("fetching bill for "+tripId);

        console.log($scope.auctionTrips);

        for(var i=0;i<$scope.auctionTrips.length;i++)
        {
            console.log(i);
            if($scope.auctionTrips[i].tripId == tripId)
            {

                $scope.billUserName = $scope.auctionTrips[i].userName;
                console.log("Username:"+$scope.billUserName);
                $scope.tripId = $scope.auctionTrips[i].auctionTripsId;
                $scope.listingCity=$scope.auctionTrips[i].listingCity;
                $scope.listingTitle = $scope.auctionTrips[i].listingTitle;
                $scope.streetAddress = $scope.auctionTrips[i].streetAddress;
                var checkindate = new Date($scope.auctionTrips[i].checkInDate);
                $scope.checkInDate = checkindate.toISOString().split('T')[0];
                console.log("checkIn date:"+$scope.checkInDate);
                var checkoutdate = new Date($scope.auctionTrips[i].checkOutDate);
                $scope.checkOutDate = checkoutdate.toISOString().split('T')[0];
                $scope.auctionPrice = $scope.auctionTrips[i].bidPrice;
                $scope.guestsSelected = $scope.auctionTrips[i].guestsSelected;
                $scope.hostEmail = $scope.auctionTrips[i].hostEmail;
                var timeDiff = Math.abs(checkindate.getTime() - checkoutdate.getTime());
                $scope.diffDays2 = Math.ceil(timeDiff / (1000 * 3600 * 24));

                $scope.cardNumber = $scope.auctionTrips[i].cardNumber.substring(12,16);

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






    // Service to update Bids Status


    $http({
        method : "POST",
        url: '/updateAuctionTrips',
    }).success(function(data){
        console.log("Status Code " + data.statusCode);
        if(data.statusCode==200){
            console.log("Auction Trips table updated successfully");
        }
        else{
            console.log("Error while updating Auction Trips table");
        }
    });
});