angular.module('starter.controllers', ['firebase'])


.controller('ChatsCtrl', ['$scope', '$rootScope', '$firebaseArray', 'firebase', '$firebaseAuth',
function($scope, $rootScope, $firebaseArray, firebase, $firebaseAuth) {
	
	var ref = firebase.database().ref("messages/");
	var auth = firebase.auth();							
	var provider = new firebase.auth.FacebookAuthProvider();
	
	$scope.$on("$ionicView.beforeEnter", function(){	
		auth.onAuthStateChanged(function(user) {
			
				if (user) {
					console.log("logged In");console.log(user.profile_image_url);
					$scope.chats.$add({
						user:user.displayName,
						message: chat.message,
						imgURL: user.photoURL
					});
				}else{
					alert("Continue With Facebook to send messages.");
				}
		});
	});

		$scope.sendChat = function(chat){
			auth.onAuthStateChanged(function(user) {
				if (user) {
					console.log(chat);
					console.log("logged In");
					$scope.chats.$add({
						user: user.displayName,
						message: chat.message,
						imgURL: user.photoURL
					});
				}else{
					alert("Continue With Facebook to send messages.");
				}
				chat.message = "";
			});
			
		};
			
	
	
	$scope.chats = $firebaseArray(ref);
	//var ref = new Firebase('https://oa-chat-1628f.firebaseio.com/');//problem with FB connection
	
}])

