var express = require('express');
var router = express.Router();
var mq_client = require('../rpc/client');

//for redis---------
var redis = require('redis');
var redisclient = redis.createClient(6379, '127.0.0.1');
//----redis end--

router.post('/bookTrip' ,function(req,res,next) {

    console.log("********In Book Trip Routes*********");
        console.log("Request object:" +req.body);

        var tripId = req.body.tripId;
        var userEmail = req.body.userEmail;
        var hostEmail = req.body.hostEmail;
        var listId = req.body.listId;
        var fixedPrice = req.body.fixedPrice;
        var totalPrice = req.body.totalPrice;
        var checkInDate = req.body.checkInDate;
        var checkOutDate = req.body.checkOutDate;
        var tripStatus = req.body.tripStatus;
        var paymentStatus = req.body.paymentStatus;
        var billId = req.body.billId;
        var userComments = req.body.userComments;
        var guestsSelected = req.body.guestsSelected;
        var hostName = req.body.hostName;
        var listingTitle = req.body.listingTitle;
        var listingCity = req.body.listingCity;
        var userName = req.body.userName;
        var zipCode = req.body.zipCode;
        var streetAddress = req.body.streetAddress;
        var suiteNum = req.body.suiteNum;
        var hostProfilePic=req.body.hostProfilePic;
        var userProfilePic = req.body.userProfilePic;





        console.log("Guests Selected:"+guestsSelected);



   var msg_payload = {


        "userEmail": userEmail,
        "hostEmail":hostEmail,
        "listId": listId,
        "fixedPrice":fixedPrice,
        "totalPrice":totalPrice,
        "checkInDate": checkInDate,
        "checkOutDate":checkOutDate,
        "userComments": userComments,
        "guestsSelected":guestsSelected,
        "hostName":hostName,
        "listingTitle":listingTitle,
        "listingCity":listingCity,
        "userName":userName,
        "zipCode":zipCode,
        "streetAddress":streetAddress,
         "suiteNum":suiteNum,
       "hostProfilePic":hostProfilePic,
       "userProfilePic":userProfilePic


   }

    console.log("Message Payload:"+msg_payload);

    mq_client.make_request('bookTrip_queue',msg_payload, function(err,results){

        if(err){
            console.log(err);
            json_responses = {"statusCode" : 405} ;
            res.send(json_responses);

        }
        else
        {

            console.log(results);

            if(results.statusCode == 200)

            {

                console.log("Booked Trip for User");

                console.log("Results: " + results);


                json_responses = {"statusCode" : 200} ;
                console.log(json_responses);
                res.send(json_responses);

            }
            else if(results.statusCode == 401)
            {
                console.log("Cannot Book a Trips");

                json_responses = {"statusCode" : 401 };
                console.log(json_responses);
                res.send(json_responses);


            }

        }
    });


});

router.post('/checkDates' ,function(req,res,next) {



    console.log("********In Check Dates Routes*********");
    console.log("Request object:" +req.body);


    var listId = req.body.listId;
    var checkInDate = req.body.checkInDate;
    var checkOutDate = req.body.checkOutDate;
    console.log("Check Dates "+req.body.listId+" "+req.body.checkInDate+" "+ req.body.checkOutDate);
    console.log("User :"+req.user);






    var msg_payload = {

        "listId": listId,
        "checkInDate": checkInDate,
        "checkOutDate":checkOutDate,
        "userEmail":req.user

    }

    console.log("Message Payload:"+msg_payload);

    mq_client.make_request('checkDates_queue',msg_payload, function(err,results){

        if(err)
        {
            console.log(err);
            /*json_responses = {"statusCode" : 405} ;
            res.send(json_responses);*/

        }
        else
        {

            console.log(results);

            if(results.statusCode == 200)

            {

                console.log("dates available");

                console.log("Results: " + results);
                json_responses = {"statusCode" : 200} ;
                console.log(json_responses);
                res.send(json_responses);

            }
            else if(results.statusCode == 401)
            {
                console.log("dates not available");
                console.log("Results: " + results);
                json_responses = {"statusCode" : 401,"bookedDates":results.bookedDates };
                console.log(json_responses);
                res.send(json_responses);


            }
            else{
                console.log("You already have booked this property for these dates");
                json_responses = {"statusCode" : 405};
                console.log(json_responses);
                res.send(json_responses);
            }

        }
    });


});


