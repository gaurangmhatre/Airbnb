// /**
//  * Created by Mak on 12/4/16.
//  */
//
// /**
//  * Created by kunal on 11/20/16.
//  * Modified by Prateek on 11/21/2016
//  */
// angular.module('airbnb.controllers', [])
// .controller("showListing",
//   function(data,
//            $scope,
//            $http ,
//            $state,
//            NgMap,
//            $rootScope,
//            $stateParams
//
//            ){
//
//     console.log("reached listings controller");
//     console.log("Properties in controller " + $scope.properties);
//
//
//
//
//     //$scope.properties =  $stateParams.listings;
//
//     $scope.properties =  data.properties;
//
//     /*//$cookieStore.put('properties', $stateParams.listings);
//
//      $scope.x = { "properties" : $cookieStore.get('properties')};
//      console.log("Cookies X:"+$scope.x);
//      $scope.properties = $scope.x.properties;
//      console.log("Cookies Properties:"+$scope.properties);*/
//
//
//     console.log("Number of Properties:"+$scope.properties.length);
//
//     if($scope.properties.length!=0) {
//       $scope.city = $scope.properties[0].address[0].city;
//       $scope.noOfListings = $scope.properties.length;
//       $scope.mapLatitude = $scope.properties[0].latitude;
//       $scope.mapLongitude = $scope.properties[0].longitude;
//     }
//
//     else{
//       $scope.nolistings=true;
//       $scope.msg = " No listings found for this city"
//
//
//     }
//
//
//
//
//     //Sliding Range Bar
//
//     $scope.myEndListener = function(sliderId) {
//       console.log(sliderId);
//       console.log(sliderId, 'has ended with ', $scope.minRangeSlider.minValue);
//       console.log(sliderId, 'has ended with ', $scope.minRangeSlider.maxValue);
//     };
//
//
//     $scope.priceRangeFilter = function(property)
//     {
//
//       return (property['fixedPrice'] >= $scope.minRangeSlider.minValue && property['fixedPrice'] <= $scope.minRangeSlider.maxValue)
//
//     }
//
//
//
//     $scope.roomTypeFilter = function(property)
//     {
//
//       if($scope.entirePlace && property['roomType'] == "Entire Place")
//       {
//
//         return property['roomType'] == "Entire Place";
//
//       }
//
//       if($scope.privateRoom && property['roomType'] == "Private room")
//       {
//
//         return property['roomType'] == "Private room";
//
//       }
//
//
//       if($scope.sharedRoom && property['roomType'] == "Shared room")
//       {
//
//         return property['roomType'] == "Shared room";
//
//       }
//
//       if(!$scope.entirePlace && !$scope.privateRoom && !$scope.sharedRoom)
//       {
//
//
//         return property['roomType'] == "Entire Place" || "Private room" || "Shared room";
//       }
//
//
//     }
//     /*$scope.selectedCheckIn="";
//      $scope.selectedCheckout="";*/
//     $scope.inDate ="";
//     $scope.outDate="";
//
//     $scope.selecteddates = function(fromdate,todate)
//     {
//       console.log("selecting dates");
//       console.log("fromdate"+fromdate);
//       console.log("To date:"+todate);
//       $scope.outDate = new Date(todate).toISOString().substring(0, 10);
//       console.log("$scope.inDate" + $scope.inDate);
//       $scope.inDate=new Date(fromdate).toISOString().substring(0, 10);
//       console.log("$scope.outDate" + $scope.outDate);
//       if($scope.outDate<=$scope.inDate)
//       {
//         alert("Checkout date should be greater than checkin Date");
//       }
//
//
//
//     }
//
//     $scope.dateFilter = function(property)
//     {
//
//
//       if( $scope.inDate =="" && $scope.outDate=="" )
//       {
//         console.log("dates not selected");
//         return property;
//       }
//
//       else if($scope.outDate>=$scope.inDate)
//       {
//
//         console.log( new Date(property['fromDate']).toISOString().split('T')[0]);
//         return (new Date(property['fromDate']).toISOString().split('T')[0] <= $scope.inDate && new Date(property['toDate']).toISOString().split('T')[0] >= $scope.outDate);
//
//       }
//       else{
//         return property;
//       }
//
//
//     }
//
//
//
//
//
//
//     $scope.selectedguests = "";
//     $scope.changeGuests = function(guests)
//     {
//       console.log("guests:"+guests);
//       $scope.selectedg = guests;
//     }
//
//     $scope.guestFilter = function(property)
//     {
//       if($scope.selectedguests=="")
//       {
//         return  property;
//       }
//       else{
//         return (property['guestAllowed'] <= $scope.selectedg);
//
//       }
//     }
//
//
//
//
//     $scope.minRangeSlider = {
//       minValue: 20,
//       maxValue: 2000,
//       options: {
//         floor: 30,
//         ceil: 2000,
//         step: 10,
//         id: 'sliderA',
//         onEnd: $scope.myEndListener
//       }
//     };
//
//     //  Google Map listings prices on maps
//
//     NgMap.getMap().then(function(map) {
//       console.log(map.getCenter());
//       console.log('markers', map.markers);
//       console.log('shapes', map.shapes);
//     });
//
//
//     $scope.showproperty = function(e,p){
//
//       $scope.p = p;
//       $scope.showInfoWindow('bar', p._id);
//       $scope.limage = p.listingImages[0][0];
//       console.log("Image URL:"+$scope.limage);
//     };
//
//
//
// // Made by Prateek
// //  All listings page
//
//     $scope.ratingApt =
//       {
//         current: 3,
//         max: 5
//       };
//
//     $scope.noOfGuests = 3;
//
//     // To Display Carousel of images
//     $scope.myInterval = 4000;
//     $scope.noWrapSlides = false;
//     $scope.active = 0;
//     var currIndex = 0;
//
//     $scope.slides = [];
//     var eachListingSlides = [];
//     //Fetching URL for Images
//     var image = {};
//     for (i=0;i<$scope.properties.length;i++)
//     {
//       eachListingSlides = [];
//       for(j=0;j<$scope.properties[i].listingImages[0].length;j++)
//       {
//         console.log("Images for prop"+$scope.properties[i].listingImages[0][j]);
//         image = {
//           image: $scope.properties[i].listingImages[0][j],
//           id:j
//         };
//         eachListingSlides.push(image);
//       }
//       $scope.slides.push(eachListingSlides);
//     }
//
//
//
// //Function to filter checkboxes
//     /*$scope.roomType = function (property)
//      {
//      console.log("Property:"+property);
//
//
//      if(property.roomType == "Entire Home")
//      {
//
//      console.log("entirehome");
//
//
//      }
//
//      }*/
//
//     $scope.search1=function(property1,index,array)
//     {
//
//       console.log(property1);
//       console.log("calling serach");
//       console.log(property);
//
//
//     }
//
//     $scope.filterroomType = function() {
//
//       console.log('filterroomType filter');
//
//
//     };
//
//
//
//
//     // Function to switch state to individual listing
//     $scope.displayListing = function(listing){
//
//
//       /*$cookieStore.put('eachListing', listing);
//        $scope.x = { "eachListing" : $cookieStore.get('eachListing')};
//        console.log("Cookies eachListing:"+$scope.x);*/
//
//       //$state.go("individualListing");
//       localStorage.setItem("eachListing", JSON.stringify(listing));
//
//
//       $state.go("individualListing", {"listing" : listing})
//     }
//
//
//
//
//   });
