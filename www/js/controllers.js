angular.module('sociogram.controllers', ['ionic'])

  //for side menu
  .controller('AppCtrl', function ($scope, $state,$location,PetService, OpenFB, $timeout) {

    $scope.main={};
    $scope.main.dragContent = true;

    //logout functionality
    $scope.logout = function () {
        OpenFB.logout();
        PetService.logOut();
      $state.go('app.login');
    };

    //menu Events button
    $scope.goEvents = function() {
      $timeout(function() {
      },100);

      if(PetService.getSingleView()==true){
        $location.path('/app/event-detail');
      }else{
        $location.path('/app/person/me/feed');
      }
    };

    //menu Add An Event button
    $scope.goAdd = function(){
      $state.go('app.addAnEvent');
    };

    //menu Help button
    $scope.goHelp = function(){
      $state.go('app.help');
    };

    //menu Share button
    $scope.shareBtn = function(a,b,c,d){
      analytics.trackEvent('button', 'click', 'menu share button', 1);
     window.plugins.socialsharing.share(a,b,c,d);
    };

  })


  .controller('LoginCtrl', function ($scope, $ionicPopup, $http, $location, $ionicLoading,OpenFB, $state, $stateParams, PetService) {
    //make login unswipeable
    $scope.main.dragContent = false;

    //hide splash screen
    setTimeout(function() {
      navigator.splashscreen.hide();
    }, 500);

    $scope.noPop='false';
    queryGo=false;

    //tutorial popup for first time users
    $scope.item1=function(){
      $scope.showAlert('1. You have a profile dropdown for notifications and following Facebook friends who use UN. <br> 2. You can "Watch" events, adding a clickable notification for you and your followers. <br> 3. Using the top-left icon in the "Events" section, you can toggle how you explore, between List or Swipe views. <br><br>Further assistance can be found under the "Help/Contact Us" section. <br> <br>Smile,<br> U Nightlife Team','Welcome! <br>Few Things You Should Know:');
    }

    //used to throw better looking popup messages to user
    $scope.showAlert = function(message,title) {
      if(title==undefined){
        title=null;
      }
      $ionicPopup.alert({
        title: title,
        content: message
      }).then(function(res) {
        //after popup is shown
      });
    };

    $scope.goLogin = function(){
      $state.go('app.login');
    };

    //used for login2, or manual email login
    $scope.submitForm = function(emailEntry) {

      loginTryEmail = emailEntry.toLowerCase();
      if (schoolItem.schoolName.indexOf('Binghamton')<0){
        if((loginTryEmail==='ngrotti1@binghamton.edu'||loginTryEmail.indexOf(schoolItem.emailEnding)>-1&&loginTryEmail.length>schoolItem.emailLength)){

          $http.post('http://stark-eyrie-6720.herokuapp.com/userPost',
          {firstNameLetter: firstNameLetter,
          userProfId: userProfId,
          userName: userName,
          // privateEvents: {},
          userGender: userGender,
          userEmail: userEmail,
          entranceEmail: loginTryEmail,
          userSchool: schoolItem.schoolName}
          ).then(function(){
            $scope.noPop='true';
            // alert('i am alerting of a new user!');
             PetService.setNewUser("yes");
            $scope.facebookLogin(schoolItem.schoolName);
          });
        }
        else{
          $scope.showAlert("We couldn't verify that as a valid university email. Make sure you are on the right portal for your respective university, and that you have entered your OWN valid email. If you are in fact a student at this school, and continue to experience trouble, shoot us an email at UNightlifeTeam@gmail.com.");
        }
      }//&&loginTryEmail[0].indexOf(firstNameLetter)>-1
      else {
        var regExNums = /[0-9]/g;
        if(loginTryEmail==='ngrotti1@binghamton.edu'||loginTryEmail.indexOf(schoolItem.emailEnding)>-1&&loginTryEmail.length>=schoolItem.emailLength&&regExNums.test(loginTryEmail)){
          $http.post('http://stark-eyrie-6720.herokuapp.com/userPost',
          {firstNameLetter: firstNameLetter,
          userProfId: userProfId,
          userName: userName,
          // privateEvents: {},
          userGender: userGender,
          userEmail: userEmail,
          entranceEmail: loginTryEmail,
          userSchool: schoolItem.schoolName}
          ).then(function(){
            $scope.noPop='true';
            // alert('i am alerting of a new user!');
             PetService.setNewUser("yes");
            $scope.facebookLogin(schoolItem.schoolName);
          });
        }
        else{
          $scope.showAlert("We couldn't verify that as a valid university email. Make sure you are on the right portal for your respective university, and that you entered your OWN valid email. If you are in fact a student at this school, and continue to experience trouble, shoot us an email at UNightlifeTeam@gmail.com.");
        }
      }
    };

    $scope.alert2 = function(){
      $location.path('/app/loading');
    };
    // $scope.doThis2=function(){
    //   // $scope.showAlert("Connection to the server could not be acheived at this time. Increase your WiFi/service or try again later.","Failed.");
    //   $scope.showAlert("We couldn't verify that as a valid university email. Make sure you are on the right portal for your respective university, and that you entered your OWN valid email. If you are in fact a student at this school, and continue to experience trouble, shoot us an email at UNightlifeTeam@gmail.com.");
    //   $scope.showAlert('Facebook connection failed.');
    //   $scope.showAlert("Event Added to Your Calendar.");
    // }

    //called at login enter
    $scope.facebookLogin = function (schoolName) {

      $scope.alert2();
      schoolName=schoolName;

      //pulls existing users private events
      // var currentUserCheck = function(){
      //   for(var key in privateEvents){
      //     var startDay = privateEvents[key].start_time.split('/')[1];
      //     var startYear = privateEvents[key].start_time.split('/')[2];
      //     var startMonth = privateEvents[key].start_time.split('/')[0];
      //     privateEvents[key].startYear = startYear;
      //     if(privateEvents[key].timeOfEvent!=undefined){
      //      if(privateEvents[key].timeOfEvent.length<7){
      //           privateEvents[key].timeString = '0'+privateEvents[key].timeOfEvent;
      //         }
      //         else{
      //           privateEvents[key].timeString = privateEvents[key].timeOfEvent;
      //         }
      //     }
      //     else{
      //        privateEvents[key].timeString = null;
      //     }



      //     if(Math.floor(startYear)>Math.floor(currentYear)){
      //      yourEvents[key] = privateEvents[key];
      //     }
      //     else if(Math.floor(startYear)==Math.floor(currentYear)){
      //       if(Math.floor(startMonth)>Math.floor(currentMonth)){
      //        yourEvents[key] = privateEvents[key];
      //       }
      //       else if(Math.floor(startMonth)==Math.floor(currentMonth)){
      //         if(Math.floor(startDay)>=Math.floor(currentDay)){
      //           yourEvents[key] = privateEvents[key];
      //         }
      //       }
      //     }
      //     else{
      //      delete privateEvents[key];
      //     }
      //   }
      // };

      //counts number of current events a school has
      var currentSchoolCheck = function(){
        for(var key in schoolItem.schoolEvents){
          if(schoolItem.schoolEvents[key].banned!=="banned"){

            var startDay = schoolItem.schoolEvents[key].start_time.split('/')[1];
            var startYear = schoolItem.schoolEvents[key].start_time.split('/')[2];
            var startMonth = schoolItem.schoolEvents[key].start_time.split('/')[0];
            schoolItem.schoolEvents[key].startYear = startYear;

        if(schoolItem.schoolEvents[key].timeOfEvent!=undefined){
           if(schoolItem.schoolEvents[key].timeOfEvent.length<7){
                schoolItem.schoolEvents[key].timeString = '0'+schoolItem.schoolEvents[key].timeOfEvent;
              }
              else{
                schoolItem.schoolEvents[key].timeString = schoolItem.schoolEvents[key].timeOfEvent;
              }
        }
         else{
             schoolItem.schoolEvents[key].timeString = null;
          }



            if (Math.floor(startYear)>Math.floor(currentYear)){
              currentSchoolCount++;
              yourEvents[key] = schoolItem.schoolEvents[key];
            }
            else if(Math.floor(startYear)==Math.floor(currentYear)){
              if(Math.floor(startMonth)>Math.floor(currentMonth)){
                currentSchoolCount++;
                yourEvents[key] = schoolItem.schoolEvents[key];
              }
              else if(Math.floor(startMonth)==Math.floor(currentMonth)){
                if(Math.floor(startDay)>=Math.floor(currentDay)){
                 currentSchoolCount++;
                 yourEvents[key] = schoolItem.schoolEvents[key];
                }
              }
            }
          }
        }
        return currentSchoolCount;
      }

      //age function
      var getAge = function(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
         age--;
        }
        return age;
      }

      //friend edu algorithm
      var friendChecker = function(result){
        result.friends.data.forEach(function(friend){
          if (friend.education){
            friend.education.forEach(function(schoolObj){
              if(schoolObj.school){
                if (schoolObj.school.name.indexOf(schoolItem.schoolName)>-1){
                  schoolFriendCount++;
                }
                if(schoolItem.schoolName=='SUNY Binghamton'){
                 if (schoolObj.school.name.indexOf('Binghamton University')>-1){
                   schoolFriendCount++;
                 }
                }
                if(schoolItem.schoolName=='SUNY Oneonta'){
                  if (schoolObj.school.name.indexOf('Oneonta')>-1){
                    schoolFriendCount++;
                  }
                }
              }
            });
          }
        });
        return schoolFriendCount;
      }

      //pulls in user friends from fb and passes it to counter
      var eduSearch = function(){
        //get education of friends
        OpenFB.get("/me?fields=friends.fields(education)",{limit:1100})
        //if succesful, count the number of friends who go to a school
        .success(function(eduResult){
          friendChecker(eduResult)
        }).success(function(){
         checkAllowed();
        }).error(function(){
          OpenFB.get("/me?fields=friends.fields(education)",{limit:700})
          .success(function(eduResult){
           friendChecker(eduResult)
          }).success(function(){
           checkAllowed();
          }).error(function(){
            OpenFB.get("/me?fields=friends.fields(education)",{limit:400})
            .success(function(eduResult){
              friendChecker(eduResult)
            }).success(function(){
              checkAllowed();
            }).error(function(){
            //if failed, show an alert
              $scope.showAlert('Facebook connection failed.');
              $location.path('app.login');
            });
          })
        })
      }

      //allow or deny access based on fb email and number of fb friends at a school
      var checkAllowed = function(){
        // if they have the required amount of friends or correct email, create user and then take them to the exisiting user flow
        if(Math.floor(schoolFriendCount)>=Math.floor(schoolItem.schoolFriendMin)||userEmail.indexOf(schoolItem.emailEnding)>-1){
          PetService.setNewUser("yes");
          $http.post('http://stark-eyrie-6720.herokuapp.com/userPost',
          {firstNameLetter: firstNameLetter,
          userProfId: userProfId,
          userName: userName,
          // privateEvents: privateEvents,
          userGender: userGender,
          userEmail: userEmail,
          userSchool: schoolItem.schoolName}
          ).then(function(){ fbInnerFlow() });
        }
        else{//cant auto verify as a student, take to manual email login
         $state.go("app.login2");
        }
      }

      //populates event lists for successful fb queries
      var eventPopulater = function(listOfAllEvents){
        var inviteCheck = function(event,school){
          OpenFB.get("/"+event.id+"/invited",{limit:150}).success(function(res){
            if(res.data.length>schoolItem.inviteNum){
              if(school==true){
                 schoolItem.schoolEvents[event.name] = event;
              $http.post('http://stark-eyrie-6720.herokuapp.com/schoolPost',
                {
                  schoolName: schoolItem.schoolName,
                  schoolEvents: schoolItem.schoolEvents
                }).success(function(){
                //when event added, do whatever. alert('school event added')
              })
            }
              else{
                privateEventList[event.name] = event;
                $http.post('http://stark-eyrie-6720.herokuapp.com/privateListEventAdd',
                {
                  privateEvents: privateEventList,
                  // schoolEvents: schoolItem.schoolEvents
                }).success(function(){
                //when event added
              })
             }

            }
          })
        }

        //start of pull from fb result
        var allEventsInAnArray = Object.keys(listOfAllEvents);
        for (i=0;i<allEventsInAnArray.length;i++){
          if (listOfAllEvents[allEventsInAnArray[i]].longitude&&listOfAllEvents[allEventsInAnArray[i]].longitude!='Longitude: undefined'){
            //defining long and lat values of current event
            longValue = listOfAllEvents[allEventsInAnArray[i]].longitude.split(' ')[1];
            latValue = listOfAllEvents[allEventsInAnArray[i]].latitude.split(' ')[1];
            //if in the schools area, add it to the user, and if not private add to school event list
            if (longValue<=schoolItem.schoolLongMax&&longValue>=schoolItem.schoolLongMin&&latValue<=schoolItem.schoolLatMax&&latValue>=schoolItem.schoolLatMin){
              if(schoolItem.schoolEvents[allEventsInAnArray[i]]==undefined||schoolItem.schoolEvents[allEventsInAnArray[i]].start_time!==listOfAllEvents[allEventsInAnArray[i]].start_time){
                yourEvents[allEventsInAnArray[i]] = listOfAllEvents[allEventsInAnArray[i]];
                //if event is not private
                if(listOfAllEvents[allEventsInAnArray[i]].privacy!='SECRET'){
                  inviteCheck(listOfAllEvents[allEventsInAnArray[i]],true);
                }
              }
            }
          }// end of if longitude

          //if event has a location
          if (listOfAllEvents[allEventsInAnArray[i]].location){
            //if event location includes the school town, add to user events, and if not private add to school events
            if (listOfAllEvents[allEventsInAnArray[i]].location.indexOf(schoolItem.schoolTown)>-1){
              if(schoolItem.schoolEvents[allEventsInAnArray[i]]==undefined){
                yourEvents[allEventsInAnArray[i]] = listOfAllEvents[allEventsInAnArray[i]];
                if(listOfAllEvents[allEventsInAnArray[i]].privacy!='SECRET'){
                  inviteCheck(listOfAllEvents[allEventsInAnArray[i]],true);
                }
              }
            }
          }

          if(schoolItem.schoolEvents[allEventsInAnArray[i]]==undefined){

            //start of if attending of maybe
            if (listOfAllEvents[allEventsInAnArray[i]].attending||listOfAllEvents[allEventsInAnArray[i]].maybe){


              if(!privateEventList[allEventsInAnArray[i]]){
                inviteCheck(listOfAllEvents[allEventsInAnArray[i]],false);
                // yourEvents[allEventsInAnArray[i]] = listOfAllEvents[allEventsInAnArray[i]];
                // privateEvents[allEventsInAnArray[i]] = listOfAllEvents[allEventsInAnArray[i]];
                // $http.post('http://stark-eyrie-6720.herokuapp.com/privateListEventAdd',
                // {
                // privateEvents: privateEvents
                // })
              }
            }

            //end of if attending or maybe
            //     //start of if attending of maybe original for private user events
            // if (listOfAllEvents[allEventsInAnArray[i]].attending||listOfAllEvents[allEventsInAnArray[i]].maybe){
            //   if(!privateEvents[allEventsInAnArray[i]]){
            //     yourEvents[allEventsInAnArray[i]] = listOfAllEvents[allEventsInAnArray[i]];
            //     privateEvents[allEventsInAnArray[i]] = listOfAllEvents[allEventsInAnArray[i]];
            //     $http.post('http://stark-eyrie-6720.herokuapp.com/privateUserEventAdd',
            //     {userEmail: userItem.userEmail,

            //     privateEvents: privateEvents
            //     })
            //   }
            // }
            //end of if attending or maybe


          }//end of if to prevent events that are already school events and/or banned to become private
        }//end of all events in array . length
      };//end of eventpopulator


      var getFormattedTime = function (fourDigitTime) {
        var hours24 = parseInt(fourDigitTime.substring(0, 2),10);
        var hours = ((hours24 + 11) % 12) + 1;
        var amPm = hours24 > 11 ? 'pm' : 'am';
        var minutes = fourDigitTime.substring(2);
        return hours + ':' + minutes + amPm;
      };

      var fbWorked = function(result2){
      //proceed to put all events into an object with event names being the keys
      var friends = result2.friends.data.filter( function(friend){
        if (friend.events){
          return true;
        }
      });
      friends.forEach(function(friend){
          setEventsList = friend.events.data.map(function(singleEvent){
            var startMonth = singleEvent.start_time.split('-')[1];
            var startDay = singleEvent.start_time.split('-')[2].split('T')[0];
            var startYear = singleEvent.start_time.split('-')[0];
            singleEvent.startYear = startYear;


            if(singleEvent.start_time.indexOf(':')>-1){
              startTime = singleEvent.start_time.split('-')[2].split('T')[1].replace(":", "").substring(0, 4);
              singleEvent.timeOfEvent = getFormattedTime(startTime);
              if(singleEvent.timeOfEvent.length<7){
                singleEvent.timeString = '0'+singleEvent.timeOfEvent;
              }
              else{
                singleEvent.timeString = singleEvent.timeOfEvent;
              }
            }
            else{
             singleEvent.timeOfEvent = null;
            }

            //if it is a current event, add it to the user display
            if (Math.floor(startYear)>Math.floor(currentYear)){
              //cleans the start times
              singleEvent.start_time=startMonth+"/"+startDay+"/"+startYear;
              //cleans the names of event and adds it to list
              listOfAllEvents[singleEvent.name.replace(/\./g,"")] = singleEvent;
              if (singleEvent.venue){
                listOfAllEvents[singleEvent.name.replace(/\./g,"")]['longitude']="Longitude: "+singleEvent.venue.longitude;
                listOfAllEvents[singleEvent.name.replace(/\./g,"")]['latitude']="Latitude: "+singleEvent.venue.latitude;
              }
              if (singleEvent.cover){
               listOfAllEvents[singleEvent.name.replace(/\./g,"")]['cover'] = singleEvent.cover.source;
              }
              else{
                  listOfAllEvents[singleEvent.name.replace(/\./g,"")]['cover'] = "http://i62.tinypic.com/2zznq55.jpg";
              }
            }
            else if(Math.floor(startYear)==Math.floor(currentYear)){
              if(Math.floor(startMonth)>Math.floor(currentMonth)){
                //cleans the start times
                singleEvent.start_time=startMonth+"/"+startDay+"/"+startYear;
                //cleans the names of events
                listOfAllEvents[singleEvent.name.replace(/\./g,"")] = singleEvent;
                if (singleEvent.venue){
                listOfAllEvents[singleEvent.name.replace(/\./g,"")]['longitude']="Longitude: "+singleEvent.venue.longitude;
                listOfAllEvents[singleEvent.name.replace(/\./g,"")]['latitude']="Latitude: "+singleEvent.venue.latitude;
                }
                if (singleEvent.cover){
                listOfAllEvents[singleEvent.name.replace(/\./g,"")]['cover'] = singleEvent.cover.source;
                }
                else{
                  listOfAllEvents[singleEvent.name.replace(/\./g,"")]['cover'] = "http://i62.tinypic.com/2zznq55.jpg";
                }
              }
              else if(Math.floor(startMonth)==Math.floor(currentMonth)){
                if(Math.floor(startDay)>=Math.floor(currentDay)){
                  //cleans the start times
                  singleEvent.start_time=startMonth+"/"+startDay+"/"+startYear;
                  //cleans the names of events
                  listOfAllEvents[singleEvent.name.replace(/\./g,"")] = singleEvent;
                  if (singleEvent.venue){
                   listOfAllEvents[singleEvent.name.replace(/\./g,"")]['longitude']="Longitude: "+singleEvent.venue.longitude;
                   listOfAllEvents[singleEvent.name.replace(/\./g,"")]['latitude']="Latitude: "+singleEvent.venue.latitude;
                  }
                  if (singleEvent.cover){
                   listOfAllEvents[singleEvent.name.replace(/\./g,"")]['cover'] = singleEvent.cover.source;
                  }
                  else{
                   listOfAllEvents[singleEvent.name.replace(/\./g,"")]['cover'] = "http://i62.tinypic.com/2zznq55.jpg";
                  }
                }
              }
            }
          });//end of set events list
        });//end of friends.foreach
      }


      //main event query for fb
      var fbQuery = function(){
        OpenFB.get("/me?fields=friends.fields(events.fields(description,cover,privacy,start_time,location,attending,name,maybe.user("+userProfId+"), attending.user(" +userProfId+")))",{limit:950})
        //if fb query is not successful
        .error(function() {
          OpenFB.get("/me?fields=friends.fields(events.fields(description,cover,privacy,start_time,location,attending,name,maybe.user("+userProfId+"), attending.user(" +userProfId+")))",{limit: 600}).error(function(){
            OpenFB.get("/me?fields=friends.fields(events.fields(description,cover,privacy,start_time,location,attending,name,maybe.user("+userProfId+"), attending.user(" +userProfId+")))",{limit: 250}).error(function(){
              OpenFB.get("/me?fields=friends.fields(events.fields(description,cover,privacy,start_time,location,attending,name,maybe.user("+userProfId+"), attending.user(" +userProfId+")))",{limit: 10}).error(function(data){
                $scope.showAlert("Facebook connection could not be achieved at this time. "+data.error.message);
                $location.path('app.login');
              }).success(function(result2){
                fbWorked(result2);
              }).success(function(){
                //make new event lists in the event populater
                eventPopulater(listOfAllEvents);
                PetService.setEvents(yourEvents);
                //allow access to feed
                if(queryGo==true){
                  $location.path('/app/person/me/feed');
                }
              });
            }).success(function(result2){
              fbWorked(result2);
            }).success(function(){
              //make new event lists in the event populater
              eventPopulater(listOfAllEvents);
              PetService.setEvents(yourEvents);
              //allow access to feed
              if(queryGo==true){
               $location.path('/app/person/me/feed');
              }
            });
          }).success(function(result2){
            fbWorked(result2);
          }).success(function(){
            //make new event lists in the event populater
            eventPopulater(listOfAllEvents);
            PetService.setEvents(yourEvents);
            //allow access to feed
            if(queryGo==true){
            $location.path('/app/person/me/feed');
            }
          });
        })
        //if fb query succesful
        .success(function (result2){
         fbWorked(result2);
        })
        .success(function(){
          //make new event lists in the event populater
          eventPopulater(listOfAllEvents);
          PetService.setEvents(yourEvents);
          //allow access to feed
          if(queryGo==true){
            $location.path('/app/person/me/feed');
          }
        });
      };

      //gets and sets personal fb info, takes user to loading screen, and then runs user logic
      var fbInnerFlow = function(){
        //gets and sets current users fb info
        OpenFB.get('/me', {limit: 30}).success(function (result){
         userProfId = result.id;
          // PetService.setUserId(userProfId);
          // alert(PetService.getUserId());
          userSchool = schoolItem.schoolName;
          if(result.gender){
             userGender = result.gender;
          }
          else{
           userGender= "none";
          }
           if(result.name){
            userName = result.name;
            firstNameLetter = result.name[0].toLowerCase();
          }
          else{
           userName = "none";
           firstNameLetter = "none";
          }
          //if there is an email, set it to lower case
          if(result.email){
            userEmail = result.email.toLowerCase();
          }
          else{
           userEmail = userProfId;
          }

          //take to loading screen
          // userEmailchange = "ngtestnew6@gmail.com";
          //can experiment with user emails here
          //check if registered user exists within school user list, responds with DE if they dont
          //have to send user email and user school, backend should look up school user list and check if email exists there
          $http.post('http://stark-eyrie-6720.herokuapp.com/getUser',{userEmail: userEmail, userSchool:userSchool}).success(function(res){
            userItem = res.Item;
            if(res.Item.firstLogin==true){
              setTimeout(function() { $scope.item1() },2500);
            }
            // if(userItem.privateEvents==null){
            //  privateEvents = {};
            // }
            // else{
            //  privateEvents = userItem.privateEvents;
            // }
            if(userItem.banned==="banned"){
              $scope.showAlert('This account has been banned for violating our Terms of Use. Contact us at UNightlifeTeam@gmail.com if you think is a mistake.');
              $state.go('app.login');
            }
            else{
              //DE is equal to doesnt exist
              //if user exists
              if(userItem!=="DE"){
                PetService.setUser(userItem);
                // alert(userItem.watchList);
                //check how many current events exist
                currentSchoolCheck();
                //adds existing private events
                // currentUserCheck();

                if(currentSchoolCount>=2){
                  PetService.setEvents(yourEvents);
                  //allow feed access
                  $location.path('/app/person/me/feed');
                  //then run the query in the background
                  fbQuery();
                }
                // if school amount is less then 2 events then make user wait for their query to be done
                else{
                  queryGo = true;
                  fbQuery();
                }
                if(userItem.userSchool!==schoolItem.schoolName){
                  $http.post('http://stark-eyrie-6720.herokuapp.com/userSchoolPost',
                  {userEmail: userEmail,
                  userName: userName,
                  userSchool: userSchool
                  })
                }
              }
              //registered user does not exist
              else{
              //run fb friend/email check
                eduSearch();
              }
            }//end of else
          }).error(function(){
            //person is not already a user and there was an error connect to db
            $scope.showAlert('Could not connect to server.');
            $location.path('app.login');
          });//end of error
          }).error(function(){//end of openfb.get which is getting personal uesr info
            //fb personal info grab failed
            $scope.showAlert('Facebook connection failed.');
            $location.path('app.login');
          });

        OpenFB.get("/me/picture?redirect=false",{
        "height": "100",
        "type": "normal",
        "width": "100"
        }).then(function (response1) {
          // alert(response1);
         PetService.setUserPic(response1.data.data.url);
       });

      };

      //this is the fb login
      var fbLoginFlow = function(){
        //login prompt for facebook, where permissions are asked
        OpenFB.login('user_events, email,friends_events,friends_education_history').then(function(){
          //start inner fbFlow
          fbInnerFlow();
        },function(){
          $scope.showAlert('Facebook connection could not be achieved, and is required.');
          $state.go('app.login');
          // alert('OpenFB login failed');
        });
        // .error(function(){//if login fails
        //   $scope.showAlert('Facebook connection could not be achieved, and is required.');
        //   $location.path('app.login');
        // });
      }

      //logic run when school is tapped, logic of the main/big/overarching facebook function. everything above here is just defining functions
      var today = new Date();
      var currentDay = today.getDate();
      var currentMonth = today.getMonth()+1; //January is 0
      var currentYear = today.getFullYear();
      yourEvents = {};
      listOfAllEvents = {};
      schoolFriendCount = 0;
      currentSchoolCount = 0;
      PetService.setSchool(schoolName);
      if($scope.noPop=='false'){
        //get school info
        $http.post('http://stark-eyrie-6720.herokuapp.com/getSchool', {schoolName:schoolName}).success(function(res){
          schoolItem = res.Item;
          privateEventList = res.Private;
          PetService.setPrivateList(privateEventList);
          // alert(privateEventList["Some Event Name"]);
          //start the fb login
          fbLoginFlow();
        }).error(function(){
          $scope.showAlert("Connection could not be achieved at this time. Try again when service increases.");
          $location.path('/app/login');
        })
      }
      else{
       fbInnerFlow();
      }
    }; // end of main/big/overarching fb connect function, run when school is tapped, facebookLogin
  }) // end of login controller

  //controller for an expanded single event, combined into feed ctrl currently
  // .controller('PetDetailCtrl', function($state,) {
  //   // $scope.main = {};
  //   $scope.main.dragContent = true;
  //   // alert(main.dragContent);
  //   //retrieves single event info


  // })
  //controller for an swipe card, combined into feed ctrl currently
