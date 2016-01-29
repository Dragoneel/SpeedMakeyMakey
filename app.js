var express  = require('express'),
    path     = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');

/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection  = require('express-myconnection'),
         mysql  = require('mysql');

app.use(

    connection(mysql,{
        host     : '127.6.45.2',
        user     : 'root',
        password : '',
        database : 'speed',
        debug    : true //set true if you wanna see debug logger
    },'request')

);

app.get('/back',function(req,res){
    res.send('Speed Makey Makey api');
});


//RESTful route
var router = express.Router();


/*------------------------------------------------------
*  This is router middleware,invoked everytime
*  we hit url /api and anything after /api
*  like /api/user , /api/user/7
*  we can use this for doing validation,authetication
*  for every route started with /api
--------------------------------------------------------*/
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

var curut = router.route('/tas');


//show the CRUD interface | GET
curut.get(function(req,res,next){


    req.getConnection(function(err,conn){

    	console.log(err);
    	console.log(conn);

        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM tas',function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }

            res.setHeader('Content-Type', 'application/json');
            res.send(rows);


         });

    });

});



//now we need to apply our router here
app.use('/api', router);

//start Server
var server = app.listen(3000,function(){

   console.log("Listening to port %s",server.address().port);

});
