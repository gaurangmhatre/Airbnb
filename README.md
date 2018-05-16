# AirBnb
This repo shall hold code base for Team Project Airbnb.

**Project Structure**

public folder:
    
    main.js -- Holds all the states for UI Routing.

**For every functionality there will be a separate folder under 'public' which will have the following files for that particluar funcionality:

    *.html -- HTML for that particular functionality which will be imported in UI view
    *.js   -- Controller for the particular functionality
    *.css  -- Styling for that particular html page


For the functionality "yourListings" there will be a folder with the same name and that folder will include the below files(could be more).

    yourListings.html
    yourListingsController.js
    yourListingsStyle.css


*views folder:

    homepage.ejs -- The first page that loads which contains the header andui-view. '/' will render the homepage.ejs.Every page will be loaded in 'ui-view' of homepage.ejs.


