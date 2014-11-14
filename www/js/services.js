angular.module('sociogram.services', [])
.factory('PetService', function() {
  var events = {};
  var single = {};
  var userItem = {};
  var school = "";
  var unFriends = [];
  // var userProfId = "";
  var newUser = "no";
  var newNot = false;
 var tinderView = false;
 var startCard = true;
 var cards = [];
 var followCount = 0;
 // var cardIndex = undefined;



  // var unFriends = [];
  // var notifications = {};

  return {
    getCache: function () {
                return profileCache;
            },
          getEvents: function () {
                return events;
            },
            getSingle: function () {
                return single;
            },
            setSingle: function(event) {
                single = event;
            },
            setEvents: function(value) {
                events = value;
            },
            setFollowCount: function(value) {
                followCount = value;
            },
            getFollowCount: function(){
              return followCount;
            },
            setSchool: function(schoolName) {
                school = schoolName;
            },
            getSchool: function () {
                return school;
            },
             setNewNot: function(value) {
                newNot = value;
            },
            getNewNot: function () {
                return newNot;
            },
             setStart: function(value) {
                startCard = value;
            },
            getStart: function () {
                return startCard;
            },
            setTinderView: function(value) {
                tinderView = value;
            },
            getTinderView: function () {
                return tinderView;
            },
            setCards: function(value) {
                cards = value;
            },
            getCards: function () {
              if(cards.length == 0){
                // var answerArray = [];
                // alert('here');
                // var a3 = events;
                for(var key in events){
                  cards.push(events[key]);
                }
                // cards = answerArray;
                // return cards;
              }
               return cards;

            },
            flipWatched: function(event){
              events[event.name].watched=!events[event.name].watched;
            },
             getWatched: function(event){
              return events[event.name].watched;
            },
             setUNFriends: function(friends) {
                // alert('setting id');
                // alert(userProfId);
                unFriends = friends;

            },
            getUNFriends: function () {
                return unFriends;
            },
             setUser: function(uI) {
                // alert('setting id');
                // alert(userProfId);
                userItem = uI;

            },
            getUser: function () {
                return userItem;
            },
            setNewUser: function(userIs){
              newUser = userIs;

            },
            getNew: function () {
                return newUser;
            },
             refreshEvents: function(value) {

               for(var key in value){
                    // alert('hi');
                    if(value[key].banned=="banned"){
                      // alert('hi');
                      delete events[key];
                    }
                    else{
                       events[key] = value[key];
                    }

                        // alert('hi');
                  }

          }
        }
});

