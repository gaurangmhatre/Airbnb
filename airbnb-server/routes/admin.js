/**
 * Created by Gaurang on 16-11-2016.
 */

var User = require('../models/user');
var Listing = require('../models/listing');
var userProfile = require('../models/userProfile');
var mysql = require('../db/mysql.js');
var date = require('../models/date');

console.log("I am in the user");

function getAllPendingListings(req ,callback)
{
    console.log("Get All pending listings ",req);

    Listing.find({"status":"newListing"}).skip(req.usersPerPage * (req.pageNumber-1)).limit(req.usersPerPage).exec(function(err,newListings){
        if(err)
        {
            return callback(err);
        }
        else
        {
            //console.log(newListings);
            return callback(null ,newListings);
        }
    })

}

function setStatusForPendingListing(req ,callback)
{
    console.log("Get All pending listings ",req);

    var listId = req.pendingListing.listId
    var status = req.status;
    //({phone:request.phone}, {$set: { phone: request.phone }}
    Listing.update({"listId":listId},{$set:{"status":status}}
    ,function(err){

        if(err) {
            return callback(err);
        }
        else {
            console.log("For ListId "+listId +" Status update to: "+status);

            return callback(null,{"listId":listId});
        }
    });
}


function getAllApprovedListings(req ,callback)
{
    console.log("Get All pending listings ",req);

    Listing.find({"status":"approved"}).skip(req.usersPerPage * (req.pageNumber-1)).limit(req.usersPerPage).exec(function(err,ApprovedListings){
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log(ApprovedListings);
            return callback(null ,ApprovedListings);
        }
    })

}

function getAllRejectedListings(req ,callback)
{
    console.log("Get All pending listings ",req);

    Listing.find({"status":"rejected"}).skip(req.usersPerPage * (req.pageNumber-1)).limit(req.usersPerPage).exec(function(err,RejectedListings){
        if(err)
        {
            return callback(err);
        }
        else
        {
            console.log(RejectedListings);
            return callback(null ,RejectedListings);
        }
    })

}

function getAllUserDetails(req ,callback){
    console.log("Get All userProfiles listings ",req);
    console.log("page clicked "+req.pageNumber);
    console.log("users per page "+req.usersPerPage);
    userProfile.find({}).skip(req.usersPerPage * (req.pageNumber-1)).limit(req.usersPerPage).exec(function(err,userProfiles){
        if(err)
        {
            return callback(err);
        }
        else
        {
            //console.log(userProfiles);
            return callback(null ,userProfiles);
        }
    });
}
function getUserTripsInfo(req ,callback){

}
function getUsersPropertyInfo(req ,callback){

}
function getAllHotsDetails(req ,callback){
    console.log("Get All hostProfiles listings ",req);

    userProfile.find({'host':true}).skip(req.usersPerPage * (req.pageNumber-1)).limit(req.usersPerPage).exec(function(err,hostProfiles){
        if(err)
        {
            return callback(err);
        }
        else
        {
            //console.log(hostProfiles);
            return callback(null ,hostProfiles);
        }
    })
}

//change this method body
function getAllBillDetails(req ,callback){
    console.log("Get All bills ",req);
    console.log("Get pageNumber "+req.pageNumber);
    console.log("Get usersPerPage "+req.usersPerPage);
    var pgNo = req.pageNumber - 1;
    var limitLower = pgNo * req.usersPerPage;
    var allBills= "select * from trips limit "+pgNo+","+req.usersPerPage+""; 

    mysql.getData(function(err,allTrips){

        if(err){
            console.log("Error in Trips MySQL:"+err);
            return callback(null ,{"error":"mysql Error"} );
            //throw err;
        }

        else
        {
            return callback(null ,allTrips);
        }
    },allBills);
}

