// Import express for creating API's endpoints
const express = require("express");

// Import jwt for API's endpoints authentication
const jwt = require("jsonwebtoken");

// Creates an Express application, initiate
// express top level function
const app = express();

// A port for serving API's
const port = 3000;

// A fake database object
let databse = [
{
	name: "gfg",
	work: "knowledge provider",
	password: "abc",
},
{
	name: "suryapratap",
	work: "technical content writer",
	password: "123",
},
];

// A demo get route
app.get("/", (req, res) => {
res.json({
	route: "/",
	authentication: false,
});
});

// Allow json data
app.use(express.json());

// Login route
app.post("/login", (req, res) => {

// Get the name to the json body data
const name = req.body.name;

// Get the password to the json body data
const password = req.body.password;

// Make two variable for further use
let isPresent = false;
let isPresnetIndex = null;

// iterate a loop to the data items and
// check what data are matched.
for (let i = 0; i < databse.length; i++) {

	// If data name are matched so check
	// the password are correct or not
	if (databse[i].name === name
	&& databse[i].password === password) {

	// If both are correct so make
	// isPresent variable true
	isPresent = true;

	// And store the data index
	isPresnetIndex = i;

	// Break the loop after matching successfully
	break;
	}
}

// If isPresent is true, then create a
// token and pass to the response
if (isPresent) {

	// The jwt.sign method are used
	// to create token
	const token = jwt.sign(databse[isPresnetIndex], "secret");

	// Pass the data or token in response
	res.json({
	login: true,
	token: token,
	data: databse[isPresnetIndex],
	});
} else {

	// If isPresent is false return the error
	res.json({
	login: false,
	error: "please check name and password.",
	});
}
});

// Verify route
app.get("/auth", (req, res) => {

// Get token value to the json body
const token = req.body.token;

// If the token is present
if (token) {

	// Verify the token using jwt.verify method
	const decode = jwt.verify(token, "secret");

	// Return response with decode data
	res.json({
	login: true,
	data: decode,
	});
} else {

	// Return response with error
	res.json({
	login: false,
	data: "error",
	});
}
});

// Listen the server
app.listen(port, () => {
console.log(`Server is running :
	http://localhost:${port}/`);
});
