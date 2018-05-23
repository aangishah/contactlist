var express =  require('express'); //express require functions like import
var session = require('express-session');  //add this session variable then add line 8
var app=express();
var mongojs= require('mongojs');
var db=mongojs('contactlist',['contactlist']);
var bodyParser=require('body-parser');

app.use(session({secret: 'ssshhhhh', saveUninitialized: true,resave: true})); // add any secret key to session
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/contactlist',function (req,res)
{

	var sess = req.session;   // get session of request in variable sess
	if(sess.username)
	{
		sess.username = 'aangi';
    }
	else{
	var username = req.body.username;
	console.log(username);
	
	}
	/*person1 = {
		name: 'aangi',
		email: 'aangishah2696@gmail.com',
		number: '(0101010101)',
	};
	person2 = {
		name:'aashvi',
		email: 'aashvi1703@gmail.com',
		number: '0001110001'
	};
	person3 = {
		name: 'aastha',
		email: 'aastha@gmail.com',
		number: '1111111111'
	};
	var contactlist=[person1, person2, person3];  
	res.json(contactlist);  */

	//	var cursor=db.collection//('user').find({'username':username, pwd='pwd'});
/*var flag=0;
cursor.toArray(function(err,item){
	console.log(item);
	console.log(item.length);
});*/
	db.contactlist.find(function(err,docs){
			console.log(docs);
			res.json(docs);
	});
});

app.post('/contactlist',function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,doc)
	{
		res.json();
	});
});

app.delete('/contactlist/:id',function(req,res)
{
	var id=req.params.id;
	console.log(id);
	db.contactlist.remove({ _id: mongojs.ObjectId(id) }, function(err,docs){
		if(err)
			throw err;
		res.json(docs);	
	});

});

app.get('/contactlist/:id',function(req,res) 
			{
				var id=req.params.id;
				console.log(id);
				db.contactlist.findOne({ _id: mongojs.ObjectId(id)},function(err,docs)
					{
						if(err)
							throw err;
						res.json(docs);	
					}
					); 
			}); 
app.put('/contactlist/:id',function(req,res) 
			{
				var id=req.params.id;
				console.log(req.body.name);
				db.contactlist.findAndModify
				(
					{
        				query: { _id: mongojs.ObjectId(id) },
        				update: { $set	: { name: req.body.name ,email:req.body.email, number:req.body.number} },
        				new: true
    				}, 
    				function (err, doc) 
    				{
      					res.json(doc);
    				}
    			);	
            }
		); 

app.listen(3000);
console.log("server running on the port 3000");


//res.direct for redirecting