function getBillfromBillDate(req,callback){

    console.log("Get usersPerPage "+req.billDate);

    var billDateOnly = req.billDate.split('T')[0].toString();


    var Bills= "select * from trips where paymentStatus = 'paid' and billDate= '"+billDateOnly+"'";
    mysql.getData(function(err,allTrips){

        if(err){
            console.log("Error in Trips MySQL:"+err);
            return callback(null ,{"error":"mysql Error"} );
            //throw err;
        }
        else
        {
            return callback(null ,allTrips);
        }
    },Bills);
}
function getBillfromBillMonth(req,callback){

    console.log("Get Selected Month "+req.SelectedMonth);
    console.log("Get Selected Year "+req.SelectedYear);

    //var billDateOnly = req.billDate.split('T')[0].toString();


    var Bills= "select * from trips where paymentStatus = 'paid' and billDate > '"+req.SelectedYear+"-"+req.SelectedMonth+"-01' and billDate < '"+req.SelectedYear+"-"+req.SelectedMonth+"-31'";
    console.log(Bills);
    mysql.getData(function(err,allTrips){

        if(err){
            console.log("Error in Trips MySQL:"+err);
            return callback(null ,{"error":"mysql Error"} );
            //throw err;
        }
        else
        {
            return callback(null ,allTrips);
        }
    },Bills);
}
function getHostfromCity(req,callback){

    console.log("Get Selected Month "+req.SearchByCity);
    userProfile.find({'host':true , 'city': req.SearchByCity}).exec(function(err,hostProfiles){
        if(err)
        {
            return callback(err);
        }
        else
        {
            //console.log(hostProfiles);
            return callback(null ,hostProfiles);
        }
    })
}
function getUserfromCity(req,callback){

    console.log("Get user Selected Month "+req.SearchByCity);
    userProfile.find({'city': req.SearchByCity}).exec(function(err,userProfiles){
        if(err)
        {
            return callback(err);
        }
        else
        {
            //console.log(hostProfiles);
            return callback(null ,userProfiles);
        }
    })
}


function totalRevenue(req ,callback){
  console.log("Get All bills ",req);
  var totalRevenue= "SELECT (SELECT SUM(totalPrice) FROM trips) + (SELECT SUM(totalPrice) FROM auctiontrips) as revenue;";

  mysql.getData(function(err,revenue){

    if(err){
      console.log("Error in Trips MySQL:"+err);
      return callback(null ,{"error":"mysql Error"} );
      //throw err;
    }

    else
    {
      return callback(null ,revenue);
    }
  },totalRevenue);
}

//


function totalBookings(req ,callback){
  console.log("Get All bills ",req);
  var totalBookings= "SELECT (SELECT Count(*) FROM trips) + (SELECT Count(*) FROM auctiontrips) as bookings;";

  mysql.getData(function(err,bookings){

    if(err){
      console.log("Error in Trips MySQL:"+err);
      return callback(null ,{"error":"mysql Error"} );
      //throw err;
    }

    else
    {
      return callback(null ,bookings);
    }
  },totalBookings);
}


function totalListings(req ,callback){

  Listing.count({},function(err,count){
    if(err)
    {
      return callback(err);
    }
    else
    {
      console.log('Count fo lisdsldilasd'+count);
      return callback(null ,{listings:count});
    }
  });
}


function totalUsers(req ,callback){

  User.count({},function(err,count){
    if(err)
    {
      return callback(err);
    }
    else
    {
      console.log('Count fo lisdsldilasd'+count);
      return callback(null ,{users:count});
    }
  });
}


exports.getAllPendingListings=getAllPendingListings;
exports.setStatusForPendingListing= setStatusForPendingListing;
exports.getAllApprovedListings = getAllApprovedListings;
exports.getAllRejectedListings = getAllRejectedListings;

exports.getAllUserDetails =getAllUserDetails;
exports.getUserTripsInfo = getUserTripsInfo;
exports.getUsersPropertyInfo = getUsersPropertyInfo;
exports.getAllHotsDetails= getAllHotsDetails;
exports.getAllBillDetails = getAllBillDetails;
exports.totalRevenue= totalRevenue;
exports.totalBookings= totalBookings;
exports.totalListings= totalListings;
exports.totalUsers= totalUsers;

exports.getBillfromBillDate = getBillfromBillDate;
exports.getBillfromBillMonth = getBillfromBillMonth;
exports.getHostfromCity = getHostfromCity;
exports.getUserfromCity =getUserfromCity;