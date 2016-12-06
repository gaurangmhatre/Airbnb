/**
 * Created by Gaurang on 17-11-2016.
 */
var mq_client = require('../rpc/client');
var redis = require('redis');
var redisclient = redis.createClient(6379, '127.0.0.1');

/* GET home page. */
function redirectToAdmin(req, res) {
    res.render('adminpage', { title: 'Express' });
};

function adminGetAllNewListing(req,res)
{
        mq_client.make_request("adminGetAllNewListing_queue",req.body,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
             console.log("Got all the pending listings");
             return res.send(result);
        }
    })
}
function setStatusForPendingListing(req,res)
{
    mq_client.make_request("setStatusForPendingListing_queue",req.body,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Success in updating status for the listing");
            return res.send({"status":"success"});
        }
    })
}

function adminGetAllApprovedListings(req,res)
{
    mq_client.make_request("getAllApprovedListings_queue",req.body,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the approved listings");
            return res.send(result);
        }
    })
}

function adminGetAllRejectedListings(req,res)
{
    mq_client.make_request("getAllRejectedListings_queue",req.body,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the rejected listings");
            return res.send(result);
        }
    })
}

function adminGetAllUserDetails(req,res)
{
    mq_client.make_request("getAllUserDetails_queue",req.body,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the users");
            return res.send(result);
        }
    })
}
function adminGetAllUserDetailsWithRedis(req,res)
{
    redisclient.get("userList", function (err, reply) {
        if (err)
            return res.send(null);
        else if (reply) //user exists in cache
            return res.send(JSON.parse(reply));
        else {
            mq_client.make_request("getAllUserDetails_queue", req.body, function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    console.log("Got all the Users: for redis");
                    redisclient.set("userList", JSON.stringify(result), function () {
                        return res.send(result);
                    });
                }
            });
        }
    })
}

function adminGetAllAnalytics(req,res)
{
    mq_client.make_request("analysis_queue",req.body,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the analytics");
            return res.send(result);
        }
    })
}

function adminGetLessSeenAreas(req,res)
{
  mq_client.make_request("less_seen_areas",req.body,function(err ,result){
    if(err)
    {
      throw err;
    }
    else
    {
      console.log("Got all the analytics");
      return res.send(result);
    }
  })
}

function adminReviewsOnProperties(req,res)
{
  mq_client.make_request("reviews_on_properties",req.body,function(err ,result){
    if(err)
    {
      throw err;
    }
    else
    {
      console.log("Got all the analytics");
      return res.send(result);
    }
  })
}

function adminTopTenRevenueProperties(req,res)
{
  mq_client.make_request("top_revenue_properties",req.body,function(err ,result){
    if(err)
    {
      throw err;
    }
    else
    {
      console.log("Got all the analytics");
      return res.send(result);
    }
  })
}



function adminCityWiseRevenue(req,res)
{
  mq_client.make_request("citywise_revenue",req.body,function(err ,result){
    if(err)
    {
      throw err;
    }
    else
    {
      console.log("Got all the analytics");
      return res.send(result);
    }
  })
}

function adminTopTenRevenueHost(req,res)
{
  mq_client.make_request("top_revenue_host",req.body,function(err ,result){
    if(err)
    {
      throw err;
    }
    else
    {
      console.log("Got all the analytics");
      return res.send(result);
    }
  })
}


function adminTopTenRevenueHost(req,res)
{
  mq_client.make_request("top_revenue_host",req.body,function(err ,result){
    if(err)
    {
      throw err;
    }
    else
    {
      console.log("Got all the analytics");
      return res.send(result);
    }
  })
}

function getUserTrack(req,res)
{

  console.log(JSON.stringify(req.body));
  mq_client.make_request("user_track",req.body,function(err ,result){
    if(err)
    {
      throw err;
    }
    else
    {
      console.log("Got all the analytics");
      return res.send(result);
    }
  })

}

function getUserGroupTrack(req,res)
{

  console.log(JSON.stringify(req.body));
  mq_client.make_request("user_group_track",req.body,function(err ,result){
    if(err)
    {
      throw err;
    }
    else
    {
      console.log("Got all the analytics");
      return res.send(result);
    }
  })

}

function getHostRatings(req,res)
{

    console.log(JSON.stringify(req.user));
    mq_client.make_request("getUserRatings_queue",{"email":req.user},function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the HostRatings");
            return res.send(result);
        }
    })


}


function adminGetAllHostDetails(req,res)
{
    mq_client.make_request("getAllHotsDetails_queue",req.body,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the hosts");
            return res.send(result);
        }
    })
}
function adminGetAllHostDetailsWithRedis(req,res)
{
    redisclient.get("hostList", function (err, reply) {
        if (err)
            return res.send(null);
        else if (reply) //Host exists in cache
            return res.send(JSON.parse(reply));
        else {

            mq_client.make_request("getAllHotsDetails_queue",req.body,function(err ,result){
                if(err)
                {
                    throw err;
                }
                else
                {
                    console.log("Got all the hosts: for redis");
                    redisclient.set("hostList", JSON.stringify(result), function () {
                        return res.send(result);
                    });
                }
            })

        }
    })
}