// .controller('CardCtrl', function ($scope, $ionicSwipeCardDelegate) {
//   $scope.goAway = function() {
//     var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);GGFgo
//     card.swipe();
//   };
// })

  //controller for event feed, starts analytics when people enter
  .controller('FeedCtrl', function ($scope,$timeout,$state,$http,$ionicSwipeCardDelegate,$ionicNavBarDelegate,$ionicScrollDelegate, $ionicPopup, $ionicPopover,$stateParams, OpenFB, PetService, $location, $ionicLoading) {

$scope.findFriends2 = function(){
  var userProfId = $scope.userProfId;
  var userName = $scope.userItem.userName;
var userSchool = $scope.userItem.userSchool;
  OpenFB.get("/"+userProfId+"?fields=friends",{limit:1300}).success(function(red){
        fbFriends = red.friends.data;//this is an array with friend objects
        $http.post('http://stark-eyrie-6720.herokuapp.com/findFriends', {userProfId:userProfId,userSchool:userSchool,fbFriends:fbFriends}).error(function(){}).success(function(res){
            if(res.userIds.length==0){
            PetService.setUNFriends(["none"]);
          }else{
            PetService.setUNFriends(res.userIds);
          }
            PetService.setNewUser("no");
            $http.post('http://stark-eyrie-6720.herokuapp.com/newFriend', {fbFriends:res.userIds,userName:userName,userProfId:userProfId}).error(function(){}).success(function(idc){})
        });
   });
};

// $scope.countFollowers = function(){

//   // var userItem = $scope.userItem;
//   var userProfId = $scope.userProfId;
//   // alert('here222');
//   $http.post('http://stark-eyrie-6720.herokuapp.com/followCount',
//         {userProfId:userProfId}).error(function(){
//           // $scope.showAlert("Connection to the server could not be acheived at this time. Increase your WiFi/service or try again later.","Failed.");
//         }).success(function(res){
//           // return res.count;
//           // count = res.count;
//           // alert(res.count);
//            // alert('here2223');
//            // PetService.setFollowCount(res.count);
//            $scope.followCount = res.count;
//           // $scope.followCount = res.count;
//           // $state.go("app.friends");
//           // alert("worked!");
//           // alert();
//         });
//   };


//used to swipe the start card at beggining of events
   $scope.startSwipe = function(){
    PetService.setStart(false);
    $scope.startCard = false;
   };

   //called when cards are at their end
    $scope.scopeCards = function(){
      PetService.setCards(["start"]);
      $scope.cards = PetService.getCards();
    };
    // $scope.scopeCards2 = function(){
    //   // PetService.setStart(true);
    //   // $scope.startCard == true;
    //   // PetService.setCards(["start"]);
    //   // $scope.startCard == true;
    //   // $scope.cards = PetService.getCards();
    //   // $scope.loading=false;
    //   // $scope.startCard == false;

    //   $timeout(function() {
    //        $scope.loading=false;
    // }, 500);
    //   // PetService.setCards($scope.cards);
    //   // PetService.setCards($scope.cards);
    //   // PetService.setCards($scope.cards);
    // };
      // .then(function() {
      //   alert('Alert Shown.');
      //   $scope.cards = $scope.getUnwatchedCards();
      // });
      // if(PetService.getCards()==){
      //   //ii am a herereh
      // }

      //converts event cover photos
 $scope.getCover = function(eventCover){
  if(eventCover==undefined){
    return "http://i62.tinypic.com/2zznq55.jpg";
  }
  else{
    return eventCover;
  }
 };

 //converts event dates
   $scope.getDateInit = function(event){
    if(event.timeString){
        var a = event.start_time+' '+event.timeString.substr(0, 5)+' '+event.timeString.substr(5,6);
        var b = Date.parse(a, "mm/dd/yyyy hh:mm tt");
    }
    else{
      var b = Date.parse(event.start_time,"mm/dd/yyyy");
    }
    return b;
   };


$scope.arrayObjectIndexOf=function(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm){
            console.log
           return i;
        }
    }
    return -1;
};

    //ticket button on expanded event
    $scope.goTicket = function() {
      //go to ticket link
      window.open($scope.singleEvent.ticketLink,"_system");
       var schoolName = PetService.getSchool();

      $http.post('http://stark-eyrie-6720.herokuapp.com/ticketCount', {schoolName:schoolName}).success(function(){
      })
    };


    //sets services singleview as false
    $scope.goBack = function() {
      PetService.setSingleView(false);
    };


    // Show a custom alert pop
    $scope.showAlert1 = function() {
        navigator.notification.alert(
            'You are the winner!',  // message
            alert('hi'),         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
    };


    $scope.mapThis = function(){
      var link = "maps://?q="+$scope.singleEvent.location;
      window.location.href = link;
    }

     $scope.showAlert = function(message,title) {
      if(title==undefined){
      title=null;
      }
      $ionicPopup.alert({
      title: title,
      content: message
      }).then(function(res) {
      console.log('Alert Shown.');
      });
    };

    //add to calendar
    $scope.calAdd = function() {
      analytics.trackEvent('button', 'click', 'event added to calendar', 1);
        //replace these with times and then the thing below
        var year=$scope.singleEvent.start_time.split("/")[2];
        var month=$scope.singleEvent.start_time.split("/")[0];
        var month=month-1;
        var day=$scope.singleEvent.start_time.split("/")[1];
        var hour=$scope.singleEvent.timeOfEvent.split(":")[0];
        var hour=Math.floor(hour);
        var ending=minute=$scope.singleEvent.timeOfEvent.split(":")[1].slice(2,4);
        var ending=ending.toLowerCase();
        if(ending=="pm"&&hour!=12){
          hour=hour+=12;
          if(hour!=24){
           endHour=hour+1;
          }
          else{
           endHour=24;
          }
        }
        else{
           endHour=hour+1;
        }
        var minute=$scope.singleEvent.timeOfEvent.split(":")[1].slice(0,2);
        var startDate = new Date(year,month,day,hour,minute);
        var endDate = new Date(year,month,day,endHour,minute);
        var title = $scope.singleEvent.name;
        var location = $scope.singleEvent.location;
        var notes = null;

        var success = function(message) {
         $scope.showAlert("Event Added to Your Calendar.");
        };

        // var success2 = function(message) { alert('hi'); };
        var error = function(message) { console.log("Calendar Error: " + message); };

        window.plugins.calendar.createEvent(title,location,notes,startDate,endDate,success,error);
    }

    //event description on expanded event
    $scope.expandEvent= function(theDiv) {
     $scope.showEventDesc = !$scope.showEventDesc;
     $ionicScrollDelegate.resize();
    };

    //allows sharing functionaility on expanded event
    $scope.shareBtn = function(a,b,c,d){
      analytics.trackEvent('button', 'click', 'share button', 1);
      // analytics.trackEvent('button', 'click', 'share button', 1);
      // ga('send', 'event', 'button', 'click', 'share button', 1);
     window.plugins.socialsharing.share(a,b,c,d);
    };
    //allows sharing functionaility on profile under fb friends
    $scope.shareBtn2 = function(a,b,c,d){
      analytics.trackEvent('button', 'click', 'share button under facebook friends list', 1);
      // analytics.trackEvent('button', 'click', 'share button', 1);
      // ga('send', 'event', 'button', 'click', 'share button', 1);
     window.plugins.socialsharing.share(a,b,c,d);
    };
    //allows sharing functionaility on profile if no fb friends
    $scope.shareBtn3 = function(a,b,c,d){
      analytics.trackEvent('button', 'click', 'share button if no facebook friends', 1);
      // analytics.trackEvent('button', 'click', 'share button', 1);
      // ga('send', 'event', 'button', 'click', 'share button', 1);
     window.plugins.socialsharing.share(a,b,c,d);
    };

//called for event card swipe
  $scope.tinderSwipe = function(card) {
    if(card!=undefined){
      var positionOfCard = $scope.arrayObjectIndexOf($scope.cards, card.name, "name");
      if (positionOfCard > -1) {
        $scope.cards.splice(positionOfCard, 1);
        PetService.setCards($scope.cards);
        $scope.tinderSwipe(card);
      }

    }
  };

//gets notification display date
    $scope.foll6 = function(timestamp){
      return new Date (timestamp).toDateString();
    };

//opens profile
  $scope.openPopover = function($event) {
    $scope.newNot=false;
    PetService.setNewNot(false);
    $scope.popover.show($event);
  };

  $scope.closePopover = function() {
    $scope.popover.hide();
  };

  //Cleanup the popover when we're done with it
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });

