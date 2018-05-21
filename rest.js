// Front end 
//1. Update Jumbtrom HTML
//1a. View Buttom, Make Res Button 
//table link or waitlist 


// link to go bacl to Make Res., Home
//Make Res
// BUTTONS: link to go back to View Tables, Home
// FORM: [name, phone, email, UID] SUBMIT BUTTON



// Click View Tables 
 //each record will display current number (table) and name (5)
 //1.
 //...
//5. 

//Waiting List (no limit?)
 //1.
 //...
//5. 
//

//PERSISTENT FOOTER from heroku
// Control Panel
// -- API Table Link--> JSON object representation (array1)

// -- API Wait List --> JSON object for tables (array2)| GitHub Repo -- 
// -- GitHub Repo --> link to GitHub


// back end

// GitHub repo, zencode, issues, yadda yadda

//  BACK END

//  VIEW TABLES BUTTON
// DISPLAYS reserveations: 
// for loop --> [5]
// array of objects displaying the tables
// table number + person's name

// Dependencies
// =============================================================

// ADD RESERVATION
// create variables capturing fields (jQuery)
// on. click button function -->submit 

//conditional statement --> tables or waitlist? 
// tables [5]
// if the tables array is full, then push the new reservation to the waitlist array
//waitlist [99]



// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Star Wars reservation (DATA)
// =============================================================
var reservation = [
    {
        name: "Test",
        tel: "11111",
        email: "1@1.com",
        uniqueID: "99999"
        }
  
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "Reservation.html"));
});

// Get all reservations
app.get("/all", function(req, res) {
  res.json(reservation);
});

// Search for Specific Character (or all reservation) - provides JSON
app.get("/api/:reservation?", function(req, res) {
  var chosen = req.params.reservation;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservation.length; i++) {
      if (chosen === reservation[i].routeName) {
        return res.json(reservation[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservation);
});

// Create New Reservation - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newRezzy = req.body;
  // Using a RegEx Pattern to remove spaces from newRezzy
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newRezzy.routeName = newRezzy.name.replace(/\s+/g, "").toLowerCase();

  console.log(newRezzy);

  reservation.push(newRezzy);

  res.json(newRezzy);
});

// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});