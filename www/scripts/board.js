myApp.controller('BoardController', ['$scope', '$rootScope', 'Authentication', 'sharedExercises', '$ionicPopup', '$timeout', '$firebaseAuth', 'FIREBASE_URL',
  function($scope, $rootScope, Authentication, sharedExercises, $ionicPopup, $timeout, $firebaseAuth, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);

    // $scope.test = "30$ from Zoe";
    $scope.giveList = sharedExercises.getGiveList();
    $scope.getList = sharedExercises.getGetList();



    // $scope.loadFeeds = function() {

    //     $scope.giveList = sharedExercises.getGiveList();
    //     $scope.getList = sharedExercises.getGetList();

    //     console.log("will attempt updateLists through loadFeeds");
    //     updateLists();
    // }


    auth.$onAuth(function(authUser) {
        updateLists();
    });



    var updateLists = function() {
        setTimeout(function() {
            var giveList = sharedExercises.getGiveList();
            $scope.giveList = giveList;

            var getList = sharedExercises.getGetList();
            $scope.getList = getList;
        }, 600);
        // setTimeout(function() {
        //     var giveList = sharedExercises.getGiveList();
        //     $scope.giveList = giveList;

        //     var getList = sharedExercises.getGetList();
        //     $scope.getList = getList;
        // }, 300);
    }


    $scope.addPost = function(list) {
        // popup template for new Exercise
        console.log("addPost giveList", $scope.giveList);
        $scope.newPost = {};
        var myPopup = $ionicPopup.show({
        template: "<input class='inputIndent' placeholder='flexi dollars' type='number' ng-model='newPost.dollars'><input class='inputIndent' placeholder='phone number' type='tel' ng-model='newPost.number'>",
        title: 'Post',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Add</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.newPost) {
                e.preventDefault();
              } else {
                $scope.newPost.firstName = sharedExercises.getFirstname();
                $scope.newPost.lastName = sharedExercises.getLastname();
                if (list === 'give') {
                    var newGiveList = sharedExercises.getGiveList();
                    newGiveList.push($scope.newPost);
                    sharedExercises.setGiveList(newGiveList);   
                }
                else if (list === 'get') {
                    var newGetList = sharedExercises.getGetList();
                    newGetList.push($scope.newPost);
                    sharedExercises.setGetList(newGetList);
                }
                console.log("adding post", list);
              }
            }
          }
         ]
        });

        myPopup.then(function(res) {
          console.log('Tapped!', res);
        });

        $timeout(function() {
           myPopup.close(); 
        }, 30000);

        // $scope.giveList = sharedExercises.getGiveList;
        updateLists();

    
    }


}]); // Controller


// put add anonymous option if not logged in.