//handles tapping notifications
  $scope.followNot = function(not){
    var userProfId = $scope.userProfId;
    var userName = $scope.userName;

if(not.date){
      var a = new Date( not.date);
      var b = new Date(Date.now());
      var c = a.setDate(a.getDate() + 1);
    if(c>=b){
      var presEvent = true;
    }
    else{
      var presEvent = false;
    }

}

//call follow function with user object
    if(not.tap=="follow"){

      //follow the userId, commented out for now
      // for(i=0;i<$scope.unFriends.length;i++){
      //   if($scope.unFriends[i].userProfId==not.followId){
          // alert("he1111");
          // if($scope.unFriends[i].followers.indexOf(userProfId)>-1){
          //   // alert('not followed');
          // }
          // else{
            // alert('hwe233333');

        //       var followingId = not.followId;
        //       var notDate = Date.now();
        //       var message = $scope.userName+" just followed you.";
        //  // alert(message);
        //  // alert
        //  // $scope.notifications.push({message:message,date:date});
        //     $http.post('http://stark-eyrie-6720.herokuapp.com/follow',
        // {userProfId:userProfId,
        //   followingId:followingId,
        //   message:message,
        //   notDate:notDate}).error(function(){
        //   $scope.showAlert("Connection to the server could not be acheived at this time. Increase your WiFi/service or try again later.","Failed.");
        // }).success(function(res){
        //   // alert("Followed yall!");
        //   // alert(res.success);
        //   // if(res.success!='follow already'){
        //   //    $scope.followCount++;
        //   // }
        //    if(res.success!='follow already'){
        //      $scope.followAction(not)
        //   }

        //    // add notification that you added a follower

        //   // $state.go("app.friends");
        //   // alert(res.success);
        //   // alert();$scope.unFriends[q].followers.
        // });
        //  var message = userName+" just followed you.";
        //    var notDate = "fake Dte 9/1021/12";

        // $http.post('http://stark-eyrie-6720.herokuapp.com/follow',
        // {userProfId:userProfId,
        //   followingId:followingId,
        //   message:message,
        //   notDate:notDate}).error(function(){
        //   $scope.showAlert("Connection to the server could not be acheived at this time. Increase your WiFi/service or try again later.","Failed.");
        // }).success(function(res){
        //    // alert(res.success);
        //    if(res.success=='followed'){

        //     $scope.unFriends[q].followers.push(userProfId);
        //     $scope.followCount++;
        //    }
        //    // add notification that you added a follower

        //   // $state.go("app.friends");
        //   // alert("worked!");
        //   // alert();
        // });

          // }
      //   }
      // }


    }

    else if(not.tap=="event"&&presEvent==true){
       var i = not.message.indexOf(': ');
       var splits = not.message.slice(i+1);
       var eventName = splits.slice(0,-1);
        for(event in $scope.events){
          if(eventName.indexOf($scope.events[event].name.slice(0,-1))>-1){
             $scope.go_here($scope.events[event]);
          }
        }

    }
    else if(not.tap==undefined){
    }
    else{
      $scope.showAlert("The date for this event has passed.","Bummer!");
    }

  };

  //sets unfriends
  $scope.findFriends = function(){
    var userProfId = $scope.userProfId;
    var userSchool = $scope.userItem.userSchool;
     OpenFB.get("/"+userProfId+"?fields=friends",{limit:1300}).success(function(red){
      fbFriends = red.friends.data;//this is an array with friend objects
         $http.post('http://stark-eyrie-6720.herokuapp.com/findFriends', {userProfId:userProfId,userSchool:userSchool, fbFriends:fbFriends}).error(function(){
        }).success(function(res){
          if(res.userIds.length==0){
            PetService.setUNFriends(["none"]);
            $scope.unFriends = PetService.getUNFriends();
          }else{
            PetService.setUNFriends(res.userIds);
            $scope.unFriends = PetService.getUNFriends();
          }
        });
     })
  };

  //sets event watched
    $scope.foll9 = function(watchList,event){
      for(i=0;i<watchList.length;i++){
         if(watchList[i].name==event.name&&watchList[i].start_time==event.start_time){
           return true;
          }
        }
    };

    //sends user created event
    $scope.newEventSend = function(name,email,date,time,address,info){
      if(name==undefined||date==undefined||time==undefined||address==undefined){
       $scope.showAlert("Please make sure you haven't left any fields empty.","Missing Fields.");
      }
      else if(email==undefined||email.indexOf('@')<0&&email.indexOf('.')<0){
       $scope.showAlert("Please make sure you have entered a valid email.","Invalid Email");
      }
      else{
        $http.post('http://stark-eyrie-6720.herokuapp.com/userEventSubmit',
        {userName: userName,
        userEmail: userEmail,
        userSchool: schoolItem.schoolName,
        eventName: name,
        eventEmail: email,
        eventDate: date,
        eventTime: time,
        eventInfo: info,
        eventAddress: address
        }).success(function(){
          $scope.showAlert("Your event was submitted, we'll be in touch shortly via email.","Success!");
          $location.path('/app/person/me/feed');
        }).error(function(){
         $scope.showAlert("Connection to the server could not be acheived at this time, make sure you have internet connection.","Failed.");
        })
      }
    };

    //expands single event
    $scope.go_here = function (eventName) {
      PetService.setSingle(eventName);
      PetService.setSingleView(true);
      $location.path('/app/event-detail');
    };

