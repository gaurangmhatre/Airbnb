// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('airbnb', ['ionic', 'airbnb.controllers', 'airbnb.services','airbnb.directives','ui.bootstrap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$httpProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
.state('tab.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })
    .state('tab.signup', {
      url: '/signup',
      views: {
        'signup': {
          templateUrl: 'templates/signup.html',
          controller: 'signUpCtrl'
        }
      }
    })
    .state('tab.login', {
      url: '/login',
      views: {
        'login': {
          templateUrl: 'templates/login.html',
          controller: 'login'
        }
      }
    })
    .state('tab.userHome', {
      url: '/userHome',
      views: {
        'userHome': {
          templateUrl: 'templates/userHome.html',
          controller: 'userHome'
        }
      }
    })
    .state('tab.showListing', {
      url: '/showListing/:city',
      views: {
        'showListing': {
          templateUrl: 'templates/showListing.html',
          controller: 'showListing'
        },
        params:{"city":null}
      }
    })
    .state('tab.individualListing', {
      url: '/individualListing/:listing',
      views: {
        'individualListing': {
          templateUrl: 'templates/individualListing.html',
          controller: 'individualListing'
        },
        params:['listing']
      }
    })
    .state('tab.trips', {
      url: '/trips/',
      views: {
        'trips': {
          templateUrl: 'templates/trips.html',
          controller: 'trips'
        }
      }
    })



    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
