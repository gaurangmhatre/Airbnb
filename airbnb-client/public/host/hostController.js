dashboard.controller("hostController",[
  '$scope',
    '$http',
    '$state',
    'Upload',
     'logger',
    'auth',
    function($scope,$http ,$state,Upload,logger,auth){
    console.log("hello from host controller");


    $scope.pageClicked = function(){
      logger.write('Become a Host');
    };

      $scope.login = function(){
        $state.go("host.login");
    }

    if(auth.getUserInfo()) {
        var isLoggedIn = auth.getUserInfo().data.user;

        console.log("IS LOGGED IN ",isLoggedIn);
    }
   $scope.startHosting= function(){

        if(isLoggedIn)
        {

            $state.go("hostingSteps.step1",{"user":isLoggedIn});
        }


};
     if(isLoggedIn)
     {
         $scope.loggedIn =isLoggedIn.firstname;
         $scope.username =isLoggedIn.firstname;
         $scope.profilePic =isLoggedIn.profilePic;
         $scope.host =isLoggedIn.host;
         $scope.dropdownChange ="changeDropdown";
     }

        $scope.logout= function(){
            auth.logout();
        };
}]);