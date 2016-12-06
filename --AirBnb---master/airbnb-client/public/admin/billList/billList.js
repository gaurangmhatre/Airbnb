/**
 * Created by Gaurang on 29-11-2016.
 */
/**
 * Created by Gaurang on 15-11-2016.
 */

dashboard.controller('billList',  function ($scope, $http,$filter) {
	$scope.previousBtn = false;
	$scope.nextButton = false;
    $scope.gridOptions = {
        data: [],
        urlSync: false
    };

    $scope.usersPerPage = 100;
    /**$scope.tabs = 0;
    var tabs = 0;
    $scope.tabCounts = [];
    $http({
    	method: "GET",
    	url:'/totalBills'
    }).success(function (data){
    	console.log("Total Bills"+data.count);
    	$scope.tabs = data.count/$scope.usersPerPage;
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
            method: "GET",
            //url: '/adminGetAllBillDetailsWithRedis',
            url: '/adminGetAllBillDetails',
            params: {
            	'pageNumber': pageNumber,
            	'usersPerPage': $scope.usersPerPage
            }
        }).success(function (responseData) {
            $scope.AllBillParent = responseData;
            $scope.AllBillList = responseData;
            console.log(responseData);
            if(responseData.length == '100'){
            	$scope.nextButton = true;
            }	
        }).error(function (error) {
            console.log("inside error");
        });

        //Normal call
        /* $http({
         method: "GET",
         url: '/adminGetAllBillDetails',
         data: {

         }
         }).success(function (responseData) {
         $scope.AllBillParent = responseData;
         $scope.AllBillList = responseData;
         console.log(responseData);

         }).error(function (error) {
         console.log("inside error");
         });*/
    }

    $scope.search = function()
    {
        if($scope.dateSelectedForSearch==null){

            $scope.errorMsgDisplay = true;
            $scope.errorMsg = "Please Select a date before searching.";
        }
        else {
            /*var SelectedAllBillList = $filter('filter')($scope.AllBillParent, function (d) {
                return d.billDate === $scope.dateSelectedForSearch.toISOString();
            });
            console.log("SelectedAllBillList" + SelectedAllBillList);
            $scope.AllBillList = SelectedAllBillList;*/

            $scope.errorMsgDisplay = false;
            $http({
                method: "POST",
                url: '/adminGetBillfromBillDate',
                params: {
                    'billDate': $scope.dateSelectedForSearch,
                }
            }).success(function (responseData) {
                $scope.AllBillParent = responseData;
                $scope.AllBillList = responseData;
                console.log(responseData);
                if(responseData.length == '100'){
                    $scope.nextButton = true;
                }
            }).error(function (error) {
                console.log("inside error");
            });
        }
    }

    $scope.errorMsgDisplay = false;

    $scope.searchByMonth = function()
    {
        if($scope.SelectedMonth==null || $scope.SelectedYear==null){

            //$scope.AllBillList = $scope.AllBillParent
            $scope.errorMsgDisplay = true;
            $scope.errorMsg = "Please Enter Both Year and Month before searching.";
        }
        else {
           /* var SelectedAllBillList = $filter('filter')($scope.AllBillParent, function (d) {

                return ((new Date(d.billDate).getMonth()+1 === parseInt($scope.SelectedMonth)) && (new Date(d.billDate).getYear() === parseInt($scope.SelectedYear)));
            });
            console.log("SelectedAllBillList" + SelectedAllBillList);
            $scope.AllBillList = SelectedAllBillList;*/

           $scope.errorMsgDisplay = false;
            $http({
                method: "POST",
                url: '/adminGetBillfromBillMonth',
                params: {
                    'SelectedMonth': $scope.SelectedMonth,
                    'SelectedYear': $scope.SelectedYear,

                }
            }).success(function (responseData) {
                $scope.AllBillParent = responseData;
                $scope.AllBillList = responseData;
                console.log(responseData);
                if(responseData.length == '100'){
                    $scope.nextButton = true;
                }
            }).error(function (error) {
                console.log("inside error");
            });
        }



    }

    $scope.getBillDetails = function(bill)
    {


        $scope.billUserName = bill.userName;
        console.log("Username Selected:"+$scope.billUserName);
        $scope.tripId = bill.tripId;

        $scope.listingCity=bill.listingCity;
        $scope.listingTitle = bill.listingTitle;
        $scope.streetAddress = bill.streetAddress;
        var checkindate = new Date(bill.checkInDate);
        $scope.checkInDate = checkindate.toISOString().split('T')[0];
        console.log("checkIn date:"+$scope.checkInDate);

        var checkoutdate = new Date(bill.checkOutDate);
        $scope.checkOutDate = checkoutdate.toISOString().split('T')[0];
        $scope.fixedPrice = bill.fixedPrice;
        $scope.guestsSelected = bill.guestsSelected;
        $scope.cardNumber = bill.cardNumber.substring(12,16);
        $scope.hostEmail = bill.hostEmail;
        var timeDiff = Math.abs(checkindate.getTime() - checkoutdate.getTime());
        $scope.diffDays1 = Math.ceil(timeDiff / (1000 * 3600 * 24));


    }

    $scope.reset = function()
    {
        //$scope.AllBillList = $scope.AllBillParent;
        initialize(1);
    }
})