router.post('/getPendingTrips' ,function(req,res,next) {



    console.log("********In Pending Trips Routes*********");
    console.log("Request object:" +req.body);


    var userEmail = req.body.userEmail;

    console.log("User Email fetching pending trips "+userEmail);


    var msg_payload = {

        "userEmail": userEmail
    }

    console.log("Message Payload:"+msg_payload);

    mq_client.make_request('getPendingTrips_queue',msg_payload, function(err,results){

        if(err)
        {
            console.log(err);
            json_responses = {"statusCode" : 405};
            res.send(json_responses);

        }
        else
        {

            console.log(results);

            if(results.statusCode == 200)

            {

                console.log("Fetched Pending Trips");

                console.log("Results: " + results);
                json_responses = {"statusCode" : 200,"pendingTrips":results.pendingTrips} ;
                console.log(json_responses);
                res.send(json_responses);

            }
            else if(results.statusCode == 401)
            {
                console.log("No Trips for User");
                json_responses = {"statusCode" : 401};
                console.log(json_responses);
                res.send(json_responses);
            }

        }
    });


});


router.post('/getPreviousTrips' ,function(req,res,next) {



    console.log("********In Pending Trips Routes*********");
    console.log("Request object:" +req.body);


    var userEmail = req.body.userEmail;

    console.log("User Email fetching pending trips "+userEmail);


    var msg_payload = {

        "userEmail": userEmail
    }

    console.log("Message Payload:"+msg_payload);

    mq_client.make_request('getPreviousTrips_queue',msg_payload, function(err,results){

        if(err)
        {
            console.log(err);
            json_responses = {"statusCode" : 405};
            res.send(json_responses);

        }
        else
        {

            console.log(results);

            if(results.statusCode == 200)

            {

                console.log("Fetched Pending Trips");

                console.log("Results: " + results);
                json_responses = {"statusCode" : 200,"pendingTrips":results.pendingTrips} ;
                console.log(json_responses);
                res.send(json_responses);

            }
            else if(results.statusCode == 401)
            {
                console.log("No Trips for User");
                json_responses = {"statusCode" : 401};
                console.log(json_responses);
                res.send(json_responses);
            }

        }
    });


});

router.post('/getAuctionTrips' ,function(req,res,next) {



    console.log("********In GET Auction Trips Routes*********");
    console.log("Request object:" +req.body);


    var userEmail = req.body.userEmail;

    console.log("User Email fetching pending trips "+userEmail);


    var msg_payload = {

        "userEmail": userEmail
    }

    console.log("Message Payload:"+msg_payload);

    mq_client.make_request('getAuctionTrips_queue',msg_payload, function(err,results){

        if(err)
        {
            console.log(err);
            json_responses = {"statusCode" : 405};
            res.send(json_responses);

        }
        else
        {

            console.log(results);

            if(results.statusCode == 200)

            {

                console.log("Fetched Auction Trips");

                console.log("Results: " + results);
                json_responses = {"statusCode" : 200,"auctionTrips":results.auctionTrips} ;
                console.log(json_responses);
                res.send(json_responses);

            }
            else if(results.statusCode == 401)
            {
                console.log("No Trips for User");
                json_responses = {"statusCode" : 401};
                console.log(json_responses);
                res.send(json_responses);
            }

        }
    });


});

router.post('/placeBid' ,function(req,res,next) {

    console.log("********Placing Bid*********");
    console.log("Request object:" +req.body);
    console.log("1");
    var listingDetails = req.body.listingDetails;
    console.log("2");
    /*var auctionTripsId = "";
    var userEmail = req.body.userEmail;
    var hostEmail = req.body.hostEmail;
    var listId = req.body.listId;
    var bidAmount = req.body.bidAmount;
    var totalPrice = req.body.totalPrice;

    var checkInDate = listingDetails.fromDate;
    console.log("checkin:"+checkInDate)
    var checkOutDate = listingDetails.toDate;
    var bidStatus = "Pending";
    var tripStatus = "";
    var paymentStatus = "";
    var billId = auctionTripsId;
    var guestsSelected = listingDetails.guestsSelected;
    var listingTitle = listingDetails.title;
    var listingCity = listingDetails.city;
    var zipCode = listingDetails.ZipCode;
    var address = listingDetails.address;
    var suiteNum = listingDetails.suiteNum;*/
    console.log("req.body.guestsSelected"+req.body.guestsSelected);
    var msg_payload = {
        listingDetails : req.body.listingDetails,

        tableEntries : {
            auctionTripsId : "",
            userEmail : req.body.userEmail,
            hostEmail : listingDetails.hostId,
            listId : req.body.listId,
            bidPrice : req.body.bidAmount,
            totalPrice : req.body.totalPrice,
            checkInDate : new Date(listingDetails.fromDate).toISOString(),
            checkOutDate : new Date(listingDetails.toDate).toISOString(),
            bidStatus : "Pending",
            tripStatus : "",
            paymentStatus : "pending",
            billId : "",
            guestsSelected : req.body.guestsSelected,
            listingTitle : listingDetails.title,
            listingCity : listingDetails.address[0].city,
            zipCode : listingDetails.address[0].ZipCode,
            streetAddress : listingDetails.address[0].address,
            suiteNum : listingDetails.address[0].suiteNum,
            userName : req.body.userName,
            hostName : req.body.hostName,
            auctionEndDate : req.body.listingDetails.auctionEndDate
        }
    }

    console.log("Message Payload:"+msg_payload);

    mq_client.make_request('placeBid_queue',msg_payload, function(err,results){

        if(err){
            console.log(err);
            json_responses = {"statusCode" : 405} ;
            res.send(json_responses);

        }
        else
        {

            console.log(results);

            if(results.statusCode == 200)

            {

                console.log("Booked Trip for User");

                console.log("Results: " + results);


                json_responses = {"statusCode" : 200} ;
                console.log(json_responses);
                res.send(json_responses);

            }
            else if(results.statusCode == 401)
            {
                console.log("Cannot Book a Trips");

                json_responses = {"statusCode" : 401 };
                console.log(json_responses);
                res.send(json_responses);


            }
        }
    });
});

