var express = require('express');
var app = express();
var mq_client = require('../rpc/client');

function userHome(req, res)
{

    mq_client.make_request("userHome_queue",{"user":req.user},function(err ,result){
        if(err)
        {
            throw err;
        }
        else
        {
                return res.send(result);
        }

    })
}


exports.userHome = userHome;