function adminGetAllBillDetails(req,res)
{
    console.log("Users Per Page "+req.param("pageNumber") );
    var msg_payload = {'pageNumber': req.param("pageNumber"), 'usersPerPage': req.param("usersPerPage")};
    mq_client.make_request("getAllBillDetails_queue",msg_payload,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the bills");
            return res.send(result);
        }
    })
}
function adminGetAllBillDetailsWithRedis(req,res)
{
    redisclient.get("billList", function (err, reply) {
        if (err)
            return res.send(null);
        else if (reply) //Bill exists in cache
            return res.send(JSON.parse(reply));
        else {
            mq_client.make_request("getAllBillDetails_queue",req.body,function(err ,result){
                if(err)
                {
                    throw err;
                }
                else
                {
                    console.log("Got all the bills: for redis");
                    redisclient.set("billList", JSON.stringify(result), function () {
                        return res.send(result);
                    });
                }
            })
        }
    })
}


//----Search ---

function adminGetBillfromBillDate(req,res)
{
    console.log("Get Serach results ");
    var msg_payload = {'billDate': req.param("billDate")};
    mq_client.make_request("getBillfromBillDate_queue",msg_payload,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the bills");
            return res.send(result);
        }
    })
}



function adminGetBillfromBillMonth(req,res)
{
    console.log("Get Serach results.");
    var msg_payload = {'SelectedMonth': req.param("SelectedMonth") , 'SelectedYear': req.param("SelectedYear") };
    mq_client.make_request("getBillfromBillMonth_queue",msg_payload,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the bills");
            return res.send(result);
        }
    })
}

function adminGetHostfromCity(req,res)
{


    /*redisclient.get("hostList", function (err, reply) {
        if (err)
            return res.send(null);
        else if (reply) //Host exists in cache
            return res.send(JSON.parse(reply));
        else {*/
            mq_client.make_request("getHostfromCity_queue", req.body, function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    console.log("Got all the hosts");
                   // redisclient.set("hostList", JSON.stringify(result), function () {
                        return res.send(result);
                   // });
                }
            })
       /* }
    })*/
}

function adminGetUserfromCity(req,res)
{
    console.log("Get Search results.");
  /*  redisclient.get("userList", function (err, reply) {
        if (err)
            return res.send(null);
        else if (reply) //Host exists in cache
            return res.send(JSON.parse(reply));
        else {*/
            mq_client.make_request("getUserfromCity_queue", req.body, function (err, result) {
                if (err) {
                    throw err;
                }
                else {
                    console.log("Got all the users");
                    return res.send(result);
                    /*redisclient.set("userList", JSON.stringify(result), function () {
                        return res.send(result);
                    })*/;
                }
            })
       /* }
    })*/
}



///-------------
function adminBiddingTrack(req,res)
{
    mq_client.make_request("bidding_track_queue",req.body,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the bills");
            return res.send(result);
        }
    })
}



function totalRevenue(req,res)
{
    mq_client.make_request("total_revenue_queue",req.body,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the bills");
            return res.send(result);
        }
    })
}


function totalBokings(req,res)
{
    mq_client.make_request("total_bookings_queue",req.body,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the bills");
            return res.send(result);
        }
    })
}


function totalListings(req,res)
{
    mq_client.make_request("total_listings_queue",req.body,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the bills");
            return res.send(result);
        }
    })
}



function totalUsers(req,res)
{
    mq_client.make_request("total_users_queue",req.body,function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
            console.log("Got all the bills");
            return res.send(result);
        }
    })
}



exports.redirectToAdmin = redirectToAdmin;
exports.adminGetAllNewListing = adminGetAllNewListing;
exports.setStatusForPendingListing = setStatusForPendingListing;
exports.adminGetAllApprovedListings = adminGetAllApprovedListings;
exports.adminGetAllRejectedListings = adminGetAllRejectedListings;
exports.adminGetAllUserDetails = adminGetAllUserDetails;
exports.adminGetAllAnalytics = adminGetAllAnalytics;
exports.adminGetLessSeenAreas = adminGetLessSeenAreas;
exports.adminReviewsOnProperties = adminReviewsOnProperties;
exports.adminTopTenRevenueProperties = adminTopTenRevenueProperties;
exports.adminCityWiseRevenue = adminCityWiseRevenue;
exports.adminTopTenRevenueHost = adminTopTenRevenueHost;
exports.getUserTrack= getUserTrack;
exports.getUserGroupTrack= getUserGroupTrack;
exports.getHostRatings = getHostRatings;
exports.adminGetAllHostDetails = adminGetAllHostDetails;
exports.adminGetAllBillDetails = adminGetAllBillDetails;
exports.adminBiddingTrack = adminBiddingTrack;
exports.adminGetAllHostDetailsWithRedis = adminGetAllHostDetailsWithRedis;
exports.adminGetAllBillDetailsWithRedis = adminGetAllBillDetailsWithRedis;
exports.adminGetAllUserDetailsWithRedis = adminGetAllUserDetailsWithRedis;
exports.adminGetBillfromBillDate = adminGetBillfromBillDate;
exports.adminGetBillfromBillMonth =adminGetBillfromBillMonth;
exports.adminGetHostfromCity = adminGetHostfromCity;
exports.adminGetUserfromCity  = adminGetUserfromCity;

exports.totalRevenue = totalRevenue;
exports.totalBokings= totalBokings;
exports.totalListings= totalListings;
exports.totalUsers= totalUsers;