.controller('BibleCtrl', ['$scope', '$rootScope', '$firebaseArray', 'firebase', '$firebaseAuth', '$http',
	function($scope, $rootScope, $firebaseArray, firebase, $firebaseAuth,$http) {
		var ref = firebase.database().ref("messages/");
		var auth = firebase.auth();							
		var provider = new firebase.auth.FacebookAuthProvider();
		$scope.$on("$ionicView.beforeEnter", function(){	
		auth.onAuthStateChanged(function(user) {
				if($scope.chapter === ""){
					$scope.getPassage();
				}
			});
		});
		
		 $scope.longList  = 
  			['Genesis','Exodus','Leviticus', 'Deuteronomy', 'Joshua', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings'];
			//$scope.longList.push(i);
		
		$scope.chapterList  = 
  			['1','2','3', '4', '5', '6', '7', '8', '9'];
			//$scope.longList.push(i);
		  
		
		$scope.verse = null;
		$scope.passage = "";
		$scope.book = "Genesis";
		$scope.chapter = "";
		$scope.verse = 1;
		var book = "";
		var chapter = 1;
		
		$scope.send_verse = function(ver){
			console.log(ver)
		}
		$scope.getPassage = function(target){
			console.log('get passage');
			if(target === undefined){
				book = 'genesis';
				chapter = 1;
			}else{
				book = target.book;
				chapter = target.chapter;
			}
			
			var url='http://getbible.net/json?p=' + book + '&callback=JSON_CALLBACK';
			var chapterNum = 1;
			if(chapter){
				
				chapterNum = chapter;
			}else{
				chapterNum = 1;
			}
			
			
			$http.jsonp(url)
				.success(function(data){			
				//$scope.passage = data.book[target.chapter].chapter[target.verse].verse;
				$scope.book_name = data.book_name;
				$scope.chapterNum = chapterNum;
				var i = 1;
				$scope.chapter = "";
				angular.forEach(data.book[chapterNum], function(data){
				$scope.chapterNum = chapterNum;	
					angular.forEach(data,function(data){					
						//<a href='#/tab/bible' ng-click='send_verse("+ data.verse +")'> + "</a>"
						$scope.chapter += "<sub>" + i + "</sub>" + data.verse;
						$scope.book_chapter = data.verse
						 
						i++;	
					})
				});
				
				});
			
		}//end getPassage();
		
		$scope.bookList = 
	
			({book:'Genesis', chapters: 50},
			{book:'Exodus', chapters: 40},
			{book:'Leviticus', chapters: 27},
			{book:'Numbers', chapters: 36},
			{book:'Deuteronomy', chapters: 34},
			{book:'Joshua', chapters: 24},
			{book:'Ruth', chapters: 21},
			{book:'1 Samuel', chapters: 31},
			{book:'2 Samuel', chapters: 24},
			{book:'1 Kings', chapters: 22},
			{book:'2 Kings', chapters: 25},
			{book:'1 Chronicles', chapters: 29},
			{book:'2 Chronicles', chapters: 36},
			{book:'Ezra', chapters: 10},
			{book:'Nehemiah', chapters: 13},
			{book:'Esther', chapters: 10},
			{book:'Job', chapters: 42},
			{book:'Psalms', chapters: 150},
			{book:'Proverbs', chapters: 31},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39},
			{book:'genesis', chapters: 39});
		
		var x = ['Genesis','Exodus','Leviticus', 'Deuteronomy', 'Joshua', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings'];
		$scope.c = ['Choose Chapter',1,2,3,4,5,6,7,8,9];
	   
	console.log($scope.bookList.length);

	
	


}])

.controller('SermonCtrl', ['$scope', '$rootScope', '$firebaseArray', 'firebase', '$firebaseAuth', '$http',
	function($scope, $rootScope, $firebaseArray, firebase, $firebaseAuth,$http) {
		var ref = firebase.database().ref("messages/");
		var auth = firebase.auth();							
		var provider = new firebase.auth.FacebookAuthProvider();
		$scope.$on("$ionicView.beforeEnter", function(){	
		auth.onAuthStateChanged(function(user) {
				if($scope.chapter === ""){
					$scope.getPassage();
				}
			});
		});
		$scope.verse = null;
		$scope.passage = "";
		$scope.book = "Genesis";
		$scope.chapter = "";
		$scope.verse = 1;
		var book = "";
		var chapter = 1;
		
		$scope.send_verse = function(ver){
			console.log(ver)
		}
		$scope.getPassage = function(target){
			console.log('get passage');
			if(target === undefined){
				book = 'genesis';
				chapter = 1;
			}else{
				book = target.book;
				chapter = target.chapter;
			}
			
			var url='http://getbible.net/json?p=' + book + '&callback=JSON_CALLBACK';
			var chapterNum = 1;
			if(chapter){
				
				chapterNum = chapter;
			}else{
				chapterNum = 1;
			}
			
			
			$http.jsonp(url)
				.success(function(data){			
				//$scope.passage = data.book[target.chapter].chapter[target.verse].verse;
				$scope.book_name = data.book_name;
				$scope.chapterNum = chapterNum;
				var i = 1;
				$scope.chapter = "";
				angular.forEach(data.book[chapterNum], function(data){
				$scope.chapterNum = chapterNum;	
					angular.forEach(data,function(data){					
						//<a href='#/tab/bible' ng-click='send_verse("+ data.verse +")'> + "</a>"
						$scope.chapter += "<sub>" + i + "</sub>" + data.verse;
						$scope.book_chapter = data.verse
						 
						i++;	
					})
				});
				
				});
			/*$http.get(url,{jsonpCallbackParam: 'callback'})
				.then(function(json){
				console.log(json.data.book);
				
			})*/

				
		}
		
	
	


}])

.controller('AccountCtrl', ['$scope', '$rootScope', 'firebase', '$firebaseAuth',
							function($scope, $rootScope, firebase, $firebaseAuth) {
								var rootRef = firebase.database().ref();
								var ref = firebase.database().ref("messages/");
								// Reference
								var key = ref.key;
								//var rootRef = ref.root;
								var parentRef = ref.parent;

								// Query
								//var queryRef = query.ref;

								// DataSnapshot
								ref.on("value", function(snapshot) {
								  var dataRef = snapshot.ref;
									//console.log(dataRef);
								  var dataKey = snapshot.key;
								});

								var auth = firebase.auth();							
								var provider = new firebase.auth.FacebookAuthProvider();


								auth.onAuthStateChanged(function(user) {
									console.log(user);
								  if (user) {
									
									console.log("logged In");  //maybe some root scope
									$rootScope.user = user;
									  
								  } else {
									console.log("logged out");
								  }
								});
								

								//provider.addScope('https://www.googleapis.com/auth/plus.login');

								//$scope.picture = $src="";
								$scope.displayName = "Guest";//if not logged in no text
								$scope.email = null;
								
								$scope.login = function(){
									auth.signInWithPopup(provider).then(function(result) {
									var accessToken = result.credential.accessToken;
									
									var displayName = result.user.displayName;
									$scope.displayName =displayName;
										
									var photoURL = result.user.photoURL;
									//$scope.picture = $src(photoURL);
										
									var email = result.user.email;
									$scope.email = email;

								})
									.catch(function(error){
									console.log(error.message);

								});


							};
								
								$scope.logout = function(){
									firebase.auth().signOut().then(function() {
									  // Sign-out successful.
									}, function(error) {
									  // An error happened.
									});
								}
}]);