//info alert on swipe view
$scope.doThis = function(){
    $scope.showAlert("To dismiss and view the next event, you can hit the red, slashed eye on the left, or swipe in a downwards motion.<br><br> Hitting the green eye on the right also dismisses the current event, but 'Watches' it, creating a profile notification.","Swipe Event View");
};

//makes swipe view true
$scope.tinderYes = function(){
  $scope.tinderView = true;
  if($scope.cards[0]=="empty"){
    $scope.scopeCards();
  }
  $scope.main.dragContent = false;
  PetService.setTinderView(true);
};

//makes swipe view false
$scope.tinderNo = function(){
  $scope.tinderView = false;
  $scope.main.dragContent = true;
  PetService.setTinderView(false);
};

//makes friend view true on prof
$scope.friendYes = function(){
$ionicScrollDelegate.scrollTop();
  $scope.friendView = true;
};

//makes friend view false on prof
$scope.friendNo = function(){
  $ionicScrollDelegate.scrollTop();
  $scope.friendView = false;
};

//sets friend follow or unfollowed
$scope.foll8 = function(friendFollowIndex){
  if(friendFollowIndex>-1){
    return true;
  }
  else{
    return false;
  }
};

//watch action of an event
    $scope.watchAction = function (event) {
      var tap = "event";
      var userProfId = $scope.userProfId;
      var userName = $scope.userName;
    if(event.name[event.name.length-1].indexOf("!")>-1||event.name[event.name.length-1].indexOf(".")>-1||event.name[event.name.length-1].indexOf("?")>-1){
         var message = "You watched the event: "+event.name;
         var message2 = userName+" watched the event: "+event.name;
    }
    else{
         var message = "You watched the event: "+event.name+".";
         var message2 = userName+" watched the event: "+event.name+".";
    }
    if(event.watched){
         var answer99 = null;
         for (var i = 0, len = $scope.userItem.watchList.length; i < len; i++) {
              if($scope.userItem.watchList[i].name==event.name){
                    answer99 = $scope.userItem.watchList[i];
              }
          }
         $scope.userItem.watchList.splice($scope.userItem.watchList.indexOf(answer99),1);
        $scope.cards.push($scope.events[event.name]);
         $scope.userItem.notifications = $scope.userItem.notifications.filter(function (el) {
                        return el.message !== message;
                       });

         $scope.events[event.name].watched = false;
          PetService.setUser($scope.userItem);
      //unwatch event on server
       $http.post('http://stark-eyrie-6720.herokuapp.com/unwatchEvent',
        {userProfId:userProfId,
          message:message,
          message2:message2,
          eventObj:event
        }).error(function(){
          // $scope.showAlert("Connection to the server could not be acheived at this time. Increase your WiFi/service or try again later.","Failed.");
        }).success(function(res){
      })
    }
    else{
      $scope.newNot2=! $scope.newNot2;
      //generate notDate to current timestamp
      var notDate = Date.now();
      $scope.userItem.watchList.push($scope.events[event.name]);
        $scope.userItem.notifications.push({message:message,date:notDate,tap:tap});

        var answer97 = null;
         for (var i = 0, len = $scope.cards.length; i < len; i++) {
              if($scope.cards[i].name==event.name){
                    answer97 = $scope.cards[i];
              }
          }
         $scope.cards.splice($scope.cards.indexOf(answer97),1);
      $scope.events[event.name].watched = true;
      PetService.setUser($scope.userItem);
      setTimeout(function() {
       $scope.newNot2=false;
      }, 100);

      //watch event on server
      $http.post('http://stark-eyrie-6720.herokuapp.com/watchEvent',
        {userProfId:userProfId,
          message:message,
          tap:tap,
          message2:message2,
          notDate:notDate,
          eventObj:event
        }).error(function(){
          // $scope.showAlert("Connection to the server could not be acheived at this time. Increase your WiFi/service or try again later.","Failed.");
        }).success(function(res){
        });
    }
      // for(q=0;q<$scope.unFriends.length;q++){
     //    if($scope.unFriends[q].userProfId==followingId){
     //      if($scope.unFriends[q].followers.indexOf(userProfId)>-1){
     //        $scope.unFriends[q].followers.pop(userProfId);
     //        $http.post('http://stark-eyrie-6720.herokuapp.com/unfollow',
     //    {userProfId:userProfId,
     //      message:message,
     //      followingId:followingId}).error(function(){
     //      $scope.showAlert("Connection to the server could not be acheived at this time. Increase your WiFi/service or try again later.","Failed.");
     //    }).success(function(res){
     //      // $state.go("app.friends");
     //      // alert("worked!");
     //      // alert();
     //    });
     //   }
     //        else{

     //     $scope.unFriends[q].followers.push(userProfId);
     //     var notDate = "9/17/1995";
     //     // alert(message);
     //     // alert
     //     // $scope.notifications.push({message:message,date:date});
     //        $http.post('http://stark-eyrie-6720.herokuapp.com/follow',
     //    {userProfId:userProfId,
     //      followingId:followingId,
     //      message:message,
     //      notDate:notDate}).error(function(){
     //      $scope.showAlert("Connection to the server could not be acheived at this time. Increase your WiFi/service or try again later.","Failed.");
     //    }).success(function(res){
     //       // add notification that you added a follower

     //      // $state.go("app.friends");
     //      // alert(res.success);
     //      // alert();
     //    });

     //  }
     // }
    // }
   };

      $scope.getWatch = function(event){
        return PetService.getWatched(event);
      };

