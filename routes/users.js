const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Copy the code here
  res.send(JSON.stringify({users}, null, 4));//This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email ===email);
    res.send(filtered_users);
});

router.get("/lastName/:lastName", (req, res) => {
    const lastName = req.params.lastName;
    let filtered_lastName = users.filter((user) => user.lastName ===lastName);
    res.send(filtered_lastName);

});

// POST request: Create a new user
router.post("/",(req,res)=>{
  // Copy the code here
  users.push({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB
  })
  res.send("The user " + req.query.firstName + " has been added!")//This line is to be replaced with actual return value
});

function getDateFromString (strDate){
    let [dd, mm, yyyy] = strDate.split('-');
    return new Date(yyyy + "/" + mm +"/" + dd);
}

router.get("/sort",(req, res) => {
    let sorted_users = users.sort(function(a,b) {
        let d1 = getDateFromString(a.DOB);
        let d2 = getDateFromString(b.DOB);
        return d1 - d2;
    });
    res.send(sorted_users);
})


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
    // Extract email parameter and find users with matching email
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);

    if (filtered_users.length > 0) {

        let filtered_user = filtered_users[0];

        //extract and update DOB if provided

        let DOB = req.query.DOB;
        if (DOB) {
            filtered_user.DOB = DOB;
        }

        let firstName = req.query.firstName;
        if (firstName) {
            filtered_user.firstName = firstName;
        }

        let lastName = req.query.lastName;
        if (lastName) {
            filtered_user.lastName = lastName;
        }

        //replace old user entry with updated user
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);

        //send success message indicating the user has been updated
        res.send(`User with the email ${email} updated.`);
    } else {
        //send error message if no user found
        res.send("Unable to find user!");
    }

});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
    const email = req.params.email;
    users = users.filter((user) => user.email != email);
    res.send(`User with the email ${email} deleted`);
});

module.exports=router;
