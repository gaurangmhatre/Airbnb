/**
 * Created by Gaurang on 14-11-2016.
 */

dashboard.controller('hostList',  function ($scope, $http,$filter) {

    $scope.logout= function(){
        auth.logout();
    };

})