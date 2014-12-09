angular.module('sociogram.services', [])
.factory('PetService', function() {
  var events = {};
  var single = {};
  var privateList = {};
  var userItem = {};
  var school = "";
  var unFriends = [];
  var newUser = "no";
  var newNot = false;
 var tinderView = true;
  var singleView = false;
 var startCard = true;
 var userPic = "";
 var cards = ["start"];
 var followCount = 0;

  var foll9 = function(watchList,event){
    for(i=0;i<watchList.length;i++){
     if(watchList[i].name==event.name&&watchList[i].watched){
       return true;
     }
    }
  };

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
              if(cards[0]=="empty"){
                startCard=false;
              }
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
              // if(cards[0]=="empty" && cards.length>1){
              //   cards.splice(0, 1);
              // }
              // || cards[0]=="empty"
              // if(cards[0] == "empty" && cards.length >1 ){

              // }
            if( cards[0]=="start"){
                cards = [];

                for(var key in events){
                   if(foll9(userItem.watchList, events[key])!= true){
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
                unFriends = friends;
            },
            getUNFriends: function () {
                return unFriends;
            },
             setUser: function(uI) {
                userItem = uI;
            },
            getUser: function () {
                return userItem;
            },
            setNewUser: function(userIs){
              newUser = userIs;

            },
            getUserPic: function () {
                return userPic;
            },
            setUserPic: function(value){
              userPic = value;
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
                newUser = "no";
                tinderView = true;
                singleView = false;
                startCard = true;
                cards = ["start"];
                followCount = 0;
            },
             refreshEvents: function(value) {
                var eventsArr = {};
               for(var key in value){
                    if(value[key].banned!="banned"){
                      eventsArr[key] = value[key];
                    }
                  }
                  events = eventsArr;

           }
        }
});
