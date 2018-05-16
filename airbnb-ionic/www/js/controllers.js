angular.module('airbnb.controllers', ['ngMap'])

.controller('DashCtrl', function($scope,$rootScope) {

  $scope.atDash=true;
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('homeCtrl', function($scope, $stateParams,$rootScope) {
console.log("Hello from home ctr");
  $rootScope.hideTabs = true;
})
  .controller('showListing', function($scope, $stateParams,$rootScope,$state,$http,NgMap) {
    console.log("Hello from home showListing");
    console.log($stateParams);
    var city = $stateParams.city;
    $rootScope.hideTabs = true;

    $http.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8';
    Object.toparams = function ObjecttoParams(obj)
    {
      var p = [];
      for (var key in obj)
      {
        p.push(key + '=' + encodeURIComponent(obj[key]));
      }
      return p.join('&');
    };

    $http({
      url: 'http://localhost:3000/getProperties',
      method: "POST",
      data: Object.toparams({
        "dstcity": city})
    })
      .then(function(res) {

          console.log(res);
           $scope.properties =  res.data.properties;

        $scope.$on('mapInitialized', function(event, map) {
          $scope.map = map;
        });

        NgMap.getMap().then(function(map) {
          console.log(map.getCenter());
          console.log('markers', map.markers);
          console.log('shapes', map.shapes);
        });


      });

    $scope.myEndListener = function(sliderId) {
      console.log(sliderId);
      console.log(sliderId, 'has ended with ', $scope.minRangeSlider.minValue);
      console.log(sliderId, 'has ended with ', $scope.minRangeSlider.maxValue);
    };


    $scope.priceRangeFilter = function(property)
    {

      return (property['fixedPrice'] >= $scope.minRangeSlider.minValue && property['fixedPrice'] <= $scope.minRangeSlider.maxValue)

    }



    $scope.roomTypeFilter = function(property)
    {

      if($scope.entirePlace && property['roomType'] == "Entire Place")
      {

        return property['roomType'] == "Entire Place";

      }

      if($scope.privateRoom && property['roomType'] == "Private room")
      {

        return property['roomType'] == "Private room";

      }


      if($scope.sharedRoom && property['roomType'] == "Shared room")
      {

        return property['roomType'] == "Shared room";

      }

      if(!$scope.entirePlace && !$scope.privateRoom && !$scope.sharedRoom)
      {


        return property['roomType'] == "Entire Place" || "Private room" || "Shared room";
      }


    }
    /*$scope.selectedCheckIn="";
     $scope.selectedCheckout="";*/
    $scope.inDate ="";
    $scope.outDate="";

    $scope.selecteddates = function(fromdate,todate)
    {
      console.log("selecting dates");
      console.log("fromdate"+fromdate);
      console.log("To date:"+todate);
      $scope.outDate = new Date(todate).toISOString().substring(0, 10);
      console.log("$scope.inDate" + $scope.inDate);
      $scope.inDate=new Date(fromdate).toISOString().substring(0, 10);
      console.log("$scope.outDate" + $scope.outDate);
      if($scope.outDate<=$scope.inDate)
      {
        alert("Checkout date should be greater than checkin Date");
      }



    }

    $scope.dateFilter = function(property)
    {


      if( $scope.inDate =="" && $scope.outDate=="" )
      {
        console.log("dates not selected");
        return property;
      }

      else if($scope.outDate>=$scope.inDate)
      {

        console.log( new Date(property['fromDate']).toISOString().split('T')[0]);
        return (new Date(property['fromDate']).toISOString().split('T')[0] <= $scope.inDate && new Date(property['toDate']).toISOString().split('T')[0] >= $scope.outDate);

      }
      else{
        return property;
      }


    }






    $scope.selectedguests = "";
    $scope.changeGuests = function(guests)
    {
      console.log("guests:"+guests);
      $scope.selectedg = guests;
    }

    $scope.guestFilter = function(property)
    {
      if($scope.selectedguests=="")
      {
        return  property;
      }
      else{
        return (property['guestAllowed'] <= $scope.selectedg);

      }
    }




    $scope.minRangeSlider = {
      minValue: 20,
      maxValue: 2000,
      options: {
        floor: 30,
        ceil: 2000,
        step: 10,
        id: 'sliderA',
        onEnd: $scope.myEndListener
      }
    };

    //  Google Map listings prices on maps


    $scope.showproperty = function(e,p){

      $scope.p = p;
      $scope.showInfoWindow('bar', p._id);
      $scope.limage = p.listingImages[0][0];
      console.log("Image URL:"+$scope.limage);
    };


    $scope.ratingApt =
      {
        current: 3,
        max: 5
      };

    $scope.noOfGuests = 3;





//Function to filter checkboxes
    /*$scope.roomType = function (property)
     {
     console.log("Property:"+property);


     if(property.roomType == "Entire Home")
     {

     console.log("entirehome");


     }

     }*/

    $scope.search1=function(property1,index,array)
    {

      console.log(property1);
      console.log("calling serach");
      console.log(property);


    }

    $scope.filterroomType = function() {

      console.log('filterroomType filter');


    };




    // Function to switch state to individual listing
    $scope.displayListing = function(listing){


      /*$cookieStore.put('eachListing', listing);
       $scope.x = { "eachListing" : $cookieStore.get('eachListing')};
       console.log("Cookies eachListing:"+$scope.x);*/

      //$state.go("individualListing");
      //localStorage.setItem("eachListing", JSON.stringify(listing));

      console.log(listing);
      $state.go("tab.individualListing", {listing : angular.toJson(listing)});


    }










  })
  .controller('individualListing', function($scope,$stateParams,$rootScope ,$http,$state) {

    console.log("Heleo from individualListing");
    console.log($stateParams);
     console.log(angular.fromJson($stateParams.listing));




    $scope.showBill = false;


    //$scope.listingDetails = $stateParams.listing;

    /*$scope.x = { "eachListing" : $cookieStore.get('eachListing')};
     console.log("Cookies eachListing:"+$scope.x);*/


    //$scope.listingDetails = $scope.x.eachListing;


      $scope.listingDetails = angular.fromJson($stateParams.listing);




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

    $scope.clientProfilePic = '/img/2.jpg';

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

    // $scope.myInterval = 4000;
    // $scope.noWrapSlides = false;
    // $scope.active = 0;
    //
    // $scope.slides = [];
    //Fetching URL for Images
    var image = {};
    // for(j=0;j<$scope.listingDetails.listingImages[0].length;j++)
    // {
    //   console.log("Images for prop"+$scope.listingDetails.listingImages[0][j]);
    //   image = {
    //     image: $scope.listingDetails.listingImages[0][j],
    //     id:j
    //   };
    //   $scope.slides.push(image);
    // }

    $scope.calcBill = function (date) {
      // $(".bookTripDiv").css({"height":"200px"});

      console.log('date',date);
      $scope.checkInDate=date.checkInDate;
      $scope.checkOutDate=date.checkOutDate;
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
          var timeDiff = Math.abs($scope.checkOutDate.getTime() - $scope.checkInDate.getTime());
          $scope.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

          $scope.totalPrice =  ($scope.listingDetails.fixedPrice * $scope.diffDays);
          $scope.datesNotAvailable = false;
          $scope.showBill = true;
        }
      }
    }

    $scope.bookListing = function(date,guestsSelected){

      $scope.checkInDate=date.checkInDate;
      $scope.checkOutDate=date.checkOutDate;
      $scope.guestsSelected=guestsSelected;
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

          $http.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8';
          Object.toparams = function ObjecttoParams(obj)
          {
            var p = [];
            for (var key in obj)
            {
              p.push(key + '=' + encodeURIComponent(obj[key]));
            }
            return p.join('&');
          };


          $http({

            method : "POST",
            url: 'http://localhost:3000/checkDates',
            data:

              Object.toparams({
              "listId": $scope.listId,
              "checkInDate":$scope.checkindate,
              "checkOutDate": $scope.checkoutdate})




          }).success(function(data)

          {
            console.log("Status Code " + data.statusCode);
            if(data.statusCode==200)
            {
              console.log("Dates Available");
              console.log(data);

              // localStorage.setItem("listing", JSON.stringify($scope.listingDetails));
              // localStorage.setItem("checkInDate", JSON.stringify($scope.checkInDate));
              // localStorage.setItem("checkOutDate", JSON.stringify($scope.checkOutDate));
              // localStorage.setItem("guestsSelected", JSON.stringify($scope.guestsSelected));
              // localStorage.setItem("totalPrice", JSON.stringify($scope.totalPrice));
              // localStorage.setItem("hostProfilePic", JSON.stringify($scope.hostProfilePic));


$scope.username="Brad";

              // $state.go("bookTrip", {"listing" : $scope.listingDetails, "checkInDate" : $scope.checkInDate, "checkOutDate" : $scope.checkOutDate, "guestsSelected" : $scope.guestsSelected, "totalPrice" :  $scope.totalPrice });

              $http({

                method : "POST",
                url: 'http://localhost:3000/bookTrip',
                data: Object.toparams({

                  "userEmail": '',
                  "hostEmail":$scope.listingDetails.hostId,
                  "listId": $scope.listingDetails.listId,
                  "fixedPrice": $scope.listingDetails.fixedPrice,
                  "totalPrice":$scope.totalPrice,
                  "checkInDate": $scope.checkindate,
                  "checkOutDate":$scope.checkoutdate,
                  "userComments": '',
                  "guestsSelected":$scope.guestsSelected,
                  "hostName":$scope.listingDetails.hostName,
                  "listingTitle":$scope.listingDetails.title,
                  "listingCity":$scope.listingDetails.city,
                  "userName":$scope.username,
                  "zipCode":$scope.listingDetails.address[0].ZipCode,
                  "streetAddress":$scope.listingDetails.address[0].address,
                  "suiteNum":$scope.listingDetails.address[0].suiteNum,
                  "hostProfilePic":$scope.listingDetails.hostProfilePic,
                  "userProfilePic":$scope.profilePic

                })
              }).success(function (res) {

                console.log("response after booking",res);
              })



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
  })
  .controller('trips', function($scope,$stateParams,$rootScope ,$http,$state) {



  })
  .controller('userHome', function($scope, $stateParams,$rootScope ,$http,$state) {
    console.log("Hello from home userHome");
    $rootScope.hideTabs = false;

    $scope.searchAll = function (city) {


      console.log(city);
      $state.go("tab.showListing",{"city":city});

    }


    function getCities()
    {
      $http.get("http://localhost:3000/allCities").success(function (res) {

        console.log("response cities",res);
        $scope.cities=res.fixedCity;
        $scope.auctionCities=res.auctionCity;

      }).error(function(err){

        console.log(err);
      })
    }
    getCities();


  })

  .controller('signUpCtrl', function($scope,$state ,$stateParams,$rootScope,$http) {
    console.log("Hello from home  signup ctr");
     $rootScope.hideTabs = true;

     $scope.next = function(u) {

       console.log(u);
        console.log($scope.user);

       $http.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8';
       Object.toparams = function ObjecttoParams(obj)
       {
         var p = [];
         for (var key in obj)
         {
           p.push(key + '=' + encodeURIComponent(obj[key]));
         }
         return p.join('&');
       };

       $http({
         url: 'http://localhost:3000/signup',
         method: "POST",
         data: Object.toparams(u)
       })
         .then(function(res) {
             if(res.data.msg=="success")
               {
                 console.log("redirect to homepage");
                 $state.go("tab.userHome" );

               }

               else if(res.data.msg=="UserExist") {

                 console.log("In user Exist");
                 $scope.signupError = true;


               }
           },
           function(response) { // optional
             // failed
           });


       // $http.post('http://localhost:3000/signup',u).success(function(res){
       //
       //   console.log(res);
       //   if(res.msg=="success")
       //   {
       //     console.log("redirect to homepage");
       //     $scope.showWrapper=false;
       //     $scope.showLogin=false;
       //     $scope.showPreSignup=false;
       //     $scope.showSignUp=false;
       //     auth.login().then(function(result)
       //     {
       //
       //      // $state.go("landingPage.afterSignIn" );
       //     })
       //     ;
       //   }
       //
       //   else if(res.msg=="UserExist") {
       //
       //     console.log("In user Exist");
       //     $scope.authError = true;
       //     $scope.authErrorMessage="Email already registered";
       //
       //
       //   }
       //
       //
       // }).error(function(err)
       //
       // {
       //
       //   if(err)
       //   {
       //     console.log(err);
       //   }
       // })






     }
  })

  .controller('login', function($scope,$state ,$stateParams,$rootScope,$http) {
    console.log("Hello from home  login ctr");
    $rootScope.hideTabs = true;

    $scope.next = function(u) {

      console.log(u);

      $http.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8';
      Object.toparams = function ObjecttoParams(obj)
      {
        var p = [];
        for (var key in obj)
        {
          p.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return p.join('&');
      };

      $http({
        url: 'http://localhost:3000/login',
        method: "POST",
        data: Object.toparams(u)
      })
        .then(function(res) {
            if(res.data.msg=="404")
            {

              $scope.authError = true;
              $scope.authErrorMessage ="Email id not found, Please register";
              //$scope.incorrectCredentials = true;
            }

            else if(res.data.msg=="success")
            {
              $scope.authError = false;
              console.log("response" +JSON.stringify(res));
              //$scope.authError = true;
                $state.go("tab.userHome" );
            }
            else if(res.data.msg=="IncorrectPassword")
            {
              $scope.authError = true;
              $scope.authErrorMessage ="Invalid Password";
              //$scope.incorrectCredentials = true;
            }
            else if(res.data.admin==true)
            {
              console.log("admin found");
             // $state.go("adminGraphDashboard");
            }
            else if(res=="Timeout")
            {
              alert("Request Timeout, Please try again ");
            }
          },
          function(response) { // optional
            // failed
          });
    }
  })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };


});