//called when following/unfollowing
    $scope.followAction = function (friend) {
    var followingId = friend.userProfId;
    var message = $scope.userName+" just followed you.";
    var userProfId = $scope.userProfId;


      for(q=0;q<$scope.unFriends.length;q++){
        if($scope.unFriends[q].userProfId==followingId){
          if($scope.unFriends[q].followers.indexOf(userProfId)>-1){
            $scope.unFriends[q].followers.splice($scope.unFriends[q].followers.indexOf(userProfId),1);
            $scope.userItem.following.splice($scope.userItem.following.indexOf(followingId),1);
            $http.post('http://stark-eyrie-6720.herokuapp.com/unfollow',
        {userProfId:userProfId,
          message:message,
          followingId:followingId}).error(function(){
          $scope.showAlert("Connection to the server could not be acheived at this time. Increase your WiFi/service or try again later.","Failed.");
        }).success(function(res){
        });
       }
            else{

         $scope.unFriends[q].followers.push(userProfId);
         $scope.userItem.following.push(followingId);
         var notDate = Date.now();
            $http.post('http://stark-eyrie-6720.herokuapp.com/follow',
        {userProfId:userProfId,
          followingId:followingId,
          message:message,
          notDate:notDate}).error(function(){
          $scope.showAlert("Connection to the server could not be acheived at this time. Increase your WiFi/service or try again later.","Failed.");
        }).success(function(res){
        });

      }
     }
    }

   };
