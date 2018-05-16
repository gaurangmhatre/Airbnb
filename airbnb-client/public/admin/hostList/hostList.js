/**
 * Created by Gaurang on 15-11-2016.
 */

dashboard.controller('hostList',  function ($scope, $http,$filter) {
	$scope.previousBtn = false;
	$scope.nextButton = false;
    $scope.gridOptions = {
        data: [],
        urlSync: false
    };

    var pageNo =1;
    $scope.usersPerPage = 100;
    /**$scope.tabs = 0;
    var tabs = 0;
    $scope.tabCounts = [];
    $http({
    	method: "GET",
    	url:'/totalHosts'
    }).success(function (data){
    	console.log("Total Users"+data.users);
    	$scope.tabs = data.users/$scope.usersPerPage;
    	tabs = Math.ceil($scope.tabs);
    	for(var i=1; i<=tabs;i++){
    		console.log(i);
    		var tabCount = {};
    		tabCount.count = i;
    		$scope.tabCounts.push(tabCount);
    	}
   });**/
    
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
    
    /**$scope.changePage = function(pageClicked){
    	initialize(pageClicked);
    };**/
    
    function initialize(pageNumber) {
    	console.log("Page Clicked "+pageNumber);
        $scope.SearchByCity= '';

        //call with redis
        $http({
            method: "POST",
            //url: '/adminGetAllHostDetailsWithRedis',
            url:'/adminGetAllHostDetails',
            data: {
            	'pageNumber': pageNumber,
            	'usersPerPage': $scope.usersPerPage
            }
        }).success(function (responseData) {
            $scope.AllHostParent = responseData;
            $scope.AllHostList = responseData;
            console.log(responseData);
            if(responseData.length == '100'){
            	$scope.nextButton = true;
            }
        }).error(function (error) {
            console.log("inside error");
        });

        //Normal call
        /* $http({
         method: "POST",
         url: '/adminGetAllHostDetails',
         data: {

         }
         }).success(function (responseData) {
         $scope.AllHostParent = responseData;
         $scope.AllHostList = responseData;
         console.log(responseData);

         }).error(function (error) {
         console.log("inside error");
         });*/
    }

    $scope.search = function()
    {
        if($scope.SearchByCity==''){

            $scope.AllHostList = $scope.AllHostParent
        }
        else {
            /*var SelectedAllHostList = $filter('filter')($scope.AllHostParent, function (d) {
                return d.city === $scope.SearchByCity;
            });
            console.log("SelectedAllHostList" + SelectedAllHostList);
            $scope.AllHostList = SelectedAllHostList;*/
            $http({
                method: "POST",
                //url: '/adminGetAllHostDetailsWithRedis',
                url:'/adminGetHostfromCity',
                data: {
                    'pageNumber': 1,
                    'usersPerPage': $scope.usersPerPage,
                    'SearchByCity': $scope.SearchByCity,
                }
            }).success(function (responseData) {
                $scope.AllHostParent = responseData;
                $scope.AllHostList = responseData;
                console.log(responseData);
                if(responseData.length == '100'){
                    $scope.nextButton = true;
                }
            }).error(function (error) {
                console.log("inside error");
            });

        }

    }

    $scope.getHostDetails = function(user)
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
        initialize(1);
        //$scope.AllHostList = $scope.AllHostParent;
    }
})
