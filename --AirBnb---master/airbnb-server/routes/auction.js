var mysql = require('../db/mysql.js');
var ssn = require('ssn');

function placeBid(msg, callback){

    var res = {};

    console.log("in booktrip function");
        console.log("hostemail  in Handle Req:"+msg.tableEntries.hostEmail);
    console.log("Selected Guests: "+msg.tableEntries.guestsSelected);


    /*   //ALL Statuses in trips tables
     pendingHostApproval = when approval is pending from host
     rejectedByHost = when host rejects the request
     approvedByHost = when host has accepted bu trip is yet to be taken
     tripCompleted = when trip is completed
     tripCancelledbyUser = when booking user cancels the trip
     */




    msg.tableEntries.auctionTripsId = ssn.generate();

    console.log("Trip Id:" + msg.tableEntries.auctionTripsId);

    checkTripID(); //Call  for checking if trip id is not in use






    //Check if trip id already in use
    function checkTripID()
    {


        var checkId = "select auctionTripsId from auctiontrips where auctionTripsId = '"+msg.tableEntries.auctionTripsId+"'";
      //  var getOrders="select * from orderhistory where emailid='"+email+"'";
        mysql.getData(function(err,results){


            if(err){
                console.log("Error in auctiontrips MySQL:"+err);

                //throw err;
            }

            else
            {
                if(results.length>0){

                    console.log("auctiontrip Id already in Use");
                    console.log("Results: " + results);
                    msg.tableEntries.auctionTripsId = ssn.generate();
                    checkTripID();
                }
                else

                {
                    console.log("auctiontripsId Available");
                    insertIntoAuctionTrip();
                }
            }
        },checkId);

    }








    //will Execute only when trip Id is unique
    function insertIntoAuctionTrip ()
    {

        var placeBidForUser = "INSERT INTO auctiontrips SET ?";
        msg.tableEntries.billId = msg.tableEntries.auctionTripsId;
        var auctiontrips = msg.tableEntries;

        mysql.putData(function(err,results){


            if(err){
                console.log("Error in Trips MySQL:"+err);

                //throw err;
            }

            else
            {
                if(results!== undefined){

                    console.log("New Trip stored into database");
                    console.log("Results: " + results);
                    res.statusCode = "200";
                    callback(null, res);

                }
                else

                {

                    console.log("Cannot store Items into Database");
                    res.statusCode="401";
                    callback(null, res);

                }
            }
        },placeBidForUser,auctiontrips);


    }


}//End of function book trip


function updateAuctionTrips(msg, callback){
    /*select b.auctionTripsId,b.listId
    from auctiontrips b
    where (b.bidPrice,b.listId) in
    (
        select max(a.bidPrice), a.listId
    from (select c.auctionTripsId, c.bidPrice, c.listId from auctiontrips c where CAST(c.auctionEndDate AS datetime) < now()) a
    group by a.listId);*/

    //msg.tableEntries.billId = msg.tableEntries.auctionTripsId;
    //var auctiontrips = msg.tableEntries;
    var res = {};
    var autionTripIDs = [];
    var listIDs = [];

    var getInfoForAuctionUpdate = "select b.auctionTripsId,b.listId from auctiontrips b where (b.bidPrice,b.listId) in (select max(a.bidPrice), a.listId from (select c.auctionTripsId, c.bidPrice, c.listId from auctiontrips c where CAST(c.auctionEndDate AS datetime) < now()) a group by a.listId);";
    mysql.getData(function(err,results){


        if(err){
            console.log("Error in AuctionTrips MySQL:"+err);

            //throw err;
        }

        else
        {
            if(results!== undefined){

                console.log("New Auctions to be updated in database");
                console.log("Results: " + results);
                for(i=0; i< results.length; i++){
                    // To get auction IDs to update the Auction Status
                    console.log("results:"+typeof results[i].auctionTripsId);
                    autionTripIDs.push(results[i].auctionTripsId);

                    console.log("results"+results[i].listId);
                    listIDs.push(results[i].listId);
                }

                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // UPDATE AUCTIONS ID WHO WON THE BID
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                for(var i = 0 ; i < autionTripIDs.length; i++){
                    var updateAuctionsWhoWon = "update auctiontrips set ? where auctionTripsId = ?";
                    var setParam = {
                        "bidStatus" : "Bid Won",
                        "paymentStatus" : "pending"
                    };
                    var param = autionTripIDs[i];
                    mysql.updateData(updateAuctionsWhoWon,[setParam,param], function(err,results){


                        if(err){
                            console.log("Error while updating AuctionTrips in MySQL:"+err);

                            //throw err;
                        }

                        else
                        {
                            console.log("Winners' bidStatus changed in Auction Table.");
                            console.log("Results: " + results);
                        }
                    });
                }
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                // UPDATE AUCTIONS ID WHO WON THE BID
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                for(var i = 0 ; i < listIDs.length; i++){
                    var updateAuctionsWhoLost = "update auctiontrips set ? where listId = ? and bidStatus <> ?";
                    var setParam = {
                        "bidStatus" : "Bid Lost",
                        "paymentStatus" : "pending"
                    };
                    var param = listIDs[i];
                    var bidStatus = "Bid Won";
                    mysql.updateData(updateAuctionsWhoLost,[setParam,param,bidStatus], function(err,results){


                        if(err){
                            console.log("Error while updating AuctionTrips in MySQL:"+err);

                            //throw err;
                        }

                        else
                        {
                            console.log("Losers' bidStatus changed in Auction Table.");
                            console.log("Results: " + results);
                        }
                    });
                }
                /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                res.statusCode = "200";
                res.status = "All Bids Updated Successfully";
                callback(null, res);

            }
            else

            {
                console.log("No Bid to Update in Auction Table.");
                res.statusCode="401";
                callback(null, res);
            }
        }
    },getInfoForAuctionUpdate);

}

exports.placeBid=placeBid;
exports.updateAuctionTrips=updateAuctionTrips;

