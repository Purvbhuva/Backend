import express from "express"

// cookie-parser is a middleware used in Node.js/Express applications to parse cookies that are attached to the client request object.
// ✅ What it does:
// It reads the Cookie header in incoming HTTP requests.
// Parses cookie data into a JavaScript object.
// Attaches it to req.cookies (and req.signedCookies if using signed cookies).

// 💡 Use Case:
// Helpful when you're:
// Managing login sessions.
// Storing user preferences.
// Authenticating users with secure tokens stored in cookies.

import cors from "cors"
import cookieParser  from "cookie-parser"

const app = express()

//app.use is used for middleware
// 1. way for cors
// app.use(cors())

//2.way for proudction level

/* 🌐 What is CORS?
CORS (Cross-Origin Resource Sharing) is a security feature enforced by browsers.
It controls whether a browser will allow a web page (on one origin) to make requests to a different origin.
Example:
Frontend runs on: http://localhost:3000
Backend runs on: http://localhost:5000

//we make cors in backend to 3000
Only requests coming from http://localhost:3000 are allowed.
These are different origins, so you must enable CORS on the backend for the frontend to access it. */


//Note:- here we just set configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

//this line tell that we accept json in express
/* This line is middleware that tells your Express app to automatically parse incoming JSON data in the body of HTTP requests.
🔍 Why we need it:
When a client (like Postman, frontend app, or browser) sends a POST/PUT/PATCH request with JSON data:
{
  "name": "Purv",
  "age": 20
}
That data is in the request body, not in the URL or query params.

To access it in Express using:req.body.name

🛠 Without it:
app.post('/student', (req, res) => {
  console.log(req.body); // ❌ undefined
});

✅ With it:
app.use(express.json()); // <-- enables JSON parsing

app.post('/student', (req, res) => {
  console.log(req.body); // ✅ { name: 'Purv', age: 20 }
});

*/
// 1.
// app.use(express.json())

app.use(express.json({limit:"16kb"}))


//in url: ?user[name]=Purv&user[age]=20
//// => { user: { name: "Purv", age: 20 } }
// 1.
// app.use(express.urlencoded())
app.use(express.urlencoded({extended: true, limit: "16kb"}))


//aya public folder che tya pdf phota te tya rese
app.use(express.static("public"))

app.use(cookieParser())




export {app}