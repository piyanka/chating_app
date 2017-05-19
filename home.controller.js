//Common JS
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$";

    for (var i=0;i<5;i++){
    text += possible.charAt(Math.floor(Math.random()*possible.length));

    }
    return text;
}

angular.module('app').controller( 'HomeController', [ '$scope', function($scope) {

$scope.socket = io();
$scope.user = makeid();
$scope.message = "";
$scope.messages = [];


$scope.socket.emit('chatMessage',$scope.user,'<b>' + $scope.user + '</b> has joined the discussion');


$scope.sendMessage = function(){
    if($scope.message != ''){
       $scope.socket.emit('chatMessage',$scope.user,$scope.message);
    }
}


   $scope.socket.on('chatMessage' , function(from,msg){
        //console.log(from,msg)
        //var me = name//$('#user').val();
        var color =(from == $scope.user) ? 'green' : '#009afd';
        var from = (from == $scope.user) ? 'Me' : from;
        $scope.messages.push({msg:msg,color:color,from:from});
        $scope.$apply();

        //$('#messages').append('<li><b style="color:' + color + '">' +from +'</b>:'+ msg + '</li>');
    });


}])

// AngularJS Chat Core Service
// angular.module('app').service('chatMessage',
//     ['$rootScope'
//     function($rootScope) {



//     // Set User Data
//    socket.on('chatMessage' , function(from,msg){
//         console.log(from,msg)
//         var me = name//$('#user').val();
//         var color =(from == me) ? 'green' : '#009afd';
//         var from = (from == me) ? 'Me' : from;
//         $('#messages').append('<li><b style="color:' + color + '">' +from +'</b>:'+ msg + '</li>');
//     });


//     // Publish over network
//     // socket.on('notifyUser' ,function(user){
//     //     var me = $('#user').val();
//     //     if(user != me){
//     //         $('#notifyUser').text(user + 'is typing....');
//     //     }
//     //     setTimeout(function(){ $ ('#notifyUser').text('');},10000);;
//     // });
//     // Subscribe to new messages
    

