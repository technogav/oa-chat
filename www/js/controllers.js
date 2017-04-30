angular.module('starter.controllers', ['firebase'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

})

.controller('ChatsCtrl', ['$scope', '$rootScope', '$firebaseArray', 'firebase', '$firebaseAuth','$ionicScrollDelegate',
function($scope, $rootScope, $firebaseArray, firebase, $firebaseAuth,$ionicScrollDelegate) {
	$scope.$on("$ionicView.afterEnter", function(){
		$ionicScrollDelegate.scrollBottom();
	});
	$scope.$on('$ionicView.loaded', function () {
		$ionicScrollDelegate.scrollBottom();
	});
	
	var ref = firebase.database().ref("messages/");
	var auth = firebase.auth();							
	var provider = new firebase.auth.FacebookAuthProvider();
	var xuser = firebase.auth().currentUser;
	//send chat to database if loggin with facebook
	$scope.sendChat = function(chat){
		auth.onAuthStateChanged(function(user) {
			$rootScope.loggedInUser = user;
			if (user) {		
				console.log("logged In");
				if(user.message !== ""){
					//add to firebase
					$scope.chats.$add({
						user: user.displayName,
						message: chat.message,
						imgURL: user.photoURL
					});
				}
				
			}else{
				alert("Continue With Facebook to send messages.");
			}
			chat.message = "";
			$ionicScrollDelegate.scrollBottom();
		});
	};
	
	
	//function to $remove post if they are older than one week

	
		
	
	$scope.chats = $firebaseArray(ref);
	
	/*console.log($rootScope.user);
	$scope.click = function(){
		console.log(xuser.displayName);
		
		angular.forEach($scope.chats, function(chat){
			console.log(chat.user);
			if(chat.user === xuser.displayName){

				chat.user.myChat = true;
			}else{
				chat.user.myChat = false;
			}
		});

	}*/
	//function to delete the text in the text area
	$scope.delete = function(chat){
		chat.message = "";
	}
	
	
	//function to check and style your own posts
	$scope.style = function(chat){
		if(chat.user === "Gavin Murphy"){
			return{background:'lightgrey', 'float':'right'}
		}
	}
	var objDiv = document.getElementById("chats");
	objDiv.scrollBottom = objDiv.scrollHeight;
	
	
}])

.controller('BibleCtrl', ['$scope', '$rootScope', '$firebaseArray', 'firebase', '$firebaseAuth', '$http',
	function($scope, $rootScope, $firebaseArray, firebase, $firebaseAuth,$http) {
		var ref = firebase.database().ref("messages/");
		var auth = firebase.auth();							
		var provider = new firebase.auth.FacebookAuthProvider();
		$scope.chats = $firebaseArray(ref);
		
		//get starting scripture if non is selected
		$scope.$on("$ionicView.beforeEnter", function(){	
		auth.onAuthStateChanged(function(user) {
				if($scope.displayChapter === ""){
					
					$scope.getPassage();
				}
			});
		});
		$scope.chatVerse = "";
		
		//send chat
		$scope.sendChat = function(chat){
			auth.onAuthStateChanged(function(user) {
				if (user) {
					
					
					$scope.chats.$add({
						user: user.displayName,
						message: $scope.chatVerse,
						imgURL: user.photoURL
					}).then(function(){
						alert("scripture has been posted");
					})
					
				}else{
					alert("Continue With Facebook to send messages.");
				}
				$scope.chatVerse = "";
			});
			
		};
		
		 $scope.longList  = 
  			['Genesis','Exodus','Leviticus', 'Deuteronomy', 'Joshua', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings'];
			//$scope.longList.push(i);
		
		$scope.chapterList  = 
  			['1','2','3', '4', '5', '6', '7', '8', '9'];
			//$scope.longList.push(i);
		  
		
		$scope.verse = null;
		$scope.passage = "";
		$scope.book = "Genesis";
		$scope.displayChapter = "";
		$scope.verse = 1;
		var book = "";
		var chapter = 1;
		
		$scope.send_verse = function(ver){
			console.log(ver)
		}
		$scope.getPassage = function(target){
			
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
				$scope.displayChapter = [];
				angular.forEach(data.book[chapterNum], function(data){
				$scope.chapterNum = chapterNum;	
					angular.forEach(data,function(data){					
						//<a href='#/tab/bible' ng-click='send_verse("+ data.verse +")'> + "</a>"
						//$scope.displayChapter += "<sub>" + i + "</sub>" + data.verse;
						//console.log(data.verse_nr);
						$scope.displayChapter[i] = {ver: data.verse, num:data.verse_nr};
						
						$scope.book_chapter = data.verse
						 
						i++;	
					})
					//console.log($scope.displayChapter);
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

	$scope.getTheVerse = function(verse){
		$scope.chatVerse += verse;
	}
	$scope.delete = function(){
		$scope.chatVerse = "";
	}
	


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
							//$rootScope.displayName = firebase.auth().currentUser;
								
								$scope.logout = function(){
									firebase.auth().signOut().then(function() {
									  // Sign-out successful.
									}, function(error) {
									  // An error happened.
									});
								}
}]);
