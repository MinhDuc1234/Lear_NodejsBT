var Activities=require('../../../model/schema').activities;
var qrcode = require('qrcode'); 
//handle get all Activities
exports.getAll=function(req,res){
    Activities.find({},function(err,activities){
        if(err){
            res.json({
                status: 'error',
                message: err
            })
        }
        res.json({
            status:'success',
            message: 'all Activities retrieved',
            data: activities
        });
    })
}

//handle insert 
exports.insert=function(req,res){
    console.log('start config data');
    
    var activities=new Activities();
    activities.name=req.body.name;
    activities.description=req.body.description;
    activities.createdBy=req.user._id;
    activities.createdDate=new Date();
    activities.updatedBy=req.user._id;
    activities.updatedDate=new Date();
    console.log('end config data and save');
    activities.save(function(err){
        if(err){
            console.log('error while save');
            console.log(err);
            res.json({
                status: 'error',
                message:err
            })
        }
        res.json({
            message:'Activities inserted',
            data: activities
        })
    })
}

//handle get Activities by id
exports.getById=async function(req,res){
    // Activities.findById(req.params.activities_id,function(err,activities){
    //     console.log('para');
    //     console.log(req.params.activities_id);
    //     if(err){
    //         res.json({
    //             status: 'an error was occurred',
    //             message: err
    //         });
    //     }
    //     console.log('Activities info');
    //     console.log(activities);
    //     res.json({
    //             message: 'Activities is loading...',
    //             data: activities
    //     });
    // });
    let data=await  Activities.findById(req.params.activities_id).
    populate({
        path: 'createdBy',
        select:'username'
    }).
    populate({
        path:'updatedBy',
        select:'username'
    });
    console.log('outside');
    console.log(data);
    res.json(data);

}

//hanle update 
exports.update=function(req,res){
    Activities.findById(req.params.activities_id,function(err,activities){
        if(err){
            res.json({
                status: 'error',
                message: err
            });
        }
        activities.name=req.body.name;
        activities.description=req.body.description;
        activities.updatedBy=req.user._id;
        activities.updatedDate=new Date();
        activities.save(function(err){
            if(err){
                res.json({
                    status: 'error',
                    message:err
                })
            }
            res.json({
                status: "success",
                message: 'Activities has beeen updated'
            });
        });
    });
}


//handle delete
exports.delete=function(req,res){
    console.log('id from user');
    console.log(req.params.activities_id);
    Activities.remove({_id: req.params.activities_id},function(err,activities){
        if(err){
            res.json({
                status:'error',
                message: err
            });
        }
        res.json({
            status: 'success',
            message: 'Activities deleted'
        })
    })
}

//handle export qr code
exports.getQR = function (req, res) { 
    var id = req.params.id; 
    var imgFolder='src/app/public/img/'; 
    var imgPath = 'src/app/public/img/qrcode' + id + '.png'; 
    var imagePathToClient = '/img/qrcode' + id + '.png'; 
    //save qr image to file 
    qrcode.toFile(imgPath, id, { 
        width: 1000, 
        height: 1000 
    }, function (err) { 
        if (err) { 
            console.log(err); 
            throw err 
        } 
        console.log('done'); 
    }); 
     
    //send image url to client 
    res.json({ 
        message: 'create qr code success', 
        data: imagePathToClient 
    }); 
}
