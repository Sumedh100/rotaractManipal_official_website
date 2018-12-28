#________________ROTARACT CLUB OF MANIPAL____________________#

__________________************ VERSION #1 ************__________________

# Initial Setup
* Added Landing Page
* Added home Page
* Added About's Page
* 
* Added upcoming events Page
* Added SHOW page for Upcoming Events
* created functionality to add new events via UserAuthentication



# RESTful Routes

NAME         |     URL              VERB(http)      DESCRIPTION                                                                                    
========================================================================================================================================
* Landing    |     /                GET             Displays the Landing Page.
* Home       |     /home            GET             Displays the Home Page.
* About      |     /about           GET             Disaplys the About's Page.
             |
* Events     |     /events          GET             Displays the Upcoming Events Page.
* New        |     /events/new      GET             Displays the Form to make a New Event.
* Create     |     /events          POST            Add new Event to the DataBase (also displayed on upcoming events page).
* Show       |     /events/:id      GET             Shows detailed Information about one Event.
* Edit       |     /events/:id      GET             Shows the Edit Form for one Event.
* Update     |     /events/:id      PUT             Updates the event data and redirects back to the Events Show page for that event.
* Destroy    |     /events/:id      DELETE          Delete a particular event amd then redirect to the Events page.

 p.s. HTTP does not support any other requests apart from GET and POST so method-override is required to achieve that functionality.
 p.s. HTTP does not support any other requests apart from GET and POST so method-override is required to achieve that functionality.



# Login and SignUp facility
* for now idk how to restrict the number of signups n all
* so for now... the signup page will be visible only when I am logged in.... 
* so that only if I or some other user that i have given permission can create an account for a third person


# Events Model
* name
* image
* date
* description
* author

# User Model
* UserName (Stored in DB as String)
* Password (Stored in DB as hash(def not MD5)
