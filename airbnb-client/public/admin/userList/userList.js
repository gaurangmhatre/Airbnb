/**
 * Created by Gaurang on 15-11-2016.
 */


dashboard.controller('userList',  function ($scope, $http,$filter) {


			$scope.previousBtn = false;
			$scope.nextButton = false;
            $scope.gridOptions = {
                data: [],
                urlSync: false
            };
            var pageNo = 1;
            $scope.usersPerPage = 100;

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
                $scope.SearchByCity= '';

                //call with redis
                $http({
                    method: "POST",
                   //url: '/adminGetAllUserDetailsWithRedis',
                    url:'/adminGetAllUserDetails',
                    data: {
                    	'pageNumber': pageNumber,
                    	'usersPerPage': $scope.usersPerPage
                    }
                }).success(function (responseData) {
                    $scope.AllUserParent= responseData;
                    $scope.AllUserList = responseData;
                    console.log("Result received "+responseData.length);
                    if(responseData.length == '100'){
                    	$scope.nextButton = true;
                    }

                }).error(function (error) {
                    console.log("inside error");
                });

                //normal call
               /* $http({
                    method: "POST",
                    url: '/adminGetAllUserDetails',
                    data: {
                      
                    }
                }).success(function (responseData) {
                    $scope.AllUserParent= responseData;
                    $scope.AllUserList = responseData;
                    console.log(responseData);

                }).error(function (error) {
                    console.log("inside error");
                });*/
            }

            $scope.search = function()
            {
                if($scope.SearchByCity==''){

                    $scope.AllUserList = $scope.AllUserParent;
                }
                else {
                    /*var SelectedAllUserList = $filter('filter')($scope.AllUserParent, function (d) {
                     return d.city === $scope.SearchByCity;
                     });
                     console.log("SelectedAllUserList" + SelectedAllUserList);
                     $scope.AllUserList = SelectedAllUserList;*/

                    $http({
                        method: "POST",
                        //url: '/adminGetAllUserDetailsWithRedis',
                        url:'/adminGetUserfromCity',
                        data: {
                            'pageNumber': 1,
                            'usersPerPage': $scope.usersPerPage,
                            'SearchByCity': $scope.SearchByCity,
                        }
                    }).success(function (responseData) {
                        $scope.AllUserParent= responseData;
                        $scope.AllUserList = responseData;
                        console.log("Result received "+responseData.length);
                        if(responseData.length == '100'){
                            $scope.nextButton = true;
                        }

                    }).error(function (error) {
                        console.log("inside error");
                    });
                }

            }

            $scope.getUserDetails = function(user)
            {
                $scope.Selectedemail= user.email;
                $scope.Selectedfirstname= user.firstname;
                $scope.Selectedlastname= user.lastname;
                $scope.Selectedhost= user.host;
                $scope.Selectedcreated_at= user.created_at;
                $scope.SelecteduserId= user.userId;
                $scope.SelectedaboutMe= user.aboutMe;
                $scope.Selectedbirthday= user.birthday;
                $scope.SelectedstreetAddress= user.streetAddress;
                $scope.Selectedcity= user.city;
                $scope.Selectedstate= user.state;
                $scope.Selectedcountry= user.country;
                $scope.Selectedgender= user.gender;
                $scope.SelectedphoneNumber= user.phoneNumber;
                $scope.SelectedpreferCurr= user.preferCurr;
                $scope.SelectedpreferLang= user.preferLang;
                $scope.SelectedworkEmail= user.workEmail;
                $scope.Selectedzipcode= user.zipcode;
                $scope.SelectedprofileImages = user.profileImages;
            }

            $scope.reset = function(){
                //$scope.AllUserList = $scope.AllUserParent;
                initialize(1);
            }
})
