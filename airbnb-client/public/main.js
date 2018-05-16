var dashboard = angular.module('dashboard', [
    'ui.router',
    'ngMessages',
    'ngMaterial',
    'ngFileUpload',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'ngMap',
    'rzModule',
    'ngCookies',

]);

dashboard.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('landingPageAuctions', {
            url: '/landingPageAuctions',
            templateUrl: '/auctionableListings/landingPageAuctions.html',
            controller: 'landingPageAuctionsController',
            onEnter: function (userTrack) {
                userTrack.addChild('auctions', 'landingPageAuctions', Date.now());
            },
            resolve: {
                isLoggedIn: function (auth, $state, $q, $location) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        //
                        deferred.reject({authenticated: true});

                    }
                    return deferred.promise;

                }

            }

        })

        .state('auctionableListings', {
            url: '/auctionableListings',
            templateUrl: '/auctionableListings/auctionableListings.html',
            controller: 'auctionableListingsController',
            onEnter: function (userTrack) {
                userTrack.addChild('auctionable', 'auctionableListings', Date.now());
            },
            resolve: {
                data: function ($http) {
                    return $http({

                        method: "POST",
                        url: '/getAuctionableProperties',
                        data: {

                            "dstcity": localStorage.auctionCity

                        }
                    }).then(function (response) {
                        return response.data;
                    });
                }
            }
            // params : { listings : null}

        })


        .state('individualAuctionableListing', {
            url: '/individualAuctionableListing',
            templateUrl: '/auctionableListings/individualAuctionableListing.html',
            controller: 'individualAuctionableListingController',
            params: {"listing": null},
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;

                }

            },
            params: {"listing": null},
            onEnter: function (userTrack) {
                userTrack.addChild('individualAuction', 'individualAuctionableListing', Date.now());
            }
        })

        .state('individualListing', {
            url: '/individualListing',
            templateUrl: '/individualListing/individualListing.html',
            controller: 'individualListingController',
            params: {"listing": null},
            onEnter: function (userTrack) {
                userTrack.addChild('individualListing', 'individualListing', Date.now());
            },
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;

                }

            }

        })

        .state('bookTrip', {
            url: '/bookTrip',
            templateUrl: '/trips/bookTrip.html',
            controller: 'bookTripController',
            params: {"listing": null, "checkInDate": null, "checkOutDate": null, "guestsSelected": null},
            onEnter: function (userTrack) {
                userTrack.addChild('bookTrip', 'bookTrip', Date.now());
            },
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;

                }

            }

        })

        .state('showalllistings', {
            url: '/showlistings',
            templateUrl: '/showlistings/showalllistings.html',
            controller: 'showalllistingsController',
            resolve: {
                data: function ($http) {
                    return $http({

                        method: "POST",
                        url: '/getProperties',
                        data: {

                            "dstcity": localStorage.dstcity1

                        }
                    }).then(function (response) {
                        return response.data;
                    });
                },
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;

                }
            },
            onEnter: function (userTrack) {
                console.log('about to enter the the yourTrips' + userTrack);
                userTrack.addChild('Search', 'showListings', Date.now());
            }


        })

        .state('yourTrips', {
            url: '/yourtrips',
            templateUrl: '/trips/yourtrips.html',
            controller: 'yourTripsController',
            onEnter: function (userTrack) {
                console.log('about to enter the the yourTrips' + userTrack);
                userTrack.addChild('yourTrips ', 'yourTrips', Date.now());
            },
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;

                }

            }

        })

        .state('dashboard', {
            url: '/dashboard',
            //params : { useremail : null},
            templateUrl: '/dashboard/dashboard.html',
            //controller : 'successLoginController',


        })

        .state('editProfile', {
            url: '/editProfile',
            templateUrl: '/editProfile/editProfile.html',
            controller: 'editProfileController',
            onEnter: function (userTrack) {
                userTrack.addChild('editProfile', 'editProfile', Date.now());
            },
            resolve: {
                isLoggedIn: function ($http) {

                    return $http.get('/isLoggedIn').success(function (response) {

                        return response;
                    }).error(function (err) {

                        console.log(err);
                    })
                }

            }
        })

        .state('viewProfile', {
            url: '/viewProfile',
            templateUrl: '/editProfile/viewProfile.html',
            controller: 'viewProfileController',
            onEnter: function (userTrack) {
                userTrack.addChild('viewProfile', 'viewProfile', Date.now());
            },
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;

                }

            }
        })

        .state('editPhotoAndVideo', {
            url: '/editPhotoAndVideo',
            templateUrl: '/editProfile/editPhotoAndVideo.html',
            controller: 'editPhotoAndVideoController',
            onEnter: function (userTrack) {
                userTrack.addChild('uploadPhotoVideo', 'editPhotoAndVideo', Date.now());
            },
            resolve: {
                isLoggedIn: function ($http) {

                    return $http.get('/isLoggedIn').success(function (response) {

                        return response;
                    }).error(function (err) {

                        console.log(err);
                    })
                }

            }
        })

        .state('yourListings', {
            url: '/yourListings',
            //params : { useremail : null},
            templateUrl: '/yourListings/yourListings.html',
            controller: 'yourListingsController',
            onEnter: function (userTrack) {
                userTrack.addChild('Listings', 'yourListings', Date.now());
            },
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;

                }

            }
        })

        .state('manageListings', {
            url: '/manageListings',
            //params : { useremail : null},
            templateUrl: '/yourListings/manageListings.html',
            controller: 'manageListingsController',
            onEnter: function (userTrack) {
                userTrack.addChild('manage', 'manageListings', Date.now());
            },
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;

                }

            }
        })

        .state('accountSettings', {
            url: '/accountSettings',
            //params : { useremail : null},
            templateUrl: '/accountSettings/accountSettings.html',
            controller: 'accountSettingsController',
            onEnter: function (userTrack) {
                userTrack.addChild('settings', 'accountSettings', Date.now());
            },
            resolve: {
                isLoggedIn: function ($http) {

                    return $http.get('/isLoggedIn').success(function (response) {

                        return response;
                    }).error(function (err) {

                        console.log(err);
                    })
                }

            }
        })
        .state('transactionHistory', {
            url: '/transactionHistory',
            //params : { useremail : null},
            onEnter: function (userTrack) {
                userTrack.addChild('history', 'transactionsHistory', Date.now());
            },
            templateUrl: '/accountSettings/settings.html',
            controller: 'settingsController',
            resolve: {
                isLoggedIn: function ($http) {

                    return $http.get('/isLoggedIn').success(function (response) {

                        return response;
                    }).error(function (err) {

                        console.log(err);
                    })
                }

            }
        })
    $stateProvider.state('landingPage', {
        url: '/',
        templateUrl: "host/landingPage.html",
        controller: "landingPage",
        onEnter: function (userTrack) {
            userTrack.addChild('', 'landingPage', Date.now());
        },
        resolve: {
            isLoggedIn: function (auth, $state, $q, $location) {

                var deferred = $q.defer();
                var isUser = auth.getUserInfo();
                console.log("Is user", isUser);
                if (!isUser) {

                    console.log("getUserInfo", auth.getUserInfo());
                    deferred.resolve(auth.getUserInfo());
                }
                else {
                    console.log("I am in the error");
                    //
                    deferred.reject({authenticated: true});

                }
                return deferred.promise;

            }

        }
    }).state('landingPage.afterSignIn', {
        url: '/profile',
        templateUrl: "host/afterSignIn.html",
        controller: "afterSignIn",
        onEnter: function (userTrack) {
            userTrack.addChild('signedIn', 'afterSignin', Date.now());
        },
        resolve: {
            isLoggedIn: function (auth, $state, $q) {

                var deferred = $q.defer();
                var isUser = auth.getUserInfo();
                console.log("Is user", isUser);
                if (isUser.data.user) {

                    console.log("getUserInfo", auth.getUserInfo());
                    deferred.resolve(auth.getUserInfo());
                }
                else {
                    console.log("I am in the error");
                    deferred.reject({authenticated: false});

                }
                return deferred.promise;

            }

        }
    }).state('host.login', {
        url: '/login',
        templateUrl: "host/login.html",
        controller: "login"
    }).state('host.signup', {
        url: '/signup',
        templateUrl: "host/signup.html",
        controller: "signup"
    }).state('host.presignup', {
        url: '/signup-options',
        templateUrl: "host/presignup.html",
        controller: "presignup"
    })

        .state('host', {
            url: '/host',
            templateUrl: "host/host.html",
            controller: "hostController",
            onEnter: function (userTrack) {
                userTrack.addChild('Become a Host', 'Become a Host', Date.now());
            }
        })
        .state('userHome', {
            url: '/userHome',
            templateUrl: "host/userHome.html",
            controller: "userHome",
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;

                }

            },
            onEnter: function (userTrack) {
                userTrack.addChild('', 'User Home', Date.now());
            },

        })


        .state('hostingSteps', {
            url: '/hostingSteps',
            templateUrl: "host/hostingSteps.html",
            controller: "hostingStepsController",
            params: {user: null},
            onEnter: function (userTrack) {
                userTrack.addChild('Start-Hosting', 'HostingSteps', Date.now());
            },
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;
                }

            }
        })
        .state('hostDashboard', {
            url: '/hostDashboard',
            templateUrl: "host/hostDashboard.html",
            controller: "hostDashboard",
            params: {user: null},
            onEnter: function (userTrack) {
                console.log('about to enter the the hostDashBoards' + userTrack);
                userTrack.addChild('HostDashboard link', 'hostDashboard', Date.now());
            },
            resolve: {

                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;
                }


            }
        })


        .state('hostingSteps.step1', {
            url: '/step1',
            templateUrl: "host/hostingStep1.html",
            controller: "hostingStepsController",
            params: {place: null, user: null},
            onEnter: function (userTrack) {
                userTrack.addChild('HostDashboard link', 'hostDashboard', Date.now());
            },
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;
                }
            }
        })
        .state('pendingRequest', {
            url: '/pendingRequest',
            templateUrl: "host/pendingRequest.html",
            controller: "pendingRequest",
            params: {place: null, user: null},
            onEnter: function (userTrack) {
                userTrack.addChild('pending', 'pendingRequest', Date.now());
            },
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;
                }
            }
        })
        .state('yourReservations', {
            url: '/yourReservations',
            templateUrl: "host/yourReservations.html",
            controller: "yourReservations",
            params: {place: null, user: null},
            onEnter: function (userTrack) {
                userTrack.addChild('reservations', 'yourReservations', Date.now());
            },
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;
                }
            }
        })
        .state('myReviews', {
            url: '/myReviews',
            templateUrl: "host/myReviews.html",
            controller: "myReviews",
            params: {place: null, user: null},
            onEnter: function (userTrack) {
                userTrack.addChild('reviews', 'yourReviews', Date.now());
            },
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;
                }
            }
        })
        .state('hostingSteps.location', {
            url: '/location',
            templateUrl: "host/location.html",
            controller: "hostingStepLocationController",
            params: {place: null},
            onEnter: function (userTrack) {
                userTrack.addChild('Continue Button', 'location', Date.now());
            }
            // resolve: function(auth,$state,$q	) {
            //
            //     var deferred =$q.defer();
            //     var isUser = auth.getUserInfo();
            //     console.log("Is user",isUser);
            //     if( isUser.data.user){
            //
            //         console.log("getUserInfo", auth.getUserInfo());
            //         deferred.resolve(auth.getUserInfo());
            //     }
            //     else {
            //         console.log("I am in the error");
            //         deferred.reject({ authenticated: false });
            //
            //     }
            //     return deferred.promise;
            //
            // }
        })


        .state('hostingSteps.amneties', {
            url: '/amneties',
            templateUrl: "host/amneties.html",
            controller: "hostingAmnetiesController",
            params: {place: null},
            onEnter: function (userTrack) {
                userTrack.addChild('Next Button', 'amneties', Date.now());
            }
            // resolve: function(auth,$state,$q	) {
            //
            //     var deferred =$q.defer();
            //     var isUser = auth.getUserInfo();
            //     console.log("Is user",isUser);
            //     if( isUser.data.user){
            //
            //         console.log("getUserInfo", auth.getUserInfo());
            //         deferred.resolve(auth.getUserInfo());
            //     }
            //     else {
            //         console.log("I am in the error");
            //         deferred.reject({ authenticated: false });
            //
            //     }
            //     return deferred.promise;
            //
            // }
        })


        .state('hostingSteps.spaces', {
            url: '/spaces',
            templateUrl: "host/spaces.html",
            controller: "hostingSpacesController",
            params: {place: null},
            onEnter: function (userTrack) {
                userTrack.addChild('Next Button', 'sapces', Date.now());
            }// resolve: function(auth,$state,$q	) {
            //
            //     var deferred =$q.defer();
            //     var isUser = auth.getUserInfo();
            //     console.log("Is user",isUser);
            //     if( isUser.data.user){
            //
            //         console.log("getUserInfo", auth.getUserInfo());
            //         deferred.resolve(auth.getUserInfo());
            //     }
            //     else {
            //         console.log("I am in the error");
            //         deferred.reject({ authenticated: false });
            //
            //     }
            //     return deferred.promise;
            //
            // }
        })


        .state('hostingSteps.description', {
            url: '/description',
            templateUrl: "host/description.html",
            controller: "hostingDescriptionController",
            params: {place: null}
            // resolve: function(auth,$state,$q	) {
            //
            //     var deferred =$q.defer();
            //     var isUser = auth.getUserInfo();
            //     console.log("Is user",isUser);
            //     if( isUser.data.user){
            //
            //         console.log("getUserInfo", auth.getUserInfo());
            //         deferred.resolve(auth.getUserInfo());
            //     }
            //     else {
            //         console.log("I am in the error");
            //         deferred.reject({ authenticated: false });
            //
            //     }
            //     return deferred.promise;
            //
            // }
        })
        .state('hostingSteps.price', {
            url: '/price',
            templateUrl: "host/price.html",
            controller: "hostingPriceController",
            params: {place: null}
            // resolve: function(auth,$state,$q	) {
            //
            //     var deferred =$q.defer();
            //     var isUser = auth.getUserInfo();
            //     console.log("Is user",isUser);
            //     if( isUser.data.user){
            //
            //         console.log("getUserInfo", auth.getUserInfo());
            //         deferred.resolve(auth.getUserInfo());
            //     }
            //     else {
            //         console.log("I am in the error");
            //         deferred.reject({ authenticated: false });
            //
            //     }
            //     return deferred.promise;
            //
            // }
        })

        .state('hostingSteps.upload', {
            url: '/upload',
            templateUrl: "host/upload.html",
            controller: "hostingUploadController",
            params: {listId: null}
            // resolve: function(auth,$state,$q	) {
            //
            //     var deferred =$q.defer();
            //     var isUser = auth.getUserInfo();
            //     console.log("Is user",isUser);
            //     if( isUser.data.user){
            //
            //         console.log("getUserInfo", auth.getUserInfo());
            //         deferred.resolve(auth.getUserInfo());
            //     }
            //     else {
            //         console.log("I am in the error");
            //         deferred.reject({ authenticated: false });
            //
            //     }
            //     return deferred.promise;
            //
            // }
        })


        .state('previousTrips', {
            url: '/previoustrips',
            templateUrl: '/trips/previousTrips.html',
            controller: 'previousTripsController',
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;

                }

            }
        })

        .state('auctionTrips', {
            url: '/auctionTrips',
            templateUrl: '/trips/auctionTrips.html',
            controller: 'auctionTripsController',
            resolve: {
                isLoggedIn: function (auth, $state, $q) {

                    var deferred = $q.defer();
                    var isUser = auth.getUserInfo();
                    console.log("Is user", isUser);
                    if (isUser.data.user) {

                        console.log("getUserInfo", auth.getUserInfo());
                        deferred.resolve(auth.getUserInfo());
                    }
                    else {
                        console.log("I am in the error");
                        deferred.reject({authenticated: false});

                    }
                    return deferred.promise;

                }
            }
        }).state('hostList', {
        url: "/hostList",
        templateUrl: '/admin/hostList/hostList.html',
        controller: 'hostList',
    }).state('userList', {
        url: "/userList",
        templateUrl: '/admin/userList/userList.html',
        controller: 'userList',
    }).state('billList', {
        url: "/billList",
        templateUrl: '/admin/billList/billList.html',
        controller: 'billList',
    }).state('approvedListings', {
        url: "/approvedListings",
        templateUrl: '/admin/approvedListings/approvedListings.html',
        controller: 'approvedListings',
    }).state('pendingListings', {
        url: "/pendingListings",
        templateUrl: '/admin/pendingListings/pendingListings.html',
        controller: 'pendingListings',
    }).state('rejectedListings', {
        url: "/rejectedListings",
        templateUrl: 'admin/rejectedListings/rejectedListings.html',
        controller: 'rejectedListings',
    }).state('adminGraphDashboard', {
        url: "/adminGraphDashboard",
        templateUrl: '/admin/adminGraphDashboard/adminGraphDashboard.html',
        controller: 'adminGraphDashboard'
    });


})

dashboard.directive('starRating', function () {
    return {
        restrict: 'A',
        template: '<ul class="rating">' +
        '<li ng-repeat="star in stars" ng-class="star">' +
        '\u2605' +
        '</li>' +
        '</ul>',
        scope: {
            ratingValue: '=',
            max: '='
        },
        link: function (scope, elem, attrs) {
            scope.stars = [];
            for (var i = 0; i < scope.max; i++) {
                scope.stars.push({
                    filled: i < scope.ratingValue
                });
            }
        }
    }
});
dashboard.filter('removeSpaces', [function () {
    return function (string) {
        if (!angular.isString(string)) {
            return string;
        }
        return string.replace(/[\s]/g, '');
    };
}]);

