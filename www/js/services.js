angular.module('sociogram.services', [])
.factory('PetService', function() {
  var events = {};
  var single = {};
  var privateList = {};
  var userItem = {};
  var school = "";
  var unFriends = [];
  // var userProfId = "";
  var newUser = "no";
  var newNot = false;
 var tinderView = false;
  var singleView = false;
 var startCard = true;
 var cards = ["start"];
 var followCount = 0;
  var foll9 = function(watchList,event){

      // alert(watchedIndex);&&watchList[i].start_time==event.start_time
      for(i=0;i<watchList.length;i++){
        // alert(JSON.stringify(watchList));
      // alert(watchList[i].watched);
         if(watchList[i].name==event.name&&watchList[i].watched){
          // alert('yes');
           return true;
          }
        }
        // return false;
      };
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
              setPrivateList: function(list) {
                privateList = list;
            },
            getPrivateList: function () {
                return privateList;
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
             setSingleView: function(value) {
                singleView = value;
            },
            getSingleView: function () {
                return singleView;
            },
            setCards: function(value) {
                cards = value;
            },
            getCards: function () {
              // event.watched=foll9(userItem.watchList,event);
              // if(cards[0]=="empty" && cards.length>1){
              //   cards.splice(0, 1);
              // }
              // || cards[0]=="empty"
              // if(cards[0] == "empty" && cards.length >1 ){

              // }
            if( cards[0]=="start"){
                // var answerArray = [];||cards[0] == "empty"
                // alert('here');
                // var a3 = events;
                cards = [];

                for(var key in events){
                  // events[key].watched3 = foll9(userItem.watchList, events[key]);

                   if(foll9(userItem.watchList, events[key])!= true){
                      // alert(cards[0]);
                      cards.push(events[key]);
                    }

                  }

                }
                else if(cards[0] == "empty"&&cards.length>1){
                  cards.splice(0, 1);
                }

                if(cards.length==0){
                 cards = ["empty"];
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
             logOut: function () {
                events = {};
                single = {};
                privateList = {};
                userItem = {};
                school = "";
                unFriends = [];
                // var userProfId = "";
                newUser = "no";
                // newNot = false;
                tinderView = false;
                singleView = false;
                startCard = true;
                cards = ["start"];
                followCount = 0;
            },
             refreshEvents: function(value) {
                var eventsArr = {};
               for(var key in value){
                    // alert('hi');
                    if(value[key].banned!="banned"){
                      // alert('hi');
                      eventsArr[key] = value[key];
                    }
                    // else{

                    // }

                        // alert('hi');
                  }
                  events = eventsArr;

          }
        }
});
