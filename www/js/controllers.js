var news = [];
angular.module('schoolCouncilApp.controllers', [])

/*****************************************************************
App Controller
******************************************************************/
.controller('AppCtrl', function($scope, $cordovaInAppBrowser) {
  $scope.events = [{
    id: 1,
    title: 'Live @ Rotman: Dalton McGuinty',
    date: 'Monday December 14, 2015',
    time: '4:00 PM - 5:00 PM',
    detail: 'Dalton McGuinty, 24th Premier of Ontario; Senior Fellow, School of Public Policy and Governance, U of Toronto; Special Advisor, Desire2Learn in conversation with Mel Cappe, Professor, School of Public Policy and Governance, U of Toronto; former Clerk of the Privy Council, Secretary to the Cabinet and Head of the Public Service in Ottawa on his new book, “Making a Difference, A Memoir” (Dundurn, Nov. 28, 2015)'
  }, {
    id: 2,
    title: 'Machine Learning and the Market for Intelligence',
    date: 'Tuesday December 15, 2015',
    time: '8:00 AM - 7:00 PM',
    detail: 'Please join us on December 15th for a full day conference, Machine Learning and the Market for Intelligence, A Rotman School of Management Conference.'
  }, {
    id: 3,
    title: 'Getting It Done Speaker Series @ Rotman',
    date: 'Monday January 11, 2016',
    time: '5:00 PM - 6:00 PM',
    detail: 'Chris Bailey, Jedi Master, ALifeofProductivity.com; Speaker and Author on his new book The Productivity Project: Accomplishing More by Managing Your Time, Attention, and Energy Better (Random House Canada, Jan. 6, 2016).'
  }, {
    id: 4,
    title: 'Behavioural Economics In Action At Rotman (BEAR) Speaker Series',
    date: 'Wednesday January 13, 2016',
    time: '5:00 PM - 6:30 PM',
    detail: 'Tiina Likki, Advisor, Behavioural Insights Team, U.K. on Behavioral Insights in Welfare and Policy: Some Recent Updates from the BIT'
  }, {
    id: 5,
    title: 'The Letters MBA Student Club @ Rotman Discussion on Being Out at Work',
    date: 'Wednesday January 27, 2016',
    time: '5:30 PM - 7:30 PM',
    detail: 'Michael Lee-Chin, President and Chair, Portland Holdings Inc.; Chair, NCB Jamaica Limited; Chancellor, Wilfred Laurier University on “The Wealthy Invest Differently – Opportunities Typically Reserved for the Affluent and Institutional Investor”'
  }, {
    id: 6,
    title: 'Omnium Global Executive MBA Executive Speaker Series (DUBAI)',
    date: 'Wednesday February 03, 2016',
    time: '7:30 PM - 9:30 PM',
    detail: 'Paulette Filion, Partner, StrategyMarketing.ca and Judy Paradi, Partner, StrategyMarketing.ca on “Financial Advisors are Failing Women: What Female Clients Really Want and How to Change the Dialogue”.'
  }];


  $scope.openInAppBrowser = function(url) {
    var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
    };

    $cordovaInAppBrowser.open(url, '_blank', options)
      .then(function(event) {
        // success
      })
      .catch(function(event) {
        // error
      })
  }

})

/*****************************************************************
Events Controller
******************************************************************/
.controller('EventsCtrl', function($scope) {

})

/*****************************************************************
Events Detail Controller
******************************************************************/
.controller('EventDetailCtrl', ['$scope', '$state', function($scope, $state) {
  $scope.eventId = $state.params.eventId;

}])

