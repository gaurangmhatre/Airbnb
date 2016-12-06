dashboard.service("logger",
  [
    '$rootScope',
    '$http',
    '$state',
    'auth',
    function($rootScope,$http,$state,auth){

  this.write =function(pageName,propertyName,city)
  {
    var info= auth.getUserInfo();
    if(info){
      var user= auth.getUserInfo().data.user.email;
      if((user)&& (user!=="null") && (user!==null)&&(user !== undefined)){
        user = user.replace('.','_');
        var activity ={
          userId :user,
          pageName:pageName,
          propertyName:propertyName,
          area:city
        };

        $http.post('/activity',activity).success(function(res){
        }).error(function(err){
          if(err){
            console.log(err);
          }
        })
      }
    }

  }
}]);