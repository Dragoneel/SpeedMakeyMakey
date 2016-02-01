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



var tasJoueur1 = [];
var tasJoueur2 = [];
// var tasJoueur3 = [];
// var tasJoueur4 = [];

var deckJoueur1 = [];
var deckJoueur2 = [];
// var deckJoueur3 = [];
// var deckJoueur4 = [];

var listCarte = [{
	url: "1-1"
},
{
	url: "1-1"
},
{
	url: "1-2"
},

{
	url: "1-2"
},
{
	url: "2-1"	
},
{
	url: "2-1"
},
{
	url: "2-2"
},
{
	url: "2-2"
},
{
	url: "5"
},
{
	url: "5"
},
{
	url: "6"
},
{
	url: "6"
},
{
	url: "7"
},
{
	url: "7"
}];

var init = function () {
	
	while (listCarte.length -2  != 0){

		var i = Math.floor((Math.random() * listCarte.length ) + 1);
		deckJoueur1.push(listCarte[i]);
		listCarte.splice(i, 1); 

		var j = Math.floor((Math.random() * listCarte.length ) + 1);
		deckJoueur2.push(listCarte[j]);
		listCarte.splice(j, 1); 
	}

	deckJoueur1.push(listCarte[0]);
	deckJoueur2.push(listCarte[1]);

}

var play = function(player){
	
	switch(player) {
	    case 1:
		    if(deckJoueur1.length != 0){
		        var carte = deckJoueur1[0];
		        tasJoueur1.push(carte);
		        deckJoueur1.splice(0,1);
		        return carte.url;
		    }
	        break;
	    case 2:
	    	if(deckJoueur2.length != 0){
		        var carte = deckJoueur2[0];
		        tasJoueur2.push(carte);
		        deckJoueur2.splice(0,1);
		        return carte.url;
		    }
	    	break;
	    case 3:
	    	if(deckJoueur3.length != 0){
		        var carte = deckJoueur3[0];
		        tasJoueur3.push(carte);
		        deckJoueur3.splice(0,1);
		        return carte.url;
		    }
	    	break;
		case 4:
	    	if(deckJoueur4.length != 0){
		        var carte = deckJoueur4[0];
		        tasJoueur4.push(carte);
		        deckJoueur4.splice(0,1);
		        return carte.url;
		    }
	    	break;

	}

}


init();

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



var player1 = router.route('/player1');
player1.get(function(req,res,next){

	var url = play(1);
	var tailleTas = tasJoueur1.length;
	var tailleDeck = deckJoueur1.length;

	res.setHeader('Content-Type', 'application/json');
    res.send({url:url,tailleTas:tailleTas,tailleDeck:tailleDeck});		
});

var player2 = router.route('/player2');
player2.get(function(req,res,next){

	var url = play(2);
	var tailleTas = tasJoueur2.length;
	var tailleDeck = deckJoueur2.length;

	res.setHeader('Content-Type', 'application/json');
    res.send({url:url,tailleTas:tailleTas,tailleDeck:tailleDeck});		
});


var p1tp2 = router.route('/p1tp2');
p1tp2.get(function(req,res,next){

	var tmp = tasJoueur1.concat(tasJoueur2);
	tasJoueur1 = [];
	tasJoueur2 = [];
	deckJoueur2 = deckJoueur2.concat(tmp);
	var tailleDeck1 = deckJoueur1.length;
	var tailleDeck2 = deckJoueur2.length;
	res.setHeader('Content-Type', 'application/json');
    res.send({deck1:tailleDeck1,deck2:tailleDeck2});		
});

var p2tp1 = router.route('/p2tp1');
p2tp1.get(function(req,res,next){

	var tmp = tasJoueur1.concat(tasJoueur2);
	tasJoueur1 = [];
	tasJoueur2 = [];
	deckJoueur1 = deckJoueur1.concat(tmp);
	var tailleDeck1 = deckJoueur1.length;
	var tailleDeck2 = deckJoueur2.length;
	res.setHeader('Content-Type', 'application/json');
    res.send({deck1:tailleDeck1,deck2:tailleDeck2});		
});

var p1t = router.route('/p1t');
p1t.get(function(req,res,next){

	var tmp = tasJoueur1.concat(tasJoueur2);
	tasJoueur1 = [];
	tasJoueur2 = [];
	deckJoueur1 = deckJoueur1.concat(tmp);
	var tailleDeck1 = deckJoueur1.length;
	var tailleDeck2 = deckJoueur2.length;
	res.setHeader('Content-Type', 'application/json');
    res.send({deck1:tailleDeck1,deck2:tailleDeck2});		
});

var p2t = router.route('/p2t');
p2t.get(function(req,res,next){

	var tmp = tasJoueur1.concat(tasJoueur2);
	tasJoueur1 = [];
	tasJoueur2 = [];
	deckJoueur2 = deckJoueur2.concat(tmp);
	var tailleDeck1 = deckJoueur1.length;
	var tailleDeck2 = deckJoueur2.length;
	res.setHeader('Content-Type', 'application/json');
    res.send({deck1:tailleDeck1,deck2:tailleDeck2});		
});




//now we need to apply our router here
app.use('/api', router);

//start Server
var server = app.listen(3000,function(){

   console.log("Listening to port %s",server.address().port);

});