/*****************************************************************
News Controller

Todo:
  - fix loadOlderNews
  - fix loadNewerNews
******************************************************************/
.controller('NewsCtrl', function($http, $ionicLoading, $scope) {
  // request
  // http: //schoolcouncil.ji-make.com/api/get_tag_posts/?tag_slug=news
  // response
  // {
  //   "status": "ok",
  //   "count": 1,
  //   "pages": 1,
  //   "tag": {
  //     "id": 5,
  //     "slug": "news",
  //     "title": "News",
  //     "description": "",
  //     "post_count": 1
  //   },
  //   "posts": [{
  //     "id": 9,
  //     "type": "post",
  //     "slug": "24-hour-access-to-llc-at-st-james-campus-this-month",
  //     "url": "http:\/\/schoolcouncil.ji-make.com\/2016\/02\/21\/24-hour-access-to-llc-at-st-james-campus-this-month\/",
  //     "status": "publish",
  //     "title": "24\u2013hour access to LLC at St. James Campus this month",
  //     "title_plain": "24\u2013hour access to LLC at St. James Campus this month",
  //     "content": "<p><a href=\"http:\/\/www.georgebrown.ca\/home\/news\/24-hour-access-to-st-james-LLC-in-february.aspx\">24\u2013hour access to LLC at St. James Campus this month<\/a><a href=\"http:\/\/www.georgebrown.ca\/home\/news\/24-hour-access-to-st-james-LLC-in-february.aspx\">24\u2013hour access to LLC at St. James Campus this month<\/a><\/p>\n",
  //     "excerpt": "<p>24\u2013hour access to LLC at St. James Campus this month24\u2013hour access to LLC at St. James Campus this month<\/p>\n",
  //     "date": "2016-02-21 04:51:47",
  //     "modified": "2016-04-08 06:54:01",
  //     "categories": [
  //
  //     ],
  //     "tags": [{
  //       "id": 5,
  //       "slug": "news",
  //       "title": "News",
  //       "description": "",
  //       "post_count": 1
  //     }],
  //     "author": {
  //       "id": 1,
  //       "slug": "admin1",
  //       "name": "Admin1",
  //       "first_name": "",
  //       "last_name": "",
  //       "nickname": "Admin1",
  //       "url": "",
  //       "description": ""
  //     },
  //     "comments": [
  //
  //     ],
  //     "attachments": [
  //
  //     ],
  //     "comment_count": 0,
  //     "comment_status": "open",
  //     "custom_fields": {
  //
  //     }
  //   }]
  // }

  // show loading screen
  $ionicLoading.show({
    template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
  });

  $scope.newsRefresher = function() {
    $scope.news = [];
    var params = {};
    $http.get('http://schoolcouncil.ji-make.com/api/get_tag_posts/?tag_slug=news', {
        params: params
      })
      .success(function(response) {
        angular.forEach(response.posts, function(child) {
          child.excerpt = child.excerpt.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") //to remove <p> or img tags from string
          $scope.news.push(child);
        });
        $scope.dataLoaded = true;
      })
      .error(function(data, status) {
        $scope.dataLoaded = false;
        console.log("news request failed");
      });
    $scope.$broadcast('scroll.refreshComplete');
  };


  $scope.newsRefresher()
    // // hide loading screen
  $ionicLoading.hide();
})

/*****************************************************************
News Details Controller
******************************************************************/
.controller('NewsDetailCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {

  var ID = $state.params.newsId;
  var params = {};
  $http.get('http://schoolcouncil.ji-make.com/api/get_post/?post_id=' + ID, {
      params: params
    })
    .success(function(response) {
      $scope.item = response.post;
      $scope.item.content = $scope.item.content.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "") //to remove <p> or img tags from string
      console.log(response);
      $scope.dataLoaded = true;
    })
    .error(function(data, status) {
      $scope.dataLoaded = false;
      console.log("news request failed");
    });

}])

/*****************************************************************
Twitter Controller
******************************************************************/
.controller('TwitterCtrl', function($scope, $ionicLoading, $ionicScrollDelegate, $http) {

  // show loading screen
  $ionicLoading.show({
    template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>'
  });

  $http.get("https://mobile.twitter.com/schoolcouncilcp/tweets")
    .then(function(response) {
      $scope.bannerUrl = response.data.state.user.bannerUrl;
      $scope.avatarUrlLarge = response.data.state.user.avatarUrlLarge;
      $scope.description = response.data.state.user.description.textString;
      $scope.displayName = response.data.state.user.displayName;
      $scope.handle = "@" + response.data.state.user.screenName;
      $scope.location = response.data.state.user.location;
      $scope.url_display = response.data.state.user.url.display;
      $scope.url_expanded = response.data.state.user.url.expanded;
      $scope.tweets = response.data.state.timeline.items;

      $scope.dataLoaded = true;
    }, function() {
      $scope.dataLoaded = false;
      console.log("twitter request failed");
    });
  // hide loading screen
  $ionicLoading.hide();
})

/*****************************************************************
Contact Controller
******************************************************************/
.controller('ContactCtrl', function($scope) {

  var latitude = 43.6758817;
  var longitude = -79.4111015;
  var mapProp = {
    center: new google.maps.LatLng(latitude, longitude),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  var image = 'img/icon.png';
  var beachMarker = new google.maps.Marker({
    position: {
      lat: latitude,
      lng: longitude
    },
    map: map,
    icon: image
  });

});
