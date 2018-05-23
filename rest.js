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

// Sreservations (DATA)
// =============================================================
var reservations = [
  {
    name: "Test",
    tel: "11111",
    email: "1@1.com",
    uniqueID: "99999"
  }

];
var waitlists = [
  {
    name: "Test2",
    tel: "11111",
    email: "1@1.com",
    uniqueID: "99999"
  }

];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reservation", function (req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

// Get all reservations
app.get("/all", function (req, res) {
  res.json(reservations);
});
// Get all reservations
app.get("/waitlist", function (req, res) {
  res.json(waitlists);
});
// Search for Specific Character (or all reservation) - provides JSON
app.get("/api/:reservations?", function (req, res) {
  var chosen = req.params.reservations;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservations);
});

// Create New Reservation - takes in JSON input
app.post("/api/new", function (req, res) {
  if (reservations.length < 5) {


    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newRezzy = req.body;
    // Using a RegEx Pattern to remove spaces from newRezzy
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newRezzy.routeName = newRezzy.name.replace(/\s+/g, "").toLowerCase();

    console.log(newRezzy);

    reservations.push(newRezzy);

    res.json(newRezzy);
  }
  else {
    // This works because of our body-parser middleware
    var newWaitlist = req.body;
    // Using a RegEx Pattern to remove spaces from newRezzy
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newWaitlist.routeName = newWaitlist.name.replace(/\s+/g, "").toLowerCase();

    console.log(newWaitlist);

    waitlists.push(newWaitlist);

    res.json(newWaitlist);
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(port, function () {
  console.log("App listening on PORT " + port);
});