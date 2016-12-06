/**
 * Created by Mak on 11/25/16.
 */
dashboard.controller("myReviews",['$scope','$http','$state','Upload' ,'isLoggedIn','auth','$stateParams',function($scope,$http ,$state,Upload,isLoggedIn,auth,$stateParams){


    $scope.loggedIn=true;
    $scope.profilePic=isLoggedIn.data.user.profilePic;
    $scope.host=isLoggedIn.data.user.host;
    $scope.username=isLoggedIn.data.user.firstname;
    $scope.logout= function(){
        auth.logout();
    };

    $scope.dropdownChange ="changeDropdown";

    $scope.reviewAboutMeClass='underlineReview';
    $scope.reviewByMeClass='';
    $scope.reviewAboutMe=true;
    $scope.reviewByMe=false;

    $scope.review = function (val) {

        if(val=='reviewAboutMe')
        {
            $scope.reviewAboutMeClass='underlineReview';
            $scope.reviewByMeClass='';
            $scope.reviewAboutMe=true;
            $scope.reviewByMe=false;
        }
        else if(val=='reviewByMe') {

            $scope.reviewAboutMeClass='';
            $scope.reviewByMeClass='underlineReview';
            $scope.reviewAboutMe=false;
            $scope.reviewByMe=true;
        }
    }

    $scope.submitReview = function(file,rate,feedback,listId,booking){

        console.log("file",file);
        console.log("rate",rate);
        console.log("feedback",feedback);
        console.log("booking",booking);

        if(file==undefined)
        {
             console.log("No file uploaded");
             $http.post('/reviewList',{rate:rate,feedback:feedback,hostName:booking.hostName,userName:booking.userName,userProfilePic:booking.userProfilePic,hostProfilePic:booking.hostProfilePic ,listId:listId,hostEmail:booking.hostEmail,userEmail:booking.userEmail}).success(function (res) {

                 console.log(res);
                 alert('Successfully Submitted Review. ');

                     $state.reload();


             }).error(function (err) {

             });

        }
        else {

            Upload.upload({
                url: 'http://localhost:3000/uploadReview', //webAPI exposed to upload the file
                data:{file:file,rate:rate,feedback:feedback,userProfilePic:booking.userProfilePic,hostName:booking.hostName,userName:booking.userName,hostProfilePic:booking.hostProfilePic ,listId:listId,hostEmail:booking.hostEmail,userEmail:booking.userEmail} //pass file as data, should be user ng-model
            }).then(function (resp) { //upload function returns a promise
                if(resp.statusCode == 200){ //validate success
                    alert('Successfully Submitted Review. ');

                    $state.go($state.current, {}, {reload: true})
                    // auth.login().then(function(result)
                    // {
                    //
                    //     $state.go("userHome" );
                    // });
                } else {
                    alert('an error occured');
                }
            }, function (resp) { //catch error
                console.log('Error status: ' + resp.status);
                alert('Error status: ' + resp.status);
            }, function (evt) {
                console.log(evt);
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                $scope.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
            });


        }


    }

    $scope.submitUserReview = function(b)
    {
        // {"email":b.userEmail,"rate":b.rate,"feedback":b.feedback, "hostPic":isLoggedIn.data.user.profilePic,"userPic":b.userPic}
        $http.post('/reviewUser',b)
            .success(function (res) {
                alert('Successfully Submitted Review. ');
                $state.go($state.current, {}, {reload: true})
                console.log(res);
            }).error(function (err) {
            console.log(err);
        });

    }

    $scope.dynamicRating = function(i)
    {
        var z= 'clean'+i;
        console.log(i);


         var cleanCount =( i.rate.clean >= 0? 1 :0);
        var accuracyCount =( i.rate.accuracy >= 0? 1 :0);
        var locationCount =( i.rate.location >= 0? 1 :0);
        var communicationCount =( i.rate.communication >= 0? 1 :0);
        var checkInCount =( i.rate.checkIn >= 0? 1 :0);
        var valueCount =( i.rate.value >= 0? 1 :0);
        var totalCOUNT= cleanCount+accuracyCount+locationCount+communicationCount+checkInCount+valueCount;
        console.log("totalCOunt",totalCOUNT);
        var totalAvgRating =(i.rate.clean >= 0? i.rate.clean :0)+(i.rate.accuracy >= 0? i.rate.accuracy :0) +(i.rate.location >= 0? i.rate.location :0)+(i.rate.communication >= 0? i.rate.communication :0)+(i.rate.value >= 0? i.rate.value :0)+(i.rate.checkIn >= 0? i.rate.checkIn :0);
        i.rate.overall = Math.ceil( totalAvgRating / totalCOUNT);
        //$scope.i.rate.overall =i.rate.overall;

        console.log(cleanCount);
        // console.log(overall);


    }

    function yourReservations ()
    {

        $http.post('/getReviews').success(function(res){

            console.log("all the   getReviews ",res  );
            if(res.statusCode==200)
            {

                if(res.value.reviewByMe.length>0)
                {
                    $scope.reviewsByMe=res.value.reviewByMe;
                }

                if(res.value.reviewForMe.length>0)
                {
                    $scope.reviewForMe=res.value.reviewForMe;
                }

            }


        }).error(function(err){

            console.log(err);

        });


        $http.get('/completedTripsForHost').success(function(res){

            console.log("all the completedTripsForHost request",res  );

            if(res.statusCode==200)
            {
                $scope.yourGuest =res.value;
            }


        }).error(function(err){

            console.log(err);

        });

        $http.get('/completedTripsForUser').success(function(res){

            console.log("all the completedTripsForUser  ",res  );

            if(res.statusCode==200)
            {
                $scope.yourTrips =res.value;
            }

            // console.log(res.value.reviewByMe);
            // $scope.reviewsByMe=res.value.reviewByMe;
            // $scope.reviewForMe=res.value.reviewForMe;

        }).error(function(err){

            console.log(err);

        });

    }

    yourReservations();



}]);