var myApp=angular.module('myApp',[]);

myApp.controller('AppCtrl',['$scope','$http',function($scope,$http) {

	console.log("hello from controller");

var refresh = function(){
$http.get("/contactlist").then(function(res)
	{ 
		console.log("recieved the data requested");
		$scope.contactlist=res.data;  
		//$scope.contact='';
	});
};
refresh();
$scope.addContact = function()
	{
		console.log($scope.contact);
		$http.post("/contactlist",$scope.contact).then(function(res){
		console.log(res);
		refresh();
	});


};	
$scope.remove = function(id)
{
	console.log(id);
	$http.delete('/contactlist/' + id).then
	(
		function(res)
		{
			console.log("removing !");
			refresh();
		}
	);
};

$scope.edit=function(id)
{
	console.log(id);
	$http.get('/contactlist/' + id).then(function(res)
	{ 
		console.log("data in");
		console.log(res.data);
		$scope.contact=res.data;  
		//$scope.contact='';
	});
}

$scope.update=function()
{
	console.log($scope.contact._id);

	$http.put('/contactlist/' + $scope.contact._id,$scope.contact).then
	(
		function(res)
		{ 
		refresh();
		}
	);	
}

}]); 