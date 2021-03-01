# Reaktor app for job application
Web application for fetching all product and availability data for a clothing brand.
The application is the coding exercise for Reaktor's job application.
If the application has just been started it may take a couple of minutes for it to load all of the data.
If the application was running at some paid host it would require just one start and then run smoothly after that.
However, the application is running at Heroku, which is free, and Heroku shuts temporarily down apps that have not been used in a while.
Thus, opening the app might require waiting for two minutes until the data is received.
In this case a text 'Loading...' is shown on the page. 
The page will be refreshed after two minutes to show the fetched data from the API at the start and later every five minutes. 
Otherwise, it should be fast to switch between pages.

The application is running at Heroku at:
https://cliffsclothes.herokuapp.com/
