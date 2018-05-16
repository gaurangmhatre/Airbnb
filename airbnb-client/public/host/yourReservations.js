/**
 * Created by Mak on 11/25/16.
 */

dashboard.controller("yourReservations",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){


    $scope.loggedIn=true;
    $scope.profilePic=isLoggedIn.data.user.profilePic;
    $scope.host=isLoggedIn.data.user.host;
    $scope.username=isLoggedIn.data.user.firstname;
    $scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";

    $scope.billButton = [];

    $scope.amount1 =[];

    function yourReservations ()
    {
        console.log("Hello from the yourReservations");
        $http.post('/yourReservations').success(function(res){

            console.log("all the yourReservations request",res  );
            $scope.allRequest =res.requests;
            for (var i = 0; i < $scope.allRequest.length; i++) {

                if ($scope.allRequest[i].paymentStatus == "paid")
                {

                    $scope.billButton.push(false);
                    $scope.amount1.push(false);

                }
                else{
                    $scope.billButton.push(true);
                    $scope.amount1.push(true);
                }
            }




        }).error(function(err){

            console.log(err);

        });

    }

    yourReservations();



    $scope.viewBill= function(tripId)
    {
        console.log("fetching bill for "+tripId);

        console.log($scope.allRequest);

        for(var i=0;i<$scope.allRequest.length;i++)
        {
            console.log(i);
            if($scope.allRequest[i].tripId == tripId)
            {

                $scope.billUserName = $scope.allRequest[i].userName;
                console.log("Username:"+$scope.billUserName);
                $scope.tripId = $scope.allRequest[i].tripId;
                $scope.listingCity=$scope.allRequest[i].listingCity;
                $scope.listingTitle = $scope.allRequest[i].listingTitle;
                $scope.streetAddress = $scope.allRequest[i].streetAddress;
                var checkindate = new Date($scope.allRequest[i].checkInDate);
                $scope.checkInDate = checkindate.toISOString().split('T')[0];
                console.log("checkIn date:"+$scope.checkInDate);
                var checkoutdate = new Date($scope.allRequest[i].checkOutDate);
                $scope.checkOutDate = checkoutdate.toISOString().split('T')[0];
                $scope.fixedPrice = $scope.allRequest[i].fixedPrice;
                $scope.guestsSelected = $scope.allRequest[i].guestsSelected;
                $scope.cardNumber = $scope.allRequest[i].cardNumber.substring(12,16);
                $scope.hostEmail = $scope.allRequest[i].hostEmail;



                var timeDiff = Math.abs(checkindate.getTime() - checkoutdate.getTime());
                $scope.diffDays1 = Math.ceil(timeDiff / (1000 * 3600 * 24));



            }


        }

    }




}]);