$scope.doAlert = true;

     $scope.alert3 = function(){

      if($scope.doAlert == true){
      $scope.doAlert = false;
      var schoolName = $scope.userItem.userSchool;
      var userEmail = $scope.userItem.userEmail;

      $http.post('http://stark-eyrie-6720.herokuapp.com/getUser',{userEmail: userEmail, userSchool:schoolName}).success(function(red){
            if(red.Item.banned==="banned"){
              $scope.showAlert('This account has been banned for violating our Terms of Use. Contact us at UNightlifeTeam@gmail.com if you think is a mistake.');
              $state.go('app.login');
            }
            else{
              var notCount = $scope.userItem.notifications.length;
              PetService.setUser(red.Item);
              $scope.userItem = red.Item;
              var notCount2 = $scope.userItem.notifications.length;
              if(notCount2>notCount){
                $scope.newNot = true;
                PetService.setNewNot(true);
              }
            }
          });

         $http.post('http://stark-eyrie-6720.herokuapp.com/getSchool', {schoolName:schoolName}).error(function(){
          if($scope.cards[0]=="empty"){
            $scope.scopeCards();
          }
          $scope.doAlert = true;
          $scope.$broadcast('scroll.refreshComplete');
        }).success(function(res){

          currentList = {};
          var today = new Date();
          var currentDay = today.getDate();
          var currentMonth = today.getMonth()+1; //January is 0
          var currentYear = today.getFullYear();
          var schoolItem = res.Item;

        for(var key in schoolItem.schoolEvents){
            var startDay = schoolItem.schoolEvents[key].start_time.split('/')[1];
            var startYear = schoolItem.schoolEvents[key].start_time.split('/')[2];
            var startMonth = schoolItem.schoolEvents[key].start_time.split('/')[0];
            schoolItem.schoolEvents[key].startYear = startYear;

        if(schoolItem.schoolEvents[key].timeOfEvent!=undefined){
           if(schoolItem.schoolEvents[key].timeOfEvent.length<7){
                schoolItem.schoolEvents[key].timeString = '0'+schoolItem.schoolEvents[key].timeOfEvent;
              }
              else{
                schoolItem.schoolEvents[key].timeString = schoolItem.schoolEvents[key].timeOfEvent;
              }
        }
         else{
             schoolItem.schoolEvents[key].timeString = null;
          }

            if (Math.floor(startYear)>Math.floor(currentYear)){
              currentList[key] = schoolItem.schoolEvents[key];
            }
            else if(Math.floor(startYear)==Math.floor(currentYear)){
              if(Math.floor(startMonth)>Math.floor(currentMonth)){
                currentList[key] = schoolItem.schoolEvents[key];
              }
              else if(Math.floor(startMonth)==Math.floor(currentMonth)){
                if(Math.floor(startDay)>=Math.floor(currentDay)){
                 currentList[key] = schoolItem.schoolEvents[key];
                }
              }
            }

        }
        PetService.refreshEvents(currentList);
        }).success(function(){
           $scope.events = PetService.getEvents();
           if($scope.cards[0]=="empty"){
             $scope.scopeCards();
            }
          $scope.doAlert = true;
          $scope.$broadcast('scroll.refreshComplete');
        })
      }
    };

    $scope.go_event = function () {
      $state.go("app.newEventForm");
    };

    $scope.goAdd = function () {
     $state.go("app.addAnEvent");
    };

    $scope.sortByKey=function(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
    };

    $scope.cardFunc = function(card){
          if(card.timeString){
              a = card.start_time+' '+card.timeString.substr(0, 5)+' '+card.timeString.substr(5,6);
              card.eventDate = Date.parse(a, "mm/dd/yyyy hh:mm tt");
          }
          else{
            card.eventDate = Date.parse(card.start_time,"mm/dd/yyyy");
          }
    };

        // Google Analytics Trackers, controller init setup
    analytics.startTrackerWithId('UA-53156722-1');
    analytics.trackView('Event Feed Accessed');

    $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.userItem = PetService.getUser();
    $scope.events = PetService.getEvents();
    $scope.tinderView = PetService.getTinderView();
    $scope.friendView = false;
    $scope.singleView = PetService.getSingleView();
    $scope.newNot = PetService.getNewNot();
    $scope.singleEvent = PetService.getSingle();
    $scope.cards = PetService.getCards();
    $scope.loading=false;
    $scope.userPic1 = PetService.getUserPic();
    if($scope.userPic1 == ""){
      $scope.userPic1 = "http://www.diybackyardworkshop.com/wp-content/uploads/2012/01/NoAvatar.png";
    }
    if($scope.tinderView != true){
      $scope.main.dragContent = true;
    }
    else{
      $scope.main.dragContent = false;
    }
    $scope.predicate1 = '-date';
    $scope.showEventDesc = false;
    $scope.userName = $scope.userItem.userName;
    $scope.userProfId = $scope.userItem.userProfId;
     var nU = PetService.getNew();
    $scope.unFriends = PetService.getUNFriends();
    if($scope.unFriends.length==0&&$scope.unFriends[0]!="none"&&nU!="yes"){
      $scope.findFriends();
    }
    else if(nU=="yes"){
        $scope.findFriends2();
    }
    $scope.startCard=PetService.getStart();

  });