router.post('/updateAuctionTrips' ,function(req,res,next) {



    console.log("********In updateAuctionTrips Routes*********");

    var msg_payload = {

    }

    console.log("Message Payload:"+msg_payload);

    mq_client.make_request('updateAuctionTrips_queue',msg_payload, function(err,results){

        if(err)
        {
            console.log(err);
            json_responses = {"statusCode" : 405} ;
            res.send(json_responses);

        }
        else
        {

            console.log(results);

            if(results.statusCode == 200)

            {
                console.log("dates available");

                //-----------Redis start----------
                console.log('Clean Redis');
                redisclient.del('billList');
                //-----------Redis end----------

                console.log("Results: " + results);
                json_responses = {"statusCode" : 200} ;
                console.log(json_responses);
                res.send(json_responses);

            }
            else if(results.statusCode == 401)
            {
                console.log("dates not available");
                console.log("Results: " + results);
                json_responses = {"statusCode" : 401,"bookedDates":results.bookedDates };
                console.log(json_responses);
                res.send(json_responses);


            }

        }
    });


});


router.post('/updateTrip' ,function(req,res,next) {



    console.log("********In update trup Routes*********");
    console.log("Request object:" +req.body);


    var tripId = req.body.tripId;
    var checkInDate = req.body.checkInDate;
    var checkOutDate = req.body.checkOutDate;
    console.log("Check Dates "+req.body.tripId+" "+req.body.checkInDate+" "+ req.body.checkOutDate);






    var msg_payload = {

        "tripId": tripId,
        "checkInDate": checkInDate,
        "checkOutDate":checkOutDate,
        "userEmail":req.user

    }

    console.log("Message Payload:"+msg_payload);

    mq_client.make_request('updateTrip_queue',msg_payload, function(err,results){

        if(err)
        {
            console.log(err);
            json_responses = {"statusCode" : 405} ;
            res.send(json_responses);

        }
        else
        {

            console.log(results);

            if(results.statusCode == 200)

            {

                console.log("update trip successfull");

                //-----------Redis start----------
                console.log('Clean Redis');
                redisclient.del('billList');
                //-----------Redis end----------

                console.log("Results: " + results);
                json_responses = {"statusCode" : 200} ;
                console.log(json_responses);
                res.send(json_responses);

            }
            else if(results.statusCode == 401)
            {
                console.log("cannot be updated");
                console.log("Results: " + results);
                json_responses = {"statusCode" : 401};
                console.log(json_responses);
                res.send(json_responses);


            }

        }
    });


});




router.post('/cancelTrip' ,function(req,res,next) {



    console.log("********In cancelTrip trip Routes*********");



    var tripId = req.body.tripId;

    console.log(" tripId "+req.body.tripId);






    var msg_payload = {

        "tripId": tripId,
        "userEmail":req.user

    }

    console.log("Message Payload:"+msg_payload);

    mq_client.make_request('cancelTrip_queue',msg_payload, function(err,results){

        if(err)
        {
            console.log(err);
            json_responses = {"statusCode" : 405} ;
            res.send(json_responses);

        }
        else
        {

            console.log(results);

            if(results.statusCode == 200)

            {

                console.log("update trip successfull");

                //-----------Redis start----------
                console.log('Clean Redis');
                redisclient.del('billList');
                //-----------Redis end----------

                console.log("Results: " + results);
                json_responses = {"statusCode" : 200} ;
                console.log(json_responses);
                res.send(json_responses);

            }
            else if(results.statusCode == 401)
            {
                console.log("cannot be updated");
                console.log("Results: " + results);
                json_responses = {"statusCode" : 401};
                console.log(json_responses);
                res.send(json_responses);


            }

        }
    });


});
module.exports= router;